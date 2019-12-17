import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

import { DownloadSVGPlot } from 'ot-ui';

import withTooltip from '../common/withTooltip';
import TooltipContent from './ClassicAssociationsTooltip';
import Slider from './ClassicAssociationsSlider';

const getTherapeuticAreaTree = ({
  ensgId,
  symbol,
  data,
  efo,
  selectedTherapeuticAreas,
  diameter,
}) => {
  const efoById = new Map(efo.nodes.map(d => [d.id, d]));
  // note: requested that we only show therapeutic area circles selected
  //       when faceted by therapeutic area, even if a disease has other
  //       therapeutic area ancestors; potentially confusing, but this is
  //       how webapp works
  const relevantTherapeuticAreas =
    selectedTherapeuticAreas.length > 0
      ? selectedTherapeuticAreas
      : efo.therapeuticAreas;
  const therapeuticAreasIds = new Set(relevantTherapeuticAreas);
  const therapeuticAreas = relevantTherapeuticAreas.map(taId => {
    const { id, name } = efoById.get(taId);
    return { id, name };
  });
  const nodes = data.map(d => ({
    id: d.disease.id,
    name: d.disease.name,
    score: d.score,
  }));
  const nodesById = new Map([...nodes.map(d => [d.id, d])]);
  const wantedDiseaseIds = new Set(nodesById.keys());
  const wantedDiseaseIdsByTherapeuticAreaId = new Map([
    ...therapeuticAreas.map(d => [d.id, new Set()]),
  ]);

  // helper method
  const getInducedParentIds = (inducedParentIds, directParentIds) => {
    if (directParentIds.size > 0) {
      // add the direct parents
      for (let directParentId of directParentIds) {
        inducedParentIds.add(directParentId);
      }

      // get all the parents' parents
      const allNextDirectParentIds = new Set();
      for (let directParentId of directParentIds) {
        const { parentIds: nextDirectParentIds } = efoById.get(directParentId);
        for (let nextDirectParentId of nextDirectParentIds) {
          allNextDirectParentIds.add(nextDirectParentId);
        }
      }

      return getInducedParentIds(inducedParentIds, allNextDirectParentIds);
    } else {
      return inducedParentIds;
    }
  };

  [...wantedDiseaseIds].forEach(efoId => {
    const { parentIds: directParentIds } = efoById.get(efoId);
    const ancestors = getInducedParentIds(new Set(), new Set(directParentIds));
    const therapeuticAreaIds = [...ancestors].filter(d =>
      therapeuticAreasIds.has(d)
    );
    therapeuticAreaIds.forEach(taId => {
      wantedDiseaseIdsByTherapeuticAreaId.get(taId).add(efoId);
    });
  });

  const hierarchicalData = {
    id: 'EFO_ROOT',
    uniqueId: 'EFO_ROOT',
    name: 'root',
    isTherapeuticArea: false,
    target: { ensgId, symbol },
    children: therapeuticAreas.map(ta => ({
      id: ta.id,
      uniqueId: ta.id,
      name: ta.name,
      isTherapeuticArea: true,
      target: { ensgId, symbol },
      children: [...wantedDiseaseIdsByTherapeuticAreaId.get(ta.id)]
        .map(d => nodesById.get(d))
        .map(d => ({
          ...d,
          uniqueId: `${ta.id}-${d.id}`, // need uniqueId as diseases can fall into multiple therapeutic areas
          isTherapeuticArea: false,
          target: { ensgId, symbol },
          value: d.score,
          children: [],
        })),
    })),
  };

  return d3
    .pack()
    .size([diameter, diameter])
    .padding(d => (d.data.id === 'EFO_ROOT' ? 17 : 2))(
    d3
      .hierarchy(hierarchicalData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
  );
};

class ClassicAssociationsBubbles extends React.Component {
  state = {
    minimumScore: 0.1,
  };
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }
  onMinimumScoreChange = (_, value) => {
    this.setState({ minimumScore: value });
  };
  render() {
    const {
      measureRef,
      ensgId,
      symbol,
      theme,
      data,
      efo,
      handleMouseover,
      selectedTherapeuticAreas,
    } = this.props;
    const { width, minimumScore } = this.state;
    const height = 800;
    const diameter = Math.min(width, height); // TODO: replace 600 with eg page height / 2

    const filteredData = data.filter(d => d.score > minimumScore);
    const therapeuticAreaTree = getTherapeuticAreaTree({
      ensgId,
      symbol,
      data: filteredData,
      efo,
      selectedTherapeuticAreas,
      diameter,
    });
    const nodes = therapeuticAreaTree.descendants();

    // color scale
    const color = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['#fff', theme.palette.primary.main]);

    return (
      <div ref={measureRef}>
        <DownloadSVGPlot
          svgContainer={this.svgContainer}
          filenameStem={`${symbol}-associated-diseases--bubbles`}
        >
          <Slider value={minimumScore} onChange={this.onMinimumScoreChange} />
          <div ref={this.svgContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              textAnchor="middle"
              style={{ font: '10px sans-serif' }}
              alignmentBaseline="center"
            >
              <g transform={`translate(${width / 2 - diameter / 2},0)`}>
                {nodes.map(d => (
                  <g
                    key={d.data.uniqueId}
                    transform={`translate(${d.x},${d.y})`}
                  >
                    <circle
                      id={`tree-node-${d.data.uniqueId}`}
                      cx={0}
                      cy={0}
                      r={d.r}
                      stroke={
                        d.data.id !== 'EFO_ROOT'
                          ? theme.palette.grey[400]
                          : 'none'
                      }
                      fill={
                        d.data.id === 'EFO_ROOT'
                          ? theme.palette.grey[50]
                          : d.data.isTherapeuticArea
                          ? 'none'
                          : color(d.data.score)
                      }
                      onMouseOver={() => {
                        if (d.data.id !== 'EFO_ROOT') {
                          handleMouseover(d.data);
                        }
                      }}
                    />

                    {/* therapeutic areas only */}
                    {d.data.isTherapeuticArea && d.children && (
                      <React.Fragment>
                        <path
                          id={`text-path-${d.data.id}`}
                          fill="none"
                          d={`M${-(d.r + 3)},${0} A${d.r + 3},${d.r +
                            3} 0 0 1 ${d.r + 3},${0}`}
                        />
                        <text
                          textAnchor="middle"
                          fontWeight="bold"
                          fontSize="12"
                          fill={theme.palette.grey[400]}
                        >
                          <textPath
                            startOffset="50%"
                            xlinkHref={`#text-path-${d.data.id}`}
                          >
                            {d.data.name}
                          </textPath>
                        </text>
                      </React.Fragment>
                    )}

                    {/* diseases only (leaves) with large radius */}
                    {!d.children && d.r > 10 && (
                      <React.Fragment>
                        <clipPath id={`clip-${d.data.id}`}>
                          <circle cx={0} cy={0} r={d.r} />
                        </clipPath>
                        <text
                          x={0}
                          y={0}
                          clipPath={`url(#clip-${d.data.id})`}
                          pointerEvents="none"
                        >
                          {d.data.name.split(' ').map((w, i, nodes) => (
                            <tspan
                              key={i}
                              x={0}
                              y={`${i - nodes.length / 2 + 0.8}em`}
                            >
                              {w}
                            </tspan>
                          ))}
                        </text>
                      </React.Fragment>
                    )}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </DownloadSVGPlot>
      </div>
    );
  }
}

const tooltipElementFinder = ({ uniqueId }) =>
  document.querySelector(`#tree-node-${uniqueId}`);

export default withTooltip(
  withTheme()(withContentRect('bounds')(ClassicAssociationsBubbles)),
  TooltipContent,
  tooltipElementFinder
);
