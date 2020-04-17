import React from 'react';

import ReactomeRenderer from './ReactomeRenderer';
import { Button } from 'ot-ui';

class BrowserTab extends React.Component {
  state = {};
  componentDidMount() {
    const { lowLevelPathways } = this.props;
    this.setState({ reactomeId: lowLevelPathways[0].id });
  }
  handleChange = (reactomeId) => {
    this.setState({ reactomeId });
  };
  render() {
    const { symbol, lowLevelPathways } = this.props;
    const { reactomeId } = this.state;
    return (
      <React.Fragment>
        <ul>
          {lowLevelPathways.map((d) => (
            <li key={d.id}>
              {d.id === reactomeId ? <strong>{d.name}</strong> : d.name} |{' '}
              <Button
                onClick={() => {
                  this.handleChange(d.id);
                }}
                size="small"
                disableRipple
              >
                View in browser below
              </Button>
            </li>
          ))}
        </ul>
        <ReactomeRenderer symbol={symbol} reactomeId={reactomeId} />
      </React.Fragment>
    );
  }
}

export default BrowserTab;
