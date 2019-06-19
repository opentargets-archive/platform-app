import pkg from '../package.json';

export const PHASE_MAP = {
  0: 0,
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
};

export const externalLinks = {
  about: [
    {
      label: `Version ${pkg.version} (${
        process.env.REACT_APP_REVISION
          ? process.env.REACT_APP_REVISION
          : '2222ccc'
      })`,
      url: `https://github.com/opentargets/platform-app/commit/${
        process.env.REACT_APP_REVISION
          ? process.env.REACT_APP_REVISION
          : '2222ccc'
      }`,
    },
    {
      label: 'Terms of use',
      url: 'http://www.targetvalidation.org/terms-of-use',
    },
    {
      label: 'Privacy notice',
      url: 'https://www.ebi.ac.uk/data-protection/privacy-notice/open-targets',
    },
  ],
  network: [
    {
      label: 'Overview',
      url: 'https://www.opentargets.org',
    },
    { label: 'Science', url: 'https://www.opentargets.org/science' },
    { label: 'Resources', url: 'https://www.opentargets.org/resources' },
    { label: 'Jobs', url: 'https://www.opentargets.org/jobs' },
    { label: 'Blog', url: 'https://blog.opentargets.org' },
  ],
  partners: [
    { label: 'Biogen', url: 'https://www.biogen.com' },
    { label: 'Celgene', url: 'https://www.celgene.com' },
    {
      label: 'EMBL-EBI',
      url: 'https://www.ebi.ac.uk',
    },
    { label: 'GSK', url: 'https://www.gsk.com' },
    { label: 'Sanofi', url: 'https://www.sanofi.com' },
    { label: 'Takeda', url: 'https://www.takeda.com' },
    {
      label: 'Wellcome Sanger Institute',
      url: 'https://www.sanger.ac.uk',
    },
  ],
  help: [
    {
      label: 'Documentation',
      iconClasses: 'fa fa-question-circle',
      url: 'https://docs.targetvalidation.org',
    },
    {
      label: 'support@targetvalidation.org',
      iconClasses: 'fa fa-envelope',
      url: 'mailto:support@targetvalidation.org',
    },
  ],
  social: [
    {
      iconClasses: 'fab fa-facebook',
      url: 'https://www.facebook.com/OpenTargets',
    },
    {
      iconClasses: 'fab fa-twitter-square',
      url: 'http://twitter.com/targetvalidate',
    },
    {
      iconClasses: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/company/open-targets',
    },
    {
      iconClasses: 'fab fa-youtube-square',
      url: 'https://www.youtube.com/channel/UCLMrondxbT0DIGx5nGOSYOQ',
    },
    { iconClasses: 'fab fa-medium', url: 'https://medium.com/opentargets' },
    {
      iconClasses: 'fab fa-github-square',
      url: 'https://github.com/opentargets',
    },
  ],
};

export const teps = {
  ENSG00000094631: {
    id: 'ENSG00000094631',
    symbol: 'HDAC6',
  },
  ENSG00000120733: {
    id: 'ENSG00000120733',
    symbol: 'KDM3B',
  },
  ENSG00000186280: {
    id: 'ENSG00000186280',
    symbol: 'KDM4D',
  },
  ENSG00000146247: {
    id: 'ENSG00000146247',
    symbol: 'PHIP',
  },
  ENSG00000108469: {
    id: 'ENSG00000108469',
    symbol: 'RECQL5',
  },
  ENSG00000143379: {
    id: 'ENSG00000143379',
    symbol: 'SETDB1',
  },
  ENSG00000167258: {
    id: 'ENSG00000167258',
    symbol: 'CDK12',
  },
  ENSG00000106683: {
    id: 'ENSG00000106683',
    symbol: 'LIMK1',
  },
  ENSG00000198924: {
    id: 'ENSG00000198924',
    symbol: 'DCLRE1A',
  },
  ENSG00000172269: {
    id: 'ENSG00000172269',
    symbol: 'DPAGT1',
  },
  ENSG00000008311: {
    id: 'ENSG00000008311',
    symbol: 'AASS',
  },
  ENSG00000196632: {
    id: 'ENSG00000196632',
    symbol: 'WNK3',
  },
  ENSG00000104312: {
    id: 'ENSG00000104312',
    symbol: 'RIPK2',
  },
  ENSG00000101323: {
    id: 'ENSG00000101323',
    symbol: 'HAO1',
  },
  ENSG00000168143: {
    id: 'ENSG00000168143',
    symbol: 'FAM83B',
  },
  ENSG00000173193: {
    id: 'ENSG00000173193',
    symbol: 'PARP14',
  },
  ENSG00000140876: {
    id: 'ENSG00000140876',
    symbol: 'NUDT7',
  },
  ENSG00000138622: {
    id: 'ENSG00000138622',
    symbol: 'HCN4',
  },
  ENSG00000130382: {
    id: 'ENSG00000130382',
    symbol: 'MLLT1',
  },
};
