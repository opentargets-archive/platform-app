import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Link, OtTableRF } from 'ot-ui';

import SimplePublication from '../../../common/sections/Bibliography/custom/SimplePublication';

// const columns = [
//   {
//     id: 'disease.id',
//     label: 'Disease',
//     renderCell: d => (
//       <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
//     ),
//     width: '50%'
//   },
//   {
//     id: 'publication.title',
//     label: 'Publication',
//     renderCell: d => (
//       <Link external to={d.publication.id}>
//         {d.publication.title}
//       </Link>
//     ),
//   },
//   {
//     id: 'publication.date',
//     label: 'Year',
//     renderCell: d => d.publication.date,
//   },
// ];

const Section = ({ ensgId, efoId, target, disease, data }) => (
  <React.Fragment>
    {/* <OtTableRF loading={false} error={false} columns={columns} data={data.rows} /> */}
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={16}
    >
      {data.rows.map((p, i) => {
        return (
          <Grid item xs={12} key={i}>
            <SimplePublication
              pmId={p.publication.id}
              title={p.publication.title}
              authors={p.publication.authors.map(a => ({
                ForeName: a.firstName,
                LastName: a.lastName,
              }))}
              journal={{
                title: p.journal.title,
                date: '' + p.journal.year,
                ref: {
                  volume: p.journal.volume,
                  issue: p.journal.issue,
                  pgn: p.journal.page,
                },
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  </React.Fragment>
);

export default Section;
