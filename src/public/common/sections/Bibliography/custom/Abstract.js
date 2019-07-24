import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import BibliograhpyHtmlText from './BibliograhpyHtmlText';

/**
 * This renders a publication abstract with highlighted matching content.
 * Props:
 *  - abstract: the abstract markup (html) as returned by LINK
 */
class Abstract extends Component {
  render = () => {
    const { abstract, variant } = this.props;

    return (
      <Fragment>
        {variant === 'regular' ? (
          <Typography variant="subtitle2" gutterBottom>
            Abstract
          </Typography>
        ) : (
          ''
        )}

        <BibliograhpyHtmlText text={abstract} />

        {/* Legend */}
        {variant === 'regular' ? (
          <Typography variant="body2" gutterBottom>
            <span data-entity="GENE">Gene</span>
            <span data-entity="DISEASE">Disease</span>
            <span data-entity="DRUG">Drug</span>
            <span data-entity="TARGET&amp;DISEASE">Target and disease</span>
          </Typography>
        ) : (
          ''
        )}
      </Fragment>
    );
  };
}

Abstract.defaultProps = {
  variant: 'regular',
};

export default Abstract;
