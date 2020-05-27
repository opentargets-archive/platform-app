import React from 'react';
import { Tabs, Tab } from 'ot-ui';

import GeneTreeTab from './custom/GeneTreeTab';
import OrthologyTableTab from './custom/OrthologyTableTab';

class Section extends React.Component {
  state = {
    tab: 'table',
  };
  handleChange = (event, tab) => {
    this.setState({ tab });
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Tabs
          value={tab}
          onChange={this.handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="table" label="Orthology table" />
          <Tab value="tree" label="Gene tree" />
        </Tabs>
        {tab === 'table' ? (
          <OrthologyTableTab ensgId={ensgId} symbol={symbol} />
        ) : null}
        {tab === 'tree' ? (
          <GeneTreeTab ensgId={ensgId} symbol={symbol} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Section;
