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
