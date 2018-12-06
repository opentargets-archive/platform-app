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
  modalities: {
    height: '85%',
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
      drugs: { drugCount, drugModalities, trialsByPhase },
      classes,
      match,
    } = this.props;

    const antibodyText = getTextClasses(classes, drugModalities.antibody);
    const antibodyIcon = getIconClasses(classes, drugModalities.antibody);

    const enzymeText = getTextClasses(classes, drugModalities.enzyme);
    const enzymeIcon = getIconClasses(classes, drugModalities.enzyme);

    const oligonucleotideText = getTextClasses(
      classes,
      drugModalities.oligonucleotide
    );
    const oligonucleotideIcon = getIconClasses(
      classes,
      drugModalities.oligonucleotide
    );

    const oligosaccharideText = getTextClasses(
      classes,
      drugModalities.oligosaccharide
    );
    const oligosaccharideIcon = getIconClasses(
      classes,
      drugModalities.oligosaccharide
    );

    const proteinText = getTextClasses(classes, drugModalities.protein);
    const proteinIcon = getIconClasses(classes, drugModalities.protein);

    const smallMoleculeText = getTextClasses(
      classes,
      drugModalities.smallMolecule
    );
    const smallMoleculeIcon = getIconClasses(
      classes,
      drugModalities.smallMolecule
    );

    const otherText = getTextClasses(classes, drugModalities.other);
    const otherIcon = getIconClasses(classes, drugModalities.other);

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
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  className={classes.modalities}
                >
                  <Grid item container>
                    <Grid item md={6}>
                      <Typography variant="caption" className={antibodyText}>
                        <AntibodyIcon className={antibodyIcon} />
                        Antibody ({drugModalities.antibody})
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="caption" className={enzymeText}>
                        <EnzymeIcon className={enzymeIcon} />
                        Enzyme ({drugModalities.enzyme})
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={6}>
                      <Typography
                        variant="caption"
                        className={oligonucleotideText}
                      >
                        <OligonucleotideIcon className={oligonucleotideIcon} />
                        Oligonucleotide ({drugModalities.oligonucleotide})
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="caption"
                        className={oligosaccharideText}
                      >
                        <OligoSaccharideIcon className={oligosaccharideIcon} />
                        Oligosaccharide ({drugModalities.oligosaccharide})
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item md={6}>
                      <Typography variant="caption" className={proteinText}>
                        <ProteinIcon className={proteinIcon} />
                        Protein ({drugModalities.protein})
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        variant="caption"
                        className={smallMoleculeText}
                      >
                        <SmallMoleculeIcon className={smallMoleculeIcon} />
                        Small molecule ({drugModalities.smallMolecule})
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Typography variant="caption" className={otherText}>
                      <OtherDrugsIcon className={otherIcon} />
                      Other ({drugModalities.other})
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Typography variant="h4" align="center">
                  {drugCount}
                </Typography>
                <Typography align="center">
                  number of drugs in clinical research stages where the target
                  is {symbol}
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
