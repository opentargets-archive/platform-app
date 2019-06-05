import React, { Component, Fragment } from 'react';
import { Link } from 'ot-ui';

class Crispr extends Component {
  state = {};

  componentDidMount() {
    const { symbol } = this.props;
    fetch(`https://api.cellmodelpassports.sanger.ac.uk/score_search/${symbol}`)
      .then(res => res.json())
      .then(res => {
        const crisprId =
          res.genes && res.genes.count > 0 ? res.genes.hits[0].id : null;

        this.setState({ crisprId });
      });
  }

  render() {
    const { crisprId } = this.state;
    return crisprId ? (
      <Fragment>
        {' '}
        | CRISPR depmap:{' '}
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

export default Crispr;
