import React from 'react';
import classNames from 'classnames';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import Summary from './Summary';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import EllsWrapper from '../../../components/EllsWrapper';

const useStyles = makeStyles(theme => ({
  modality: {
    marginBottom: '0.35em',
  },
  modalityEnabled: {
    fontWeight: 'bold',
  },
  modalityDisabled: {
    color: theme.palette.grey[300],
  },
  modalityIcon: {
    paddingRight: '0.5em',
    float: 'left',
  },
  modalityIconEnabled: {
    color: theme.palette.primary.main,
  },
}));

const modalities = [
  {
    modality: 'SM',
    label: 'Small molecule',
  },
  {
    modality: 'AB',
    label: 'Antibody',
  },
  {
    modality: 'PR',
    label: 'PROTAC',
  },
  {
    modality: 'OC',
    label: 'Other modalities',
  },
];

/**
 * Parse given data for the specified modality and return a list (divs)
 * @param {String} modality e.g. 'SM'
 * @param {Array} data the tractability data array returned by the API {value, modality, label(id)}
 * @returns
 */
const ModalityList = ({ modality, data }) => {
  const classes = useStyles();
  return (
    <>
      {data
        .filter(d => d.modality === modality)
        .map(d => (
          <div
            key={d.label}
            className={classNames(
              classes.modality,
              d.value ? classes.modalityEnabled : classes.modalityDisabled
            )}
          >
            <EllsWrapper title={d.label}>
              <span
                className={classNames(classes.modalityIcon, {
                  [classes.modalityIconEnabled]: d.value,
                })}
              >
                <FontAwesomeIcon
                  icon={d.value ? faCheckCircle : faTimesCircle}
                  size="lg"
                />
              </span>
              {d.label}
            </EllsWrapper>
          </div>
        ))}
    </>
  );
};

function Body({ definition, label: symbol }) {
  const request = usePlatformApi(Summary.fragments.TractabilitySummaryFragment);

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        return (
          <>
            <Grid container spacing={3}>
              {modalities.map(m => (
                <Grid item xs={6} sm={3} key={m.modality}>
                  <Typography variant="subtitle1" gutterBottom>
                    {m.label}
                  </Typography>
                  <ModalityList
                    modality={m.modality}
                    data={data.tractability}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        );
      }}
    />
  );
}

export default Body;
