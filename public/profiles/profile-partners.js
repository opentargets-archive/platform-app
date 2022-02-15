// Configuration Object
var configProfile = {
  /* general items */

  helpdeskEmail: 'helpdesk@opentargets.org',
  // config navbar main menu (hamburger)
  // mainMenuItems: [],
  // homepage logo subtitle (tagline)
  otLogoTagline: 'Partner Preview',

  /* colors */

  primaryColor: '#407253',
  // custom colour scale: override value in constants.js
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

  /* partner preview options */

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

  // target page
  hideTargetSectionIds: [''],
  partnerTargetSectionIds: [''],

  // drug page
  hideDrugSectionIds: [''],
  partnerDrugSectionIds: [''],

  // evidence page
  hideEvidenceSectionIds: [''],
  partnerEvidenceSectionIds: ['encore', 'otCrispr', 'validationlab'],

  // datatypes
  hideDataTypes: [''],
  partnerDataTypes: ['ot_partner', 'ot_validation_lab'],

  // for datasources we only set those that are private (partner)
  // partnerDataSources: list any private datasource (shown with lock in facets)
  partnerDataSources: ['encore', 'ot_crispr', 'ot_crispr_validation'],
};
