import React from 'react';
import Description from './Description';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import SectionItem from '../../../components/Section/SectionItem';
import DataTable from '../../../components/Table/DataTable';
import Link from '../../../components/Link';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { epmcUrl } from '../../../utils/urls';
import { defaultRowsPerPageOptions } from '../../../constants';
import { sortBy, filter } from 'lodash';
import GeneOntologyEvidenceCodeMap from './GeneOntologyEvidenceCodeMappings.json';

const CATEGORY_BY_PREFIX = {
  F: { code: 'MOLECULAR_FUNCTION', label: 'Molecular Function' },
  P: { code: 'BIOLOGICAL_PROCESS', label: 'Biological Process' },
  C: { code: 'CELLULAR_COMPONENT', label: 'Cellular Component' },
};

const extractCategory = row => ({
  ...row,
  category: CATEGORY_BY_PREFIX[row.aspect],
});

const sourceURLS = {
  Reactome: id => `https://identifiers.org/reactome:${id}`,
  DOI: id => `https://doi.org/${id}}`,
  GO_REF: id => `https://identifiers.org/${id}}`,
};

const sourceMapContent = source => {
  const sourceName = source.slice(0, source.indexOf(':'));
  const sourceId = source.slice(source.indexOf(':') + 1);
  if (sourceName !== 'PMID')
    return (
      <Link external to={sourceURLS[sourceName](sourceId)}>
        {sourceName}
      </Link>
    );

  if (sourceName === 'PMID')
    return (
      <PublicationsDrawer
        entries={[
          {
            name: sourceId,
            url: epmcUrl(sourceId),
            group: 'literature',
          },
        ]}
      />
    );
};

const EvidenceTooltip = ({ evidence }) => {
  const code = filter(GeneOntologyEvidenceCodeMap, {
    evidenceCode: evidence,
  })[0];
  return (
    <div>
      <p>
        <b>Label: </b>
        <span>{code.evidenceLabel}</span>
      </p>
      <p>
        <b>Category: </b>
        {code.evidenceCategory}
      </p>
      <p>
        <b>Source: </b>
        <Link external to={code.evidenceSourceUrl}>
          Gene Ontology wiki
        </Link>
      </p>
    </div>
  );
};

const columns = [
  {
    id: 'category',
    label: 'Category',
    renderCell: ({ category }) => category.label,
    filterValue: ({ category }) => category.label,
    exportLabel: 'Category',
    propertyPath: 'category.label',
  },
  {
    id: 'goTerm',
    label: 'GO term',
    renderCell: ({ term }) => (
      <Link external to={`https://identifiers.org/${term.id}`}>
        {term.name}
      </Link>
    ),
    exportLabel: 'GO term',
    exportValue: ({ term }) => term.name,
    filterValue: ({ term }) => term.name,
  },
  {
    id: 'geneProduct',
    label: 'Gene product',
    renderCell: ({ geneProduct, term }) => (
      <Link
        external
        to={`https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=${geneProduct}&goId=${
          term.id
        }`}
      >
        {geneProduct}
      </Link>
    ),
    exportLabel: 'GO term',
    exportValue: ({ term }) => term.name,
  },
  {
    id: 'evidence',
    label: 'Evidence code',
    exportLabel: 'Evidence code',
    exportValue: row => row.evidence,
    renderCell: ({ evidence }) => (
      <Tooltip title={<EvidenceTooltip evidence={evidence} />} showHelpIcon>
        {evidence}
      </Tooltip>
    ),
  },
  {
    id: 'source',
    label: 'Source',
    exportLabel: 'Source',
    exportValue: row => row.source,
    renderCell: ({ source }) => {
      return sourceMapContent(source);
    },
  },
];

function Section({ definition, label: symbol }) {
  const request = usePlatformApi(Summary.fragments.GeneOntologySummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ geneOntology }) => {
        const rows = sortBy(
          geneOntology.map(extractCategory),
          'category.label'
        );
        return (
          <DataTable
            showGlobalFilter
            dataDownloader
            columns={columns}
            rows={rows}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Section;
