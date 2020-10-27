import React, { Fragment, useState, useEffect } from 'react';
import client from '../../../client';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import IntactTab from './IntactTab';
import SignorTab from './SignorTab';
import ReactomeTab from './ReactomeTab';
import StringTab from './StringTab';

const SECTION_COUNTS_QUERY = loader('./sectionCountsQuery.gql');

const getSummaryCounts = ensgId => {
  return client.query({
    query: SECTION_COUNTS_QUERY,
    variables: {
      ensgId,
    },
  });
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

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

const Section = ({ ensgId, symbol }) => {
  const [source, setSource] = useState(sources[0].id);
  const [counts, setCounts] = useState({});

  const onTabChange = (event, tabId) => {
    setSource(tabId);
  };

  // load tabs summary counts
  useEffect(
    () => {
      getSummaryCounts(ensgId).then(res => {
        // when there is no data, interactions object is null, so there is no count
        setCounts(
          Object.assign(
            {},
            ...sources.map(k => ({
              [k.id]: res.data.target[k.id] ? res.data.target[k.id].count : 0,
            }))
          )
        );
      });
    },
    [ensgId]
  );

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
                  {/* <Typography variant="caption" display="block" gutterBottom>
                    {s.version}
                  </Typography> */}
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

      <div style={{ marginTop: '30px' }}>
        {/* intact stuff */}
        {source === 'intact' && <IntactTab ensgId={ensgId} symbol={symbol} />}

        {/* signor stuff */}
        {source === 'signor' && <SignorTab ensgId={ensgId} symbol={symbol} />}

        {/* reactome stuff */}
        {source === 'reactome' && (
          <ReactomeTab ensgId={ensgId} symbol={symbol} />
        )}

        {/* string stuff */}
        {source === 'string' && <StringTab ensgId={ensgId} symbol={symbol} />}
      </div>
    </>
  );
};

export default withStyles(styles)(Section);
