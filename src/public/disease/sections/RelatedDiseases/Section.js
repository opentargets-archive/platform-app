import React from 'react';
import * as d3 from 'd3';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { OtTableRF, Link, significantFigures } from 'ot-ui';

import LinearVenn, { LinearVennLegend } from '../../../common/LinearVenn';

const columns = (name, maxTargetCountAOrB) => [
  {
    id: 'B.name',
    label: 'Related disease',
    renderCell: d => <Link to={`/disease/${d.B.id}`}>{d.B.name}</Link>,
    comparator: (a, b) => {
      if (a.B.name <= b.B.name) {
        return -1;
      }
      return 1;
    },
  },
  {
    id: 'score',
    label: 'Similarity score',
    renderCell: d => significantFigures(d.score),
  },
  {
    id: 'targetCountANotB',
    label: `Targets associated with ${name} but not the related disease`,
  },
  {
    id: 'targetCountAAndB',
    label: 'Shared target associations',
  },
  {
    id: 'targetCountBNotA',
    label: `Targets associated with the related disease but not ${name}`,
  },
  {
    id: 'chart',
    label: (
      <LinearVennLegend
        a={`Targets associated with ${name} but not the related disease`}
        b={`Targets associated with the related disease but not ${name}`}
        aAndB="Shared target associations"
      />
    ),
    renderCell: d => (
      <LinearVenn
        aOnly={d.targetCountANotB}
        bOnly={d.targetCountBNotA}
        aAndB={d.targetCountAAndB}
        max={maxTargetCountAOrB}
      />
    ),
  },
];

// It would be nice to have an animation when the row expands
// like with Collapse or ExpansionPanels, but this seems to not
// play well with tables (tried but errors seen).
// https://github.com/mui-org/material-ui/issues/10052
class TableRowComponent extends React.Component {
  state = {
    expanded: false,
  };
  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
  render() {
    const { children } = this.props;
    const { expanded } = this.state;
    return (
      <React.Fragment>
        <TableRow onClick={this.handleClick}>{children}</TableRow>
        {expanded && (
          <TableRow>
            <TableCell colSpan="100%">
              TODO: Fill me in with the targets and their association scores
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  }
}

const Section = ({ efoId, name, data }) => {
  const { rows } = data;
  const maxTargetCountAOrB = d3.max(rows, d => d.targetCountAOrB);
  const rowsMapped = rows.map(d => ({
    ...d,
    targetCountANotB: d.targetCountA - d.targetCountAAndB,
    targetCountBNotA: d.targetCountB - d.targetCountAAndB,
  }));

  return (
    <OtTableRF
      loading={false}
      error={false}
      columns={columns(name, maxTargetCountAOrB)}
      data={rowsMapped}
      sortBy="score"
      order="desc"
      tableRowComponent={TableRowComponent}
    />
  );
};

export default Section;
