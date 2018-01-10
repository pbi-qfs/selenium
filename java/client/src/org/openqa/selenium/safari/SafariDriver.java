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

import java.io.IOException;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.remote.CommandExecutor;
import org.openqa.selenium.remote.Dialect;
import org.openqa.selenium.remote.DriverCommand;
import org.openqa.selenium.remote.FileDetector;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.RemoteWebElement;
import org.openqa.selenium.remote.Response;
import org.openqa.selenium.remote.internal.JsonToWebElementConverter;
import org.openqa.selenium.remote.service.DriverCommandExecutor;

import java.util.Collection;
import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * A WebDriver implementation that controls Safari using a browser extension
 * (consequently, only Safari 5.1+ is supported).
 *
 * This driver can be configured using the {@link SafariOptions} class.
 */
public class SafariDriver extends RemoteWebDriver {

  private SafariDriverService service;

  // Legacy Window API
  private final static String SET_WINDOW_SIZE = "setWindowSize";
  private final static String SET_WINDOW_POSITION = "setWindowPosition";
  private final static String GET_WINDOW_SIZE = "getWindowSize";
  private final static String GET_WINDOW_POSITION = "getWindowPosition";
  private final static String MAXIMIZE_WINDOW = "maximizeWindow";

  /**
   * Initializes a new SafariDriver} class with default {@link SafariOptions}.
   */
  public SafariDriver() {
    this(new SafariOptions());
  }

  /**
   * Converts the specified {@link Capabilities} to a {@link SafariOptions}
   * instance and initializes a new SafariDriver using these options.
   * @see SafariOptions#fromCapabilities(Capabilities)
   *
   * @param desiredCapabilities capabilities requested of the driver
   * @deprecated Use {@link SafariDriver(SafariOptions)} instead.
   */
  @Deprecated
  public SafariDriver(Capabilities desiredCapabilities) {
    this(SafariOptions.fromCapabilities(desiredCapabilities));
  }

  /**
   * Initializes a new SafariDriver using the specified {@link SafariOptions}.
   *
   * @param safariOptions safari specific options / capabilities for the driver
   */
  public SafariDriver(SafariOptions safariOptions) {
    super(getExecutor(null, safariOptions), safariOptions);

    if (this.getCommandExecutor() instanceof SafariDriverCommandExecutor) {
      this.setElementConverter(new LegacyJsonToWebElementConverter(this));
    }
  }

  /**
   * Initializes a new SafariDriver using the specified {@link SafariOptions}.
   *
   * @param safariOptions safari specific options / capabilities for the driver
   */
  public SafariDriver(SafariDriverService safariServer, SafariOptions safariOptions) {
      super(getExecutor(safariServer, safariOptions), safariOptions);
  }

  private static CommandExecutor getExecutor(SafariDriverService safariServer, SafariOptions options) {
      if (safariServer == null) {
          safariServer = SafariDriverService.createDefaultService();
      }
      if (isLegacy(options) || safariServer == null) {
          return new SafariDriverCommandExecutor(options);
      }
      return new DriverCommandExecutor(safariServer);
  }

  private static boolean isLegacy(SafariOptions options) {
    return options.getUseLegacyDriver();
  }

  @Override
  public void setFileDetector(FileDetector detector) {
    throw new WebDriverException(
        "Setting the file detector only works on remote webdriver instances obtained " +
        "via RemoteWebDriver");
  }

  @Override
  protected void startSession(Capabilities capabilities) {
      startClient();
      super.startSession(capabilities);
  }

  protected void startClient() {
    CommandExecutor commandExecutor = this.getCommandExecutor();
    if (commandExecutor instanceof SafariDriverCommandExecutor) {
      try {
        ((SafariDriverCommandExecutor)commandExecutor).start();
      } catch (IOException e) {
        throw new WebDriverException(e);
      }
    }
  }

  @Override
  public void quit() {
      super.quit();
      stopClient();
  }

  protected void stopClient() {
    CommandExecutor commandExecutor = this.getCommandExecutor();
    if (commandExecutor instanceof SafariDriverCommandExecutor) {
      ((SafariDriverCommandExecutor)commandExecutor).stop();
    }
  }

  @Override
  public <X> X getScreenshotAs(OutputType<X> target) throws WebDriverException {
    // Get the screenshot as base64.
    String base64 = (String) execute(DriverCommand.SCREENSHOT).getValue();
    // ... and convert it.
    return target.convertFromBase64Png(base64);
  }

  @Override
  public TargetLocator switchTo() {
    if (this.getCommandExecutor() instanceof SafariDriverCommandExecutor) {
      return new LegacyRemoteTargetLocator();
    }

    return super.switchTo();
  }

  @Override
  public Options manage() {
    if (this.getCommandExecutor() instanceof SafariDriverCommandExecutor) {
      return new LegacyRemoteWebDriverOptions();
    }

    return super.manage();
  }


