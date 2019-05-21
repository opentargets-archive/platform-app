import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { Button, ListTooltip } from 'ot-ui';

import InteractionsPlot from './InteractionsPlot';
import InteractionsTable from './InteractionsTable';
import SourceChip, { sourceTypeColors } from './SourceChip';

const query = gql`
  query ProteinInteractionsQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      details {
        proteinInteractions {
          nodes {
            uniprotId
            ensgId
            symbol
          }
          edges {
            source
            target
            isDirected
            isStimulation
            isInhibition
            pmIds
            sources
            pathwaysSources
            enzymeSubstrateSources
            ppiSources
          }
        }
      }
    }
  }
`;

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 0.5,
    marginLeft: theme.spacing.unit * 2,
  },
  chip: {
    margin: theme.spacing.unit * 0.5,
  },
  checked: {},
  checkboxPathways: {
    '&$checked': {
      color: sourceTypeColors.pathways,
    },
  },
  checkboxPPI: {
    '&$checked': {
      color: sourceTypeColors.ppi,
    },
  },
  checkboxEnzymeSubstrate: {
    '&$checked': {
      color: sourceTypeColors.enzymeSubstrate,
    },
  },
});

class ProteinInteractionsDetail extends React.Component {
  state = {
    interactionTypes: {
      enzymeSubstrate: true,
      pathways: true,
      ppi: true,
    },
    selectedUniprotIds: [],
    tooltip: {
      open: false,
      anchorData: null,
      anchorEl: null,
    },
  };

