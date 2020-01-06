import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';
import LevelBar from '../../../common/LevelBar';

const styles = theme => ({
  levelBarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  levelBar: {
    backgroundColor: theme.palette.primary.main,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    height: '10px',
    marginRight: '5px',
  },
});

const Section = ({ classes, data, name }) => {
  const maxLlr = data.rows[0].llr;
  const columns = [
    {
      id: 'event',
      label: 'Adverse event',
      renderCell: d => _.upperFirst(d.event),
      width: '35%',
    },
    {
      id: 'count',
      label: 'Number of reported events',
      width: '15%',
    },
    {
      id: 'llr',
      label: `Log likelihood ratio (CV = ${data.critval})`,
      renderCell: d => {
        const w = ((d.llr / maxLlr) * 85).toFixed(2); // scale to max 85% of the width to allows space for label
        return (
          <div className={classes.levelBarContainer}>
            <div
              className={classes.levelBar}
              style={{
                width: `${w}%`,
              }}
            ></div>
            <div>{d.llr.toFixed(2)}</div>
          </div>
        );
      },
      width: '50%',
    },
  ];

  return (
    <React.Fragment>
      <DataDownloader
        tableHeaders={columns}
        rows={data.rows}
        fileStem={`${name}-pharmacovigilance`}
      />
      <OtTableRF
        loading={false}
        error={false}
        columns={columns}
        data={data.rows}
        pageSize={data.rows.length || 25}
      />
    </React.Fragment>
  );
};

// export default Section;
export default withStyles(styles)(Section);
