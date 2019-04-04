import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab } from 'ot-ui';
import withStyles from '@material-ui/core/styles/withStyles';

import Structure from './Structure';
import ProtVistaRenderer from './ProtVistaRenderer';

const query = gql`
  query ProteinInfoQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        protein {
          uniprotId
          pdbId
          pdbs {
            pdbId
            chain
            start
            end
            coverage
            resolution
            method
          }
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
          structuralFeatures {
            type
            start
            end
          }
          sequenceLength
        }
      }
    }
  }
`;

const styles = () => ({
  keywordCategory: {
    paddingBottom: '0.8rem',
  },
  tabPanel: {
    marginTop: '20px',
  },
});

class ProteinInformationModal extends React.Component {
  state = {
    value: 'sequenceAnnotation',
  };

  handleChange = (_, value) => {
    this.setState({ value });
  };

  makePmidLink = match => {
    var id = match.substring(7);
    return `PMID: <a href="https://europepmc.org/abstract/med/${id}" target="_blank">${id}</a>`;
  };

  render() {
    const { classes, ensgId } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const {
              uniprotId,
              pdbId,
              pdbs,
              keywords,
              subCellularLocations,
              subUnit,
              structuralFeatures,
              sequenceLength,
            } = data.target.details.protein;

            const keywordsGrouped = keywords.reduce((acc, d) => {
              if (!acc[d.category]) {
                acc[d.category] = [];
              }
              acc[d.category].push(d);
              return acc;
            }, {});

            return (
              <Fragment>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="sequenceAnnotation" label="Sequence annotation" />
                  <Tab value="structure" label="Structure" />
                  <Tab
                    value="subCellularLocation"
                    label="Sub-cellular location"
                  />
                  <Tab value="subUnit" label="Subunit data" />
                  <Tab value="keywords" label="UniProt keywords" />
                </Tabs>
                <div className={classes.tabPanel}>
                  {value === 'sequenceAnnotation' ? (
                    <ProtVistaRenderer uniprotId={uniprotId} />
                  ) : null}
                  {value === 'structure' ? (
                    <Structure
                      {...{ pdbId, pdbs, structuralFeatures, sequenceLength }}
                    />
                  ) : null}
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
                        {subUnit.map((d, i) => {
                          // replace PMIDs and 'by similarity' with appropriate links
                          const desc = d
                            .replace(/Pubmed:\d+/gi, this.makePmidLink)
                            .replace(
                              /\(By similarity\)/gi,
                              match =>
                                `(<a href='https://www.uniprot.org/uniprot/${uniprotId}#interaction' target="_blank" rel="noopener noreferrer">By similarity</a>)`
                            );

                          return (
                            <li key={i}>
                              <Typography
                                dangerouslySetInnerHTML={{ __html: desc }}
                              />
                            </li>
                          );
                        })}
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
                                <Fragment key={d.id}>
                                  {i > 0 ? ' | ' : null}

                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.uniprot.org/keywords/${
                                      d.id
                                    }`}
                                  >
                                    {d.name}
                                  </a>
                                </Fragment>
                              ))}
                            </Typography>
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ProteinInformationModal);
