// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    process.env.REACT_APP_configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor:
    window.configPrimaryColor ??
    process.env.REACT_APP_configPrimaryColor ??
    '#3489ca',
  helpdeskEmail: window.configHelpdeskEmail ?? 'helpdesk@opentargets.org',

  // Partner preview config options

  // main flag to toggle partner preview on/off
  isPartnerPreview:
    window.configIsPartnerPreview ??
    process.env.REACT_APP_configIsPartnerPreview ??
    false,

  // Page specific sections:
  // hide[Page]SectionsIds: hide the specified sections (comma separated ids, no spaecs, e.g. 'bibliography,otProjects')
  // or leave as empty string to show all sections (all public sections, private sections depending on settings)
  //
  // partner[Page]SectionIds: specify the private widget on this page

  // disease page
  hideDiseaseSectionIds:
    window.configHideDiseaseSectionIds ??
    process.env.REACT_APP_configHideDiseaseSectionIds ??
    '',

  partnerDiseaseSectionIds:
    window.configPartnerDiseaseSectionIds ??
    process.env.REACT_APP_configPartnerDiseaseSectionIds ??
    '',

  // target page
  hideTargetSectionIds:
    window.configHideTargetSectionIds ??
    process.env.REACT_APP_configHideTargetSectionIds ??
    '',

  partnerTargetSectionIds:
    window.configPartnerTargetSectionIds ??
    process.env.REACT_APP_configPartnerTargetSectionIds ??
    '',

  // drug page
  hideDrugSectionIds:
    window.configHideDrugSectionIds ??
    process.env.REACT_APP_configHideDrugSectionIds ??
    '',

  partnerDrugSectionIds:
    window.configPartnerDrugSectionIds ??
    process.env.REACT_APP_configPartnerDrugSectionIds ??
    '',

  // evidence page
  hideEvidenceSectionIds:
    window.configHideEvidenceSectionIds ??
    process.env.REACT_APP_configHideEvidenceSectionIds ??
    '',

  partnerEvidenceSectionIds:
    window.configPartnerEvidenceSectionIds ??
    process.env.REACT_APP_configPartnerEvidenceSectionIds ??
    '',

  // partner colour scale
  // default as empty string so it falls back to value in constants.js
  partnerColorRange:
    window.configPartnerColorRange ??
    process.env.REACT_APP_configPartnerColorRange ??
    '',

  // associations - heatmaps and facets
  // these work in the same way as the page specific sections.
  // hideDataTypes: list the id of any datatype to be hidden
  // partnerDataTypes: list any private datatypes (shown with lock in facets)
  hideDataTypes:
    window.configHideDataTypes ??
    process.env.REACT_APP_configHideDataTypes ??
    '',
  partnerDataTypes:
    window.configPartnerDataTypes ??
    process.env.REACT_APP_configPartnerDataTypes ??
    '',

  // for datasources we only set those that are private (partner)
  // partnerDataSources: list any private datasource (shown with lock in facets)
  partnerDataSources:
    window.configPartnerDataSources ??
    process.env.REACT_APP_configPartnerDataSources ??
    '',
};

export default config;
