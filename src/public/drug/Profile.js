import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';
import ChipsField from '../common/ChipsField';
import Smiles from './Smiles';

const sections = Object.values(sectionsObject);

// TODO: write, then use disease sections of api
const summariesQuery = gql`
  query DrugSummaryQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      summaries {
        ${sections
          .filter(s => s.summaryQuery)
          .map(s => `...drug${_.upperFirst(s.id)}Fragment`)
          .join('\n')}
      }
    }
  }
  ${sections
    .filter(s => s.summaryQuery)
    .map(s => print(s.summaryQuery))
    .join('\n')}
`;

const entitySummariesAccessor = data =>
  data && data.drug && data.drug.summaries ? data.drug.summaries : {};
const entitySectionsAccessor = data =>
  data && data.drug && data.drug.details ? data.drug.details : {};

const styles = () => ({
  inline: {
    display: 'inline',
  },
});

class DrugProfile extends Component {
  render() {
    const {
      chemblId,
      name,
      synonyms,
      tradeNames,
      yearOfFirstApproval,
      type,
      maximumClinicalTrialPhase,
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
            <Typography variant="subtitle2">
              Name:{' '}
              <Typography className={classes.inline} variant="body2">
                {name}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Molecule type:{' '}
              <Typography className={classes.inline} variant="body2">
                {type}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              First approval:{' '}
              <Typography className={classes.inline} variant="body2">
                {yearOfFirstApproval || 'N/A'}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Max phase:{' '}
              <Typography className={classes.inline} variant="body2">
                {maximumClinicalTrialPhase}
              </Typography>
            </Typography>
            <ChipsField label="Synonyms" terms={synonyms} />
            <ChipsField label="Known trade names" terms={tradeNames} />
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
