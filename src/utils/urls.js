export function epmcUrl(id) {
  return `https://europepmc.org/article/MED/${id}`;
}

export function otgStudyUrl(id) {
  return `https://genetics.opentargets.org/study/${id}`;
}

export function europePmcLiteratureQuery(ids) {
  const baseUrl = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?&format=json&resultType=core&pageSize=${
    ids.length
  }&query=ext_id:`;

  return encodeURI(baseUrl + ids.join(' OR ext_id:'));
}

export const encodeParams = params => {
  const formBody = [];
  for (let property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const encodedParams = formBody.join('&');
  return encodedParams;
};

export function europePmcSearchPOSTQuery(ids) {
  const baseUrl = 'https://www.ebi.ac.uk/europepmc/webservices/rest/searchPOST';
  const query = ids.join(' OR ext_id:');
  const bodyOptions = {
    resultType: 'core',
    format: 'json',
    pageSize: '1000',
    query: `SRC:MED AND (ext_id:${query})`,
    sort: 'P_PDATE_D desc',
  };
  const formBody = encodeParams(bodyOptions);
  return { baseUrl, formBody };
}

function clinicalTrialsUrl(id) {
  return `https://www.clinicaltrials.gov/ct2/show/${id}`;
}

function fdaUrl(id) {
  return `https://api.fda.gov/drug/label.json?search=set_id:${id}`;
}

function atcUrl(id) {
  return `http://www.whocc.no/atc_ddd_index/?code=${id}`;
}

function dailyMedUrl(id) {
  return `http://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${id}`;
}

export const referenceUrls = {
  ClinicalTrials: clinicalTrialsUrl,
  FDA: fdaUrl,
  ATC: atcUrl,
  DailyMed: dailyMedUrl,
};
