# Molecular Targets Platform

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b52c44fa1c5d479b8e9726a14056a284)](https://app.codacy.com/gh/CBIIT/ppdc-otp-frontend?utm_source=github.com&utm_medium=referral&utm_content=CBIIT/ppdc-otp-frontend&utm_campaign=Badge_Grade_Settings)
[![Netlify Status](https://api.netlify.com/api/v1/badges/58a127ca-67c0-4cc3-b9e3-88dad47cfc7f/deploy-status)](https://app.netlify.com/sites/platform-app/deploys)


The Molecular Targets Platform is a National Cancer Institute (NCI) instance of the [Open Targets Platform](https://www.targetvalidation.org) with a focus on pediatric cancer data. This tool allows users to browse and identify associations between molecular targets, diseases, and drugs. The Molecular Targets Platform builds upon the data and functionality of the Open Targets Platform while also including:

<ul>
  <li>The FDA Pediatric Molecular Target Lists (FDA PMTL)</li>
  <li>Analyses of pediatric oncology datasets from the Open Pediatric Cancer (OpenPedCan) project at the Children's Hospital of Philadelphia:
     <ol>
      <li>Therapeutically Applicable Research to Generate Effective Treatments (TARGET)</li>
      <li>Open Pediatric Brain Tumor Atlas (OpenPBTA)</li>
      <li>Gabriella Miller Kids First (Kids First) Neuroblastoma</li>
    </ol>
  </li>
</ul>

As the project matures, new pediatric cancer data and additional functionality will be added to the Molecular Targets Platform.

## Development environment

To start developing, follow these steps:

1. Install [NodeJS](https://nodejs.org/en/) version 12 or greater and [Yarn](https://classic.yarnpkg.com/en/docs/install) version ^1.22.
2. Install dependencies by running `yarn`.
3. Start the development server by running `yarn start`.