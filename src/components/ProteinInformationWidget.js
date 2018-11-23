import React, { Component } from 'react';
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
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { classes, symbol } = this.props;
    const { isOpen } = this.state;

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
        <ProteinInformationModal
          open={isOpen}
          onClose={this.handleClose}
          symbol={symbol}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(ProteinInformationWidget);
