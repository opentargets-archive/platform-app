import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';

import { naLabel, defaultRowsPerPageOptions } from '../../../constants';
import Tooltip from '../../../components/Tooltip';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';

const useStyles = makeStyles(theme => ({
  blue: {
    color: theme.palette.primary.main,
  },
  grey: {
    color: theme.palette.grey[300],
  },
  direction: {
    marginBottom: '7px',
  },
}));

function getColumns(classes) {
  return [
    {
      id: 'event',
      label: 'Safety event',
      renderCell: ({ event, eventId }) => {
        return eventId ? (
          <Link to={`/disease/${eventId}`}>{event ?? naLabel}</Link>
        ) : (
          event ?? naLabel
        );
      },
    },
    {
      id: 'biosample',
      label: 'Biosamples',
      renderCell: ({ biosample }) => {
        const entries = biosample.map(sample => {
          return {
            name: sample.cellFormat
              ? `${sample.cellFormat}${
                  sample.cellLabel ? ` (${sample.cellLabel})` : ''
                }`
              : sample.tissueLabel,
            url: sample.cellFormat
              ? null
              : `https://identifiers.org/${sample.tissueId.replace('_', ':')}`,
            group: sample.cellFormat ? 'Assay' : 'Organ system',
          };
        });

        return (
          <TableDrawer
            message={`${biosample.length} biosample${
              biosample.length > 1 ? 's' : ''
            }`}
            caption="Biosamples"
            entries={entries}
          />
        );
      },
    },
    {
      id: 'dosing',
      label: 'Dosing effects',
      renderCell: ({ effects }) => {
        console.log('effects', effects);
        const circleUpData = effects.find(
          effect => effect.direction === 'activation'
        );
        const circleDownData = effects.find(
          effect => effect.direction === 'inhibition'
        );
        return (
          <>
            {circleUpData ? (
              <Tooltip
                title={
                  <>
                    <strong>Direction:</strong>
                    <div className={classes.direction}>
                      {circleUpData.direction}
                    </div>
                    <strong>Dosing:</strong>
                    <div>{circleUpData.dosing}</div>
                  </>
                }
              >
                <span>
                  <FontAwesomeIcon
                    className={classes.blue}
                    icon={faArrowAltCircleUp}
                    size="lg"
                  />
                </span>
              </Tooltip>
            ) : (
              <FontAwesomeIcon
                className={classes.grey}
                icon={faArrowAltCircleUp}
                size="lg"
              />
            )}
            {circleDownData ? (
              <Tooltip
                title={
                  <>
                    <strong>Direction:</strong>
                    <div className={classes.direction}>
                      {circleDownData.direction}
                    </div>
                    <strong>Dosing:</strong>
                    <div>{circleDownData.dosing}</div>
                  </>
                }
              >
                <span>
                  <FontAwesomeIcon
                    className={classes.blue}
                    icon={faArrowAltCircleDown}
                    size="lg"
                  />
                </span>
              </Tooltip>
            ) : (
              <FontAwesomeIcon
                className={classes.grey}
                icon={faArrowAltCircleDown}
                size="lg"
              />
            )}
          </>
        );
      },
    },
    {
      id: 'studies',
      label: 'Experimental studies',
      renderCell: ({ study }) => {
        // console.log('study', study);
        return 'Experimental studies';
      },
    },
    {
      id: 'source',
      label: 'Source',
      renderCell: ({ datasource, literature }) => {
        // console.log('datasource', datasource);
        // console.log('literature', literature);
        return 'Source';
      },
    },
  ];
}

function SafetyTable({ safetyLiabilities }) {
  const classes = useStyles();
  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      columns={getColumns(classes)}
      rows={safetyLiabilities}
      rowsPerPageOptions={defaultRowsPerPageOptions}
    />
  );
}

export default SafetyTable;
