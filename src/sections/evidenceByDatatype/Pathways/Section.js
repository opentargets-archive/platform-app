import React from 'react';
import { Typography } from '@material-ui/core';

import ReactomeSection from '../../evidence/Reactome/Section';
import SLAPenrichSection from '../../evidence/SLAPenrich/Section';
import PROGENySection from '../../evidence/PROGENy/Section';
import CRISPRSection from '../../evidence/CRISPR/Section';
import SysBioSection from '../../evidence/SysBio/Section';

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
    {data.reactome && data.reactome.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Reactome</strong>.
        </Typography>
        <ReactomeSection {...{ ensgId, efoId, data: data.reactome }} />
      </React.Fragment>
    ) : null}

    {data.slapenrich && data.slapenrich.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>SLAPenrich</strong>.
        </Typography>
        <SLAPenrichSection {...{ ensgId, efoId, data: data.slapenrich }} />
      </React.Fragment>
    ) : null}

    {data.progeny && data.progeny.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>PROGENy</strong>.
        </Typography>
        <PROGENySection {...{ ensgId, efoId, data: data.progeny }} />
      </React.Fragment>
    ) : null}

    {data.crispr && data.crispr.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>CRISPR</strong>.
        </Typography>
        <CRISPRSection {...{ ensgId, efoId, data: data.crispr }} />
      </React.Fragment>
    ) : null}

    {data.sysBio && data.sysBio.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>SysBio</strong>.
        </Typography>
        <SysBioSection {...{ ensgId, efoId, data: data.sysBio }} />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default Section;
