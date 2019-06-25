import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import * as d3Bundle from 'd3';
// import * as d3Dag from 'd3-dag';
import { Helmet } from 'react-helmet';

import { Tabs, Tab } from 'ot-ui';

import BasePage from '../../pages/BasePage';
import Associations from './Associations';
import DiseaseSummary from './DiseaseSummary';
import DiseaseOverviewTab from './DiseaseOverviewTab';

// const d3 = Object.assign({}, d3Bundle, d3Dag);

const diseaseQuery = gql`
  query DiseaseQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms
    }
  }
`;

/* const diseaseDAGQuery = gql`
  query DiseaseDAGQuery($efoId: String!) {
    diseaseDAG(efoId: $efoId) {
      nodes {
        id
        name
        parentIds
        nodeType
      }
    }
  }
`; */

/* const colourMap = {
  base: 'chartreuse',
  parent: 'lightblue',
  child: 'coral',
}; */

class DiseasePage extends Component {
  state = {};

  static getDerivedStateFromProps(props) {
    const value = props.location.pathname.endsWith('/associations')
      ? 'associations'
      : 'overview';

    return {
      value,
    };
  }

  handleChange = (event, value) => {
    const { history, match } = this.props;
    this.setState({ value }, () => {
      history.push(
        `${match.url}${value === 'overview' ? '' : '/associations'}`
      );
    });
  };

  render() {
    const { match } = this.props;
    const { value } = this.state;
    const { efoId } = match.params;
    return (
      <BasePage>
        <Query query={diseaseQuery} variables={{ efoId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }
            const { name, description, synonyms } = data.disease;
            return (
              <Fragment>
                <Helmet>
                  <title>{name}</title>
                </Helmet>
                <DiseaseSummary {...{ efoId, name, description, synonyms }} />
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="associations" label="Associations View" />
                  <Tab value="overview" label="Disease Profile Overview" />
                </Tabs>
                <Switch>
                  <Route
                    path={`${match.path}/associations`}
                    component={Associations}
                  />
                  <Route
                    path={match.path}
                    render={() => <DiseaseOverviewTab efoId={efoId} />}
                  />
                </Switch>
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

// <Query query={diseaseDAGQuery} variables={{ efoId }}>
//         {({ loading, error, data }) => {
//           if (loading || error) {
//             return null;
//           }
//           const nodes = data.diseaseDAG.nodes.map(d => {
//             const { parentIds, ...rest } = d;
//             const node = { ...rest };
//             if (parentIds.length > 0) {
//               node.parentIds = parentIds;
//             }
//             return node;
//           });

//           const width = 1400;
//           const height = 700;
//           const margin = 100;

//           const dag = d3.dratify()(nodes);
//           const dagAfter = d3
//             .sugiyama()
//             .decross(d3.decrossTwoLayer().order(d3.twolayerMedian()))(dag);
//           const links = dagAfter.links();
//           const descendents = dagAfter.descendants();

//           const line = d3
//             .line()
//             .curve(d3.curveCatmullRom)
//             .x(d => margin + d.x * (width - 2 * margin))
//             .y(d => margin + d.y * (height - 2 * margin));

//           return (
//             <svg width={width} height={height}>
//               {links.map(({ source, target, data }) => (
//                 <path
//                   key={`${source.id}-${target.id}`}
//                   stroke="grey"
//                   fill="none"
//                   d={line([
//                     {
//                       x: source.x,
//                       y: source.y,
//                     },
//                     ...(data.points ? data.points : []),
//                     {
//                       x: target.x,
//                       y: target.y,
//                     },
//                   ])}
//                 />
//               ))}
//               {descendents.map(({ x, y, id, data }) => (
//                 <g
//                   key={id}
//                   transform={`translate(${margin +
//                     x * (width - 2 * margin)},${margin +
//                     y * (height - 2 * margin)})`}
//                 >
//                   {/* <text
//                     x={0}
//                     y={10}
//                     textAnchor="middle"
//                     alignmentBaseline="middle"
//                     fontSize={10}
//                   >
//                     {data.name}
//                   </text> */}
//                   <switch>
//                     <foreignObject x={-50} y={0} width={100} height={100}>
//                       <p
//                         xmlns="http://www.w3.org/1999/xhtml"
//                         style={{
//                           fontSize: '10px',
//                           textAlign: 'center',
//                           margin: 0,
//                           padding: '2px',
//                           background: colourMap[data.nodeType],
//                           border: '1px solid black',
//                           wordBreak: 'break-word',
//                         }}
//                       >
//                         {data.name}
//                       </p>
//                     </foreignObject>

//                     <text x="20" y="20">
//                       Your SVG viewer cannot display html.
//                     </text>
//                   </switch>
//                   <circle r={3} cx={0} cy={0} fill="white" stroke="black" />
//                 </g>
//               ))}
//             </svg>
//           );
//         }}
//       </Query>

export default DiseasePage;
