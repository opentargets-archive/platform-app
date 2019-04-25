import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import ProteinInteractionsDetail from './Detail';
import ProteinInteractionsWidgetIcon from '../../icons/ProteinInteractionsWidgetIcon';

const styles = theme => ({
  icon: {
    width: '50px',
    height: '50px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const ProteinInteractionsWidget = ({
  classes,
  symbol,
  proteinInteractions,
}) => {
  const { ppi, pathways, enzymeSubstrate } = proteinInteractions;
  return (
    <Widget
      title="Protein interactions"
      detailUrlStem="protein-interactions"
      detail={<ProteinInteractionsDetail />}
      detailHeader={{
        title: `${symbol} - Protein Interactions`,
        description: `Protein Interactions`,
      }}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <ProteinInteractionsWidgetIcon
            className={classNames(classes.icon, { [classes.iconNoData]: true })}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center">
          <strong>{ppi}</strong> protein-protein interactions
        </Typography>
        <Typography variant="body1" align="center">
          <strong>{pathways}</strong> pathway interactins
        </Typography>
        <Typography variant="body1" align="center">
          <strong>{enzymeSubstrate}</strong> enzyme-substrate interactions
        </Typography>
      </Grid>
    </Widget>
  );
};

ProteinInteractionsWidget.widgetName = 'protein interactions';

export default withStyles(styles)(ProteinInteractionsWidget);
