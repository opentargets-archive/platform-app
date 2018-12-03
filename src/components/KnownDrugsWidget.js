import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import TrialsHistogram from './TrialsHistogram';
import KnownDrugsModal from './KnownDrugsModal';
import AntibodyIcon from '../icons/AntibodyIcon';
import OligonucleotideIcon from '../icons/OligonucleotideIcon';
import ProteinIcon from '../icons/ProteinIcon';
import OtherDrugsIcon from '../icons/OtherDrugsIcon';
import EnzymeIcon from '../icons/EnzymeIcon';
import OligoSaccharideIcon from '../icons/OligoSaccharideIcon';
import SmallMoleculeIcon from '../icons/SmallMoleculeIcon';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  icons: {
    flexDirection: 'column',
  },
  modalityText: {
    color: '#E2DFDF',
  },
  modality: {
    height: '32px',
    width: '32px',
    fill: '#E2DFDF',
  },
  modalityExists: {
    height: '32px',
    width: '32px',
    fill: '#7B196A',
  },
});

class KnownDrugsWidget extends Component {
  static widgetName = 'known drugs';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/known-drugs`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const {
      ensgId,
      symbol,
      drugs: { count, modalities, trialsByPhase },
      classes,
      match,
    } = this.props;

    const antibodyClasses = modalities.antibody
      ? classes.modalityExists
      : classes.modality;

    const oligonucleotideClasses = modalities.oligonucleotide
      ? classes.modalityExists
      : classes.modality;

    const proteinClasses = modalities.protein
      ? classes.modalityExists
      : classes.modality;

    const otherDrugsClasses = modalities.otherDrugs
      ? classes.modalityExists
      : classes.modality;

    const enzymeClasses = modalities.enzyme
      ? classes.modalityExists
      : classes.modality;

    const oligosaccharideClasses = modalities.oligosaccharide
      ? classes.modalityExists
      : classes.modality;

    const moleculeClasses = modalities.smallMolecule
      ? classes.modalityExists
      : classes.modality;

    return (
      <Grid item md={9}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Known drugs
            </Typography>
            <Grid container>
              <Grid item md={4}>
                <Typography align="center">Modalities</Typography>
                <Grid container>
                  <Grid item container className={classes.icons} md={6}>
                    <Typography
                      variant="caption"
                      className={
                        modalities.antibody ? '' : classes.modalityText
                      }
                    >
                      <AntibodyIcon className={antibodyClasses} /> Antibody
                    </Typography>
                    <Typography
                      variant="caption"
                      className={
                        modalities.oligonucleotides ? '' : classes.modalityText
                      }
                    >
                      <OligonucleotideIcon className={oligonucleotideClasses} />
                      Oligonucleotide
                    </Typography>
                    <Typography
                      variant="caption"
                      className={modalities.protein ? '' : classes.modalityText}
                    >
                      <ProteinIcon className={proteinClasses} /> Protein
                    </Typography>
                    <Typography
                      variant="caption"
                      className={
                        modalities.otherDrugs ? '' : classes.modalityText
                      }
                    >
                      <OtherDrugsIcon className={otherDrugsClasses} /> Other
                    </Typography>
                  </Grid>
                  <Grid item container className={classes.icons} md={6}>
                    <Typography
                      variant="caption"
                      className={modalities.enzyme ? '' : classes.modalityText}
                    >
                      <EnzymeIcon className={enzymeClasses} /> Enzyme
                    </Typography>
                    <Typography
                      variant="caption"
                      className={
                        modalities.oligosaccharide ? '' : classes.modalityText
                      }
                    >
                      <OligoSaccharideIcon className={oligosaccharideClasses} />{' '}
                      Oligosaccharide
                    </Typography>
                    <Typography
                      variant="caption"
                      className={
                        modalities.smallMolecule ? '' : classes.modalityText
                      }
                    >
                      <SmallMoleculeIcon className={moleculeClasses} /> Small
                      molecule
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h4" align="center">
                  {count}
                </Typography>
                <Typography align="center">
                  number of drugs associated with {symbol} with these
                  modalities:
                </Typography>
              </Grid>
              <Grid item md={4}>
                <TrialsHistogram trialsByPhase={trialsByPhase} />
              </Grid>
            </Grid>
            <Typography variant="caption" align="center">
              Source: ChEMBL
            </Typography>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/known-drugs`}
          render={() => {
            return (
              <KnownDrugsModal
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

export default withStyles(styles)(withRouter(KnownDrugsWidget));
