import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from 'ot-ui';
import SummaryTab from './SummaryTab';
import AtlasTab from './AtlasTab';
import GtexTab from './GtexTab';

class RNAAndProteinExpressionDetail extends Component {
  state = { value: 'summary' };

  handleChange = (_, value) => {
    this.setState({ value });
  };

  render() {
    const { ensgId, symbol } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab value="summary" label="Summary" />
          <Tab value="atlas" label="Expression Atlas" />
          <Tab value="gtex" label="GTEx variability" />
        </Tabs>
        {value === 'summary' && <SummaryTab ensgId={ensgId} symbol={symbol} />}
        {value === 'atlas' && <AtlasTab />}
        {value === 'gtex' && <GtexTab />}
      </Fragment>
    );
  }
}

export default RNAAndProteinExpressionDetail;
