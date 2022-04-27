// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api.platform.dev.opentargets.xyz/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://platform.dev.opentargets.xyz/data/ontology/efo_json/diseases_efo.jsonl',

  profile: window.configProfile ?? {},
};

export default config;
