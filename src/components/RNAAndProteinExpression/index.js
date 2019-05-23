import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import CheckboxList from '../CheckboxList';
import RNAAndProteinExpressionDetail from './Detail';

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

const RNAAndProteinExpressionWidget = ({
  classes,
  ensgId,
  symbol,
  rnaAndProteinExpression,
}) => {
  const {
    rnaBaselineExpression,
    proteinBaselineExpression,
    expressionAtlasExperiment,
    gtexData,
  } = rnaAndProteinExpression;

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
      detail={<RNAAndProteinExpressionDetail ensgId={ensgId} symbol={symbol} />}
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

RNAAndProteinExpressionWidget.widgetName =
  'rna and protein baseline expression';

export default withStyles(styles)(RNAAndProteinExpressionWidget);
