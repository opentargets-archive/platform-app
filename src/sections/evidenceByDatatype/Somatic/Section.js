import React from 'react';
import Typography from '@material-ui/core/Typography';

import UniProtSomaticSection from '../../evidence/UniProtSomatic/Section';
import EVASomaticSection from '../../evidence/EVASomatic/Section';
import CancerGeneCensusSection from '../../evidence/CancerGeneCensus/Section';
import IntOGenSection from '../../evidence/IntOGen/Section';

import { Link } from 'ot-ui';

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
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
          Evidence from <strong>IntOGen</strong>, a database that collects and
          analyses somatic mutations in thousands of tumor genomes to identify
          cancer driver genes. For more information, see{' '}
          <Link to="http://europepmc.org/article/MED/25759023">
            Gonzalez-Perez A et al., 2013
          </Link>
          .
        </Typography>
        <IntOGenSection {...{ ensgId, efoId, data: data.intogen }} />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default Section;
