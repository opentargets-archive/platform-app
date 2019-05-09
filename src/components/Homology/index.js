import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import SpeciesIcon from '../../icons/SpeciesIcon';
import Widget from '../Widget';
import HomologyDetail from './Detail';

const styles = theme => ({
  widgetIcon: {
    height: '50px',
    width: '50px',
    fill: '#5a5f5f',
  },
  widgetIconNoData: {
    fill: '#e2dfdf',
  },
  cardContent: {
    height: '100%',
  },
  // paraloguesText: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   display: 'flex',
  // },
  speciesText: {
    alignItems: 'center',
    display: 'flex',
  },
  speciesTextNotPresent: {
    color: '#E2DFDF',
  },
  speciesIcon: {
    height: '20px',
    width: '20px',
    paddingRight: '3px',
  },
  speciesIsPresent: {
    fill: '#7B196A',
  },
  speciesNotPresent: {
    fill: '#E2DFDF',
  },
});

// function getParaloguesClasses(classes, count) {
//   return classNames(classes.paraloguesText, {
//     [classes.speciesTextNotPresent]: count === 0,
//   });
// }

function getTextClasses(classes, count) {
  return classNames(classes.speciesText, {
    [classes.speciesTextNotPresent]: count === 0,
  });
}

function getIconClasses(classes, count) {
  return classNames(classes.speciesIcon, {
    [classes.speciesIsPresent]: count > 0,
    [classes.speciesNotPresent]: count === 0,
  });
}

const HomologyWidget = ({ ensgId, symbol, classes, homology }) => {
  const { paraloguesCount, orthologuesBySpecies } = homology;
  const isEven = orthologuesBySpecies.length % 2 === 0;
  const halfLength = Math.ceil(orthologuesBySpecies.length / 2);
  const orthologuesBySpeciesPairs = [];
  for (let i = 0; i < halfLength; i += 1) {
    if (i === halfLength && !isEven) {
      orthologuesBySpeciesPairs.push([orthologuesBySpecies[i], null]);
    } else {
      orthologuesBySpeciesPairs.push([
        orthologuesBySpecies[i],
        orthologuesBySpecies[i + halfLength],
      ]);
    }
  }
  const hasData = orthologuesBySpecies.some(d => d.orthologuesCount > 0);
  return (
    <Widget
      title="Gene tree"
      detailUrlStem="gene-tree"
      detail={<HomologyDetail ensgId={ensgId} symbol={symbol} />}
      detailHeader={{
        title: <React.Fragment>{symbol} - Gene tree</React.Fragment>,
        description: null,
      }}
      hasData={hasData}
    >
      <Grid container>
        <Grid item xs={12}>
          {/* <Typography
            variant="subtitle2"
            className={getParaloguesClasses(classes, paraloguesCount)}
            color={hasData ? 'default' : 'secondary'}
            align="center"
          >
            <SpeciesIcon
              species={'Human'}
              className={getIconClasses(classes, paraloguesCount)}
            />
            Human paralogues ({paraloguesCount})
          </Typography>
          <br /> */}
          <Typography
            variant="subtitle2"
            color={hasData ? 'default' : 'secondary'}
            align="center"
          >
            Homologues by species
          </Typography>
          <Grid container direction="column">
            {orthologuesBySpeciesPairs.map((d, i) => (
              <Grid item container key={i}>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    className={getTextClasses(classes, d[0].orthologuesCount)}
                  >
                    <SpeciesIcon
                      species={d[0].species}
                      className={getIconClasses(classes, d[0].orthologuesCount)}
                    />
                    {d[0].species} ({d[0].orthologuesCount})
                  </Typography>
                </Grid>
                {d[1] ? (
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      className={getTextClasses(classes, d[1].orthologuesCount)}
                    >
                      <SpeciesIcon
                        species={d[1].species}
                        className={getIconClasses(
                          classes,
                          d[1].orthologuesCount
                        )}
                      />
                      {d[1].species} ({d[1].orthologuesCount})
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Widget>
  );
};

HomologyWidget.widgetName = 'homology';

export default withStyles(styles)(HomologyWidget);
