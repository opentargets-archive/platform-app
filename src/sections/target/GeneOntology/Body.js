import React from 'react';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';
import DataTable from '../../../components/Table/DataTable';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import { epmcUrl } from '../../../utils/urls';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';

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
        {source}
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

const EvidenceTooltip = () => (
  <div>
    GO annotations include an evidence code that indicates how the annotation to
    a particular term is supported. Evidence codes fall into six general
    categories:
    <ul>
      <li>
        Experimental evidence (EXP, IDA, IPI, IMP, IGI, IEP, HTP, HDA, HMP, HGI,
        HEP)
      </li>
      <li>Phylogenetic evidence (IBA, IBD, IKR, IRD)</li>
      <li>Computational evidence (ISS, ISO, ISA, ISM, IGC, RCA)</li>
      <li>Author statements (TAS, NAS)</li>
      <li>Curatorial statements (IC, ND)</li>
      <li> Curatorial statements (IC, ND)</li>
      <li>Automatically generated annotations (IEA)</li>
    </ul>
    For more information, please visit
    http://geneontology.org/docs/guide-go-evidence-codes/˝
  </div>
);

const columns = [
  {
    id: 'category',
    label: 'Category',
    renderCell: row => row.category.label,
    exportLabel: 'Category',
  },
  {
    id: 'goTerm',
    label: 'GO term',
    renderCell: row => (
      <Link external to={`https://identifiers.org/${row.term.id}`}>
        {row.term.name}
      </Link>
    ),
    exportLabel: 'GO term',
    exportValue: row => row.term.name,
  },
  {
    id: 'geneProduct',
    label: 'Gene product',
    renderCell: row => (
      <Link
        external
        to={`https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=${
          row.geneProduct
        }&goId=${row.term.id}`}
      >
        {row.geneProduct}
      </Link>
    ),
    exportLabel: 'GO term',
    exportValue: row => row.term.name,
  },
  {
    id: 'evidenceCode',
    label: 'Evidence code',
    exportLabel: 'Evidence code',
    exportValue: row => row.evidence,
    renderCell: row => (
      <Tooltip title={<EvidenceTooltip />} showHelpIcon>
        {row.evidence}
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
      renderBody={data => {
        const rows = data.geneOntology.map(extractCategory);
        return (
          <DataTable
            showGlobalFilter
            columns={columns}
            dataDownloader
            rows={rows}
            noWrap={false}
          />
        );
      }}
    />
  );
}

export default Section;
