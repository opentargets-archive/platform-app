import React from 'react';
import { Tabs, Tab } from 'ot-ui';

import OverviewTab from './OverviewTab';
import BrowserTab from './BrowserTab';

class PathwaysDetail extends React.Component {
  state = {
    tab: 'overview',
  };
  handleChange = (event, tab) => {
    this.setState({ tab });
  };
  render() {
    const { symbol, data } = this.props;
    const { topLevelPathways, lowLevelPathways } = data;
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Tabs
          value={tab}
          onChange={this.handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="overview" label="Pathways Overview" />
          <Tab value="browser" label="Reactome Pathway Browser" />
        </Tabs>
        {tab === 'overview' ? (
          <OverviewTab
            symbol={symbol}
            topLevelPathways={topLevelPathways}
            lowLevelPathways={lowLevelPathways}
          />
        ) : null}
        {tab === 'browser' ? (
          <BrowserTab
            symbol={symbol}
            topLevelPathways={topLevelPathways}
            lowLevelPathways={lowLevelPathways}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default PathwaysDetail;
