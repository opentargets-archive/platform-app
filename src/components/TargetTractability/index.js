import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { PALETTE } from 'ot-ui';

import Widget from '../Widget';
import TargetTractabilityDetail from './Detail';
import SmallMoleculeIcon from '../../icons/SmallMoleculeIcon';
import AntibodyIcon from '../../icons/AntibodyIcon';

const styles = theme => ({
  icon: {
    width: '95px',
    height: '60px',
    fill: PALETTE.purple,
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const TargetTractabilityWidget = ({ classes, tractability }) => {
  const {
    hasAntibodyTractabilityAssessment,
    hasSmallMoleculeTractabilityAssessment,
    sources,
  } = tractability;

  const hasData =
    hasAntibodyTractabilityAssessment || hasSmallMoleculeTractabilityAssessment;

  return (
    <Widget
      title="Target tractability"
      detailUrlStem="target-tractability"
      detail={<TargetTractabilityDetail />}
      detailHeader={{
        title: 'Target tractability',
        description: 'Target tractability',
      }}
      hasData={hasData}
      sources={sources}
    >
      <Grid container>
        <Grid item container md={6} justify="center">
          <SmallMoleculeIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasSmallMoleculeTractabilityAssessment,
            })}
          />
          <Typography
            variant="body1"
            align="center"
            color={
              hasSmallMoleculeTractabilityAssessment ? 'default' : 'secondary'
            }
          >
            Small molecule tractability assessment available
          </Typography>
        </Grid>
        <Grid item container md={6} justify="center">
          <AntibodyIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasAntibodyTractabilityAssessment,
            })}
          />

          <Typography
            variant="body1"
            align="center"
            color={hasAntibodyTractabilityAssessment ? 'default' : 'secondary'}
          >
            Antibody tractability assessment available
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

TargetTractabilityWidget.widgetName = 'target tractability';

export default withStyles(styles)(TargetTractabilityWidget);
