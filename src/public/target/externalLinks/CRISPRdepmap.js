import React, { Component, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';

const styles = () => ({
  helpIcon: {
    fontSize: '10px',
  },
  tooltip: {
    backgroundColor: 'black',
  },
});

class Crispr extends Component {
  state = {};

  componentDidMount() {
    const { symbol } = this.props;
    fetch(`https://api.cellmodelpassports.sanger.ac.uk/score_search/${symbol}`)
      .then(res => res.json())
      .then(res => {
        const crisprId =
          res.genes &&
          res.genes.hits.length > 0 &&
          res.genes.hits[0].symbol.toUpperCase() === symbol.toUpperCase()
            ? res.genes.hits[0].id
            : null;

        this.setState({ crisprId });
      });
  }

  render() {
    const { classes, first } = this.props;
    const { crisprId } = this.state;

    return crisprId ? (
      <Fragment>
        {first ? null : ' | '}
        CRISPR depmap
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          title="CRISPR-Cas9 cancer cell line dependency data from Project Score"
          placement="top"
          interactive
        >
          <sup>
            <HelpIcon className={classes.helpIcon} />
          </sup>
        </Tooltip>
        :{' '}
        <Link
          external
          to={`https://score.depmap.sanger.ac.uk/gene/${crisprId}`}
        >
          {crisprId}
        </Link>
      </Fragment>
    ) : null;
  }
}

export default withStyles(styles)(Crispr);
