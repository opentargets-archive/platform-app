const tests = {
  'smoke test': browser => {
    console.log(
      'browser name: ' + browser.options.desiredCapabilities.browserName
    );
    return browser
      .url('http://localhost:8000/target/ENSG00000091831')
      .waitForElementVisible('body', 3000)
      .assert.title('ESR1 | Open Targets Platform')
      .end();
  },
};

module.exports = tests;
