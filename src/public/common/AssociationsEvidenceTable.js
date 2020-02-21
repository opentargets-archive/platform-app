import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

// TODO: currently the dynamic associations api uses
//       different ids, hence the manual mapping here
//       (it would be nice to harmonise this)

// sections
import expressionAtlasSection from '../evidence/sections/DifferentialExpression/Section';
import phenodigmSection from '../evidence/sections/AnimalModels/Section';
import chemblSection from '../evidence/sections/Drugs/Section';
import gwasCatalogSection from '../evidence/sections/GWASCatalog/Section';
import phewasCatalogSection from '../evidence/sections/PheWASCatalog/Section';
import reactomeSection from '../evidence/sections/Reactome/Section';
import slapenrichSection from '../evidence/sections/SLAPenrich/Section';
import progenySection from '../evidence/sections/PROGENy/Section';
import cancerGeneCensusSection from '../evidence/sections/CancerGeneCensus/Section';
import crisprSection from '../evidence/sections/CRISPR/Section';
import evaSection from '../evidence/sections/EVA/Section';
import evaSomaticSection from '../evidence/sections/EVASomatic/Section';
import gene2PhenotypeSection from '../evidence/sections/Gene2Phenotype/Section';
import genomicsEnglandSection from '../evidence/sections/GenomicsEngland/Section';
import sysBioSection from '../evidence/sections/SysBio/Section';
import uniProtSection from '../evidence/sections/UniProt/Section';
import uniProtSomaticSection from '../evidence/sections/UniProtSomatic/Section';
import uniProtLiteratureSection from '../evidence/sections/UniProtLiterature/Section';
import intogenSection from '../evidence/sections/IntOGen/Section';
import textMiningSection from '../evidence/sections/TextMining/Section';

// queries
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
const cancerGeneCensusQuery = loader(
  '../evidence/sections/CancerGeneCensus/sectionQuery.gql'
);
const crisprQuery = loader('../evidence/sections/CRISPR/sectionQuery.gql');
const evaQuery = loader('../evidence/sections/EVA/sectionQuery.gql');
const evaSomaticQuery = loader(
  '../evidence/sections/EVASomatic/sectionQuery.gql'
);
const gene2PhenotypeQuery = loader(
  '../evidence/sections/Gene2Phenotype/sectionQuery.gql'
);
const genomicsEnglandQuery = loader(
  '../evidence/sections/GenomicsEngland/sectionQuery.gql'
);
const sysBioQuery = loader('../evidence/sections/SysBio/sectionQuery.gql');
const uniProtQuery = loader('../evidence/sections/UniProt/sectionQuery.gql');
const uniProtSomaticQuery = loader(
  '../evidence/sections/UniProtSomatic/sectionQuery.gql'
);
const uniProtLiteratureQuery = loader(
  '../evidence/sections/UniProtLiterature/sectionQuery.gql'
);
const intogenQuery = loader('../evidence/sections/IntOGen/sectionQuery.gql');
const textMiningQuery = loader(
  '../evidence/sections/TextMining/sectionQuery.gql'
);

const dataSourceHandlers = {
  ds__cancer_gene_census: {
    query: cancerGeneCensusQuery,
    component: cancerGeneCensusSection,
    accessor: data => data.evidence.details.cancerGeneCensus,
  },
  ds__chembl: {
    query: chemblQuery,
    component: chemblSection,
    accessor: data => data.evidence.details.drugs,
  },
  ds__crispr: {
    query: crisprQuery,
    component: crisprSection,
    accessor: data => data.evidence.details.crispr,
  },
  ds__europepmc: {
    query: textMiningQuery,
    component: textMiningSection,
    accessor: data => data.evidence.details.textMining,
  },
  ds__eva: {
    query: evaQuery,
    component: evaSection,
    accessor: data => data.evidence.details.eva,
  },
  ds__eva_somatic: {
    query: evaSomaticQuery,
    component: evaSomaticSection,
    accessor: data => data.evidence.details.evaSomatic,
  },
  ds__expression_atlas: {
    query: expressionAtlasQuery,
    component: expressionAtlasSection,
    accessor: data => data.evidence.details.differentialExpression,
  },
  ds__gene2phenotype: {
    query: gene2PhenotypeQuery,
    component: gene2PhenotypeSection,
    accessor: data => data.evidence.details.gene2Phenotype,
  },
  ds__genomics_england: {
    query: genomicsEnglandQuery,
    component: genomicsEnglandSection,
    accessor: data => data.evidence.details.genomicsEngland,
  },
  ds__gwas_catalog: {
    query: gwasCatalogQuery,
    component: gwasCatalogSection,
    accessor: data => data.evidence.details.gwasCatalog,
  },
  ds__intogen: {
    query: intogenQuery,
    component: intogenSection,
    accessor: data => data.evidence.details.intogen,
  },
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
  ds__sysbio: {
    query: sysBioQuery,
    component: sysBioSection,
    accessor: data => data.evidence.details.sysBio,
  },
  ds__uniprot: {
    query: uniProtQuery,
    component: uniProtSection,
    accessor: data => data.evidence.details.uniProt,
  },
  ds__uniprot_literature: {
    query: uniProtLiteratureQuery,
    component: uniProtLiteratureSection,
    accessor: data => data.evidence.details.uniProtLiterature,
  },
  ds__uniprot_somatic: {
    query: uniProtSomaticQuery,
    component: uniProtSomaticSection,
    accessor: data => data.evidence.details.uniProtSomatic,
  },
};

const EvidenceHandler = ({ ensgId, efoId, handler }) => {
  const { query, component: EvidenceComponent, accessor } = handler;
  const { loading, error, data } = useQuery(query, {
    variables: { ensgId, efoId },
  });

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <EvidenceComponent ensgId={ensgId} efoId={efoId} data={accessor(data)} />
  );
};

const AssociationsEvidenceTable = ({
  ensgId,
  efoId,
  dataSourceId,
  indirects,
}) => {
  const handler = dataSourceHandlers[dataSourceId];
  if (handler) {
    return <EvidenceHandler ensgId={ensgId} efoId={efoId} handler={handler} />;
  } else {
    return `TODO: Evidence handler for ${dataSourceId} coming soon!`;
  }
};

export default AssociationsEvidenceTable;
