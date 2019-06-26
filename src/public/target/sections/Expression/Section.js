import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from 'ot-ui';
import SummaryTab from './custom/SummaryTab';
import AtlasTab from './custom/AtlasTab';
import GtexTab from './custom/GtexTab';

class Section extends Component {
  state = { tab: 'summary' };
  handleChange = (_, tab) => {
    this.setState({ tab });
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { tab } = this.state;

    return (
      <Fragment>
        <Tabs value={tab} onChange={this.handleChange}>
          <Tab value="summary" label="Summary" />
          <Tab value="atlas" label="Expression Atlas" />
          <Tab value="gtex" label="GTEx variability" />
        </Tabs>
        {tab === 'summary' && <SummaryTab ensgId={ensgId} symbol={symbol} />}
        {tab === 'atlas' && <AtlasTab ensgId={ensgId} />}
        {tab === 'gtex' && <GtexTab symbol={symbol} />}
      </Fragment>
    );
  }
}

export default Section;
