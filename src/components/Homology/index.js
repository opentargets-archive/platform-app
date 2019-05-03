import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import HomologyDetail from './Detail';
// import PathwaysWidgetIcon from '../../icons/PathwaysWidgetIcon';

const styles = theme => ({
  widgetIcon: {
    height: '50px',
    width: '50px',
    fill: '#5a5f5f',
  },
  widgetIconNoData: {
    fill: '#e2dfdf',
  },
  cardContent: {
    height: '100%',
  },
});

const HomologyWidget = ({ ensgId, symbol, classes, homology }) => {
  const hasData = true; // TODO: update
  const { sources } = homology;
  return (
    <Widget
      title="Homology"
      detailUrlStem="homology"
      detail={<HomologyDetail ensgId={ensgId} symbol={symbol} />}
      detailHeader={{
        title: <React.Fragment>{symbol} - Gene tree</React.Fragment>,
        description: null,
      }}
      hasData={hasData}
      sources={sources}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <Grid item>
            some content
            {/* <PathwaysWidgetIcon
              className={classNames(classes.widgetIcon, {
                [classes.widgetIconNoData]: count === 0,
              })}
            /> */}
          </Grid>
        </Grid>
        {/* <Grid item>
          <Typography
            variant="body1"
            align="center"
            color={count > 0 ? 'default' : 'secondary'}
          >
            <strong>{count}</strong> biological processes and pathways involving{' '}
            <strong>{symbol}</strong>
          </Typography>
        </Grid> */}
      </Grid>
    </Widget>
  );
};

HomologyWidget.widgetName = 'homology';

export default withStyles(styles)(HomologyWidget);
