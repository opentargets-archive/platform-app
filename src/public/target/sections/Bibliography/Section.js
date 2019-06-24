import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import { Typography, Button } from 'ot-ui';
import { PALETTE } from 'ot-ui';

import Publication from './Publication';
import { getAggregationsData, getPublicationsData } from './Api';

const aggtype = [
  { value: 'top_chunks_significant_terms', label: 'Concepts' },
  { value: 'genes', label: 'Genes' },
  { value: 'diseases', label: 'Diseases' },
  { value: 'drugs', label: 'Drugs' },
  { value: 'journal_abbr_significant_terms', label: 'Journal' },
  { value: 'authors_significant_terms', label: 'Authors' },
  // the following are also valid aggregation types in Link but we currently don't use them:
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
  chip: {
    margin: theme.spacing.unit / 4,
  },
  linkChip: {
    backgroundColor: PALETTE.purple,
    '&:hover, &:focus': {
      backgroundColor: PALETTE.purple,
    },
    '&:active': {
      backgroundColor: PALETTE.purple,
    },
  },
});

class Section extends Component {
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

  // Parse the aggregation data based on defined aggtypes
  // and filter out all entries that are already selected
  filterAggregations = aggs => {
    const { selected } = this.state;
    return aggtype.reduce((newaggs, agg) => {
      newaggs[agg.value] = {
        buckets: aggs[agg.value].buckets.filter(function(b) {
          return (
            selected.filter(function(a) {
              a.label = a.label || a.key;
              return (
                a.key.toString().toLowerCase() ===
                  b.key.toString().toLowerCase() ||
                a.label.toString().toLowerCase() ===
                  b.key.toString().toLowerCase()
              );
            }).length === 0
          );
        }),
      };
      return newaggs;
    }, {});
  };

  // Get the data for the chips
  getAggregations = () => {
    getAggregationsData(this.state.selected).then(
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
  getPublications = append => {
    const { hits } = this.state;
    const last = hits[hits.length - 1];
    const after = append ? last.sort[0] : undefined;
    const afterId = append ? last._id : undefined;
    getPublicationsData(this.state.selected, after, afterId).then(
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

  // We make 2 calls: one for chips and one for papers
  // This is because aggregations can be computationally demanding (e.g. for neoplasm) and fail.
  // By splitting the call we always have some papers to show
  getData = () => {
    // get aggregation data for chips
    this.getAggregations();
    // get papers
    this.getPublications();
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    // If a chip has been added or removed, fetch new data
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
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={16}
        >
          <Grid item xs={12}>
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
                    key={i}
                    variant="outlined"
                    label={sel.label || sel.key}
                    onDelete={() => this.deselectChip(i)}
                    className={classes.chip}
                  />
                ) : null;
              })}
              {aggregations[selectedAggregation.value]
                ? aggregations[selectedAggregation.value].buckets.map(
                    (agg, i) => (
                      <Chip
                        color="primary"
                        key={i}
                        label={agg.label || agg.key}
                        onClick={() => this.selectChip(agg)}
                        className={classNames(classes.chip, classes.linkChip)}
                      />
                    )
                  )
                : null}
            </Fragment>
          </Grid>

          <Grid item xs={12}>
            {/* Total result */}
            <Typography>
              Showing {Math.min(hits.length, bibliographyCount)} of{' '}
              {bibliographyCount} results
            </Typography>

            {/* Publications */}
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={16}
            >
              {hits.map((hit, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <Publication
                      pmId={hit._source.pub_id}
                      title={hit._source.title}
                      authors={hit._source.authors || []}
                      journal={{
                        title: hit._source.journal.title,
                        date: hit._source.pub_date,
                        ref: hit._source.journal_reference,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {/* Load more, if any */}
          {hits.length < bibliographyCount ? (
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => {
                  this.getPublications(true);
                }}
                className={classes.linkChip}
              >
                Load more papers
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Section);
