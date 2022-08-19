import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import Description from './Description';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';

const PHENOTYPES_BODY_QUERY = loader('./PhenotypesQuery.gql');

const evidenceTypeDescription = {
  IEA:
    'Inferred from Electronic Annotations (IEA) are extracted by parsing the Clinical Features sections of the Online Mendelian Inheritance in Man resource',
  PCS:
    'Published Clinical Study (PCS) are annotations extracted from articles in the medical literature with the PubMed ID of the published study (if available)',
  TAS:
    'Traceable Author Statement (TAS) is used for information gleaned from knowledge bases such as OMIM or Orphanet that have derived the information from a published source',
};

const aspectDescription = {
  P: 'Phenotypic abnormality',
  I: 'Inheritance',
  C: 'Onset and clinical course',
  M: 'Clinical modifier',
};

const columns = [
  {
    id: 'qualifierNot',
    label: 'Qualifier',
    exportLabel: 'qualifierNot',
    renderCell: ({ evidence }) => (evidence.qualifierNot ? 'NOT' : ''),
    filterValue: ({ evidence }) => (evidence.qualifierNot ? 'NOT' : ''),
    exportValue: ({ evidence }) => (evidence.qualifierNot ? 'NOT' : ''),
    // width: '7%',
  },
  {
    id: 'phenotypeHPO',
    label: 'Phenotype',
    renderCell: ({ phenotypeEFO, phenotypeHPO }) => {
      const content = phenotypeEFO?.id ? (
        <Link to={`/disease/${phenotypeEFO.id}`}>{phenotypeHPO.name}</Link>
      ) : (
        <>{phenotypeHPO.name || naLabel}</>
      );
      return phenotypeHPO.description ? (
        <Tooltip
          title={`Description: ${phenotypeHPO.description}`}
          showHelpIcon
        >
          {content}
        </Tooltip>
      ) : (
        <>{content}</>
      );
    },
    filterValue: row => row.phenotypeHPO.name,
    exportValue: row => row.phenotypeHPO.name,
    // width: '9%',
  },
  {
    id: 'phenotypeHDOid',
    label: 'Phenotype ID',
    renderCell: ({ phenotypeHPO }) => {
      const id = phenotypeHPO.id.replace('_', ':');
      return (
        <Link external to={`https://identifiers.org/ols/${id}`}>
          {id}
        </Link>
      );
    },
    filterValue: row => row.phenotypeHPO.id.replace('_', ':'),
    exportValue: row => row.phenotypeHPO.id.replace('_', ':'),
    // width: '9%',
  },
  {
    id: 'aspect',
    label: 'Aspect',
    renderCell: ({ evidence }) =>
      evidence.aspect ? (
        <Tooltip
          title={`Sub-ontology: ${evidence.aspect} (${
            aspectDescription[evidence.aspect]
          })`}
          showHelpIcon
        >
          {evidence.aspect}
        </Tooltip>
      ) : (
        naLabel
      ),
    filterValue: row => row.evidence.aspect,
    exportValue: row => row.evidence.aspect,
    // width: '7%',
  },
  {
    id: 'frequency',
    label: 'Frequency',
    renderCell: ({ evidence }) =>
      evidence.frequencyHPO ? (
        evidence.frequencyHPO.id ? (
          <Link
            external
            to={`https://identifiers.org/ols/${evidence.frequencyHPO.id.replace(
              '_',
              ':'
            )}`}
          >
            {evidence.frequencyHPO.name}
          </Link>
        ) : (
          evidence.frequencyHPO.name
        )
      ) : (
        naLabel
      ),
    filterValue: row => row.evidence.frequencyHPO?.name || naLabel,
    exportValue: row => row.evidence.frequencyHPO?.name || naLabel,
    // width: '9%',
  },
  {
    id: 'onset',
    label: 'Onset',
    renderCell: ({ evidence }) =>
      evidence.onset?.length > 0
        ? evidence.onset.map((o, i) => (
            <span key={i}>
              <Link
                external
                to={`https://identifiers.org/ols/${o.id.replace('_', ':')}`}
              >
                {o.name}
              </Link>
              <br />
            </span>
          ))
        : naLabel,
    filterValue: row => row.evidence.onset?.map(o => o.name).join() || naLabel,
    exportValue: row => row.evidence.onset?.map(o => o.name).join() || naLabel,
    // width: '9%',
  },
  {
    id: 'modifier',
    label: 'Modifier',
    renderCell: ({ evidence }) =>
      evidence.modifiers?.length > 0
        ? evidence.modifiers.map((m, i) => (
            <span key={i}>
              <Link
                external
                to={`https://identifiers.org/ols/${m.id.replace('_', ':')}`}
              >
                {m.name}
              </Link>
              <br />
            </span>
          ))
        : naLabel,
    filterValue: row =>
      row.evidence.modifiers?.map(m => m.name).join() || naLabel,
    exportValue: row =>
      row.evidence.modifiers?.map(m => m.name).join() || naLabel,
    // width: '9%',
  },
  {
    id: 'sex',
    label: 'Sex',
    renderCell: ({ evidence }) => _.capitalize(evidence.sex) || naLabel,
    filterValue: row => row.evidence.sex || naLabel,
    // width: '9%',
  },
  {
    id: 'evidenceType',
    label: 'Evidence',
    renderCell: ({ evidence }) =>
      evidence.evidenceType ? (
        <Tooltip
          title={evidenceTypeDescription[evidence.evidenceType?.toUpperCase()]}
          showHelpIcon
        >
          {evidence.evidenceType}
        </Tooltip>
      ) : (
        naLabel
      ),
    filterValue: row => row.evidence.evidenceType || naLabel,
    exportValue: row => row.evidence.evidenceType || naLabel,
    // width: '7%',
  },
  {
    id: 'source',
    label: 'Source',
    renderCell: ({ evidence }) => evidence.resource || naLabel,
    filterValue: row => row.evidence.resource || naLabel,
    exportValue: row => row.evidence.resource || naLabel,
    // width: '9%',
  },
  {
    id: 'references',
    label: 'References',
    renderCell: ({ evidence }) => {
      // no references
      if (!evidence.references || evidence.references.length === 0) {
        return naLabel;
      }
      // parse references
      const refs = evidence.references.map(r => ({
        url: r.toUpperCase().startsWith('PMID:')
          ? `https://europepmc.org/search?query=EXT_ID:${r.split(':').pop()}`
          : `https://hpo.jax.org/app/browse/disease/${r}`,
        name: r,
        group: 'References',
      }));
      return <TableDrawer entries={refs} />;
    },
    filterValue: row => row.evidence.references?.map(r => r).join() || naLabel,
    exportValue: row => row.evidence.references?.map(r => r).join() || naLabel,
    // width: '9%',
  },
];

function Body({ definition, label: name, id: efoId }) {
  const variables = {
    efoId,
    index: 0,
    size: 1000,
  };

  const request = useQuery(PHENOTYPES_BODY_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
        // process the data
        const rows = [];
        data.disease.phenotypes.rows.forEach(p =>
          p.evidence.forEach(e => {
            const p1 = { ...p };
            p1.evidence = e;
            rows.push(p1);
          })
        );

        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem={`${efoId}-phenotypes`}
            showGlobalFilter
            rowsPerPageOptions={[10, 25, 50, 100]}
            query={PHENOTYPES_BODY_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
