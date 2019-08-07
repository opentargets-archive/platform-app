import React from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';

import expressionAtlasSection from '../evidence/sections/DifferentialExpression/Section';
import phenodigmSection from '../evidence/sections/AnimalModels/Section';
import chemblSection from '../evidence/sections/Drugs/Section';
import gwasCatalogSection from '../evidence/sections/GWASCatalog/Section';
import phewasCatalogSection from '../evidence/sections/PheWASCatalog/Section';
import reactomeSection from '../evidence/sections/Reactome/Section';
import slapenrichSection from '../evidence/sections/SLAPenrich/Section';
import progenySection from '../evidence/sections/PROGENy/Section';

const expressionAtlasQuery = loader(
  '../evidence/sections/DifferentialExpression/sectionQuery.gql'
);
const phenodigmQuery = loader(
  '../evidence/sections/AnimalModels/sectionQuery.gql'
);
const chemblQuery = loader('../evidence/sections/Drugs/sectionQuery.gql');
const gwasCatalogQuery = loader(
  '../evidence/sections/GWASCatalog/sectionQuery.gql'
);
const phewasCatalogQuery = loader(
  '../evidence/sections/PheWASCatalog/sectionQuery.gql'
);
const reactomeQuery = loader('../evidence/sections/Reactome/sectionQuery.gql');
const slapenrichQuery = loader(
  '../evidence/sections/SLAPenrich/sectionQuery.gql'
);
const progenyQuery = loader('../evidence/sections/PROGENy/sectionQuery.gql');

const dataSourceHandlers = {
  ds__cancer_gene_census: null,
  ds__chembl: {
    query: chemblQuery,
    component: chemblSection,
    accessor: data => data.evidence.details.drugs,
  },
  ds__crispr: null,
  ds__europepmc: null,
  ds__eva: null,
  ds__eva_somatic: null,
  ds__expression_atlas: {
    query: expressionAtlasQuery,
    component: expressionAtlasSection,
    accessor: data => data.evidence.details.differentialExpression,
  },
  ds__gene2phenotype: null,
  ds__genomics_england: null,
  ds__gwas_catalog: {
    query: gwasCatalogQuery,
    component: gwasCatalogSection,
    accessor: data => data.evidence.details.gwasCatalog,
  },
  ds__intogen: null,
  ds__phenodigm: {
    query: phenodigmQuery,
    component: phenodigmSection,
    accessor: data => data.evidence.details.animalModels,
  },
  ds__phewas_catalog: {
    query: phewasCatalogQuery,
    component: phewasCatalogSection,
    accessor: data => data.evidence.details.phewasCatalog,
  },
  ds__progeny: {
    query: progenyQuery,
    component: progenySection,
    accessor: data => data.evidence.details.progeny,
  },
  ds__reactome: {
    query: reactomeQuery,
    component: reactomeSection,
    accessor: data => data.evidence.details.reactome,
  },
  ds__slapenrich: {
    query: slapenrichQuery,
    component: slapenrichSection,
    accessor: data => data.evidence.details.slapenrich,
  },
  ds__sysbio: null,
  ds__uniprot: null,
  ds__uniprot_literature: null,
  ds__uniprot_somatic: null,
};

const AssociationsEvidenceTable = ({
  ensgId,
  efoId,
  dataSourceId,
  indirects,
}) => {
  const handler = dataSourceHandlers[dataSourceId];
  if (handler) {
    const { query, component: EvidenceComponent, accessor } = handler;
    return (
      <Query query={query} variables={{ ensgId, efoId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return `Error: ${error.message}`;
          }
          return (
            <EvidenceComponent
              ensgId={ensgId}
              efoId={efoId}
              data={accessor(data)}
            />
          );
        }}
      </Query>
    );
  } else {
    return `TODO: Evidence handler for ${dataSourceId} coming soon!`;
  }
};

export default AssociationsEvidenceTable;
