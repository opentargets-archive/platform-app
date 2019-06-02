import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

/**
 * This renders a publication abstract with highlighted matching content.
 * Props:
 *  - abstract: the abstract markup (html) as returned by LINK
 */
class Abstract extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { abstract } = this.props;

    return (
      <Fragment>
        <Typography variant="subtitle2" gutterBottom>
          Abstract
        </Typography>

        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: abstract }}
        />

        {/* Legend */}
        <Typography variant="body2" gutterBottom>
          <span data-entity="GENE">Gene</span>
          <span data-entity="DISEASE">Disease</span>
          <span data-entity="DRUG">Drug</span>
          <span data-entity="TARGET&amp;DISEASE">Target and disease</span>
        </Typography>
      </Fragment>
    );
  };
}

export default Abstract;
