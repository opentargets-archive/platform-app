import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
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
    alignItems: 'center',
    display: 'flex',
  },
  modalityTextNotPresent: {
    color: '#E2DFDF',
  },
  modality: {
    height: '30px',
    width: '30px',
  },
  modalityIsPresent: {
    fill: '#7B196A',
  },
  modalityNotPresent: {
    fill: '#E2DFDF',
  },
});

function getTextClasses(classes, count) {
  return classNames(classes.modalityText, {
    [classes.modalityTextNotPresent]: count === 0,
  });
}

function getIconClasses(classes, count) {
  return classNames(classes.modality, {
    [classes.modalityIsPresent]: count > 0,
    [classes.modalityNotPresent]: count === 0,
  });
}

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
      drugs: { count, trialsByPhase },
      classes,
      match,
    } = this.props;

    const modalities = {
      antibody: 0,
      enzyme: 1,
      oligonucleotide: 3,
      oligosaccharide: 0,
      protein: 0,
      smallMolecule: 1,
      other: 0,
    };

    const antibodyText = getTextClasses(classes, modalities.antibody);
    const antibodyIcon = getIconClasses(classes, modalities.antibody);

    const enzymeText = getTextClasses(classes, modalities.enzyme);
    const enzymeIcon = getIconClasses(classes, modalities.enzyme);

    const oligonucleotideText = getTextClasses(
      classes,
      modalities.oligonucleotide
    );
    const oligonucleotideIcon = getIconClasses(
      classes,
      modalities.oligonucleotide
    );

    const oligosaccharideText = getTextClasses(
      classes,
      modalities.oligosaccharide
    );
    const oligosaccharideIcon = getIconClasses(
      classes,
      modalities.oligosaccharide
    );

    const proteinText = getTextClasses(classes, modalities.protein);
    const proteinIcon = getIconClasses(classes, modalities.protein);

    const smallMoleculeText = getTextClasses(classes, modalities.smallMolecule);
    const smallMoleculeIcon = getIconClasses(classes, modalities.smallMolecule);

    const otherText = getTextClasses(classes, modalities.other);
    const otherIcon = getIconClasses(classes, modalities.other);

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
                    <Typography variant="caption" className={antibodyText}>
                      <AntibodyIcon className={antibodyIcon} />
                      Antibody ({modalities.antibody})
                    </Typography>
                    <Typography
                      variant="caption"
                      className={oligonucleotideText}
                    >
                      <OligonucleotideIcon className={oligonucleotideIcon} />
                      Oligonucleotide ({modalities.oligonucleotide})
                    </Typography>
                    <Typography variant="caption" className={proteinText}>
                      <ProteinIcon className={proteinIcon} />
                      Protein ({modalities.protein})
                    </Typography>
                    <Typography variant="caption" className={otherText}>
                      <OtherDrugsIcon className={otherIcon} />
                      Other ({modalities.other})
                    </Typography>
                  </Grid>
                  <Grid item container className={classes.icons} md={6}>
                    <Typography variant="caption" className={enzymeText}>
                      <EnzymeIcon className={enzymeIcon} />
                      Enzyme ({modalities.enzyme})
                    </Typography>
                    <Typography
                      variant="caption"
                      className={oligosaccharideText}
                    >
                      <OligoSaccharideIcon className={oligosaccharideIcon} />
                      Oligosaccharide ({modalities.oligosaccharide})
                    </Typography>
                    <Typography variant="caption" className={smallMoleculeText}>
                      <SmallMoleculeIcon className={smallMoleculeIcon} />
                      Small molecule ({modalities.smallMolecule})
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
