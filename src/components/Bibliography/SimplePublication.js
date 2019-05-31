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
 *  - authors
 *  - journal: {
 *      title
 *      date
 *      ref
 *    }
 *  - variant: "regular" (default) or "small" (has smaller titles)
 */
class SimplePublication extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { pmId, title, authors, journal, variant } = this.props;

    return (
      <Fragment>
        {/* paper title */}
        <Typography variant={variant === 'small' ? 'subtitle2' : 'subtitle1'}>
          <Link external to={pmUrl + pmTitleUrl + pmId}>
            {title}
          </Link>
        </Typography>

        {/* paper data */}
        <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
          {/* authors */}
          {authors.map((author, i) => {
            const to = `${pmUrl}search?query=AUTH:"${author.ForeName} ${
              author.LastName
            }"&page=1`;
            return (
              <Fragment key={i}>
                <Link external to={to}>
                  {author.ForeName} {author.LastName}
                </Link>{' '}
              </Fragment>
            );
          })}
        </Typography>

        <Typography variant={variant === 'small' ? 'caption' : 'body2'}>
          {/* journal, year, reference */}
          <Link
            external
            to={`https://europepmc.org/search?query=JOURNAL:%22${
              journal.title
            }%22`}
          >
            {journal.title}
          </Link>{' '}
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
