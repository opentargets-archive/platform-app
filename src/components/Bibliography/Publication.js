import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, Button } from 'ot-ui';

const pmUrl = 'https://europepmc.org/';
const pmTitleUrl = 'abstract/med/';
const linkUrl = 'https://link.opentargets.io/';

/**
 * This renders a publication block in the bibliography details.
 * Props:
 *  - pmId: hits[].hits._source.pub_id
 *  - title: hits[].hits._source.title
 *  - authors: hits[].hits._source.authors
 *  - journal: {
 *      title: hits[].hits._source.journal.title,
 *      date: hits[].hits._source.pub_date,
 *      ref: hits[].hits._source.journal_reference,
 *    }
 *  - variant: "regular" or "small"; "small" has smaller titles and no abstract/similar items buttons
 */
class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      showAbstract: false,
      showSimilar: false,
      abstract: '',
      similar: null,
    };
  }

  // build abstract
  buildAbstract = () => {
    if (!this.state.abstract) {
      this.getAbstract();
      return null;
    }
    return (
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{ __html: this.state.abstract }}
      />
    );
  };

  buildSimilar = () => {
    if (!this.state.similar) {
      this.getSimilar();
      return null;
    }
    return (
      <div>
        {this.state.similar.map((hit, i) => (
          <Publication
            variant="small"
            key={i}
            pmId={hit._source.pub_id}
            title={hit._source.title}
            authors={hit._source.authors || []}
            journal={{
              title: hit._source.journal.title,
              date: hit._source.pub_date,
              ref: hit._source.journal_reference,
            }}
          />
        ))}
      </div>
    );
  };

  // Get the abstract data from API
  getAbstract = () => {
    fetch(`${linkUrl}entity/markedtext/${this.props.pmId}`)
      .then(res => res.json())
      .then(
        resp => {
          this.setState({
            abstract: resp.abstract,
          });
        },
        error => {
          this.setState({
            abstract: '',
            hasError: true,
          });
        }
      );
  };

  // Get the abstract data from API
  getSimilar = () => {
    fetch(`${linkUrl}document-more-like-this/${this.props.pmId}`)
      .then(res => res.json())
      .then(
        resp => {
          this.setState({
            similar: resp.hits.hits,
          });
        },
        error => {
          this.setState({
            similar: null,
            hasError: true,
          });
        }
      );
  };

  render = () => {
    const { pmId, title, authors, journal, variant } = this.props;
    const { showAbstract, showSimilar, abstract } = this.state;

    return (
      <Fragment>
        {/* paper title */}
        <Typography variant="body1">
          <Link external to={pmUrl + pmTitleUrl + pmId}>
            {title}
          </Link>
        </Typography>

        {/* paper data */}
        <Typography variant="body2">
          {/* authors */}
          {authors.map((author, i) => {
            const to = `${pmUrl}search?query=AUTH:"${author.ForeName} ${
              author.LastName
            }"&page=1`;
            return (
              <Fragment>
                <Link key={i} external to={to}>
                  {author.ForeName} {author.LastName}
                </Link>{' '}
              </Fragment>
            );
          })}
        </Typography>

        <Typography variant="body2">
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

        {/* Show more details */}
        {variant !== 'small' ? (
          <div>
            <div>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  this.setState({ showAbstract: !showAbstract });
                }}
              >
                {showAbstract ? 'Hide abstract' : 'Show abstract'}
              </Button>{' '}
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  this.setState({ showSimilar: !showSimilar });
                }}
              >
                {showSimilar ? 'Hide similar' : 'Show similar'}
              </Button>
            </div>

            {/* Abstract details */}
            <div>{showAbstract ? this.buildAbstract() : null}</div>

            {/* Similar papers details */}
            <div>{showSimilar ? this.buildSimilar() : null}</div>
          </div>
        ) : null}
      </Fragment>
    );
  };
}

Publication.defaultProps = {
  variant: 'regular',
};

export default Publication;
