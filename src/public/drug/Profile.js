import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import WarningIcon from '@material-ui/icons/Warning';
import LockIcon from '@material-ui/icons/Lock';

import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';
import Description from '../common/Description';
import LongList from '../common/LongList';
import Chip from '../common/Chip';
import WarningTooltip from '../common/WarningTooltip';
import WithdrawnNotice from '../common/WithdrawnNotice';
import Smiles from './Smiles';

const sections = Object.values(sectionsObject);

// TODO: write, then use disease sections of api
const summariesQuery = gql`
  query DrugSummaryQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      ${sections
        .filter(s => s.summaryQuery)
        .map(s => `...drug${_.upperFirst(s.id)}Fragment`)
        .join('\n')}
    }
  }
  ${sections
    .filter(s => s.summaryQuery)
    .map(s => print(s.summaryQuery))
    .join('\n')}
`;

const entitySummariesAccessor = data => {
  if (data && data.drug) {
    return {
      mechanismsOfAction: data.drug.mechanismsOfAction,
      indications: data.drug.indications,
      adverseEvents: data.drug.adverseEvents,
      knownDrugs: data.drug.knownDrugs,
    };
  } else {
    return {};
  }
};
const entitySectionsAccessor = data => {
  // return data && data.drug && data.drug.details ? data.drug.details : {};
  return data && data.drug ? data.drug : {};
};

// TODO: when material-ui is upgraded to version >4 then remove this
// style and use <Typography display="inline" /> instead
const styles = theme => ({
  inline: {
    display: 'inline',
  },
  lock: {
    fontSize: '15px',
  },
  warningIcon: {
    position: 'relative',
    top: '5px',
  },
});

class DrugProfile extends Component {
  render() {
    const {
      hasBeenWithdrawn,
      withdrawnNotice,
      chemblId,
      name,
      description,
      synonyms,
      tradeNames,
      yearOfFirstApproval,
      type,
      maximumClinicalTrialPhase,
      internalCompound,
      classes,
    } = this.props;
    const entity = {
      chemblId,
      name,
      synonyms,
      tradeNames,
      yearOfFirstApproval,
      type,
      maximumClinicalTrialPhase,
    };

    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { chemblId },
          sectionsOrderKey: 'drugSectionsOrder',
          unorderedSections: sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      >
        <Grid container justify="space-between">
          <Grid item xs={12} md={6}>
            <Description>{description}</Description>
            {hasBeenWithdrawn && (
              <Typography variant="subtitle2" color="secondary">
                Withdrawn Drug{' '}
                <WarningTooltip
                  title={<WithdrawnNotice withdrawnNotice={withdrawnNotice} />}
                  placement="right"
                >
                  <WarningIcon className={classes.warningIcon} />
                </WarningTooltip>
              </Typography>
            )}
            <Typography variant="subtitle2">
              Molecule type:{' '}
              <Typography className={classes.inline} variant="body1">
                {type}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              First approval:{' '}
              <Typography className={classes.inline} variant="body1">
                {yearOfFirstApproval || 'N/A'}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Max phase:{' '}
              <Typography className={classes.inline} variant="body1">
                {maximumClinicalTrialPhase}
              </Typography>
            </Typography>
            {internalCompound ? (
              <Typography variant="subtitle2">
                Visibility:{' '}
                <Typography className={classes.inline} variant="body1">
                  Internal compound <LockIcon className={classes.lock} />
                </Typography>
              </Typography>
            ) : null}
            <Typography variant="subtitle2" display="inline">
              Synonyms:{' '}
            </Typography>
            <LongList
              terms={synonyms}
              render={synonym => <Chip key={synonym} label={synonym} />}
            />
            <br />
            <Typography variant="subtitle2" display="inline">
              Known trade names:{' '}
            </Typography>
            <LongList
              terms={tradeNames}
              render={tradeName => <Chip key={tradeName} label={tradeName} />}
            />
          </Grid>
          <Grid item container xs={12} md={6} justify="flex-end">
            <Smiles chemblId={chemblId} />
          </Grid>
        </Grid>
      </BaseProfile>
    );
  }
}

export default withStyles(styles)(DrugProfile);
