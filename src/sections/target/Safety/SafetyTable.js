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
            message="n biosystems"
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
      renderCell: ({ datasource, literature }) => {
        if (literature) {
          return (
            <PublicationsDrawer
              entries={[{ name: literature }]}
              customLabel={datasource}
            />
          );
        }

        return datasource === 'ToxCast' ? (
          <Link
            external
            to="https://www.epa.gov/chemical-research/exploring-toxcast-data-downloadable-data"
          >
            {datasource}
          </Link>
        ) : (
          datasource
        );
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
