import React from 'react';
// import classNames from 'classnames';
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
  modalityIcon: {
    fontSize: '1.5rem',
    background: 'red',
  },
  modalityEnabled: {
    fontWeight: 'bold',
    '& .modalityIcon': {
      color: theme.palette.primary.main,
    },
  },
  modalityDisabled: {
    color: theme.palette.grey[300],
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

const ModalityList = ({ modality, data }) => {
  const classes = useStyles();
  return (
    <>
      {data
        .filter(d => d.modality === modality)
        .map(d => (
          <div
            key={d.label}
            className={
              d.value ? classes.modalityEnabled : classes.modalityDisabled
            }
          >
            <span className="modalityIcon">
              <FontAwesomeIcon
                icon={d.value ? faCheckCircle : faTimesCircle}
                size="lg"
              />
            </span>
            &nbsp;<EllsWrapper>{d.label}</EllsWrapper>
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
                <Grid item xs={3} key={m.modality}>
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
