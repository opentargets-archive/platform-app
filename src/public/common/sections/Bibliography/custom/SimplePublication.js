import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';

const pmUrl = 'https://europepmc.org/';
const pmTitleUrl = 'abstract/med/';

/**
 * This renders a publication block in the bibliography details.
 * Props:
 *  - pmId
 *  - title
 *  - titleHtml
 *  - authors
 *  - journal: {
 *      title
 *      date
 *      ref
 *    }
 *  - variant: "regular" (default) or "small" (has smaller titles)
 */
class SimplePublication extends Component {
  render = () => {
    const { pmId, title, titleHtml, authors, journal, variant } = this.props;

    return (
      <Fragment>
        {/* paper title */}
        <Typography
          variant={variant === 'small' ? 'subtitle2' : 'subtitle1'}
          noWrap
          display="block"
        >
          <Link external to={pmUrl + pmTitleUrl + pmId}>
            {titleHtml ? (
              <span
                dangerouslySetInnerHTML={{ __html: titleHtml }}
                style={{ whiteSpace: 'normal' }}
              />
            ) : (
              title
            )}
          </Link>
        </Typography>

        {/* paper data */}
        <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
          {/* authors */}
          {authors
            .map((author, i) => {
              return (
                author.lastName + (author.initials ? ' ' + author.initials : '')
              );
            })
            .join(', ')}
        </Typography>

        <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
          {/* journal, year, reference */}
          {journal.title}{' '}
          <span>
            <b>{journal.date.substring(0, 4)}</b>
          </span>{' '}
          <span>{journal.ref.volume}</span>
          <span>({journal.ref.issue})</span>
          <span>:{journal.ref.pgn}</span>
        </Typography>
      </Fragment>
    );
  };
}

SimplePublication.defaultProps = {
  variant: 'regular',
};

export default SimplePublication;
