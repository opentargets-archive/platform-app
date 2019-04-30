import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  rnaAndProteinExpression,
}) => {
  const {
    rnaBaselineExpression,
    proteinBaselineExpression,
  } = rnaAndProteinExpression;

  const items = [
    { value: rnaBaselineExpression, label: 'RNA baseline expression' },
    { value: proteinBaselineExpression, label: 'Protein baseline expression' },
  ];

  const hasData = rnaBaselineExpression || proteinBaselineExpression;

  return (
    <Widget
      title="RNA and protein baseline expression"
      detailUrlStem="rna-and-protein-expression"
      detail={<RNAAndProteinExpressionDetail />}
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

RNAAndProteinExpressionWidget.widgetName = 'gene ontology';

export default withStyles(styles)(RNAAndProteinExpressionWidget);
