import * as d3 from 'd3';

// TODO: datatypes to datasources mapping should come from api
export const dataTypes = [
  {
    name: 'Genetic associations',
    dataSources: [
      'ds__phewas_catalog',
      'ds__gwas_catalog',
      'ds__uniprot',
      'ds__genomics_england',
      'ds__eva',
      'ds__uniprot_literature',
      'ds__gene2phenotype',
    ],
  },
  {
    name: 'Somatic mutations',
    dataSources: [
      'ds__cancer_gene_census',
      'ds__intogen',
      'ds__eva_somatic',
      'ds__uniprot_somatic',
    ],
  },
  { name: 'Drugs', dataSources: ['ds__chembl'] },
  {
    name: 'Pathways and systems biology',
    dataSources: [
      'ds__slapenrich',
      'ds__progeny',
      'ds__reactome',
      'ds__sysbio',
      'ds__crispr',
    ],
  },
  { name: 'RNA expression', dataSources: ['ds__expression_atlas'] },
  { name: 'Text mining', dataSources: ['ds__europepmc'] },
  { name: 'Animal models', dataSources: ['ds__phenodigm'] },
];

export const dataSourcesOrder = dataTypes.reduce((acc, dt) => {
  return acc.concat(dt.dataSources);
}, []);

export const dataTypesColorScale = d3
  .scaleOrdinal(d3.schemeCategory10)
  .domain(dataTypes.map(d => d.name));

// const maxPossibleValue = (Math.PI * Math.PI) / 6;
// const histogramBinCount = 20;
//   const histogramBins = _.range(0, 1, 1 / histogramBinCount);
// const histogramGenerator = d3
//     .histogram()
//     .domain([0, 1])
//     .thresholds(histogramBins);
export const calculateAggregations = ({ dataSources, rows }) => {
  const aggregates = dataSources.reduce((acc, ds) => {
    acc[ds.id] = {};
    return acc;
  }, {});
  dataSources.forEach(ds => {
    const dsRows = rows.map(d => d.dsScores[ds.position]);
    const dsRowsNonZero = dsRows.filter(s => s > 0);
    aggregates[ds.id].coverage = dsRowsNonZero.length / dsRows.length;
    // aggregates[ds.id].histogram = histogramGenerator(
    //   dsRowsNonZero.map(s => s / maxPossibleValue)
    // );
  });
  return aggregates;
};
