import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import ProteinInformationModal from './ProteinInformationModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

class ProteinInformationWidget extends Component {
  static widgetName = 'protein information';

  state = {
    isOpen: false,
  };

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/protein-information`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { classes, symbol, match } = this.props;

    return (
      <Grid item md={6}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Protein information
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography>
                  Protvista sequence visualization available
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  Subcellular location and subunit data available
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/protein-information`}
          render={() => {
            return (
              <ProteinInformationModal
                open
                onClose={this.handleClose}
                symbol={symbol}
              />
            );
          }}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(ProteinInformationWidget));
