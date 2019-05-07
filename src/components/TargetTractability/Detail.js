import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
  table: {
    borderCollapse: 'collapse',
  },
  cell: {
    border: '1px solid black',
  },
  purpleCell: {
    backgroundColor: PALETTE.purple,
    color: 'white',
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
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.cell} colSpan="3">
                    <Typography variant="subtitle2">
                      Clinical precedence
                    </Typography>
                  </th>
                  <th className={classes.cell} colSpan="2">
                    <Typography variant="subtitle2">
                      Discovery precedence
                    </Typography>
                  </th>
                  <th className={classes.cell} colSpan="3">
                    <Typography variant="subtitle2">
                      Predicted tractable
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {smallMolecule.map(m => {
                    return (
                      <td
                        className={classNames(classes.cell, {
                          [classes.purpleCell]: m.value,
                        })}
                        key={m.chemblBucket}
                      >
                        <Typography color="inherit" variant="caption">
                          {m.description}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <Typography variant="h6">Antibody</Typography>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.cell} colSpan="3">
                    <Typography variant="subtitle2">
                      Clinical precedence
                    </Typography>
                  </th>
                  <th className={classes.cell} colSpan="2">
                    <Typography variant="subtitle2">
                      Predicted tractable - high confidence
                    </Typography>
                  </th>
                  <th className={classes.cell} colSpan="4">
                    <Typography variant="subtitle2">
                      Predicted tractable - medium to low confidence
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {antibody.map(ab => {
                    return (
                      <td
                        className={classNames(classes.cell, {
                          [classes.purpleCell]: ab.value,
                        })}
                        key={ab.chemblBucket}
                      >
                        <Typography color="inherit" variant="caption">
                          {ab.description}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(TargetTractabilityDetail);
