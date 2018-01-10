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

import static org.openqa.selenium.remote.CapabilityType.BROWSER_NAME;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableSortedMap;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.remote.CapabilityType;

import java.util.Map;
import java.util.TreeMap;

/**
 * Class to manage options specific to {@link SafariDriver}.
 *
 * <p>Example usage:
 * <pre><code>
 * SafariOptions options = new SafariOptions()
 * options.setUseTechnologyPreview(true);
 *
 * // For use with SafariDriver:
 * SafariDriver driver = new SafariDriver(options);
 *
 * // For use with RemoteWebDriver:
 * RemoteWebDriver driver = new RemoteWebDriver(
 *     new URL("http://localhost:4444/wd/hub"),
 *     options);
 * </code></pre>
 */
public class SafariOptions extends MutableCapabilities {

  private static final String SAFARI_TECH_PREVIEW = "Safari Technology Preview";
  private static final long serialVersionUID = -8314872977861934493L;

  /**
   * Key used to store SafariOptions in a {@link Capabilities} object.
   * @deprecated No replacement. Use the methods on this class
   */
  @Deprecated
  public static final String CAPABILITY = "safari.options";

  private interface Option {
    String CLEAN_SESSION = "cleanSession";

    @Deprecated
    String TECHNOLOGY_PREVIEW = "technologyPreview";

    String LEGACY_DRIVER = "legacyDriver";
    String PORT = "port";

    // Defined by Apple
    String AUTOMATIC_INSPECTION  = "safari:automaticInspection";
    String AUTOMATIC_PROFILING = "safari:automaticProfiling";
  }

  private Map<String, Object> options = new TreeMap<>();

  public SafariOptions() {
    setCapability(Option.PORT, 0);

    setUseTechnologyPreview(false);
    setCapability(BROWSER_NAME, "safari");
    setUseCleanSession(false);
    setUseLegacyDriver(false);
  }

  public SafariOptions(Capabilities source) {
    this();

    source.asMap().forEach((key, value)-> {
      if (CAPABILITY.equals(key) && value instanceof Map) {

        @SuppressWarnings("unchecked")
        Map<? extends String, ?> map = (Map<? extends String, ?>) value;
        options.putAll(map);
      } else if (value != null) {
        setCapability(key, value);
      }
    });
  }

  @Override
  public SafariOptions merge(Capabilities extraCapabilities) {
    super.merge(extraCapabilities);
    return this;
  }

  /**
   * Construct a {@link SafariOptions} instance from given capabilites.
   * When the {@link #CAPABILITY} capability is set, all other capabilities will be ignored!
   *
   * @param capabilities Desired capabilities from which the options are derived.
   * @return SafariOptions
   * @throws WebDriverException If an error occurred during the reconstruction of the options
   */
  public static SafariOptions fromCapabilities(Capabilities capabilities)
      throws WebDriverException {
    if (capabilities instanceof SafariOptions) {
      return (SafariOptions) capabilities;
    }
    Object cap = capabilities.getCapability(SafariOptions.CAPABILITY);
    if (cap instanceof SafariOptions) {
      return (SafariOptions) cap;
    } else if (cap instanceof Map) {
      return SafariOptions.fromJsonMap((Map<?, ?>) cap);
    } else {
      return new SafariOptions();
    }
  }

  // Setters

  /**
   * Instruct the SafariDriver to enable the Automatic Inspection if true, otherwise disable
   * the automatic inspection. Defaults to disabling the automatic inspection.
   *
   * @param automaticInspection If true, the SafariDriver will enable the Automation Inspection,
   *                            otherwise will disable.
   */
  public SafariOptions setAutomaticInspection(boolean automaticInspection) {
    setCapability(Option.AUTOMATIC_INSPECTION, automaticInspection);
    return this;
  }

  /**
   * Instruct the SafariDriver to enable the Automatic profiling if true, otherwise disable
   * the automatic profiling. Defaults to disabling the automatic profiling.
   *
   * @param automaticProfiling If true, the SafariDriver will enable the Automation Profiling,
   *                            otherwise will disable.
   */
  public SafariOptions setAutomaticProfiling(boolean automaticProfiling) {
    setCapability(Option.AUTOMATIC_PROFILING, automaticProfiling);
    return this;
  }

  /**
   * Set the port the {@link SafariDriverService} should be started on. Defaults to 0, in which case
   * the server selects a free port.
   *
   * @param port The port the {@link SafariDriverService} should be started on,
   *    or 0 if the server should select a free port.
   * @deprecated Create a {@link SafariDriverService} to specify driver service port and pass
   * the service instance to a {@link SafariDriver} constructor.
   */
  @Deprecated
  SafariOptions setPort(int port) {
    options.put(Option.PORT, port);
    return this;
  }

  /**
   * Instruct the SafariDriver to delete all existing session data when starting a new session.
   * This includes browser history, cache, cookies, HTML5 local storage, and HTML5 databases.
   *
   * <p><strong>Warning:</strong> Since Safari uses a single profile for the
   * current user, enabling this capability will permanently erase any existing
   * session data.
   *
   * @param useCleanSession If true, the SafariDriver will erase all existing session data.
   * @deprecated SafariDriver always runs a clean session
   */
  @Deprecated
  public SafariOptions useCleanSession(boolean useCleanSession) {
    options.put(Option.CLEAN_SESSION, useCleanSession);
    return this;
  }

  /**
   * @deprecated Use {@link #useCleanSession(boolean)} instead
   */
  @Deprecated
  public SafariOptions setUseCleanSession(boolean useCleanSession) {
    return useCleanSession(useCleanSession);
  }


