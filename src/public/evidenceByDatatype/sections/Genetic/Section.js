import React from 'react';
import Typography from '@material-ui/core/Typography';

import GWASCatalogSection from '../../../evidence/sections/GWASCatalog/Section';
import UniProtSection from '../../../evidence/sections/UniProt/Section';
import UniProtLiteratureSection from '../../../evidence/sections/UniProtLiterature/Section';
import EVASection from '../../../evidence/sections/EVA/Section';
import GenomicsEnglandSection from '../../../evidence/sections/GenomicsEngland/Section';
import Gene2PhenotypeSection from '../../../evidence/sections/Gene2Phenotype/Section';

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
    {data.gwasCatalog && data.gwasCatalog.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>GWAS Catalog</strong>.
        </Typography>
        <GWASCatalogSection {...{ ensgId, efoId, data: data.gwasCatalog }} />
      </React.Fragment>
    ) : null}
    {data.uniProt && data.uniProt.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>UniProt</strong>.
        </Typography>
        <UniProtSection {...{ ensgId, efoId, data: data.uniProt }} />
      </React.Fragment>
    ) : null}

    {data.uniProtLiterature && data.uniProtLiterature.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>UniProt Literature</strong>.
        </Typography>
        <UniProtLiteratureSection
          {...{ ensgId, efoId, data: data.uniProtLiterature }}
        />
      </React.Fragment>
    ) : null}

    {data.eva && data.eva.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>EVA</strong>.
        </Typography>
        <EVASection {...{ ensgId, efoId, data: data.eva }} />
      </React.Fragment>
    ) : null}

    {data.genomicsEngland && data.genomicsEngland.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Genomics England</strong>.
        </Typography>
        <GenomicsEnglandSection
          {...{ ensgId, efoId, data: data.genomicsEngland }}
        />
      </React.Fragment>
    ) : null}

    {data.gene2Phenotype && data.gene2Phenotype.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Gene2Phenotype</strong>.
        </Typography>
        <Gene2PhenotypeSection
          {...{ ensgId, efoId, data: data.gene2Phenotype }}
        />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default Section;
