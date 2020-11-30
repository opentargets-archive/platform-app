import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import {
  defaultRowsPerPageOptions,
  phaseMap,
  sourceMap,
} from '../../../constants';
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
          target {
            id
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

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    label: 'Target',
    renderCell: ({ target, drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;

      let symbol = '';

      const otherTargets = rows.reduce((acc, { targets }) => {
        targets.forEach(({ id, approvedSymbol }) => {
          if (id !== target.id) {
            acc.add(id);
          } else {
            symbol = approvedSymbol;
          }
        });
        return acc;
      }, new Set());

      return (
        <>
          <Link to={`/target/${target.id}`}>{symbol}</Link>
          {otherTargets.size > 0
            ? ` and ${otherTargets.size} other target${
                otherTargets.size > 1 ? 's' : ''
              }`
            : null}
        </>
      );
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
    label: 'Mechanism of action (MoA)',
    renderCell: ({ target, drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;

      let anchorMa = '';

      const mas = rows.reduce((acc, { mechanismOfAction, targets }) => {
        targets.forEach(({ id }) => {
          if (id === target.id) {
            anchorMa = mechanismOfAction;
          } else {
            acc.add(mechanismOfAction);
          }
        });
        return acc;
      }, new Set());

      return `${anchorMa}${mas.size > 0 ? ` and ${mas.size} other MoA` : ''}`;
    },
  },
  {
    id: 'clinicalPhase',
    label: 'Phase',
    sortable: true,
    renderCell: ({ clinicalPhase }) => phaseMap[clinicalPhase],
    filterValue: ({ clinicalPhase }) => phaseMap[clinicalPhase],
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
    filterValue: ({ clinicalUrls }) => {
      const labels = clinicalUrls.map(({ niceName }) => {
        return sourceMap[niceName] ? sourceMap[niceName] : niceName;
      });
      return labels.join();
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
        <Description symbol={label.symbol} name={label.name} />
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
