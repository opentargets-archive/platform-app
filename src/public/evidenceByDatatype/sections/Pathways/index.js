import { loader } from 'graphql.macro';

export const id = 'pathways';
export const name = 'Pathways and Systems Biology';
export const shortName = 'SB';

const datasources = ['reactome', 'slapenrich', 'progeny', 'crispr', 'sysBio'];

export const getSummaryFromSummaries = (summariesData) =>
  datasources.reduce((acc, d) => {
    acc[d] = summariesData[d];
    return acc;
  }, {});
export const getDetailFromDetails = (detailsData) =>
  datasources.reduce((acc, d) => {
    acc[d] = detailsData[d];
    return acc;
  }, {});

export const hasSummaryData = ({
  reactome,
  slapenrich,
  progeny,
  crispr,
  sysBio,
}) =>
  [
    reactome && reactome.pathwayCount > 0,
    slapenrich && slapenrich.pathwayCount > 0,
    progeny && progeny.pathwayCount > 0,
    crispr && crispr.hasCrispr,
    sysBio && sysBio.hasSysBio,
  ].some((d) => d);

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
