# Extending and customising the platform app

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

```js
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

## Customisation

To customise the platform app:

- Clone this repository.
- Create a directory somewhere outside this repository where you will put your customisation files.
- Add an environment variable called `$CUSTOMISATIONS_DIR` that points to the directory created in the step above.
- Inside your customisation directory you can overwrite or add new files following the same directory structure as `src/public`.
- When developing new customisations, you can use the `yarn start:customise` script inside this repository to see your customisations reflected
  in the app while developing. When done developing customisations, run the `yarn reset` command.
- For production, you can produce a build containing the customisations by running the `yarn build:customise` script. This will create a `build`
  directory that you can deploy.
