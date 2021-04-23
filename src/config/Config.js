// Configuration Object
export const config = {
  urlApi:
    // eslint-disable-next-line
    typeof configUrlApi !== 'undefined'
      ? // eslint-disable-next-line
        configUrlApi
      : 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',

  urlApiBeta:
    // eslint-disable-next-line
    typeof configUrlApiBeta !== 'undefined'
      ? // eslint-disable-next-line
        configUrlApiBeta
      : 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
};
