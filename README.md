# Open Targets Platform App

Experimental React app to update technological stack of [Open Targets Platform](www.targetvalidation.org).

## Section structure

The target profile tab of the target page is broken up into sections. Each of these sections is encapsulated in one directory. To add a new one, try to follow the following layout guide:

```
target/
 sections/
   ...
   <section-id>/
     custom/
       ... // it may help to put any other components you create here,
           // to keep them separate from the template/expected ones below
     Description.js
     index.js
     Section.js
     sectionQuery.gql [OPTIONAL]
     Summary.js
     summaryQuery.gql [OPTIONAL]

```

The `index.js` file should have a structure as follows:

```
// helps to load graphql files
import { loader } from 'graphql.macro';

// the name of your new section
export const id = '<section-id>';
// the nice name you want for your new section
export const name = '<section-name>';

// a function of the response of summaryQuery, to determine whether there is data for this target (and therefore whether to load the detail or not)
export const hasSummaryData = <function>;

// (optional) queries against platform-api, the new graphql api
export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

// react components to render the data:
// typically a string, above the main content section, but could have links
export { default as DescriptionComponent } from './Description';
// typically a string, in the summary widget, but could be more complex
export { default as SummaryComponent } from './Summary';
// the main content section
export { default as SectionComponent } from './Section';

```

The same structure is followed on the disease and drug pages. Any components that you want to reuse can be placed in the `common` directory.

# Special Thanks

BrowserStack has allowed us to do cross-browser testing of the platform app at no cost.

<img src="./tools-icons/Browserstack-logo.svg" alt="BrowserStack" width="400">

# Copyright

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
