import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import TrialsHistogram from './TrialsHistogram';
import AntibodyIcon from '../../icons/AntibodyIcon';
import OligonucleotideIcon from '../../icons/OligonucleotideIcon';
import ProteinIcon from '../../icons/ProteinIcon';
import OtherDrugsIcon from '../../icons/OtherDrugsIcon';
import EnzymeIcon from '../../icons/EnzymeIcon';
import OligoSaccharideIcon from '../../icons/OligoSaccharideIcon';
import SmallMoleculeIcon from '../../icons/SmallMoleculeIcon';
import KnownDrugsDetail from './Detail';

const styles = theme => ({
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

const KnownDrugsWidget = ({
  classes,
  ensgId,
  symbol,
  drugs: { drugCount, drugModalities, trialsByPhase },
}) => {
  const totalTrials = trialsByPhase.reduce((acc, trial) => {
    return acc + trial.trialCount;
  }, 0);

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
    <Widget
      sm={12}
      md={9}
      title="Known drugs"
      detailUrlStem="known-drugs"
      detail={<KnownDrugsDetail ensgId={ensgId} symbol={symbol} />}
      hasData={drugCount > 0}
    >
      <Grid container>
        <Grid item md={4}>
          <Typography
            color={drugCount > 0 ? 'default' : 'secondary'}
            align="center"
          >
            Modalities
          </Typography>
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
                <Typography variant="caption" className={oligonucleotideText}>
                  <OligonucleotideIcon className={oligonucleotideIcon} />
                  Oligonucleotide ({drugModalities.oligonucleotide})
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="caption" className={oligosaccharideText}>
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
                <Typography variant="caption" className={smallMoleculeText}>
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
        <Grid item md={3}>
          <Typography
            color={drugCount > 0 ? 'default' : 'secondary'}
            variant="h4"
            align="center"
          >
            {drugCount}
          </Typography>
          <Typography
            color={drugCount > 0 ? 'default' : 'secondary'}
            align="center"
          >
            number of drugs in clinical research stages where the target is{' '}
            {symbol}
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography
            color={drugCount > 0 ? 'default' : 'secondary'}
            variant="subtitle2"
            align="center"
          >
            {totalTrials} clinical trials
          </Typography>
          <TrialsHistogram
            drugCount={drugCount}
            trialsByPhase={trialsByPhase}
          />
        </Grid>
      </Grid>
    </Widget>
  );
};

KnownDrugsWidget.widgetName = 'known drugs';

export default withStyles(styles)(KnownDrugsWidget);
