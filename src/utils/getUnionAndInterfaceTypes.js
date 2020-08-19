// For the reason for the existence of this script, you can find more info here:
// https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces

const fetch = require('node-fetch');
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
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );

    result.data.__schema.types = filteredData;
    fs.writeFile('../fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.log('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted');
      }
    });
  });
