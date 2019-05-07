import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
// import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { PALETTE } from 'ot-ui';

const query = gql`
  query TargetTractabilityQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        tractability {
          smallMolecule {
            chemblBucket
            description
            value
          }
          antibody {
            chemblBucket
            description
            value
          }
        }
      }
    }
  }
`;

const styles = () => ({
  cell: {
    backgroundColor: PALETTE.purple,
  },
});

const TargetTractabilityDetail = ({ classes, ensgId }) => {
  return (
    <Query query={query} variables={{ ensgId }}>
      {({ loading, error, data }) => {
        if (loading || error) return null;
        const { antibody, smallMolecule } = data.target.details.tractability;
        console.log('antibody', antibody);
        console.log('smallMolecule', smallMolecule);
        return (
          <Fragment>
            <Typography variant="h6">Small molecule</Typography>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">Clinical precedence</th>
                  <th colSpan="2">Discovery precedence</th>
                  <th colSpan="3">Predicted tractable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {smallMolecule.map(m => {
                    return (
                      <td
                        className={classNames({ [classes.cell]: m.value })}
                        key={m.chemblBucket}
                      >
                        {m.description}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <Typography variant="h6">Antibody</Typography>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">Clinical precedence</th>
                  <th colSpan="2">Predicted tractable - high confidence</th>
                  <th colSpan="4">
                    Predicted tractable - medium to low confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {antibody.map(ab => {
                  return (
                    <td className={classNames({ [classes.cell]: ab.value })}>
                      {ab.description}
                    </td>
                  );
                })}
              </tbody>
            </table>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(TargetTractabilityDetail);
