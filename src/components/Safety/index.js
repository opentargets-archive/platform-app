import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
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
    const hasData = safety === undefined ? false : true;

    return loading ? null : (
      <Widget
        title="Target safety"
        detailUrlStem="safety"
        detail={<Detail symbol={symbol} safety={safety} />}
        detailHeader={{
          title: `${symbol} - Safety`,
          description: `Known safety effects and safety risk information for ${symbol}`,
        }}
        hasData={hasData}
      >
        <Typography
          align="center"
          variant="body1"
          color={hasData ? 'default' : 'secondary'}
        >
          Drug target safety assessment data {!safety && 'not'} available for{' '}
          {symbol}
        </Typography>
      </Widget>
    );
  }
}

Safety.widgetName = 'target safety';

export default Safety;
