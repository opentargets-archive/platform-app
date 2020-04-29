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
      label: 'Github codebase',
      url: 'https://github.com/opentargets/platform-app',
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
    { label: 'Jobs', url: 'https://www.opentargets.org/jobs' },
    { label: 'Blog', url: 'https://blog.opentargets.org' },
  ],
  partners: [
    { label: 'Bristol Myers Squibb', url: 'https://www.bms.com' },
    { label: 'EMBL-EBI', url: 'https://www.ebi.ac.uk' },
    { label: 'GSK', url: 'https://www.gsk.com' },
    { label: 'Sanofi', url: 'https://www.sanofi.com' },
    { label: 'Takeda', url: 'https://www.takeda.com' },
    { label: 'Wellcome Sanger Institute', url: 'https://www.sanger.ac.uk' },
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

export const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 15.782983970406905,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.6793206793206793,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
