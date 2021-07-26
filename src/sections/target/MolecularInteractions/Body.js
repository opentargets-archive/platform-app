import React, { useState, useEffect } from 'react';
import client from '../../../client';
import { loader } from 'graphql.macro';
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

const INTERACTIONS_STATS_QUERY = loader('./InteractionsStats.gql');

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
  const [source, setSource] = useState(sources[0].id); //must initialize to valid value for tabs to work
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
        // find first source (tab) with data and set that as the initially selected tab
        const initialTab = sources.find(
          s => res.data.target[s.id] && res.data.target[s.id].count > 0
        );
        if (initialTab) {
          setSource(initialTab.id);
        }
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
              {source === 'intact' && counts[source] > 0 && (
                <IntactTab ensgId={id} symbol={symbol} />
              )}

              {/* signor stuff */}
              {source === 'signor' && counts[source] > 0 && (
                <SignorTab ensgId={id} symbol={symbol} />
              )}

              {/* reactome stuff */}
              {source === 'reactome' && counts[source] > 0 && (
                <ReactomeTab ensgId={id} symbol={symbol} />
              )}

              {/* string stuff */}
              {source === 'string' && counts[source] > 0 && (
                <StringTab ensgId={id} symbol={symbol} />
              )}
            </div>
          </>
        );
      }}
    />
  );
}

export default Body;
