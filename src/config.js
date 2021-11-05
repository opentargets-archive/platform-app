// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor: window.configPrimaryColor ?? '#3489ca',
  helpdeskEmail: window.configHelpdeskEmail ?? 'helpdesk@opentargets.org',

  // Partner preview config options

  // main flag to toggle partner preview on/off
  isPartnerPreview: window.configIsPartnerPreview ?? false,

  // Page specific sections:
  // hide[Page]SectionsIds: hide the specified sections (comma separated ids, no spaecs, e.g. 'bibliography,otProjects')
  // or leave as empty string to show all sections (all public sections, private sections depending on settings)
  //
  // partner[Page]SectionIds: specify the private widget on this page

  // disease page
  hideDiseaseSectionIds: window.configHideDiseaseSectionIds ?? '',
  partnerDiseaseSectionIds:
    window.configPartnerDiseaseSectionIds ?? 'otProjects',

  // target page
  hideTargetSectionIds: window.configHideTargetSectionIds ?? '',
  partnerTargetSectionIds: window.configPartnerTargetSectionIds ?? '',

  // drug page
  hideDrugSectionIds: window.configHideDrugSectionIds ?? '',
  partnerDrugSectionIds: window.configPartnerDrugSectionIds ?? '',

  // evidence page
  hideEvidenceSectionIds: window.configHideEvidenceSectionIds ?? '',
  partnerEvidenceSectionIds:
    window.configPartnerEvidenceSectionIds ?? 'encore,otCrispr',

  // partner colour scale
  // default as empty string so it falls back to value in constants.js
  partnerColorRange: window.configPartnerColorRange ?? '',

  // associations - heatmaps and facets
  // these work in the same way sas the page specific sections.
  // hideDataTypes: list the id of any datatype to be hidden
  // partnerDataTypes: list any private datatypes (shown with lock in facets)
  hideDataTypes: window.configHideDataTypes ?? '',
  partnerDataTypes: window.configPartnerDataTypes ?? 'ot_partner',

  // for datasources we only set those that are private (partner)
  // partnerDataSources: list any private datasource (shown with lock in facets)
  partnerDataSources: window.configPartnerDataSources ?? 'encore,ot_crispr',
};

export default config;
