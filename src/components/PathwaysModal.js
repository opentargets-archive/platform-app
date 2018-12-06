import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import { OtTable } from 'ot-ui';

const styles = () => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
  topLevelPathwayContainer: {
    border: '1px solid black',
    textAlign: 'center',
    minHeight: '1.8rem',
    height: '100%',
  },
  topLevelPathwayContainerHighlight: {
    backgroundColor: '#891C76',
    color: 'white',
  },
});

const pathwaysQuery = gql`
  query PathwaysQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        pathways {
          topLevelPathways {
            id
            name
            isAssociated
          }
          lowLevelPathways {
            id
            name
            parents {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const columns = [
  { id: 'name', label: 'Pathway' },
  {
    id: 'id',
    label: 'Reactome ID',
    renderCell: d => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://reactome.org/content/detail/${d.id}`}
      >
        {d.id}
      </a>
    ),
  },
  {
    id: 'parents',
    label: 'Top-level pathway',
    renderCell: d => (
      <React.Fragment>
        {d.parents.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <br /> : null}
            {p.name}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
  },
  {
    id: 'diagram',
    label: 'View diagram',
    renderCell: d => (
      <React.Fragment>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://reactome.org/ContentService/exporter/diagram/${
            d.id
          }.svg`}
        >
          SVG
        </a>{' '}
        |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://reactome.org/ContentService/exporter/diagram/${
            d.id
          }.png`}
        >
          PNG
        </a>
      </React.Fragment>
    ),
  },
];

const PathwaysModal = ({ classes, open, ensgId, symbol, onClose }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>Pathway information for {symbol} from Reactome</Typography>
        <Query query={pathwaysQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const {
              topLevelPathways,
              lowLevelPathways,
            } = data.target.details.pathways;
            return (
              <React.Fragment>
                <Grid container alignItems="stretch" spacing={8}>
                  {topLevelPathways.map(d => (
                    <Grid item xs={4} md={2} key={d.id}>
                      <div
                        className={classNames(
                          classes.topLevelPathwayContainer,
                          {
                            [classes.topLevelPathwayContainerHighlight]:
                              d.isAssociated,
                          }
                        )}
                      >
                        <Typography color="inherit">{d.name}</Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
                <OtTable
                  loading={false}
                  error={null}
                  columns={columns}
                  data={lowLevelPathways}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(PathwaysModal);
