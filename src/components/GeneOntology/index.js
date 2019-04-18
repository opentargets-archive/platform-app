import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import GeneOntologyDetail from './Detail';
import GeneOntologyWidgetIcon from '../../icons/GeneOntologyWidgetIcon';

const styles = theme => ({
  icon: {
    width: '50px',
    height: '50px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const GeneOntologyWidget = ({ classes, geneOntology, ensgId, symbol }) => {
  const {
    molecularFunctionTermsCount,
    biologicalProcessTermsCount,
    cellularComponentTermsCount,
    sources,
  } = geneOntology;

  const hasData =
    molecularFunctionTermsCount > 0 ||
    biologicalProcessTermsCount > 0 ||
    cellularComponentTermsCount > 0;

  return (
    <Widget
      title="Gene Ontology"
      detailUrlStem="gene-ontology"
      detail={<GeneOntologyDetail symbol={symbol} ensgId={ensgId} />}
      detailHeader={{
        title: `${symbol} - Gene Ontology`,
        description: `Gene Ontology terms related to ${symbol}`,
      }}
      hasData={hasData}
      sources={sources}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <GeneOntologyWidgetIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasData,
            })}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            color={molecularFunctionTermsCount > 0 ? 'default' : 'secondary'}
          >
            <strong>{molecularFunctionTermsCount}</strong> Molecular Function
            terms
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={biologicalProcessTermsCount > 0 ? 'default' : 'secondary'}
          >
            <strong>{biologicalProcessTermsCount}</strong> Biological Process
            terms
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={cellularComponentTermsCount > 0 ? 'default' : 'secondary'}
          >
            <strong>{cellularComponentTermsCount}</strong> Cellular Component
            terms
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

GeneOntologyWidget.widgetName = 'gene ontology';

export default withStyles(styles)(GeneOntologyWidget);
