import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';

import { naLabel, defaultRowsPerPageOptions } from '../../../constants';
import Tooltip from '../../../components/Tooltip';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import SafetyStudiesDrawer from './SafetyStudiesDrawer';

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
  circleUp: {
    marginRight: '10px',
  },
}));

function EffectTooltipContent({ classes, effect }) {
  return (
    <>
      <strong>Direction:</strong>
      <div className={classes.direction}>{effect.direction}</div>
      <strong>Dosing:</strong>
      <div>{effect.dosing}</div>
    </>
  );
}

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
      label: 'Biosystems',
      filterValue: ({ biosample }) => {
        if (biosample.length === 1) {
          const sample = biosample[0];
          return `${sample.cellFormat} ${sample.cellLabel} ${
            sample.tissueLabel
          }`.trim();
        }
        return 'biosamples';
      },
      renderCell: ({ biosample }) => {
        const entries = biosample.map(
          ({ cellFormat, cellLabel, tissueLabel, tissueId }) => {
            return {
              name: cellFormat
                ? `${cellFormat}${cellLabel ? ` (${cellLabel})` : ''}`
                : tissueLabel,
              url: cellFormat
                ? null
                : tissueId
                ? `https://identifiers.org/${tissueId.replace('_', ':')}`
                : null,
              group: cellFormat ? 'Assay' : 'Organ system',
            };
          }
        );

        return (
          <TableDrawer
            message={`${entries.length} biosystems`}
            caption="Biosystems"
            entries={entries}
          />
        );
      },
    },
    {
      id: 'dosing',
      label: 'Dosing effects',
      renderCell: ({ effects }) => {
        const circleUpData = effects
          ? effects.find(effect => effect.direction === 'activation')
          : null;
        const circleDownData = effects
          ? effects.find(effect => effect.direction === 'inhibition')
          : null;
        return (
          <>
            {circleUpData ? (
              <Tooltip
                title={
                  <EffectTooltipContent
                    classes={classes}
                    effect={circleUpData}
                  />
                }
              >
                <span className={classes.circleUp}>
                  <FontAwesomeIcon
                    className={classes.blue}
                    icon={faArrowAltCircleUp}
                    size="lg"
                  />
                </span>
              </Tooltip>
            ) : (
              <FontAwesomeIcon
                className={`${classes.circleUp} ${classes.grey}`}
                icon={faArrowAltCircleUp}
                size="lg"
              />
            )}
            {circleDownData ? (
              <Tooltip
                title={
                  <EffectTooltipContent
                    classes={classes}
                    effect={circleDownData}
                  />
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
        return <SafetyStudiesDrawer studies={study} />;
      },
    },
    {
      id: 'datasource',
      label: 'Source',
      renderCell: ({ datasource, literature, url }) => {
        return literature ? (
          <PublicationsDrawer
            entries={[{ name: literature }]}
            customLabel={datasource}
          />
        ) : (
          <Link external to={url}>
            {datasource}
          </Link>
        );
      },
    },
  ];
}

function SafetyTable({ safetyLiabilities, query, variables }) {
  const classes = useStyles();
  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      columns={getColumns(classes)}
      rows={safetyLiabilities}
      rowsPerPageOptions={defaultRowsPerPageOptions}
      query={query}
      variables={variables}
    />
  );
}

export default SafetyTable;
