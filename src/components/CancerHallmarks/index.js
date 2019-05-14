import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { PALETTE } from 'ot-ui/build/constants';
import { Link } from 'ot-ui';

import Widget from '../Widget';
import CancerHallmarksDetail from './Detail';
import DoubleCheckboxList from '../DoubleCheckboxList';
import { DoubleCheckboxListLegend } from '../DoubleCheckboxList';

const styles = theme => ({
  noData: {
    color: PALETTE.lightgrey,
  },
});

const CancerHallmarksWidget = ({
  ensgId,
  symbol,
  cancerHallmarks: { roleInCancer, sources, promotionAndSuppressionByHallmark },
  classes,
}) => {
  const hasData = roleInCancer.length > 0;
  const items = promotionAndSuppressionByHallmark.map(hm => ({
    valueOne: hm.promotes,
    valueTwo: hm.suppresses,
    label: hm.name,
  }));
  const items1 = items.slice(0, items.length / 2);
  const items2 = items.slice(items.length / 2);

  return (
    <Widget
      xs={12}
      sm={6}
      md={6}
      lg={6}
      title="Cancer hallmarks"
      detailUrlStem="cancer-hallmarks"
      detail={
        <CancerHallmarksDetail
          ensgId={ensgId}
          symbol={symbol}
          roleInCancer={roleInCancer}
        />
      }
      detailHeader={{
        title: <React.Fragment>{symbol} - Cancer Hallmarks</React.Fragment>,
        description: (
          <React.Fragment>
            Essential alterations in cell physiology that dictate malignant
            growth. Cancer hallmarks were originally described by{' '}
            <Link
              external
              to="https://www.cell.com/abstract/S0092-8674(00)81683-9"
            >
              Hanahan and Weinberg (2000)
            </Link>{' '}
            and are manually curated by COSMIC and integrated into the Cancer
            Gene Census.
          </React.Fragment>
        ),
      }}
      hasData={hasData}
      sources={sources}
    >
      <Typography
        className={classNames({ [classes.noData]: !hasData })}
        align="center"
      >
        Role in cancer: {roleInCancer.map(r => r.name).join(', ') || 'No data'}
      </Typography>

      <Grid container spacing={8}>
        <Grid item xs={6}>
          <DoubleCheckboxList items={items1} variant="sm" />
        </Grid>
        <Grid item xs={6}>
          <DoubleCheckboxList items={items2} variant="sm" />
        </Grid>
      </Grid>
      <DoubleCheckboxListLegend
        disabled={!hasData}
        label1="Promoted hallmark"
        label2="Suppressed hallmark"
      />
    </Widget>
  );
};

CancerHallmarksWidget.widgetName = 'cancer hallmarks';

export default withStyles(styles)(CancerHallmarksWidget);
