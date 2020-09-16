import React from 'react';

import { commaSeparate } from 'ot-ui';

import { getStats } from './custom/Api';

class Summary extends React.Component {
  state = {
    bibliographyCount: 0,
  };
  componentDidMount() {
    const { keyword, setHasSummaryData, setHasSummaryError } = this.props;
    getStats([{ key: keyword }]).then(
      result => {
        this.setState({
          bibliographyCount: result.hits.total,
        });
        setHasSummaryData(result.hits.total > 0);
      },
      error => {
        setHasSummaryError(true);
      }
    );
  }
  render() {
    const { bibliographyCount } = this.state;
    return bibliographyCount === 0 ? (
      '(no data)'
    ) : (
      <>
        {commaSeparate(bibliographyCount)} publication
        {bibliographyCount === 1 ? '' : 's'}
      </>
    );
  }
}

export default Summary;
