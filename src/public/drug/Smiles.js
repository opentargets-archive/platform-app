import React, { Component } from 'react';
import SmilesDrawer from 'smiles-drawer';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    height: '240px',
  },
});

let SmilesHelper = class extends Component {
  componentDidMount() {
    const { smiles, chemblId } = this.props;
    const smilesDrawer = new SmilesDrawer.Drawer({
      width: 450,
      height: 240,
      padding: 10,
    });
    SmilesDrawer.parse(
      smiles,
      tree => {
        smilesDrawer.draw(tree, chemblId);
      },
      () => {
        console.log('error parsing smiles');
      }
    );
  }

  render() {
    const { chemblId, classes } = this.props;
    return (
      <Paper className={classes.container} elevation={0}>
        <canvas id={chemblId} />
      </Paper>
    );
  }
};

SmilesHelper = withStyles(styles)(SmilesHelper);

class Smiles extends Component {
  state = {
    smiles: null,
  };

  componentDidMount() {
    const { chemblId } = this.props;
    fetch(
      `https://www.ebi.ac.uk/chembl/api/data/molecule/${chemblId}?format=json`
    )
      .then(res => res.json())
      .then(data => {
        if (data.molecule_type === 'Small molecule') {
          this.setState({
            smiles: data.molecule_structures.canonical_smiles,
          });
        }
      });
  }

  render() {
    const { chemblId } = this.props;
    const { smiles } = this.state;
    return smiles && <SmilesHelper chemblId={chemblId} smiles={smiles} />;
  }
}

export default Smiles;
