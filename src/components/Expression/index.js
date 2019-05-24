import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

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
  const {
    rnaBaselineExpression,
    proteinBaselineExpression,
    expressionAtlasExperiment,
    gtexData,
  } = expression;

  const items = [
    { value: rnaBaselineExpression, label: 'RNA baseline expression' },
    { value: proteinBaselineExpression, label: 'Protein baseline expression' },
    { value: expressionAtlasExperiment, label: 'Expression Atlas experiment' },
    { value: gtexData, label: 'GTEx data' },
  ];

  const hasData = rnaBaselineExpression || proteinBaselineExpression;

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
};

ExpressionWidget.widgetName = 'rna and protein baseline expression';

export default withStyles(styles)(ExpressionWidget);
