// Configuration Object
export const config = {
  urlApi:
    window.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  urlApiBeta:
    window.configUrlApiBeta ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  GTMID: window.configGoogleTagManagerID ?? null,
};
