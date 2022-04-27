// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api.platform.dev.opentargets.xyz/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  profile: window.configProfile ?? {},
  downloadsURL: window.configDownloadsURL ?? '/data/downloads.json',
};

export default config;
