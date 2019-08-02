import React from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';

import expressionAtlasSection from '../evidence/sections/DifferentialExpression/Section';
import phenodigmSection from '../evidence/sections/AnimalModels/Section';
import chemblSection from '../evidence/sections/Drugs/Section';

const expressionAtlasQuery = loader(
  '../evidence/sections/DifferentialExpression/sectionQuery.gql'
);
const phenodigmQuery = loader(
  '../evidence/sections/AnimalModels/sectionQuery.gql'
);
const chemblQuery = loader('../evidence/sections/Drugs/sectionQuery.gql');

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
  ds__gwas_catalog: null,
  ds__intogen: null,
  ds__phenodigm: {
    query: phenodigmQuery,
    component: phenodigmSection,
    accessor: data => data.evidence.details.animalModels,
  },
  ds__phewas_catalog: null,
  ds__progeny: null,
  ds__reactome: null,
  ds__slapenrich: null,
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
