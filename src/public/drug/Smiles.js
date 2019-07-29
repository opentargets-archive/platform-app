import React, { Component } from 'react';
import SmilesDrawer from 'smiles-drawer';

class SmilesHelper extends Component {
  componentDidMount() {
    const { smiles, chemblId } = this.props;
    const smilesDrawer = new SmilesDrawer.Drawer({
      width: 450,
      height: 300,
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
    const { chemblId } = this.props;
    return <canvas id={chemblId} />;
  }
}

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
