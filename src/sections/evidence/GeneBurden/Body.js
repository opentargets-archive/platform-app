import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';
import Link from '../../../components/Link';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import { dataTypesMap } from '../../../dataTypes';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { epmcUrl } from '../../../utils/urls';
import Description from './Description';

const GENE_BURDEN_QUERY = loader('./GeneBurdenQuery.gql');

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                {diseaseFromSource}
              </Typography>
            </>
          }
          showHelpIcon
        >
          <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
        </Tooltip>
      );
    },
  },
  {
    // TODO: update column with API fields
    id: 'biomarkerName',
    label: 'Study',
    renderCell: ({ biomarkerName, biomarkers }) => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: 'drug',
    label: 'Source',
    renderCell: ({ drug, drugFromSource }) => {
      // return drug ? (
      //   <Link to={`/drug/${drug.id}`}>{drug.name}</Link>
      // ) : (
      //   drugFromSource
      // );
      return <>N/A</>;
    },
    // filterValue: ({ drug, drugFromSource }) => {
    //   return drug ? drug.name : drugFromSource;
    // },
  },
  {
    // TODO: update column with API fields
    id: 'drugResponse.name',
    label: 'Ancestry',
    renderCell: ({ drugResponse }) => {
      return (
        <Link to={`/disease/${drugResponse.id}`}>{drugResponse.name}</Link>
      );
    },
  },
  {
    // TODO: update column with API fields
    id: 'confidence',
    label: 'Model',
    renderCell: ({ confidence, urls }) => {
      const entries = urls
        ? urls.map(url => {
            return {
              url: url.url,
              name: url.niceName,
              group: 'Sources',
            };
          })
        : [];
      return <TableDrawer entries={entries} message={confidence} />;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'Cases with QV',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'Cases',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'Sample size',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'Odds Ratio (CI 95%)',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'Beta (CI 95%)',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    // TODO: update column with API fields
    id: '',
    label: 'p-value',
    renderCell: () => {
      return <>N/A</>;
    },
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: ({ literature }) => {
      const entries = literature
        ? literature.map(id => {
            return { name: id, url: epmcUrl(id), group: 'literature' };
          })
        : [];

      return <PublicationsDrawer entries={entries} />;
    },
  },
];

function Body(props) {
  const { definition, id, label } = props;
  const { ensgId: ensemblId, efoId } = id;
  const {
    data: {
      disease: { cancerBiomarkersSummary },
    },
  } = usePlatformApi();

  const variables = {
    ensemblId,
    efoId,
    size: cancerBiomarkersSummary.count,
  };

  const request = useQuery(GENE_BURDEN_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.genetic_association}
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
            dataDownloader
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={GENE_BURDEN_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
