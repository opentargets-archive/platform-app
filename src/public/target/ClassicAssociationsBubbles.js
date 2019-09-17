import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

const getTherapeuticAreaTree = ({ data, efo, diameter }) => {
  const efoById = new Map(efo.nodes.map(d => [d.id, d]));
  const therapeuticAreasIds = new Set(efo.therapeuticAreas);
  const therapeuticAreas = efo.therapeuticAreas.map(taId => {
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
    children: therapeuticAreas.map(ta => ({
      id: ta.id,
      uniqueId: ta.id,
      name: ta.name,
      isTherapeuticArea: true,
      children: [...wantedDiseaseIdsByTherapeuticAreaId.get(ta.id)]
        .map(d => nodesById.get(d))
        .map(d => ({
          ...d,
          uniqueId: `${ta.id}-${d.id}`, // need uniqueId as diseases can fall into multiple therapeutic areas
          isTherapeuticArea: false,
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
  state = {};
  svgContainer = React.createRef();
  static getDerivedStateFromProps(props) {
    const { width = 600 } = props.contentRect.bounds;
    return { width };
  }

  render() {
    const { measureRef, theme, data, efo } = this.props;
    const { width } = this.state;
    const height = 800;
    const diameter = Math.min(width, height); // TODO: replace 600 with eg page height / 2

    const therapeuticAreaTree = getTherapeuticAreaTree({ data, efo, diameter });
    const nodes = therapeuticAreaTree.descendants();

    // color scale
    const color = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['#fff', theme.palette.primary.main]);

    return (
      <div ref={measureRef}>
        <div ref={this.svgContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            textAnchor="middle"
            font="10px sans-serif"
            alignmentBaseline="center"
          >
            <g transform={`translate(${width / 2 - diameter / 2},0)`}>
              {nodes.map(d => (
                <g key={d.data.uniqueId} transform={`translate(${d.x},${d.y})`}>
                  <circle
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

                  {/* diseases only (leaves) */}
                  {!d.children && (
                    <React.Fragment>
                      <clipPath id={`clip-${d.data.id}`}>
                        <circle cx={0} cy={0} r={d.r} />
                      </clipPath>
                      <text clipPath={`url(#clip-${d.data.id})`}>
                        {d.data.name.split(' ').map((w, i, nodes) => (
                          <tspan key={i} y={`${i - nodes.length / 2 + 0.8}em`}>
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
      </div>
    );
  }
}

export default withTheme()(
  withContentRect('bounds')(ClassicAssociationsBubbles)
);
