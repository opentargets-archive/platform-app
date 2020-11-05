const methods = {
  columnTooltip: {
    description:
      'The current version of the intOGen pipeline uses seven methods to identify cancer driver genes from somatic point mutations - HotMAPS, dNDScv, smRegions, CBaSE, FML, MutPanning, and CLUSTL. The pipeline also uses a combination of methods. For further information on the methods, please click here visit the intOGen FAQ.',
    url: 'https://www.intogen.org/faq',
  },
  hotmaps: {
    id: 'HotMAPS',
    description:
      'Somatic mutations in the gene are significantly clustered according to HotMAPS',
  },
  oncodriveclustl: {
    id: 'ClustL',
    description:
      'Somatic mutations in the gene are significantly clustered according to OncodriveCLUSTL',
  },
  smregions: {
    id: 'smRegions',
    description:
      'Somatic mutations in the gene are significantly clustered according to smRegions',
  },
  cbase: {
    id: 'CBaSE',
    description:
      'Genes more mutated than the background neutral mutation rate according to CBaSE',
  },
  dndscv: {
    id: 'dNdScv',
    description:
      'Genes more mutated than the background neutral mutation rate according to dNdScv',
  },
  oncodrivefml: {
    id: 'FML',
    description:
      'Somatic mutations in the gene show a functional impact bias according to OncodriveFML',
  },
  combination: {
    id: 'combination',
    description: 'The combination reports this gene as significant',
  },
  mutpanning: {
    id: 'MutPanning',
    description:
      'MutPanning is designed to detect rare cancer driver genes from aggregated whole-exome sequencing data',
  },
};

export default methods;
