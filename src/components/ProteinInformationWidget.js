import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import ProteinInformationModal from './ProteinInformationModal';
import CheckboxList from './CheckboxList';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  checkboxListContainer: {
    width: '100%',
  },
});

class ProteinInformationWidget extends Component {
  static widgetName = 'protein information';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/protein-information`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { classes, ensgId, symbol, protein, match } = this.props;
    const {
      hasSequenceAnnotationVisualisation,
      hasProteinStructure,
      hasSubCellularLocation,
      hasSubUnitData,
      hasUniprotKeywords,
    } = protein;

    const items = [
      {
        value: hasSequenceAnnotationVisualisation,
        label: 'Sequence annotation',
      },
      {
        value: hasProteinStructure,
        label: '3D structure',
      },
      {
        value: hasSubCellularLocation,
        label: 'Subcellular location',
      },
      {
        value: hasSubUnitData,
        label: 'Sub-unit data',
      },
      {
        value: hasUniprotKeywords,
        label: 'UniProt keywords',
      },
    ];
    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Protein information
            </Typography>

            <Grid
              container
              direction="column"
              alignItems="stretch"
              justify="space-evenly"
              className={classes.checkboxListContainer}
            >
              <Grid item xs={12}>
                <CheckboxList items={items} />
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
                ensgId={ensgId}
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
