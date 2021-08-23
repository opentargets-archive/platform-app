import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';
import { DataTable } from '../../../components/Table';
import { identifiersOrgLink } from '../../../utils/global';
import { defaultRowsPerPageOptions, decimalPlaces } from '../../../constants';
import speciesIcons from './speciesIcons';

console.log('worm', speciesIcons.worm);

const useStyles = makeStyles(theme => ({
  star: {
    color: theme.palette.primary.main,
  },
  container: {
    display: 'inline-block',
    width: '16px',
  },
}));

function getColumns(classes) {
  return [
    {
      id: 'speciesName',
      label: 'Species',
      renderCell: ({ speciesId, speciesName }) => {
        return (
          <>
            <svg style={{ height: '13px' }} viewBox="0 0 1040 950">
              <path d={speciesIcons[speciesId]} />
            </svg>{' '}
            {speciesName}
          </>
        );
      },
    },
    {
      id: 'homologyType',
      label: 'Homology type',
      renderCell: ({ isHighConfidence, homologyType }) => {
        return (
          <>
            <span className={classes.container}>
              {isHighConfidence === 'NULL' ? null : (
                <Tooltip
                  title={
                    isHighConfidence === '1'
                      ? 'High confidence orthologue'
                      : 'Low confidence orthologue'
                  }
                >
                  <span>
                    <FontAwesomeIcon
                      className={isHighConfidence === '1' ? classes.star : ''}
                      icon={isHighConfidence === '1' ? faStarSolid : faStar}
                    />
                  </span>
                </Tooltip>
              )}
            </span>{' '}
            {homologyType.replaceAll('_', ' ')}
          </>
        );
      },
    },
    {
      id: 'targetGeneSymbol',
      label: 'Homologue',
      renderCell: ({ targetGeneId, targetGeneSymbol }) => (
        <Link external to={identifiersOrgLink('ensembl', targetGeneId)}>
          {targetGeneSymbol}
        </Link>
      ),
    },
    {
      id: 'queryPercentageIdentity',
      label: `Query %id`,
      renderCell: ({ queryPercentageIdentity }) =>
        queryPercentageIdentity
          ? queryPercentageIdentity.toFixed(decimalPlaces)
          : 'N/A',
    },
    {
      id: 'targetPercentageIdentity',
      label: `Target %id`,
      renderCell: ({ targetPercentageIdentity }) =>
        targetPercentageIdentity
          ? targetPercentageIdentity.toFixed(decimalPlaces)
          : 'N/A',
    },
  ];
}

function HomologyTableTab({ data }) {
  const classes = useStyles();

  return (
    <DataTable
      dataDownloader
      columns={getColumns(classes)}
      rows={data.target.homologues}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default HomologyTableTab;
