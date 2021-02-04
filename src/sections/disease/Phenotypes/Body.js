import React from 'react';

import Description from './Description';
import { DataTable } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';

import Tooltip from '../../../components/Tooltip';
import { Typography } from '@material-ui/core';

import { gql, useQuery } from '@apollo/client';

import _ from 'lodash';

const PHENOTYPES_BODY_QUERY = gql`
  query PhenotypesQuery($efoId: String!, $index: Int! = 0, $size: Int! = 10) {
    disease(efoId: $efoId) {
      id
      phenotypes(page: { index: $index, size: $size }) {
        count
        rows {
          phenotypeHPO {
            id
            name
            description
            namespace
          }
          phenotypeEFO {
            id
            name
          }
          evidence {
            aspect
            bioCuration
            diseaseFromSourceId
            diseaseFromSource
            evidenceType
            frequency
            frequencyHPO {
              name
              id
            }
            qualifierNot
            onset {
              name
              id
            }
            modifiers {
              name
              id
            }
            references
            sex
            resource
          }
        }
      }
    }
  }
`;

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
    // exportValue: d => d.url,
  },
  {
    id: 'phenotypeHPO',
    label: 'Phenotype',
    renderCell: ({ phenotypeEFO, phenotypeHPO }) => (
      <Tooltip title={`Description: ${phenotypeHPO.description}`} showHelpIcon>
        {phenotypeEFO?.id ? (
          <Link to={`disease/${phenotypeEFO.id}`}>{phenotypeHPO.name}</Link>
        ) : (
          phenotypeHPO.name
        )}
      </Tooltip>
    ),
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
  },
  {
    id: 'aspect',
    label: 'Aspect',
    renderCell: ({ evidence }) => (
      <Tooltip
        title={`Sub-ontology: ${evidence.aspect} (${
          aspectDescription[evidence.aspect]
        })`}
        showHelpIcon
      >
        {evidence.aspect}
      </Tooltip>
    ),
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
        'N/A'
      ),
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
        : 'N/A',
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
        : 'N/A',
  },
  {
    id: 'sex',
    label: 'Sex',
    renderCell: ({ evidence }) => _.capitalize(evidence.sex) || 'N/A',
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
        'N/A'
      ),
  },
  {
    id: 'source',
    label: 'Source',
    renderCell: ({ evidence }) => evidence.resource || 'N/A',
  },
  {
    id: 'references',
    label: 'References',
    renderCell: ({ evidence }) =>
      evidence.references?.length > 0
        ? evidence.references.map((r, i) => {
            const url = r.toUpperCase().startsWith('PMID:')
              ? `https://europepmc.org/search?query=EXT_ID:${r
                  .split(':')
                  .pop()}`
              : `https://hpo.jax.org/app/browse/disease/${r}`;
            return (
              <span key={i}>
                <Link external to={url}>
                  {r}
                </Link>
                <br />
              </span>
            );
          })
        : 'N/A',
  },
];

function Body({ definition, label: name, id: efoId }) {
  const request = useQuery(PHENOTYPES_BODY_QUERY, {
    variables: {
      efoId,
      index: 0,
      size: 1000,
    },
  });

  // return (
  //   <SectionItem
  //     definition={definition}
  //     request={request}
  //     renderDescription={() => <Description name={name} />}
  //     renderBody={data => (
  //       <DataTable
  //         columns={columns}
  //         dataDownloader
  //         dataDownloaderFileStem="phenotypes"
  //         rows={data.phenotypes}
  //         showGlobalFilter
  //       />
  //     )}
  //   />
  // );
  // return <>Phenotypes</>;
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
        console.log('table data:', data);
        // process the data
        const rows = [];
        data.disease.phenotypes.rows.forEach(p =>
          p.evidence.forEach(e => {
            const p1 = { ...p };
            p1.evidence = e;
            rows.push(p1);
          })
        );
        console.log('rows: ', rows);
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            dataDownloaderFileStem="phenotypes"
          />
        );
      }}
    />
  );
}

export default Body;
