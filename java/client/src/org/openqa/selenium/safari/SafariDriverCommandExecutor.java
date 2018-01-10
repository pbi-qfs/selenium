// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

package org.openqa.selenium.safari;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static org.openqa.selenium.json.Json.MAP_TYPE;

import java.io.File;
import java.io.IOException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import com.google.common.base.Charsets;
import com.google.common.base.Stopwatch;
import com.google.common.base.Throwables;
import com.google.common.io.Files;
import com.google.common.util.concurrent.ListenableFuture;

import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.io.TemporaryFilesystem;
import org.openqa.selenium.json.Json;
import org.openqa.selenium.json.JsonException;
import org.openqa.selenium.os.CommandLine;
import org.openqa.selenium.remote.Command;
import org.openqa.selenium.remote.CommandExecutor;
import org.openqa.selenium.remote.DriverCommand;
import org.openqa.selenium.remote.ErrorCodes;
import org.openqa.selenium.remote.Response;
import org.openqa.selenium.remote.SessionId;
import org.openqa.selenium.remote.UnreachableBrowserException;

/**
 * A CommandExecutor that communicates with the SafariDriver extension using
 * WebSockets.
 */
class SafariDriverCommandExecutor implements CommandExecutor {

  private static final Logger log = Logger.getLogger(SafariDriverCommandExecutor.class.getName());

  private final SafariDriverServer server;
  private final SafariLocator browserLocator;
  private final SessionData sessionData;
  private final boolean cleanSession;

  private CommandLine commandLine;
  private WebSocketConnection connection;

  /**
   * @param options The {@link SafariOptions} instance
   */
  SafariDriverCommandExecutor(SafariOptions options) {
    this.server = new SafariDriverServer(options.getPort());
    this.browserLocator = new SafariLocator();
    this.sessionData = SessionData.forCurrentPlatform();
    this.cleanSession = options.getUseCleanSession();
  }

  /**
   * Launches a {@link SafariDriverServer}, opens Safari, and requests that
   * Safari connect to the server.
   *
   * @throws IOException If an error occurs while launching Safari.
   */
  synchronized void start() throws IOException {
    if (commandLine != null) {
      return;
    }

    server.start();

    if (cleanSession) {
      sessionData.clear();
    }

    File connectFile = prepareConnectFile(server.getUri());
//    BrowserInstallation installation = browserLocator.findBrowserLocationOrFail();

    // Older versions of Safari could open a URL from the command line using "Safari -url $URL",
    // but this does not work on the latest versions (5.1.3). On Mac OS X, we can use
    // "open -a Safari $URL", but we need a cross platform solution. So, we generate a simple
    // HTML file that redirects to the base of our SafariDriverServer, which kicks off the
    // connection sequence.
    log.info("Launching Safari");
    commandLine = new CommandLine(browserLocator.launcherFilePath(), connectFile.getAbsolutePath());
    commandLine.executeAsync();

    Stopwatch stopwatch = Stopwatch.createStarted();
    try {
      log.info("Waiting for SafariDriver to connect");
      connection = server.getConnection(10, TimeUnit.SECONDS);
    } catch (InterruptedException ignored) {
      // Do nothing.
    }

    if (connection == null) {
      stop();
      throw new UnreachableBrowserException(String.format(
          "Failed to connect to SafariDriver after %d ms",
          stopwatch.elapsed(TimeUnit.MILLISECONDS)));
    }
    log.info(String.format("Driver connected in %d ms", stopwatch.elapsed(TimeUnit.MILLISECONDS)));
  }

  private File prepareConnectFile(String serverUri) throws IOException {
    File tmpDir = TemporaryFilesystem.getDefaultTmpFS()
        .createTempDir("anonymous", "safaridriver");
    File launchFile = new File(tmpDir, "connect.html");
    launchFile.deleteOnExit();

    String contents = String.format(
        "<!DOCTYPE html><script>window.location = '%s';</script>", serverUri);
    Files.write(contents, launchFile, Charsets.UTF_8);

    return launchFile;
  }

