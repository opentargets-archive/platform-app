import React, { Component, Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';

import Link from '../../../components/Link';
import LongText from '../../../components/LongText';

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
        <Typography variant={variant === 'small' ? 'subtitle2' : 'subtitle1'}>
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
        {/* authors */}
        <Box style={{ whiteSpace: 'normal' }}>
          <LongText
            lineLimit={1}
            variant={variant === 'small' ? 'caption' : 'body2'}
          >
            {authors
              .map((author, i) => {
                return (
                  author.lastName +
                  (author.initials ? ' ' + author.initials : '')
                );
              })
              .join(', ')}
          </LongText>
        </Box>
        {/* </Typography> */}

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
