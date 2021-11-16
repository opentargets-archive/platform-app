// Configuration Object
var configProfile = {
  primaryColor: '#DD11EE', //'#3489ca',
  helpdeskEmail: 'helpdesk@opentargets.org',
  mainMenuItems: [
    // Documentation
    {
      name: 'Documentation',
      url: 'https://platform-docs.opentargets.org/getting-started',
      external: true,
    },
    // Contact
    {
      name: 'Contact us',
      url: 'mailto:bob@yourdomain.com',
      external: true,
    },
  ],

  // main flag to toggle partner preview on/off
  isPartnerPreview: true,

  // Page specific sections:
  // hide[Page]SectionsIds: hide the specified sections (comma separated ids, no spaecs, e.g. 'bibliography,otProjects')
  // or leave as empty string to show all sections (all public sections, private sections depending on settings)
  //
  // partner[Page]SectionIds: specify the private widget on this page

  // disease page
  hideDiseaseSectionIds: [''],
  partnerDiseaseSectionIds: ['otProjects'],
  // TODO: another option could be to list all the sections of a page:
  // diseaseSections: [
  //   {
  //     id: 'otProjects',
  //     isPrivate: true,
  //   },
  // ],

  // target page
  hideTargetSectionIds: [''],
  partnerTargetSectionIds: [''],

  // drug page
  hideDrugSectionIds: [''],
  partnerDrugSectionIds: [''],

  // evidence page
  hideEvidenceSectionIds: [''],
  partnerEvidenceSectionIds: ['encore', 'otCrispr'],

  // datatypes
  hideDataTypes: [''],
  partnerDataTypes: ['ot_partner'],

  // for datasources we only set those that are private (partner)
  // partnerDataSources: list any private datasource (shown with lock in facets)
  partnerDataSources: ['encore', 'ot_crispr'],

  // partner colour scale
  // default as empty string so it falls back to value in constants.js
  colorRange: [
    '#ebf0ed',
    '#d8e2dc',
    '#c5d4cb',
    '#b2c6ba',
    '#9fb8a9',
    '#8caa97',
    '#799c86',
    '#668e75',
    '#538064',
    '#407253',
  ],
};
