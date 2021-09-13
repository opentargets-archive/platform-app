// Configuration Object
const config = {
  urlApi:
    window.injectedEnv.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  urlApiBeta:
    window.injectedEnv.configUrlApiBeta ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.injectedEnv.configGoogleTagManagerID ?? null,
  efoURL:
    window.injectedEnv.configEFOURL ??
    'https://platform.opentargets.org/data/ontology/efo_json/diseases_efo.jsonl',
  primaryColor: window.injectedEnv.configPrimaryColor ?? '#3489ca',
  flagShowOTARProjects: window.injectedEnv.configFlagShowOTARProjects ?? false
};

export const configPedOT = {
  pedOtUrlApi: window.injectedEnv.configUrlApi ?? 'https://ppdc-otp-dev.bento-tools.org/api/v4/graphql'
}


export default config;
