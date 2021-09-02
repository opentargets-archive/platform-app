// For the reason for the existence of this script, you can find more info here:
// https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically
const fetch = require('cross-fetch');
const fs = require('fs');

const API_HOST = 'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4';

fetch(`${API_HOST}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    const possibleTypes = {};

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          subtype => subtype.name
        );
      }
    });

    fs.writeFile('./possibleTypes.json', JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