  /**
   * Instruct the SafariDriver to use the Safari Technology Preview if true, otherwise use the
   * release version of Safari. Defaults to using the release version of Safari.
   *
   * @param useTechnologyPreview If true, the SafariDriver will use the Safari Technology Preview,
   *     otherwise will use the release version of Safari.
   */
  public SafariOptions setUseTechnologyPreview(boolean useTechnologyPreview) {
    options.put(Option.TECHNOLOGY_PREVIEW, useTechnologyPreview);
    // Use an object here, rather than a boolean to avoid a stack overflow
    super.setCapability(BROWSER_NAME, useTechnologyPreview ? SAFARI_TECH_PREVIEW : "safari");
    return this;
  }

  /**
   * Capability to force usage of the deprecated SafariDriver extension while running
   * on macOS Sierra.
   *
   * <pre>
   *   SafariOptions safariOptions = new SafariOptions();
   *   safariOptions.setUseLegacyDriver(true);
   *   WebDriver driver = new SafariDriver(safariOptions);
   * </pre>
   *
   * @param useLegacyDriver If true, the legacy SafariDriver Extension will be used.
   */
  public SafariOptions setUseLegacyDriver(boolean useLegacyDriver) {
    options.put(Option.LEGACY_DRIVER, useLegacyDriver);
    return this;
  }

  @Override
  public void setCapability(String key, Object value) {
    if (Option.TECHNOLOGY_PREVIEW.equals(key)) {
      setUseTechnologyPreview(Boolean.valueOf(value.toString()));
    } else if (Option.CLEAN_SESSION.equals(key)) {
        useCleanSession(Boolean.valueOf(value.toString()));
    } else if (Option.LEGACY_DRIVER.equals(key)) {
      setUseLegacyDriver(Boolean.valueOf(value.toString()));
    } else {
      super.setCapability(key, value);
    }
  }

  @Override
  public void setCapability(String key, boolean value) {
    if (Option.TECHNOLOGY_PREVIEW.equals(key)) {
      setUseTechnologyPreview(value);
    } else if (Option.CLEAN_SESSION.equals(key)) {
        useCleanSession(value);
    } else if (Option.LEGACY_DRIVER.equals(key)) {
        setUseLegacyDriver(value);
    } else {
      super.setCapability(key, value);
    }
  }

  public SafariOptions setProxy(Proxy proxy) {
    setCapability(CapabilityType.PROXY, proxy);
    return this;
  }

  // Getters

  public boolean getAutomaticInspection() {
    return Boolean.TRUE.equals(getCapability(Option.AUTOMATIC_INSPECTION));
  }

  public boolean getAutomaticProfiling() {
    return Boolean.TRUE.equals(is(Option.AUTOMATIC_PROFILING));
  }

  public boolean getUseTechnologyPreview() {
    return SAFARI_TECH_PREVIEW.equals(getBrowserName()) ||
           options.get(Option.TECHNOLOGY_PREVIEW) == Boolean.TRUE;
  }

  /**
   * @return The port the {@link SafariDriverService} should be started on.
   *    If 0, the server should select a free port.
   * @see #setPort(int)
   * @deprecated Getters are not needed in browser Options classes.
   */
  @Deprecated
  public int getPort() {
    return ((Number) options.getOrDefault(Option.PORT, 0)).intValue();
  }

  /**
   * @return Whether the SafariDriver should erase all session data before launching Safari.
   * @see #setUseCleanSession(boolean)
   * @deprecated Getters are not needed in browser Options classes.
   */
  @Deprecated
  public boolean getUseCleanSession() {
    return (boolean) options.getOrDefault(Option.CLEAN_SESSION, false);
  }

  /**
   * @return Whether the old SafariDriver extension.
   * @see #setUseLegacyDriver(boolean)
   */
  public boolean getUseLegacyDriver() {
    return (boolean) options.getOrDefault(Option.LEGACY_DRIVER, false);
  }

  // (De)serialization of the options

  /**
   * Parse a Map and reconstruct the {@link SafariOptions}.
   *
   * @return A {@link SafariOptions} instance associated with these extensions.
   */
  private static SafariOptions fromJsonMap(Map<?, ?> options)  {
    SafariOptions safariOptions = new SafariOptions();

    Object useTechnologyPreview = options.get(Option.TECHNOLOGY_PREVIEW);
    if (useTechnologyPreview instanceof Boolean) {
      safariOptions.setUseTechnologyPreview((Boolean) useTechnologyPreview);
    }

    Number port = (Number) options.get(Option.PORT);
    if (port != null) {
      safariOptions.setPort(port.intValue());
    }

    Boolean useCleanSession = (Boolean) options.get(Option.CLEAN_SESSION);
    if (useCleanSession != null) {
      safariOptions.useCleanSession(useCleanSession);
    }

    Boolean useLegacyDriver = (Boolean) options.get(Option.LEGACY_DRIVER);
    if (useLegacyDriver != null) {
      safariOptions.setUseLegacyDriver(useLegacyDriver);
    }

    return safariOptions;
  }

  @Override
  protected int amendHashCode() {
    return options.hashCode();
  }

  @Override
  public Map<String, Object> asMap() {
    return ImmutableSortedMap.<String, Object>naturalOrder()
        .putAll(super.asMap())
        .put(CAPABILITY, options)
        .build();
  }

  @Override
  public boolean equals(Object other) {
    if (!(other instanceof SafariOptions)) {
      return false;
    }
    SafariOptions that = (SafariOptions) other;
    return this.getPort() == that.getPort()
        && this.getUseCleanSession() == that.getUseCleanSession()
        && this.getUseTechnologyPreview() == that.getUseTechnologyPreview()
        && this.getUseLegacyDriver() == that.getUseLegacyDriver();
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(this.getPort(), this.getUseCleanSession(), this.getUseTechnologyPreview(), this.getUseLegacyDriver());
  }
}
