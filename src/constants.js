import pkg from '../package.json';

export const externalLinks = {
  about: [
    {
      label: `Version ${pkg.version} (${
        process.env.REACT_APP_REVISION
          ? process.env.REACT_APP_REVISION
          : '2222ccc'
      })`,
      url: `https://github.com/opentargets/genetics-app/commit/${
        process.env.REACT_APP_REVISION
          ? process.env.REACT_APP_REVISION
          : '2222ccc'
      }`,
    },
    {
      label: 'Github codebase',
      url: 'https://github.com/opentargets/genetics-app',
    },
    {
      label: 'Privacy notice',
      url: 'https://www.ebi.ac.uk/data-protection/privacy-notice/open-targets',
    },
    {
      label: 'Terms of use',
      url: 'http://www.targetvalidation.org/terms-of-use',
    },
  ],
  network: [
    {
      label: 'Overview',
      url: 'https://www.opentargets.org',
    },
    { label: 'Science', url: 'https://www.opentargets.org/science' },
    { label: 'Resources', url: 'https://www.opentargets.org/resources' },
    { label: 'Blog', url: 'https://blog.opentargets.org' },
  ],
  partners: [
    { label: 'Biogen', url: 'https://www.biogen.com' },
    { label: 'Celgene', url: 'http://www.celgene.com' },
    { label: 'EMBL-EBI', url: 'http://www.ebi.ac.uk' },
    { label: 'GSK', url: 'http://www.gsk.com' },
    { label: 'Takeda', url: 'https://www.takeda.com' },
    {
      label: 'Wellcome Sanger Institute',
      url: 'http://www.sanger.ac.uk',
    },
  ],
  help: [
    {
      label: 'Documentation',
      url: 'https://genetics-docs.opentargets.org',
    },
    {
      label: 'Email us',
      url: 'mailto:geneticsportal@opentargets.org',
    },
  ],
  social: [
    {
      classes: 'fab fa-facebook',
      url: 'https://www.facebook.com/OpenTargets',
    },
    {
      classes: 'fab fa-twitter-square',
      url: 'http://twitter.com/targetvalidate',
    },
    {
      classes: 'fab fa-linkedin',
      url:
        'https://www.linkedin.com/company/centre-for-therapeutic-target-validation',
    },
    {
      classes: 'fab fa-youtube-square',
      url: 'https://www.youtube.com/channel/UCLMrondxbT0DIGx5nGOSYOQ',
    },
    { classes: 'fab fa-medium', url: 'https://medium.com/opentargets' },
    {
      classes: 'fab fa-github-square',
      url: 'https://github.com/opentargets',
    },
  ],
};
