import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Widget from '../Widget';
import CheckboxList from '../CheckboxList';
import ExpressionDetail from './Detail';

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

const ExpressionWidget = ({ classes, ensgId, symbol, expression }) => {
  if (expression) {
    const {
      rnaBaselineExpression,
      proteinBaselineExpression,
      expressionAtlasExperiment,
      gtexData,
    } = expression;

    const items = [
      { value: rnaBaselineExpression, label: 'RNA baseline expression' },
      {
        value: proteinBaselineExpression,
        label: 'Protein baseline expression',
      },
      {
        value: expressionAtlasExperiment,
        label: 'Expression Atlas experiment',
      },
      { value: gtexData, label: 'GTEx' },
    ];

    const hasData =
      rnaBaselineExpression ||
      proteinBaselineExpression ||
      expressionAtlasExperiment ||
      gtexData;

    return (
      <Widget
        title="RNA and protein baseline expression"
        detailUrlStem="rna-and-protein-expression"
        detail={<ExpressionDetail ensgId={ensgId} symbol={symbol} />}
        detailHeader={{
          title: `RNA and protein baseline expression`,
          description: `RNA and protein baseline expression`,
        }}
        hasData={hasData}
      >
        <CheckboxList items={items} />
      </Widget>
    );
  } else {
    return (
      <Widget
        title="RNA and protein baseline expression"
        detailUrlStem="rna-and-protein-expression"
        detail={<ExpressionDetail ensgId={ensgId} symbol={symbol} />}
        detailHeader={{
          title: `RNA and protein baseline expression`,
          description: `RNA and protein baseline expression`,
        }}
        hasData={false}
      >
        <Typography color="error" align="center">
          Error fetching data
        </Typography>
      </Widget>
    );
  }
};

ExpressionWidget.widgetName = 'rna and protein baseline expression';

export default withStyles(styles)(ExpressionWidget);
