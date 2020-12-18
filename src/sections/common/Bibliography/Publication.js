import React, { Component, Fragment } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import Abstract from './Abstract';
import BibliographyDetailPanel from './BibliographyDetailPanel';
import SimplePublication from './SimplePublication';
import { getPublicationAbstract, getSimilarPublications } from './Api';

/**
 * This renders a full publication block in the bibliography details.
 * Props and corresponding field in LINK response:
 *  - pmId: hits[].hits._source.pub_id
 *  - title: hits[].hits._source.title
 *  - authors: hits[].hits._source.authors
 *  - journal: {
 *      title: hits[].hits._source.journal.title,
 *      date: hits[].hits._source.pub_date,
 *      ref: hits[].hits._source.journal_reference,
 *    }
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

  // Fetches abstract data as needed and return component
  buildAbstract = () => {
    if (!this.state.abstract) {
      this.getAbstract();
      return null;
    }
    return (
      <BibliographyDetailPanel>
        <Abstract abstract={this.state.abstract} />
      </BibliographyDetailPanel>
    );
  };

  // Fetches similar papers data as needed and return components
  buildSimilar = () => {
    if (!this.state.similar) {
      this.getSimilar();
      return null;
    }
    return (
      <BibliographyDetailPanel>
        <Typography variant="subtitle2" gutterBottom>
          Similar articles
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {this.state.similar.map((hit, i) => (
            <Grid item xs={12} key={i}>
              <SimplePublication
                variant="small"
                pmId={hit._source.pub_id}
                title={hit._source.title}
                authors={
                  (hit._source.authors || []).map(a => ({
                    lastName: a.LastName,
                    initials: a.Initials,
                  })) || []
                }
                journal={{
                  title: hit._source.journal.title,
                  date: hit._source.pub_date,
                  ref: hit._source.journal_reference,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </BibliographyDetailPanel>
    );
  };

  // Get the abstract data from API
  getAbstract = () => {
    getPublicationAbstract(this.props.pmId).then(
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
    getSimilarPublications(this.props.pmId).then(
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
    const { pmId, title, authors, journal, hasAbstract = true } = this.props;
    const { showAbstract, showSimilar } = this.state;

    return (
      <Fragment>
        {/* Publication basic details */}
        <SimplePublication
          pmId={pmId}
          title={title}
          authors={authors}
          journal={journal}
        />

        {/* Show more details */}
        <div>
          <div>
            {hasAbstract ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => {
                    this.setState({ showAbstract: !showAbstract });
                  }}
                >
                  {showAbstract ? '- Hide abstract' : '+ Show abstract'}
                </Button>{' '}
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled
                >
                  No abstract available
                </Button>{' '}
              </>
            )}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                this.setState({ showSimilar: !showSimilar });
              }}
            >
              {showSimilar ? '- Hide similar' : '+ Show similar'}
            </Button>
          </div>

          {/* Abstract details */}
          {showAbstract ? this.buildAbstract() : null}

          {/* Similar papers details */}
          {showSimilar ? this.buildSimilar() : null}
        </div>
      </Fragment>
    );
  };
}

export default Publication;
