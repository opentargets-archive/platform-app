import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import MousePhenotypesDetail from './Detail';
import MousePhenotypesWidgetIcon from '../../icons/MousePhenotypesWidgetIcon';

const styles = theme => ({
  icon: {
    width: '95px',
    height: '60px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const MousePhenotypesWidget = ({ classes, mousePhenotypes }) => {
  const { phenotypeCount, categoryCount } = mousePhenotypes;

  const hasData = phenotypeCount > 0 || categoryCount > 0;

  return (
    <Widget
      title="Mouse phenotypes"
      detailUrlStem="mouse-phenotypes"
      detail={<MousePhenotypesDetail />}
      detailHeader={{
        title: 'Mouse phenotypes',
        description: 'Gene Ontology terms related to',
      }}
      hasData={hasData}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <MousePhenotypesWidgetIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasData,
            })}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            color={hasData ? 'default' : 'secondary'}
          >
            <strong>{phenotypeCount}</strong> phenotypes in{' '}
            <strong>{categoryCount}</strong> different phenotype categories
            observed in mouse models
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

MousePhenotypesWidget.widgetName = 'mouse phenotypes';

export default withStyles(styles)(MousePhenotypesWidget);
