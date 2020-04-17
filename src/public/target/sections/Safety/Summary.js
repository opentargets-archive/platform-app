import React from 'react';

class Summary extends React.Component {
  state = { safety: null };
  componentDidMount() {
    const { ensgId, setHasSummaryData, setHasSummaryError } = this.props;
    fetch(
      `https://platform-api-qc.opentargets.io/v3/platform/private/target/${ensgId}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ safety: data.safety });
        setHasSummaryData(data.safety);
      })

      .catch((error) => {
        setHasSummaryError(true);
      });
  }
  render() {
    const { safety } = this.state;

    return safety ? 'available' : '(no data)';
  }
}

export default Summary;
