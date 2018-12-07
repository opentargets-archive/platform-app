import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';

const proteinInfoQuery = gql`
  query ProteinInfoQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        protein {
          uniprotId
          pdbId
          keywords {
            id
            name
            category
          }
          subCellularLocations {
            id
            name
          }
          subUnit
        }
      }
    }
  }
`;

const styles = () => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
  keywordCategory: {
    paddingBottom: '0.8rem',
  },
});

class ProteinInformationModal extends React.Component {
  state = {
    value: 'sequenceAnnotation',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, open, symbol, ensgId, onClose } = this.props;
    const { value } = this.state;
    return (
      <Modal className={classes.modalContainer} open={open} onClose={onClose}>
        <Paper className={classes.modalContents}>
          <Typography>
            General information about {symbol} protein from UniProt.
          </Typography>
          <Query query={proteinInfoQuery} variables={{ ensgId }}>
            {({ loading, error, data }) => {
              if (loading || error) return null;

              const {
                uniprotId,
                pdbId,
                keywords,
                subCellularLocations,
                subUnit,
              } = data.target.details.protein;

              const keywordsGrouped = keywords.reduce((acc, d) => {
                if (!acc[d.category]) {
                  acc[d.category] = [];
                }
                acc[d.category].push(d);
                return acc;
              }, {});

              return (
                <React.Fragment>
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="auto"
                  >
                    <Tab
                      value="sequenceAnnotation"
                      label="Sequence annotation"
                    />
                    <Tab value="structure" label="Structure" />
                    <Tab
                      value="subCellularLocation"
                      label="Sub-cellular location"
                    />
                    <Tab value="subUnit" label="Subunit data" />
                    <Tab value="keywords" label="UniProt keywords" />
                  </Tabs>
                  {value === 'sequenceAnnotation' ? (
                    <div>Something...</div>
                  ) : null}
                  {value === 'structure' ? <div>Something...</div> : null}
                  {value === 'subCellularLocation' ? (
                    <div>
                      <ul>
                        {subCellularLocations.map((d, i) => (
                          <li key={i}>
                            <Typography>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.uniprot.org/locations/${
                                  d.id
                                }`}
                              >
                                {d.name}
                              </a>
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {value === 'subUnit' ? (
                    <div>
                      <ul>
                        {subUnit.map((d, i) => (
                          <li key={i}>
                            <Typography>{d}</Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {value === 'keywords' ? (
                    <div>
                      {Object.keys(keywordsGrouped)
                        .sort()
                        .map(c => (
                          <div key={c} className={classes.keywordCategory}>
                            <Typography variant="h6">{c}</Typography>
                            <Typography>
                              {keywordsGrouped[c].map((d, i) => (
                                <React.Fragment key={d.id}>
                                  {i > 0 ? ' | ' : null}

                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.uniprot.org/locations/${
                                      d.id
                                    }`}
                                  >
                                    {d.name}
                                  </a>
                                </React.Fragment>
                              ))}
                            </Typography>
                          </div>
                        ))}
                    </div>
                  ) : null}
                </React.Fragment>
              );
            }}
          </Query>
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(ProteinInformationModal);
