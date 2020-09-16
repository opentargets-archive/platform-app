import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

// TODO: currently the dynamic associations api uses
//       different ids, hence the manual mapping here
//       (it would be nice to harmonise this)

// sections
import expressionAtlasSection from '../../sections/evidence/DifferentialExpression/Section';
import phenodigmSection from '../../sections/evidence/AnimalModels/Section';
import chemblSection from '../../sections/evidence/Drugs/Section';
import gwasCatalogSection from '../../sections/evidence/GWASCatalog/Section';
import phewasCatalogSection from '../../sections/evidence/PheWASCatalog/Section';
import reactomeSection from '../../sections/evidence/Reactome/Section';
import slapenrichSection from '../../sections/evidence/SLAPenrich/Section';
import progenySection from '../../sections/evidence/PROGENy/Section';
import cancerGeneCensusSection from '../../sections/evidence/CancerGeneCensus/Section';
import crisprSection from '../../sections/evidence/CRISPR/Section';
import evaSection from '../../sections/evidence/EVA/Section';
import evaSomaticSection from '../../sections/evidence/EVASomatic/Section';
import gene2PhenotypeSection from '../../sections/evidence/Gene2Phenotype/Section';
import genomicsEnglandSection from '../../sections/evidence/GenomicsEngland/Section';
import sysBioSection from '../../sections/evidence/SysBio/Section';
import uniProtSection from '../../sections/evidence/UniProt/Section';
import uniProtSomaticSection from '../../sections/evidence/UniProtSomatic/Section';
import uniProtLiteratureSection from '../../sections/evidence/UniProtLiterature/Section';
import intogenSection from '../../sections/evidence/IntOGen/Section';
import textMiningSection from '../../sections/evidence/TextMining/Section';

// queries
const expressionAtlasQuery = loader(
  '../../sections/evidence/DifferentialExpression/sectionQuery.gql'
);
const phenodigmQuery = loader(
  '../../sections/evidence/AnimalModels/sectionQuery.gql'
);
const chemblQuery = loader('../../sections/evidence/Drugs/sectionQuery.gql');
const gwasCatalogQuery = loader(
  '../../sections/evidence/GWASCatalog/sectionQuery.gql'
);
const phewasCatalogQuery = loader(
  '../../sections/evidence/PheWASCatalog/sectionQuery.gql'
);
const reactomeQuery = loader(
  '../../sections/evidence/Reactome/sectionQuery.gql'
);
const slapenrichQuery = loader(
  '../../sections/evidence/SLAPenrich/sectionQuery.gql'
);
const progenyQuery = loader('../../sections/evidence/PROGENy/sectionQuery.gql');
const cancerGeneCensusQuery = loader(
  '../../sections/evidence/CancerGeneCensus/sectionQuery.gql'
);
const crisprQuery = loader('../../sections/evidence/CRISPR/sectionQuery.gql');
const evaQuery = loader('../../sections/evidence/EVA/sectionQuery.gql');
const evaSomaticQuery = loader(
  '../../sections/evidence/EVASomatic/sectionQuery.gql'
);
const gene2PhenotypeQuery = loader(
  '../../sections/evidence/Gene2Phenotype/sectionQuery.gql'
);
const genomicsEnglandQuery = loader(
  '../../sections/evidence/GenomicsEngland/sectionQuery.gql'
);
const sysBioQuery = loader('../../sections/evidence/SysBio/sectionQuery.gql');
const uniProtQuery = loader('../../sections/evidence/UniProt/sectionQuery.gql');
const uniProtSomaticQuery = loader(
  '../../sections/evidence/UniProtSomatic/sectionQuery.gql'
);
const uniProtLiteratureQuery = loader(
  '../../sections/evidence/UniProtLiterature/sectionQuery.gql'
);
const intogenQuery = loader('../../sections/evidence/IntOGen/sectionQuery.gql');
const textMiningQuery = loader(
  '../../sections/evidence/TextMining/sectionQuery.gql'
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
