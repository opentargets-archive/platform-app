// Configuration Object
export const config = {
    // eslint-disable-next-line
    urlAppolloClient : typeof configUrlAppolloClient !== 'undefined' ? configUrlAppolloClient : 'https://platform-api-beta.opentargets.io/api/v4/graphql',
    // eslint-disable-next-line
    urlAppolloClientBeta : typeof configUrlAppolloClientBeta  !== 'undefined' ? configUrlAppolloClientBeta : 'https://platform-api-beta.opentargets.io/api/v4/graphql'
};
