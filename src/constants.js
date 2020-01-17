import pkg from '../package.json';

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

// Configuration for the main hamburger menu
export const mainMenuItems = [
  // About
  {
    name: 'Open Targets Platform',
    url: '/about',
    external: false,
  },
  {
    name: 'Open Targets Consortium',
    url: '//www.opentargets.org/',
    external: true,
  },
  // Help
  {
    name: 'Documentation & FAQs',
    url: 'https://docs.targetvalidation.org/',
    external: true,
  },
  {
    name: 'support@targetvalidation.org',
    url:
      'mailto:support@targetvalidation.org?Subject=Target%20Validation%20Platform%20-%20help%20request',
    external: true,
  },
  {
    name: 'Outreach and tutorials',
    url: '/outreach',
    external: false,
  },
  // API
  {
    name: 'API documentation',
    url: 'https://docs.targetvalidation.org/programmatic-access/rest-api',
    external: true,
  },
  {
    name: 'Python client',
    url: 'https://docs.targetvalidation.org/programmatic-access/python-client',
    external: true,
  },
  // Downloads
  {
    name: 'Downloads',
    url: '/downloads',
    external: false,
  },
  // Blog
  {
    name: 'Blog',
    url: '//blog.opentargets.org/',
    external: true,
  },
];
