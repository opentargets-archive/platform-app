import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, Paper, withStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import SmilesDrawer from 'smiles-drawer';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    cursor: 'pointer',
    height: '240px',
    marginLeft: 'auto',
    width: 'fit-content',
  },
  modal: {
    width: '800px',
    margin: '130px auto 0 auto',
  },
  modalCanvas: {
    display: 'block',
    margin: '0 auto',
  },
  close: {
    cursor: 'pointer',
    float: 'right',
    fill: theme.palette.grey[800],
  },
});

let SmilesHelper = class extends Component {
  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

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
        console.error('error parsing smiles');
      }
    );
  }

  componentDidUpdate() {
    const { open } = this.state;

    if (open) {
      const { smiles, chemblId } = this.props;
      const smilesDrawer = new SmilesDrawer.Drawer({
        width: 750,
        height: 440,
        padding: 10,
      });

      SmilesDrawer.parse(
        smiles,
        tree => {
          smilesDrawer.draw(tree, `${chemblId}-modal`);
        },
        () => {
          console.error('error parsing smiles');
        }
      );
    }
  }

  render() {
    const { chemblId, classes } = this.props;
    const { open } = this.state;
    return (
      <>
        <Paper
          className={classes.container}
          elevation={0}
          onClick={this.toggleModal}
        >
          <canvas id={chemblId} />
        </Paper>
        <Modal open={open} onClose={this.toggleModal} keepMounted>
          <Paper className={classes.modal}>
            <CloseIcon className={classes.close} onClick={this.toggleModal} />
            <canvas id={`${chemblId}-modal`} className={classes.modalCanvas} />
          </Paper>
        </Modal>
      </>
    );
  }
};

SmilesHelper = withStyles(styles)(SmilesHelper);

class Smiles extends Component {
  state = {
    smiles: undefined,
  };

  componentDidMount() {
    this.mounted = true;

    const { chemblId } = this.props;
    fetch(
      `https://www.ebi.ac.uk/chembl/api/data/molecule/${chemblId}?format=json`
    )
      .then(res => res.json())
      .then(data => {
        if (this.mounted) {
          this.setState({
            smiles:
              data.molecule_type === 'Small molecule'
                ? data.molecule_structures?.canonical_smiles
                : null,
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { chemblId } = this.props;
    const { smiles } = this.state;

    if (smiles === null) return null;

    return smiles ? (
      <SmilesHelper chemblId={chemblId} smiles={smiles} />
    ) : (
      <Skeleton
        style={{ marginLeft: 'auto' }}
        height="240px"
        variant="rect"
        width="450px"
      />
    );
  }
}

export default Smiles;
