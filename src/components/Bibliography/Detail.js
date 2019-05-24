import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import { Typography, Button } from 'ot-ui';

import Publication from './Publication';

const linkUrl = 'https://link.opentargets.io/';
const aggtype = [
  { value: 'top_chunks_significant_terms', label: 'Concepts' },
  { value: 'genes', label: 'Genes' },
  { value: 'diseases', label: 'Diseases' },
  // {value: 'phenotypes', label: 'Phenotypes'}, // phenotypes don't return any hits at the moment, so leaving out...
  { value: 'drugs', label: 'Drugs' },
  { value: 'journal_abbr_significant_terms', label: 'Journal' },
  { value: 'authors_significant_terms', label: 'Authors' },
  // {value: 'pub_date_histogram', label: 'publication date'}
];
const styles = theme => ({
  icon: {
    width: '50px',
    height: '50px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

class BibliographyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bibliographyCount: 0,
      hasData: false,
      hasError: false,
      aggregations: {},
      selectedAggregation: aggtype[0],
      hits: [],
    };
  }

  // Handler for drop down menu
  aggtypeFilterHandler = selection => {
    // console.log(selection);
    this.setState({ selectedAggregation: selection });
  };

  // Get the aggregations, i.e. the data for the chips
  getAggregationsData = ensgId => {
    fetch(linkUrl + 'search?query=' + ensgId + '&aggs=true&size=0')
      .then(res => res.json())
      .then(
        resp => {
          this.setState({
            bibliographyCount: resp.hits.total,
            hasData: resp.hits.total > 0,
            aggregations: resp.aggregations,
          });
        },
        error => {
          this.setState({
            aggregations: {},
            hasError: true,
          });
        }
      );
  };

  // Get the data for the publications
  getLiteratureData = (ensgId, after, afterId) => {
    const query =
      linkUrl +
      'search?query=' +
      ensgId +
      (after && afterId
        ? '&search_after=' + after + '&search_after_id=' + afterId
        : '');
    fetch(query)
      .then(res => res.json())
      .then(
        resp => {
          this.setState({
            hits: this.state.hits.concat(resp.hits.hits),
          });
        },
        error => {
          this.setState({
            hits: [],
            hasError: true,
          });
        }
      );
  };

  getMoreLiteratureData = () => {
    const { ensgId } = this.props;
    const { hits } = this.state;
    const last = hits[hits.length - 1];
    const after = last.sort[0];
    const afterId = last._id;
    this.getLiteratureData(ensgId, after, afterId);
  };

  componentDidMount() {
    const { ensgId } = this.props;

    // we make 2 calls: one for chips and one for papers
    // get aggregation data for chips
    this.getAggregationsData(ensgId);

    // get papers
    this.getLiteratureData(ensgId);
  }

  render() {
    // console.log(this.props);
    const {
      bibliographyCount,
      aggregations,
      selectedAggregation,
      hits,
    } = this.state;
    const { classes } = this.props;
    console.log('hits: ', this.state.hits);
    return (
      <Fragment>
        {/* Chips */}
        <Fragment>
          {aggregations[selectedAggregation.value]
            ? aggregations[selectedAggregation.value].buckets.map((agg, i) => (
                <Chip color="secondary" key={i} label={agg.label || agg.key} />
              ))
            : null}
        </Fragment>

        {/* Dropdown menu */}
        <Select
          options={aggtype}
          defaultValue={selectedAggregation}
          onChange={this.aggtypeFilterHandler}
        />

        {/* Total result */}
        <Typography>Showing 10 of {bibliographyCount} results</Typography>

        {/* Publications */}
        <Fragment>
          {hits.map((hit, i) => {
            return (
              <Publication
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
            );
          })}
        </Fragment>

        {/* Load more */}
        <Fragment>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => {
              this.getMoreLiteratureData();
            }}
          >
            Load more papers
          </Button>
        </Fragment>
      </Fragment>
    );
  }
}

export default withStyles(styles)(BibliographyDetail);
