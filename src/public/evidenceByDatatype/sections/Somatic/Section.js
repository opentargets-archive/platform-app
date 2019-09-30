import React from 'react';
import Typography from '@material-ui/core/Typography';

import UniProtSomaticSection from '../../../evidence/sections/UniProtSomatic/Section';
import EVASomaticSection from '../../../evidence/sections/EVASomatic/Section';
import CancerGeneCensusSection from '../../../evidence/sections/CancerGeneCensus/Section';
import IntOGenSection from '../../../evidence/sections/IntOGen/Section';

const Section = ({ ensgId, efoId, data }) => (
  <div>
    {data.uniProtSomatic && data.uniProtSomatic.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>UniProt Somatic</strong>.
        </Typography>
        <UniProtSomaticSection
          {...{ ensgId, efoId, data: data.uniProtSomatic }}
        />
      </React.Fragment>
    ) : null}

    {data.evaSomatic && data.evaSomatic.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>EVA Somatic</strong>.
        </Typography>
        <EVASomaticSection {...{ ensgId, efoId, data: data.evaSomatic }} />
      </React.Fragment>
    ) : null}

    {data.cancerGeneCensus && data.cancerGeneCensus.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Cancer Gene Census</strong>.
        </Typography>
        <CancerGeneCensusSection
          {...{ ensgId, efoId, data: data.cancerGeneCensus }}
        />
      </React.Fragment>
    ) : null}

    {data.intogen && data.intogen.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>IntOGen</strong>.
        </Typography>
        <IntOGenSection {...{ ensgId, efoId, data: data.intogen }} />
      </React.Fragment>
    ) : null}
  </div>
);

export default Section;