  /**
   * Shuts down this executor, killing Safari and the SafariDriverServer along
   * with it.
   */
  synchronized void stop() {
    log.info("Shutting down");
    if (connection != null) {
      log.info("Closing connection");
      connection.close();
      connection = null;
    }

    if (commandLine != null) {
      log.info("Stopping Safari");
      commandLine.destroy();
      commandLine = null;
    }

    log.info("Stopping server");
    server.stop();
    log.info("Shutdown complete");
  }

  @Override
  public synchronized Response execute(Command command) {
    if (!server.isRunning() && DriverCommand.QUIT.equals(command.getName())) {
      Response itsOkToQuitMultipleTimes = new Response();
      itsOkToQuitMultipleTimes.setStatus(ErrorCodes.SUCCESS);
      return itsOkToQuitMultipleTimes;
    }

    checkState(connection != null, "Executor has not been started yet");

    // On quit(), the SafariDriver's browser extension simply returns a stub success
    // response, so we can short-circuit the process and just return that here.
    // The SafarIDriver's browser extension doesn't do anything on qu
    // There's no need to wait for a response when quitting.
    if (DriverCommand.QUIT.equals(command.getName())) {
      Response response = new Response(command.getSessionId());
      response.setStatus(ErrorCodes.SUCCESS);
      response.setState(ErrorCodes.SUCCESS_STRING);
      return response;
    }

    try {
      SafariCommand safariCommand = new SafariCommand(command);
      String rawJsonCommand = new Json().toJson(serialize(safariCommand));
      ListenableFuture<String> futureResponse = connection.send(rawJsonCommand);

      final String responseString = futureResponse.get();
      SafariResponse safariResponse = new Json().toType(responseString, SafariResponse.class);
      Response response = safariResponse.getResponse();
      if (response.getStatus() == ErrorCodes.SUCCESS) {
        checkArgument(
            safariCommand.getId().equals(safariResponse.getId().toString()),
            "Response ID<%s> does not match command ID<%s>",
            safariResponse.getId(), safariCommand.getId());
      }

      return response;
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new WebDriverException(e);
    } catch (ExecutionException e) {
      throw Throwables.propagate(e.getCause());
    }
  }

  private static Map<String, Object> serialize(SafariCommand command) {
      Json json = new Json();
      String raw = json.toJson(command);
      Map<String, Object> rawCommand = json.toType(raw, MAP_TYPE);
      rawCommand.remove("sessionId"); // The old extension does not like it

      Map<String, Object> value = new HashMap<String, Object>();
      value.put("origin", "webdriver");
      value.put("type", "command");
      value.put("command", rawCommand);
      return value;
  }

  private static class SafariResponse {
      private volatile Integer origin;
      private volatile String type;
      private volatile String id;
      private volatile Response response;

      public Integer getOrigin()
      {
          return origin;
      }

      public void setOrigin(Integer origin)
      {
          this.origin = origin;
      }

      public String getType()
      {
          return type;
      }

      public void setType(String type)
      {
          this.type = type;
      }

      public String getId()
      {
          return id;
      }

      public void setId(String id)
      {
          this.id = id;
      }

      public Response getResponse()
      {
          return response;
      }

      public void setResponse(Response response)
      {
          this.response = response;
      }

  }

  /**
   * Extends the standard Command object to include an ID field. Used to
   * synchronize messages with the SafariDriver browser extension.
   */
  private static class SafariCommand extends Command {

    private final UUID id;

    private SafariCommand(Command command) {
      super(commandSessionId(command), command.getName(), command.getParameters());
      this.id = UUID.randomUUID();
    }

    protected static SessionId commandSessionId(Command command)
    {
        // The new Json converter expect a session id != null
        final SessionId sessionId = command.getSessionId();
        if (sessionId == null || sessionId.toString() == null) return new SessionId("");
        return sessionId;
    }

    public String getId() {
      return id.toString();
    }
  }
}
