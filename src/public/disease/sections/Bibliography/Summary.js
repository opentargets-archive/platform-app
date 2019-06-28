import React from 'react';

import { commaSeparate } from 'ot-ui';

import { getStats } from '../../../common/sections/Bibliography/custom/Api';

class Summary extends React.Component {
  state = {
    bibliographyCount: 0,
  };
  componentDidMount() {
    const { efoId, setHasSummaryData, setHasSummaryError } = this.props;
    getStats([{ key: efoId }]).then(
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
    return (
      <React.Fragment>
        {commaSeparate(bibliographyCount)} publication
        {bibliographyCount === 1 ? '' : 's'}
      </React.Fragment>
    );
  }
}

export default Summary;
