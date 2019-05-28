import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import { Typography, Button } from 'ot-ui';

import Publication from './Publication';

const linkUrl = 'https://link.opentargets.io/';
const aggtype = [
  { value: 'top_chunks_significant_terms', label: 'Concepts' },
  { value: 'genes', label: 'Genes' },
  { value: 'diseases', label: 'Diseases' },
  { value: 'drugs', label: 'Drugs' },
  { value: 'journal_abbr_significant_terms', label: 'Journal' },
  { value: 'authors_significant_terms', label: 'Authors' },
  // the following are also valid aggregation types. but currently left out:
  // {value: 'phenotypes', label: 'Phenotypes'}, // phenotypes don't return any hits at the moment
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
  dropDown: {
    maxWidth: '200px',
    marginBottom: '20px',
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
      hits: [], // the list of papers
      selected: [this.props.searchTerm], // the selected chips (first item is the page gene or disease)
    };
  }

  // Handler for drop down menu
  aggtypeFilterHandler = selection => {
    this.setState({ selectedAggregation: selection });
  };

  filterAggregations = aggs => {
    const { selected } = this.state;
    for (var i in aggs) {
      aggs[i].buckets = aggs[i].buckets.filter(function(b) {
        return (
          selected.filter(function(a) {
            // console.log('a: ', a.key, a.label);
            // console.log('b: ', b.key, b.label);
            a.label = a.label || a.key;
            return (
              a.key.toString().toLowerCase() ===
                b.key.toString().toLowerCase() ||
              a.label.toString().toLowerCase() ===
                b.key.toString().toLowerCase()
            );
          }).length === 0
        );
      });
    }
    return aggs;
  };

  // Get the data for the chips
  getAggregationsData = () => {
    fetch(linkUrl + 'search?query=' + this.getQuery() + '&aggs=true&size=0')
      .then(res => res.json())
      .then(
        resp => {
          this.setState({
            bibliographyCount: resp.hits.total,
            hasData: resp.hits.total > 0,
            aggregations: this.filterAggregations(resp.aggregations),
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
  getLiteratureData = (after, afterId) => {
    const query =
      linkUrl +
      'search?query=' +
      this.getQuery() +
      (after && afterId
        ? '&search_after=' + after + '&search_after_id=' + afterId
        : '');
    fetch(query)
      .then(res => res.json())
      .then(
        resp => {
          // if loading more data (after & afterId) append that, if not just reset hits
          const hits =
            after && afterId
              ? this.state.hits.concat(resp.hits.hits)
              : resp.hits.hits;
          this.setState({
            hits: hits,
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
    const { hits } = this.state;
    const last = hits[hits.length - 1];
    this.getLiteratureData(last.sort[0], last._id);
  };

  // Builds and returns the search query string for target AND all other terms
  getQuery = () => {
    const { selected } = this.state;
    return selected
      .map(function(s) {
        return "'" + s.key + "'";
      })
      .join(' AND ');
  };

  // Handler for when a chip is deselected
  deselectChip = index => {
    const { selected } = this.state;
    if (index < selected.length) {
      this.setState({ selected: selected.filter((sel, i) => i !== index) });
    }
  };

  // Handler for when a chip is selected
  selectChip = chip => {
    const selected = this.state.selected.concat([chip]);
    this.setState({ selected: selected });
  };

  getData = () => {
    // We make 2 calls: one for chips and one for papers
    // This is because aggregations can be computationally demanding (e.g. for neoplasm) and fail.
    // By splitting the call we always have some papers to show

    // get aggregation data for chips
    this.getAggregationsData();
    // get papers
    this.getLiteratureData();
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected.length !== prevState.selected.length) {
      this.getData();
    }
  }

  render() {
    const {
      bibliographyCount,
      aggregations,
      selectedAggregation,
      hits,
      selected,
    } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        {/* Dropdown menu */}
        <Select
          options={aggtype}
          defaultValue={selectedAggregation}
          onChange={this.aggtypeFilterHandler}
          className={classNames(classes.dropDown)}
        />

        {/* Chips */}
        <Fragment>
          {selected.map((sel, i) => {
            return i > 0 ? (
              <Chip
                color="primary"
                key={i}
                label={sel.label || sel.key}
                onClick={() => this.deselectChip(i)}
              />
            ) : null;
          })}
          {aggregations[selectedAggregation.value]
            ? aggregations[selectedAggregation.value].buckets.map((agg, i) => (
                <Chip
                  color="secondary"
                  key={i}
                  label={agg.label || agg.key}
                  onClick={() => this.selectChip(agg)}
                />
              ))
            : null}
        </Fragment>

        {/* Total result */}
        <Typography>
          Showing {Math.min(hits.length, bibliographyCount)} of{' '}
          {bibliographyCount} results
        </Typography>

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

        {/* Load more, if any */}
        {hits.length < bibliographyCount ? (
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
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(BibliographyDetail);
