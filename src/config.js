// Configuration Object
const config = {
  urlApi:
    window.configUrlApi ??
    process.env.REACT_APP_configUrlApi ??
    'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  // urlApiBeta:
  //   window.configUrlApiBeta ??
  //   process.env.REACT_APP_configUrlApiBeta ??
  //   'https://api-beta-dot-open-targets-eu-dev.appspot.com/api/v4/graphql',
  googleTagManagerID: window.configGoogleTagManagerID ?? null,
  efoURL:
    window.configEFOURL ??
    'https://storage.googleapis.com/open-targets-data-releases/alpha-rewrite/static/ontology/diseases_efo.jsonl',
  primaryColor:
    window.configPrimaryColor ??
    process.env.REACT_APP_configPrimaryColor ??
    '#3489ca',
  // flagShowOTARProjects:
  //   window.configFlagShowOTARProjects ??
  //   process.env.REACT_APP_configFlagShowOTARProjects ??
  //   false,

  // Partner preview config options

  // main flag to toggle partner preview on/off
  isPartnerPreview:
    window.isPartnerPreview ?? process.env.REACT_APP_isPartnerPreview ?? false,

  // Page specific sections:
  // [page]SectionsIds: show only the specified sections (comma separated ids, no spaecs, e.g. 'bibliography,otProjects')
  // or leave as empty string to show all sections (all public sections, private sections depending on settings)
  //
  // partner[Page]SectionIds: specify the private widget on this page

  // disease page
  diseaseSectionIds:
    window.diseaseSectionIds ?? process.env.REACT_APP_diseaseSectionIds ?? '',

  partnerDiseaseSectionIds:
    window.partnerDiseaseSectionIds ??
    process.env.REACT_APP_partnerDiseaseSectionIds ??
    '',

  // target page
  targetSectionIds:
    window.targetSectionIds ?? process.env.REACT_APP_targetSectionIds ?? '',

  partnerTargetSectionIds:
    window.partnerTargetSectionIds ??
    process.env.REACT_APP_partnerTargetSectionIds ??
    '',

  // drug page
  drugSectionIds:
    window.drugSectionIds ?? process.env.REACT_APP_drugSectionIds ?? '',

  partnerDrugSectionIds:
    window.partnerDrugSectionIds ??
    process.env.REACT_APP_partnerDrugSectionIds ??
    '',

  // evidence page
  evidenceSectionIds:
    window.evidenceSectionIds ?? process.env.REACT_APP_evidenceSectionIds ?? '',

  partnerEvidenceSectionIds:
    window.partnerEvidenceSectionIds ??
    process.env.REACT_APP_partnerEvidenceSectionIds ??
    '',

  // partner colour scale
  partnerColorRange:
    window.partnerColorRange ?? process.env.REACT_APP_partnerColorRange ?? '',
};

export default config;