  handleInteractionTypeChange = interactionType => event => {
    const { interactionTypes } = this.state;
    this.setState({
      interactionTypes: {
        ...interactionTypes,
        [interactionType]: event.target.checked,
      },
    });
  };
  handleProteinClick = uniprotId => {
    const { selectedUniprotIds } = this.state;
    if (selectedUniprotIds.indexOf(uniprotId) >= 0) {
      this.setState({
        selectedUniprotIds: selectedUniprotIds.filter(d => d !== uniprotId),
      });
    } else {
      this.setState({ selectedUniprotIds: [...selectedUniprotIds, uniprotId] });
    }
  };
  handleMouseOver = d => {
    const { interactionTypes } = this.state;
    const anchorEl = document.querySelector(`#node-${d.uniprotId}`);
    const data = [
      { label: 'Protein', value: d.symbol },
      {
        label: 'Interactors (within selection)',
        value: d.interactorsCount,
      },
      {
        label: 'Interactions by type (within selection)',
        value: (
          <React.Fragment>
            {interactionTypes.enzymeSubstrate ? (
              <SourceChip
                sourceType="enzymeSubstrate"
                label={`Enzyme-substrate (${
                  d.interactionsEnzymeSubstrateCount
                })`}
              />
            ) : null}
            {interactionTypes.pathways ? (
              <SourceChip
                sourceType="pathways"
                label={`Pathways (${d.interactionsPathwaysCount})`}
              />
            ) : null}
            {interactionTypes.ppi ? (
              <SourceChip
                sourceType="ppi"
                label={`PPI (${d.interactionsPPICount})`}
              />
            ) : null}
          </React.Fragment>
        ),
      },
    ];
    this.setState({
      tooltip: {
        open: true,
        data,
        anchorEl,
      },
    });
  };
  handleMouseLeave = () => {
    this.setState({
      tooltip: {
        open: false,
        data: null,
        anchorEl: null,
      },
    });
  };
  componentDidMount() {
    const { uniprotId } = this.props;
    this.setState({ selectedUniprotIds: [uniprotId] });
  }
  render() {
    const { classes, ensgId } = this.props;
    const { interactionTypes, selectedUniprotIds, tooltip } = this.state;
    return (
      <Query query={query} variables={{ ensgId }} fetchPolicy="no-cache">
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          if (!data.target) {
            return null;
          }

          const {
            nodes: nodesRaw,
            edges,
          } = data.target.details.proteinInteractions;
          const edgesWithFilterProperties = edges
            .map(e => ({
              ...e,
              isFilteredSourceType:
                (interactionTypes.ppi && e.ppiSources.length > 0) ||
                (interactionTypes.pathways && e.pathwaysSources.length > 0) ||
                (interactionTypes.enzymeSubstrate &&
                  e.enzymeSubstrateSources.length > 0),
            }))
            .map(e => ({
              ...e,
              isFilteredWithinSelectedUniprotIds:
                selectedUniprotIds.length > 1
                  ? selectedUniprotIds.indexOf(e.source) >= 0 &&
                    selectedUniprotIds.indexOf(e.target) >= 0
                  : false,
              isFilteredWithoutSelectedUniprotIds:
                selectedUniprotIds.length > 0
                  ? (selectedUniprotIds.indexOf(e.source) >= 0 &&
                      selectedUniprotIds.indexOf(e.target) < 0) ||
                    (selectedUniprotIds.indexOf(e.target) >= 0 &&
                      selectedUniprotIds.indexOf(e.source) < 0)
                  : false,
            }));
          const edgesFiltered = edgesWithFilterProperties.filter(
            e => e.isFilteredSourceType
          );
          const edgesFilteredWithinSelectedUniprotIds = edgesFiltered.filter(
            e => e.isFilteredWithinSelectedUniprotIds
          );
          const edgesFilteredWithoutSelectedUniprotIds = edgesFiltered.filter(
            e => e.isFilteredWithoutSelectedUniprotIds
          );

          // edgesSelected ignores interactionType filter (for counts on interactionType filters)
          const edgesSelected =
            selectedUniprotIds.length > 0
              ? selectedUniprotIds.length > 1
                ? edgesWithFilterProperties.filter(
                    e => e.isFilteredWithinSelectedUniprotIds
                  )
                : edgesWithFilterProperties.filter(
                    e =>
                      e.isFilteredWithinSelectedUniprotIds ||
                      e.isFilteredWithoutSelectedUniprotIds
                  )
              : edgesWithFilterProperties;

          // edgesDisplayed takes all filters into account (interactionType and selection)
          const edgesDisplayed = edgesSelected.filter(
            e => e.isFilteredSourceType
          );

          const nodes = nodesRaw.map(n => {
            const edgesForNode = edgesDisplayed.filter(
              e => e.source === n.uniprotId || e.target === n.uniprotId
            );
            return {
              ...n,
              neighbourCount: edgesFiltered.filter(
                e => e.source === n.uniprotId || e.target === n.uniprotId
              ).length,
              neighbourCountWithin: edgesForNode.length,
              interactorsCount: _.uniq(
                edgesForNode.map(e =>
                  e.source === n.uniprotId ? e.target : e.source
                )
              ).length,
              interactionsPPICount: edgesForNode.filter(
                e => e.ppiSources.length > 0
              ).length,
              interactionsPathwaysCount: edgesForNode.filter(
                e => e.pathwaysSources.length > 0
              ).length,
              interactionsEnzymeSubstrateCount: edgesForNode.filter(
                e => e.enzymeSubstrateSources.length > 0
              ).length,
              isSelected: selectedUniprotIds.indexOf(n.uniprotId) >= 0,
              isNeighbourOfSelected:
                selectedUniprotIds.indexOf(n.uniprotId) < 0 &&
                edgesFilteredWithoutSelectedUniprotIds.filter(
                  e => e.source === n.uniprotId || e.target === n.uniprotId
                ).length,
            };
          });

          return (
            <Grid container>
              <Grid id="interaction-plot-container" item sm={12} lg={6}>
                <ListTooltip
                  open={tooltip.open}
                  anchorEl={tooltip.anchorEl}
                  dataList={tooltip.data ? tooltip.data : []}
                  container={document.getElementById(
                    'interaction-plot-container'
                  )}
                />

                <InteractionsPlot
                  {...{
                    nodes,
                    selectedUniprotIds,
                    edgesFiltered,
                    edgesFilteredWithinSelectedUniprotIds,
                    edgesFilteredWithoutSelectedUniprotIds,
                    handleProteinClick: this.handleProteinClick,
                    handleMouseOver: this.handleMouseOver,
                    handleMouseLeave: this.handleMouseLeave,
                  }}
                />
              </Grid>
              <Grid item sm={12} lg={6}>
                <div>
                  <Typography>Filter by interaction type</Typography>

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{
                              root: classes.checkboxEnzymeSubstrate,
                              checked: classes.checked,
                            }}
                            checked={interactionTypes.enzymeSubstrate}
                            onChange={this.handleInteractionTypeChange(
                              'enzymeSubstrate'
                            )}
                            value="enzymeSubstrate"
                          />
                        }
                        label={`Enzyme-substrate (${
                          edgesSelected.filter(
                            e => e.enzymeSubstrateSources.length > 0
                          ).length
                        })`}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{
                              root: classes.checkboxPathways,
                              checked: classes.checked,
                            }}
                            checked={interactionTypes.pathways}
                            onChange={this.handleInteractionTypeChange(
                              'pathways'
                            )}
                            value="pathways"
                          />
                        }
                        label={`Pathways (${
                          edgesSelected.filter(
                            e => e.pathwaysSources.length > 0
                          ).length
                        })`}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{
                              root: classes.checkboxPPI,
                              checked: classes.checked,
                            }}
                            checked={interactionTypes.ppi}
                            onChange={this.handleInteractionTypeChange('ppi')}
                            value="ppi"
                          />
                        }
                        label={`PPI (${
                          edgesSelected.filter(e => e.ppiSources.length > 0)
                            .length
                        })`}
                      />
                    </FormGroup>
                  </FormControl>
                </div>
                <br />
                <Typography>Selection</Typography>

                {selectedUniprotIds.length > 0 ? (
                  <React.Fragment>
                    {selectedUniprotIds.map(uniprotId => (
                      <Chip
                        key={uniprotId}
                        className={classes.chip}
                        color="primary"
                        label={
                          nodes.find(n => n.uniprotId === uniprotId).symbol
                        }
                        onDelete={() => this.handleProteinClick(uniprotId)}
                      />
                    ))}
                    {selectedUniprotIds.length > 1 ? (
                      <Button color="primary" size="small" disableRipple>
                        Analyse with batch search
                      </Button>
                    ) : null}
                  </React.Fragment>
                ) : (
                  <Typography align="center" style={{ padding: '4px' }}>
                    <i>
                      No selection. Click on proteins on the chart to make a
                      selection.
                    </i>
                  </Typography>
                )}

                <br />
                <br />
                <Typography>Interaction details</Typography>
                <InteractionsTable
                  interactionTypes={interactionTypes}
                  data={edgesDisplayed.map(e => ({
                    ...e,
                    sourceNode: nodes.find(n => n.uniprotId === e.source),
                    targetNode: nodes.find(n => n.uniprotId === e.target),
                  }))}
                />
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProteinInteractionsDetail);
