import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

const TableRowContainer = withStyles(theme => ({
  root: {
    border: `2px solid ${theme.palette.primary.main}`,
    margin: '16px 0',
  },
}))(({ classes, children }) => <div className={classes.root}>{children}</div>);

// It would be nice to have an animation when the row expands
// like with Collapse or ExpansionPanels, but this seems to not
// play well with tables (tried but errors seen).
// https://github.com/mui-org/material-ui/issues/10052
class ExpandableTableRow extends React.Component {
  state = {
    expanded: false,
  };
  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
  render() {
    const { children, data, ExpandedComponent } = this.props;
    const { expanded } = this.state;
    return (
      <React.Fragment>
        <TableRow>
          {children}
          <TableCell>
            <IconButton onClick={this.handleClick}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        {expanded && (
          <TableRow>
            <TableCell colSpan="100%">
              <TableRowContainer>
                <ExpandedComponent data={data} />
              </TableRowContainer>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  }
}

export default ExpandableTableRow;
