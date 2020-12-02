import React, { Fragment, useState, useEffect } from 'react';
import client from '../../../client';
import _ from 'lodash';
import { gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';

import IntactTab from './IntactTab';
import SignorTab from './SignorTab';
import ReactomeTab from './ReactomeTab';
import StringTab from './StringTab';

const INTERACTIONS_STATS_QUERY = gql`
  query InteractionsSectionQuery($ensgId: String!) {
    interactionResources {
      databaseVersion
      sourceDatabase
    }

    target(ensemblId: $ensgId) {
      id
      intact: interactions(sourceDatabase: "intact") {
        count
      }
      signor: interactions(sourceDatabase: "signor") {
        count
      }
      reactome: interactions(sourceDatabase: "reactome") {
        count
      }
      string: interactions(sourceDatabase: "string") {
        count
      }
    }
  }
`;

const INTERACTIONS_TAB_QUERY = gql`
  query InteractionsSectionQuery(
    $ensgId: String!
    $sourceDatabase: String
    $index: Int = 0
    $size: Int = 10
  ) {
    target(ensemblId: $ensgId) {
      id
      approvedName
      approvedSymbol

      interactions(
        sourceDatabase: $sourceDatabase
        page: { index: $index, size: $size }
      ) {
        count
        rows {
          intA
          intABiologicalRole
          targetA {
            id
            approvedSymbol
          }
          speciesA {
            mnemonic
          }
          intB
          intBBiologicalRole
          targetB {
            id
            approvedSymbol
          }
          speciesB {
            mnemonic
          }
          scoring
          count
          sourceDatabase
          evidences {
            evidenceScore
            hostOrganismScientificName
            interactionDetectionMethodMiIdentifier
            interactionDetectionMethodShortName
            interactionIdentifier
            interactionTypeShortName
            participantDetectionMethodA {
              miIdentifier
              shortName
            }
            participantDetectionMethodB {
              miIdentifier
              shortName
            }
            interactionDetectionMethodShortName
            expansionMethodShortName
            pubmedId
          }
        }
      }
    }
  }
`;

const INTERACTIONS_STRING_TAB_QUERY = gql`
  query InteractionsSectionQuery(
    $ensgId: String!
    $sourceDatabase: String
    $index: Int = 0
    $size: Int = 10
  ) {
    target(ensemblId: $ensgId) {
      id
      interactions(
        sourceDatabase: $sourceDatabase
        page: { index: $index, size: $size }
      ) {
        rows {
          intA
          intB
          targetB {
            approvedSymbol
            id
          }
          scoring
          evidences {
            evidenceScore
            interactionDetectionMethodShortName
          }
        }
      }
    }
  }
`;

const getSummaryCounts = ensgId => {
  return client.query({
    query: INTERACTIONS_STATS_QUERY,
    variables: {
      ensgId,
    },
  });
};

const sources = [
  {
    label: 'IntAct',
    id: 'intact',
    countDescription: 'molecular interactions',
  },
  {
    label: 'Signor',
    id: 'signor',
    countDescription: 'directional, causal interactions',
  },
  {
    label: 'Reactome',
    id: 'reactome',
    countDescription: 'pathway-based interactions',
  },
  {
    label: 'String',
    id: 'string',
    countDescription: 'functional interactions',
  },
];

function Body({ definition, label: symbol, id }) {
  const request = usePlatformApi();
  const [source, setSource] = useState(sources[0].id);
  const [counts, setCounts] = useState({});
  const [versions, setVersions] = useState({});

  const onTabChange = (event, tabId) => {
    setSource(tabId);
  };

  // load tabs summary counts
  useEffect(
    () => {
      getSummaryCounts(id).then(res => {
        // when there is no data, interactions object is null, so there is no count
        setCounts(
          Object.assign(
            {},
            ...sources.map(k => ({
              [k.id]: res.data.target[k.id] ? res.data.target[k.id].count : 0,
            }))
          )
        );
        // set the sources database versions
        setVersions(
          res.data.interactionResources.reduce((a, v) => {
            a[v.sourceDatabase] = v.databaseVersion;
            return a;
          }, {})
        );
      });
    },
    [id]
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        return (
          <>
            {/* Interaction Resource */}
            <Tabs
              value={source}
              onChange={onTabChange}
              aria-label="simple tabs example"
            >
              {sources.map((s, i) => {
                return (
                  <Tab
                    label={
                      <>
                        <Typography variant="h6">{s.label}</Typography>
                        {versions[s.id] ? (
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Version: {versions[s.id]}
                          </Typography>
                        ) : null}
                        <Typography variant="body2" gutterBottom>
                          {counts[s.id]} {s.countDescription}
                        </Typography>
                      </>
                    }
                    value={s.id}
                    key={i}
                    disabled={counts[s.id] === 0}
                  />
                );
              })}
            </Tabs>

            <div style={{ marginTop: '50px' }}>
              {/* intact stuff */}
              {source === 'intact' && (
                <IntactTab
                  ensgId={id}
                  symbol={symbol}
                  query={INTERACTIONS_TAB_QUERY}
                />
              )}

              {/* signor stuff */}
              {source === 'signor' && (
                <SignorTab
                  ensgId={id}
                  symbol={symbol}
                  query={INTERACTIONS_TAB_QUERY}
                />
              )}

              {/* reactome stuff */}
              {source === 'reactome' && (
                <ReactomeTab
                  ensgId={id}
                  symbol={symbol}
                  query={INTERACTIONS_TAB_QUERY}
                />
              )}

              {/* string stuff */}
              {source === 'string' && (
                <StringTab
                  ensgId={id}
                  symbol={symbol}
                  query={INTERACTIONS_STRING_TAB_QUERY}
                />
              )}
            </div>
          </>
        );
      }}
    />
  );
}

export default Body;
