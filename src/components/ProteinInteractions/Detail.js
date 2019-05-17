import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

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
    margin: theme.spacing.unit * 3,
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
  };
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }
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
      this.setState({ selectedUniprotIds: [uniprotId, ...selectedUniprotIds] });
    }
  };
  render() {
    const { classes, ensgId, symbol, measureRef } = this.props;
    const { width, interactionTypes, selectedUniprotIds } = this.state;
    const height = Math.min(width, 700);
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
          const nodes = nodesRaw.map(n => ({
            ...n,
            neighbourCount: edges.filter(
              e => e.source === n.uniprotId || e.target === n.uniprotId
            ).length,
          }));
          const nodeCount = nodes.length;

          // helpers
          const padding = 100;
          const radius = height / 2 - padding;
          const diameter = 2 * radius;
          const textOffset = 10;
          const textRadius = radius + textOffset;
          const circleRadius = 4;
          const colour = d3
            .scaleLog()
            .domain(d3.extent(nodes, n => n.neighbourCount + 1))
            .range(['#fff', '#3489ca']);

          // order alphabetically
          const uniprotIdToIndex = new Map(
            nodes
              .sort((a, b) => d3.ascending(a.symbol, b.symbol))
              .map((d, i) => [d.uniprotId, i])
          );
          const nodeToAngleRad = n =>
            (2 * Math.PI * uniprotIdToIndex.get(n)) / nodeCount;
          const nodeToAngleDeg = n =>
            (360 * uniprotIdToIndex.get(n)) / nodeCount;
          const nodeToColour = n => colour(n.neighbourCount + 1);
          const isInRightSemiCircle = n =>
            uniprotIdToIndex.get(n) / nodeCount < 0.5;

          return (
            <Grid container>
              <Grid item sm={12} md={3}>
                <div>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Filter by interaction type
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={interactionTypes.enzymeSubstrate}
                            onChange={this.handleInteractionTypeChange(
                              'enzymeSubstrate'
                            )}
                            value="enzymeSubstrate"
                          />
                        }
                        label="Enzyme-substrate"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={interactionTypes.pathways}
                            onChange={this.handleInteractionTypeChange(
                              'pathways'
                            )}
                            value="pathways"
                          />
                        }
                        label="Pathways"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={interactionTypes.ppi}
                            onChange={this.handleInteractionTypeChange('ppi')}
                            value="ppi"
                          />
                        }
                        label="PPI"
                      />
                    </FormGroup>
                  </FormControl>
                </div>
                <Typography>Interaction details</Typography>
              </Grid>
              <Grid item sm={12} md={9}>
                <div ref={measureRef}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                  >
                    <g
                      fill="none"
                      stroke="#999"
                      strokeOpacity={0.6}
                      transform={`translate(${width / 2},${height / 2})`}
                    >
                      {edges
                        .filter(
                          e =>
                            (interactionTypes.ppi && e.ppiSources.length > 0) ||
                            (interactionTypes.pathways &&
                              e.pathwaysSources.length > 0) ||
                            (interactionTypes.enzymeSubstrate &&
                              e.enzymeSubstrateSources.length > 0)
                        )

                        .filter(e =>
                          selectedUniprotIds.length > 1
                            ? selectedUniprotIds.indexOf(e.source) >= 0 &&
                              selectedUniprotIds.indexOf(e.target) >= 0
                            : selectedUniprotIds.length === 1
                            ? selectedUniprotIds.indexOf(e.source) >= 0 ||
                              selectedUniprotIds.indexOf(e.target) >= 0
                            : true
                        )
                        .map(e => {
                          let fromAngle = nodeToAngleRad(e.source) + 0.001;
                          let toAngle = nodeToAngleRad(e.target) + 0.001;
                          let fromX =
                            ((diameter - circleRadius) / 2) *
                            Math.sin(fromAngle);
                          let fromY =
                            (-(diameter - circleRadius) / 2) *
                            Math.cos(fromAngle);
                          let toX =
                            ((diameter - circleRadius) / 2) * Math.sin(toAngle);
                          let toY =
                            (-(diameter - circleRadius) / 2) *
                            Math.cos(toAngle);
                          const d = `M${fromX},${fromY} Q0,0 ${toX},${toY}`;
                          return <path d={d} />;
                        })}
                    </g>
                    <g
                      style={{ font: '10px sans-serif' }}
                      transform={`translate(${width / 2},${height / 2})`}
                    >
                      {nodes.map(n => {
                        const angleRad = nodeToAngleRad(n.uniprotId);
                        const angleDeg = nodeToAngleDeg(n.uniprotId);
                        const isRightHalf = isInRightSemiCircle(n.uniprotId);
                        const isSelected =
                          selectedUniprotIds.indexOf(n.uniprotId) >= 0;
                        return (
                          <g
                            key={n.uniprotId}
                            transform={`translate(${textRadius *
                              Math.sin(angleRad)},${-textRadius *
                              Math.cos(angleRad)})`}
                            onClick={() => this.handleProteinClick(n.uniprotId)}
                          >
                            <circle
                              cx="0"
                              cy="0"
                              r={circleRadius}
                              fill={nodeToColour(n)}
                              stroke={isSelected ? '#000' : '#bbb'}
                              strokeWidth={isSelected ? 2 : 1}
                            />
                            <text
                              x="0"
                              y="0"
                              fill={isSelected ? '#000' : '#bbb'}
                              fontWeight={isSelected ? 'bold' : null}
                              textAnchor={isRightHalf ? 'start' : 'end'}
                              alignmentBaseline="central"
                              transform={`rotate(${(isRightHalf ? 270 : 90) +
                                angleDeg}) translate(${
                                isRightHalf ? textOffset : -textOffset
                              }, 0)`}
                            >
                              {n.symbol} ({n.neighbourCount})
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withContentRect('bounds')(
  withStyles(styles)(ProteinInteractionsDetail)
);
