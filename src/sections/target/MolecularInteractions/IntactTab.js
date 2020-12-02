import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import client from '../../../client';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';
import OtTooltip from './custom/OtTooltip';

import Grid from '@material-ui/core/Grid';
import { Link } from 'ot-ui';

const getData = (query, ensgId, sourceDatabase, index, size) => {
  return client.query({
    query: query,
    variables: {
      ensgId,
      sourceDatabase,
      index,
      size,
    },
  });
};

const onLinkClick = function(e) {
  // handler to stop propagation of clicks on links in table rows
  // to avoid selection of a different row
  e.stopPropagation();
};

const columns = {
  interactions: [
    {
      id: 'targetB',
      label: (
        <>
          Interactor B
          <br />
          <Typography variant="caption">
            Species
            <br />
            Ald ID
          </Typography>
        </>
      ),
      renderCell: row => (
        <>
          {row.targetB ? (
            <Link to={`/target/${row.targetB.id}`} onClick={onLinkClick}>
              {row.targetB.approvedSymbol}
            </Link>
          ) : (
            <Link
              to={`http://uniprot.org/uniprot/${row.intB}`}
              onClick={onLinkClick}
              external
            >
              {row.intB}
            </Link>
          )}
          <br />
          <Typography variant="caption">
            Species: {row.speciesB.mnemonic}
            <br />
            Alt ID:{' '}
            <Link
              to={`http://uniprot.org/uniprot/${row.intB}`}
              onClick={onLinkClick}
              external
            >
              {row.intB}
            </Link>
          </Typography>
        </>
      ),
      width: '40%',
    },
    {
      id: 'scoring',
      label: 'Score',
      renderCell: row => row.scoring,
      width: '14%',
    },
    {
      id: 'biologicalRole',
      label: 'Biological role',
      renderCell: row => (
        <>
          <MethodIconText
            tooltip={row.intABiologicalRole}
            enabled={row.intABiologicalRole}
          >
            A
          </MethodIconText>
          <MethodIconText
            tooltip={row.intBBiologicalRole}
            enabled={row.intBBiologicalRole}
          >
            B
          </MethodIconText>
        </>
      ),
      width: '23%',
    },
    {
      id: 'evidences',
      label: 'Interaction evidence',
      renderCell: row => row.count,
      width: '23%',
      //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
    },
  ],

  evidence: [
    {
      id: 'interactionIdentifier',
      label: 'Identifier',
      renderCell: row => (
        <Link
          to={`http://www.ebi.ac.uk/intact/interaction/${
            row.interactionIdentifier
          }`}
          onClick={onLinkClick}
          external
        >
          {row.interactionIdentifier}
        </Link>
      ),
      width: '25%',
    },
    {
      id: 'interaction',
      label: (
        <>
          Interaction
          <br />
          <Typography variant="caption">Host organism</Typography>
        </>
      ),
      renderCell: row => (
        <>
          {row.interactionTypeShortName}
          <br />
          <OtTooltip title={row.hostOrganismScientificName} placement="top">
            <Typography variant="caption" noWrap display="block">
              {row.hostOrganismScientificName}
            </Typography>
          </OtTooltip>
        </>
      ),
      width: '30%',
    },
    {
      id: 'methods',
      label: 'Detection methods',
      renderCell: row => (
        <>
          <MethodIconText
            tooltip={row.participantDetectionMethodA.map(m => m.shortName)}
            enabled={
              row.participantDetectionMethodA &&
              row.participantDetectionMethodA.length > 0 &&
              row.participantDetectionMethodA[0].shortName
            }
          >
            A
          </MethodIconText>
          <MethodIconArrow
            tooltip={row.interactionDetectionMethodShortName}
            enabled={row.interactionDetectionMethodShortName}
          />
          <MethodIconText
            tooltip={row.participantDetectionMethodB[0].shortName}
            enabled={
              row.participantDetectionMethodB &&
              row.participantDetectionMethodB.length > 0 &&
              row.participantDetectionMethodB[0].shortName
            }
          >
            B
          </MethodIconText>
        </>
      ),
      width: '25%',
    },
    {
      id: 'pubmedId',
      label: 'Publication',
      renderCell: d =>
        d.pubmedId && d.pubmedId.indexOf('unassigned') === -1 ? (
          <Link external to={`http://europepmc.org/abstract/MED/${d.pubmedId}`}>
            {d.pubmedId}
          </Link>
        ) : (
          d.pubmedId
        ),
      width: '20%',
    },
  ],
};

const id = 'intact';
const index = 0;
const size = 5000;

function IntactTab({ ensgId, symbol, query }) {
  const [data, setData] = useState([]);
  const [evidence, setEvidence] = useState([]);

  // load tab data when new tab selected (also on first load)
  useEffect(
    () => {
      getData(query, ensgId, id, index, size).then(res => {
        if (res.data.target.interactions) {
          setData(res.data.target.interactions.rows);
          setEvidence(res.data.target.interactions.rows[0].evidences);
        }
      });
    },
    [ensgId]
  );

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={5}>
        {/* table 1: interactions */}
        <DataTable
          showGlobalFilter
          columns={columns.interactions}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
          hover
          selected
          onRowClick={(r, i) => {
            setEvidence(r.evidences);
          }}
          rowIsSelectable
          fixed
          noWrapHeader={false}
        />
      </Grid>

      {/* table 2: evidence */}
      <Grid item xs={12} md={7}>
        <DataTable
          showGlobalFilter
          columns={columns.evidence}
          rows={evidence}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
          fixed
          noWrapHeader={false}
        />
      </Grid>
    </Grid>
  );
}

export default IntactTab;
