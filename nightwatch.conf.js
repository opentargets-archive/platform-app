const BUILD_NUMBER = process.env.TRAVIS_JOB_NUMBER || 'local';

let nightwatch_config = {
  src_folders: ['test'],

  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
  },

  globals: {
    retryAssertionTimeout: 10000,
  },

  common_capabilities: {
    project: 'platform-app tests',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.debug': true,
    'browserstack.local': true,
    'browserstack.networkLogs': true,
    name: 'BrowserStack-[Nightwatch] cross-browser parallel test',
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        build: `Chrome ${BUILD_NUMBER}`,
        browser: 'chrome',
        browser_version: '75.0',
        os: 'OS X',
        os_version: 'Mojave',
      },
    },
    firefox: {
      desiredCapabilities: {
        build: `FireFox ${BUILD_NUMBER}`,
        browser: 'firefox',
        browser_version: '68.0',
        os: 'OS X',
        os_version: 'Mojave',
      },
    },
    ie: {
      desiredCapabilities: {
        build: `IE ${BUILD_NUMBER}`,
        browser: 'IE',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '7',
      },
    },
    safari: {
      desiredCapabilities: {
        build: `Safari ${BUILD_NUMBER}`,
        browser: 'safari',
        browser_version: '12.1',
        os: 'OS X',
        os_version: 'Mojave',
      },
    },
  },
};

// code to copy seleniumhost/port into test settings
for (let i in nightwatch_config.test_settings) {
  const config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};

  // add common capabilities
  for (let j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] =
      config['desiredCapabilities'][j] ||
      nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
