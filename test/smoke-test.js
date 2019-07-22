const tests = {
  'smoke test: gene-page': browser => {
    return browser
      .url('http://localhost:8000/target/ENSG00000091831')
      .waitForElementVisible('body', 3000)
      .assert.title('ESR1 | Open Targets Platform')
      .end();
  },
  'smoke test: disease-page': browser => {
    return browser
      .url('http://localhost:8000/disease/EFO_0003767')
      .waitForElementVisible('body', 3000)
      .assert.title('inflammatory bowel disease | Open Targets Platform')
      .end();
  },
  'smoke test: drug-page': browser => {
    return browser
      .url('http://localhost:8000/drug/CHEMBL1201834')
      .waitForElementVisible('body', 3000)
      .assert.title('CANAKINUMAB | Open Targets Platform')
      .end();
  },
  'smoke test: evidence-page': browser => {
    return browser
      .url('http://localhost:8000/evidence/ENSG00000091831/EFO_0000305')
      .waitForElementVisible('body', 3000)
      .assert.title(
        'Evidence for ESR1 in breast carcinoma | Open Targets Platform'
      )
      .end();
  },
};

module.exports = tests;
