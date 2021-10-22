# Open Targets Platform App

[![Netlify Status](https://api.netlify.com/api/v1/badges/58a127ca-67c0-4cc3-b9e3-88dad47cfc7f/deploy-status)](https://app.netlify.com/sites/platform-app/deploys)

This repository holds the new [Open Targets Platform](https://www.targetvalidation.org) web app.

It is a Single Page Application built on [React](https://reactjs.org/) using [Apollo GraphQL](https://www.apollographql.com/docs/react/v3.0-beta) for the data fetching and management and the [Material-UI](https://material-ui.com/) component collection.

If you are interested in the backend, you can take a look at the [GraphQL Endpoint Browser](https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql/browser) and the [GraphQL Endpoint Schema](https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql/browser).

## Development environment

To start developing, follow these steps:

1. Install [NodeJS](https://nodejs.org/en/) version 12 or greater and [Yarn](https://classic.yarnpkg.com/en/docs/install) version ^1.22.
2. Install dependencies by running `yarn`.
3. Start the development server by running `yarn start`.

## Further documentation

- [Contributing](docs/CONTRIBUTING.md)
- [Creating a new section](docs/sections.md)
- [Table component API](./src/components/Table/README.md)
- [Code of conduct](docs/CODE_OF_CONDUCT.md)
- [Customising the app](docs/CUSTOM_CONFIG.md)

## Special thanks

[<img src="./docs/netlify-logo.svg" alt="BrowserStack" width="325">](https://www.netlify.com/)

[<img src="./docs/browserstack-logo.svg" alt="BrowserStack" width="400">](https://www.browserstack.com/)

[<img src="./docs/thehyve-logo.svg" alt="TheHyve" width="410">](https://www.thehyve.nl/)

## Copyright

Copyright 2014-2018 Biogen, Celgene Corporation, EMBL - European Bioinformatics Institute, GlaxoSmithKline, Takeda Pharmaceutical Company and Wellcome Sanger Institute

This software was developed as part of the Open Targets project. For more information please see: http://www.opentargets.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
