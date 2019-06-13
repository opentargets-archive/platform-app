import React, { Component } from 'react';
import Widget from '../Widget';
import Detail from './Detail';

class Safety extends Component {
  state = { loading: true };

  componentDidMount() {
    fetch(
      `https://platform-api-qc.opentargets.io/v3/platform/private/target/${
        this.props.ensgId
      }`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ loading: false, safety: data.safety });
      });
  }

  render() {
    const { symbol } = this.props;
    const { loading, safety } = this.state;

    return loading ? null : (
      <Widget
        title="Target safety"
        detailUrlStem="safety"
        detail={<Detail symbol={symbol} safety={safety} />}
        detailHeader={{
          title: `${symbol} - Safety`,
          description: `Known safety effects and safety risk information for ${symbol}`,
        }}
      >
        {safety ? 'There is safety data' : 'There is no safety data'}
      </Widget>
    );
  }
}

Safety.widgetName = 'target safety';

export default Safety;
