import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import Summary from './Summary';
import Description from './Description';

const CHEMBL_QUERY = gql`
  query ChemblQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["chembl"]
        size: $size
      ) {
        count
        rows {
          disease {
            id
            name
          }
          drug {
            id
            name
            drugType
            mechanismsOfAction {
              rows {
                mechanismOfAction
                targets {
                  id
                  approvedSymbol
                }
              }
            }
          }
          clinicalPhase
          clinicalStatus
          clinicalUrls {
            niceName
            url
          }
        }
      }
    }
  }
`;

const phaseMap = {
  0: 'Phase 0',
  1: 'Phase I',
  2: 'Phase II',
  3: 'Phase III',
  4: 'Phase IV',
};

const sourceMap = {
  'FDA Information': 'FDA',
  'Clinical Trials Information': 'ClinicalTrials.gov',
  'DailyMed Information': 'DailyMed',
  'ATC Information': 'ATC',
};

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    id: 'drug.name',
    label: 'Drug',
    renderCell: ({ drug }) => {
      return <Link to={`/drug/${drug.id}`}>{drug.name}</Link>;
    },
  },
  {
    id: 'drug.drugType',
    label: 'Modality',
  },
  {
    label: 'Mechanism of action',
    renderCell: ({ drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;
      return (
        <ul style={{ margin: 0, paddingLeft: '17px' }}>
          {rows.map(({ mechanismOfAction }) => (
            <li key={mechanismOfAction}>{mechanismOfAction}</li>
          ))}
        </ul>
      );
    },
  },
  {
    label: 'Target',
    renderCell: ({ drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;

      const allTargets = rows.reduce((acc, row) => {
        const { targets } = row;
        targets.forEach(({ id, approvedSymbol }) => {
          acc[id] = approvedSymbol;
        });
        return acc;
      }, {});

      return Object.entries(allTargets).map(([id, symbol]) => {
        return (
          <Fragment key={id}>
            <Link to={`/target/${id}`}>{symbol}</Link>{' '}
          </Fragment>
        );
      });
    },
  },
  {
    id: 'clinicalPhase',
    label: 'Phase',
    sortable: true,
    renderCell: ({ clinicalPhase }) => phaseMap[clinicalPhase],
  },
  {
    id: 'clinicalStatus',
    label: 'Status',
  },
  {
    label: 'Source',
    renderCell: ({ clinicalUrls }) => {
      const urlList = clinicalUrls.map(({ niceName, url }) => {
        return {
          name: sourceMap[niceName] ? sourceMap[niceName] : niceName,
          url,
          group: 'sources',
        };
      });
      return <TableDrawer entries={urlList} caption="Sources" />;
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.ChemblSummaryFragment
  );
  const request = useQuery(CHEMBL_QUERY, {
    variables: { ensemblId, efoId, size: summaryData.chemblSummary.count },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            rowsPerPageOptions={defaultRowsPerPageOptions}
            sortBy="clinicalPhase"
            order="desc"
            dataDownloader
            showGlobalFilter
          />
        );
      }}
    />
  );
}

export default Body;
