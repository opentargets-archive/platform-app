// Configuration Object
export const config = {
  urlApi:
    window.injectedEnv.configUrlApi ??
    'https://moleculartargets-stage.ccdi.cancer.gov/api/v4/graphql',
  urlApiBeta:
    window.injectedEnv.configUrlApiBeta ??
    'https://moleculartargets-stage.ccdi.cancer.gov/api/v4/graphql',
  googleTagManagerID: window.injectedEnv.configGoogleTagManagerID ?? null,
};
