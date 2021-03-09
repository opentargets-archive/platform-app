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