  private final class LegacyRemoteTargetLocator extends RemoteTargetLocator {

    @Override
    public WebDriver window(String windowHandleOrName) {
      execute(DriverCommand.SWITCH_TO_WINDOW, ImmutableMap.of("name", windowHandleOrName));
      return SafariDriver.this;
    }

  }

  private final class LegacyRemoteWebDriverOptions extends RemoteWebDriverOptions {

    @Override
    public Window window() {
      return new LegacyRemoteWindow();
    }

    private final class LegacyRemoteWindow extends RemoteWindow {

      @Override
      public void setSize(Dimension targetSize) {
        execute(SET_WINDOW_SIZE,
            ImmutableMap.of("windowHandle", "current",
                "width", targetSize.width, "height", targetSize.height));
      }

      @Override
      public void setPosition(Point targetPosition) {
        execute(SET_WINDOW_POSITION,
            ImmutableMap.of("windowHandle", "current",
                "x", targetPosition.x, "y", targetPosition.y));
      }

      @SuppressWarnings("unchecked")
      @Override
      public Dimension getSize()
      {
        Response response =  execute(GET_WINDOW_SIZE, ImmutableMap.of("windowHandle", "current"));

        Map<String, Object> rawSize = (Map<String, Object>) response.getValue();
        int width = ((Number) rawSize.get("width")).intValue();
        int height = ((Number) rawSize.get("height")).intValue();

        return new Dimension(width, height);
      }

      @SuppressWarnings("unchecked")
      @Override
      public Point getPosition()
      {
        Response response = execute(GET_WINDOW_POSITION, ImmutableMap.of("windowHandle", "current"));
        Map<String, Object> rawPoint = (Map<String, Object>) response.getValue();

        int x = ((Number) rawPoint.get("x")).intValue();
        int y = ((Number) rawPoint.get("y")).intValue();

        return new Point(x, y);
      }

      @Override
      public void maximize()
      {
        execute(MAXIMIZE_WINDOW, ImmutableMap.of("windowHandle", "current"));
      }

    }

  }

  private final static class LegacyJsonToWebElementConverter extends JsonToWebElementConverter {

    RemoteWebDriver driver;

    public LegacyJsonToWebElementConverter(RemoteWebDriver driver)
    {
      super(driver);
      this.driver = driver;
    }

    // Duplicating code due to visibility level change in parent class (Selenium 3.4.0)
    @Override
    public Object apply(Object result) {
        if (result instanceof Collection<?>) {
          Collection<?> results = (Collection<?>) result;
          return Lists.newArrayList(Iterables.transform(results, this));
        }

        if (result instanceof Map<?, ?>) {
          Map<?, ?> resultAsMap = (Map<?, ?>) result;
          if (resultAsMap.containsKey(Dialect.OSS.getEncodedElementKey())) {
            RemoteWebElement element = newLegacyRemoteWebElement();
            element.setId(String.valueOf(resultAsMap.get(Dialect.OSS.getEncodedElementKey())));
            return element;
          } else if (resultAsMap.containsKey(Dialect.W3C.getEncodedElementKey())) {
            RemoteWebElement element = newLegacyRemoteWebElement();
            element.setId(String.valueOf(resultAsMap.get(Dialect.W3C.getEncodedElementKey())));
            return element;
          } else {
            return Maps.transformValues(resultAsMap, this);
          }
        }

        if (result instanceof Number) {
          if (result instanceof Float || result instanceof Double) {
            return ((Number) result).doubleValue();
          }
          return ((Number) result).longValue();
        }

        return result;
      }

    protected RemoteWebElement newLegacyRemoteWebElement()
    {
      RemoteWebElement toReturn = new LegacyRemoteWebElement();
      toReturn.setParent(driver);
      toReturn.setFileDetector(driver.getFileDetector());
      return toReturn;
    }

  }

  private final static class LegacyRemoteWebElement extends RemoteWebElement {

    @SuppressWarnings("unchecked")
    @Override
    public Point getLocation() {
      Response response = execute(DriverCommand.GET_ELEMENT_LOCATION, ImmutableMap.of("id", id));

      Map<String, Object> rawPoint = (Map<String, Object>) response.getValue();
      int x = ((Number) rawPoint.get("x")).intValue();
      int y = ((Number) rawPoint.get("y")).intValue();
      return new Point(x, y);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Dimension getSize() {
      Response response = execute(DriverCommand.GET_ELEMENT_SIZE, ImmutableMap.of("id", id));

      Map<String, Object> rawSize = (Map<String, Object>) response.getValue();
      int width = ((Number) rawSize.get("width")).intValue();
      int height = ((Number) rawSize.get("height")).intValue();
      return new Dimension(width, height);
    }

  }
}
