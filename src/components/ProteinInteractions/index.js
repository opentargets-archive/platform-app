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
  ensgId,
  symbol,
  proteinInteractions,
}) => {
  const { ppi, pathways, enzymeSubstrate, sources } = proteinInteractions;
  const hasData = ppi > 0 || pathways > 0 || proteinInteractions > 0;

  return (
    <Widget
      title="Protein interactions"
      detailUrlStem="protein-interactions"
      detail={<ProteinInteractionsDetail ensgId={ensgId} />}
      sources={sources}
      detailHeader={{
        title: `${symbol} - Protein Interactions`,
        description: `Summary of interactions for ${symbol} based on OmniPath DB data. When 2 targets are selected, details on the interaction (including publications) are shown.`,
      }}
      hasData={hasData}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <ProteinInteractionsWidgetIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasData,
            })}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          align="center"
          color={ppi > 0 ? 'default' : 'secondary'}
        >
          <strong>{ppi}</strong> protein-protein interactions
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color={pathways > 0 ? 'default' : 'secondary'}
        >
          <strong>{pathways}</strong> pathway interactins
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color={enzymeSubstrate > 0 ? 'default' : 'secondary'}
        >
          <strong>{enzymeSubstrate}</strong> enzyme-substrate interactions
        </Typography>
      </Grid>
    </Widget>
  );
};

ProteinInteractionsWidget.widgetName = 'protein interactions';

export default withStyles(styles)(ProteinInteractionsWidget);
