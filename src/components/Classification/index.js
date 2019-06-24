import React, { Component } from 'react';

import Widget from '../Widget';
import Detail from './Detail';

class Classification extends Component {
  render() {
    const { efoId } = this.props;
    return (
      <Widget
        title="Classification"
        detailUrlStem="classification"
        detail={<Detail efoId={efoId} />}
        detailHeader={{
          title: `${efoId} - Classification`,
          description: `Classification for ${efoId}`,
        }}
        hasData={true}
      >
        Classification
      </Widget>
    );
  }
}

export default Classification;
