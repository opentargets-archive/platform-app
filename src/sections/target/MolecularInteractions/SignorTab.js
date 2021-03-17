import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import client from '../../../client';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';
import Tooltip from '../../../components/Tooltip';

import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Link from '../../../components/Link';
import EllsWrapper from '../../../components/EllsWrapper';
import { defaultRowsPerPageOptions } from '../../../constants';

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
  // interactions table columns
  interactions: [
    // {
    //   id: 'targetA',
    //   label: (
    //     <>
    //       Interactor A
    //       <br />
    //       <Typography variant="caption">Alt ID</Typography>
    //     </>
    //   ),
    //   renderCell: row => (
    //     <>
    //       {row.targetA ? (
    //         <Link to={`/target/${row.targetA.id}`} onClick={onLinkClick}>
    //           {row.targetA.approvedSymbol}
    //         </Link>
    //       ) : (
    //         <Link
    //           to={`http://uniprot.org/uniprot/${row.intA}`}
    //           onClick={onLinkClick}
    //           external
    //         >
    //           {row.intA}
    //         </Link>
    //       )}
    //       {row.speciesA && row.speciesA?.mnemonic.toLowerCase() !== 'human' ? (
    //         <Tooltip title={row.speciesA?.mnemonic} showHelpIcon />
    //       ) : null}
    //       <br />
    //       <Typography variant="caption">
    //         Alt ID:{' '}
    //         <Link
    //           to={`http://uniprot.org/uniprot/${row.intA}`}
    //           onClick={onLinkClick}
    //           external
    //         >
    //           {row.intA}
    //         </Link>
    //       </Typography>
    //     </>
    //   ),
    //   width: '27%',
    // },
    {
      id: 'targetB',
      label: (
        <>
          Interactor B
          <br />
          <Typography variant="caption">Ald ID</Typography>
        </>
      ),
      renderCell: row => (
        <>
          <EllsWrapper
            title={row.targetB ? row.targetB.approvedSymbol : row.intB}
          >
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
          </EllsWrapper>
          {row.speciesB && row.speciesB?.mnemonic.toLowerCase() !== 'human' ? (
            <Tooltip title={row.speciesB?.mnemonic} showHelpIcon />
          ) : null}
          <br />
          <EllsWrapper title={row.intB}>
            <Typography variant="caption">
              Alt ID:{' '}
              <Link
                to={`http://uniprot.org/uniprot/${row.intB}`}
                onClick={onLinkClick}
                external
              >
                {row.intB}
              </Link>
            </Typography>
          </EllsWrapper>
        </>
      ),
      width: '44%',
    },
    {
      id: 'role',
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
      width: '28%',
    },
    {
      id: 'evidences',
      label: 'Interaction evidence entries',
      renderCell: row => (
        <>
          {row.count}
          <span className={'selected-evidence'}>
            <FontAwesomeIcon icon={faPlay} />
          </span>
        </>
      ),
      width: '28%',
    },
  ],

  // evidence table
  evidence: [
    {
      id: 'interactionIdentifier',
      label: 'Identifier',
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
          <EllsWrapper>{row.interactionTypeShortName}</EllsWrapper>
          <br />
          <EllsWrapper title={row.hostOrganismScientificName}>
            <Typography variant="caption">
              {row.hostOrganismScientificName}
            </Typography>
          </EllsWrapper>
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

const id = 'signor';
const index = 0;
const size = 5000;

function SignorTab({ ensgId, symbol, query }) {
  const [data, setData] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [selectedInteraction, setSelectedInteraction] = useState([]);

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
        <Typography variant="h6" gutterBottom>
          {symbol}{' '}
          <MethodIconText notooltip enabled>
            A
          </MethodIconText>{' '}
          interactors
        </Typography>
        <DataTable
          showGlobalFilter
          columns={columns.interactions}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
          hover
          selected
          onRowClick={(r, i) => {
            setEvidence(r.evidences);
            setSelectedInteraction(i);
          }}
          rowIsSelectable
          fixed
          noWrapHeader={false}
          onPagination={(page, pageSize) => {
            setEvidence(data[page * pageSize].evidences);
            setSelectedInteraction(0);
          }}
          rowsPerPageOptions={defaultRowsPerPageOptions}
        />
      </Grid>

      {/* table 2: evidence */}
      <Grid item xs={12} md={7}>
        <Typography variant="h6" gutterBottom>
          Interaction evidence
        </Typography>
        <DataTable
          showGlobalFilter
          columns={columns.evidence}
          rows={evidence}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
          fixed
          noWrapHeader={false}
          rowsPerPageOptions={defaultRowsPerPageOptions}
        />
      </Grid>
    </Grid>
  );
}

export default SignorTab;
