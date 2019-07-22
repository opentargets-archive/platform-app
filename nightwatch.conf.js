const browserstack = require('browserstack-local');
const BUILD_NUMBER = process.env.TRAVIS_JOB_NUMBER || 'local';

let nightwatch_config = {
  src_folders: ['test'],

  selenium: {
    start_process: false,
    host: 'hub-cloud.browserstack.com',
    port: 80,
  },

  common_capabilities: {
    project: 'Test project',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.debug': true,
    'browserstack.local': true,
    'browserstack.networkLogs': true,
    name: 'BrowserStack-[Nightwatch] Parallel Test',
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        build: `Chrome ${BUILD_NUMBER}`,
        browser: 'chrome',
      },
    },
    firefox: {
      desiredCapabilities: {
        build: `FireFox ${BUILD_NUMBER}`,
        browser: 'firefox',
      },
    },
    ie: {
      desiredCapabilities: {
        build: `IE ${BUILD_NUMBER}`,
        browser: 'internet explorer',
      },
    },
    safari: {
      desiredCapabilities: {
        build: `Safari ${BUILD_NUMBER}`,
        browser: 'safari',
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
