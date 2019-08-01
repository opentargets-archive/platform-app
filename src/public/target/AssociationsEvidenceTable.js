import React from 'react';
import * as d3 from 'd3';

import { Link, OtTableRF, significantFigures } from 'ot-ui';

const diseaseColumn = {
  id: 'disease',
  label: 'Disease',
  ellipsisWidth: '100px',
  renderCell: d => d.disease.efo_info.label,
  comparator: (a, b) =>
    d3.ascending(a.disease.efo_info.label, b.disease.efo_info.label),
};
const literatureColumn = {
  id: 'literature',
  label: 'Publications',
  renderCell: d => `${d.literature.references.length} publications`,
};
const variantColumn = {
  id: 'variant',
  label: 'Variant',
  renderCell: d => (
    <Link
      external
      to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${d.variant.id
        .split('/')
        .pop()}`}
    >
      {d.variant.id.split('/').pop()}
    </Link>
  ),
};

const dataSourceColumns = {
  ds__cancer_gene_census: [],
  ds__chembl: [],
  ds__crispr: [],
  ds__europepmc: [],
  ds__eva: [],
  ds__eva_somatic: [],
  ds__expression_atlas: [],
  ds__gene2phenotype: [],
  ds__genomics_england: [],
  ds__gwas_catalog: [
    diseaseColumn,
    variantColumn,
    {
      id: 'variantType',
      label: 'Variant type',
      tooltip:
        'Variant type: Predicted consequence of variants on genes associated with diseases',
      renderCell: () => 'TODO: Ensembl API',
    },
    {
      id: 'pValue',
      label: 'p-value',
      renderCell: d => significantFigures(d.unique_association_fields.pvalue),
    },
    {
      id: 'oddsRatio',
      label: 'Odds ratio (confidence)',
      renderCell: d => (
        <React.Fragment>
          {significantFigures(d.unique_association_fields.odd_ratio)}
          <br />({d.unique_association_fields.confidence_interval})
        </React.Fragment>
      ),
    },
    {
      id: 'source',
      label: 'Source',
      renderCell: d => (
        <Link
          external
          to={`https://www.ebi.ac.uk/gwas/search?query=${d.variant.id
            .split('/')
            .pop()}`}
        >
          GWAS Catalog
        </Link>
      ),
    },
    literatureColumn,
  ],
  ds__intogen: [],
  ds__phenodigm: [],
  ds__phewas_catalog: [],
  ds__progeny: [],
  ds__reactome: [],
  ds__slapenrich: [],
  ds__sysbio: [],
  ds__uniprot: [],
  ds__uniprot_literature: [
    diseaseColumn,
    {
      id: 'source',
      label: 'Source',
      renderCell: d => (
        <Link external to={d.evidence.urls[0].url}>
          {d.evidence.urls[0].nice_name}
        </Link>
      ),
    },
    literatureColumn,
  ],
  ds__uniprot_somatic: [],
};

class AssociationsEvidenceTable extends React.Component {
  state = {
    data: [],
    columns: [],
  };
  getEvidence = () => {
    const { ensgId, efoId, dataSourceId, indirects } = this.props;
    const mappedDataSourceId = dataSourceId.split('__')[1];
    const url = `https://platform-api.opentargets.io/v3/platform/public/evidence/filter?size=1000&datasource=${mappedDataSourceId}&target=${ensgId}&disease=${efoId}&expandefo=${indirects}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const dataRaw = response.data;
        const columns = dataSourceColumns[dataSourceId];
        console.log(dataRaw);
        this.setState({ data: dataRaw, columns });
      });
  };
  componentDidMount() {
    this.getEvidence();
  }
  componentDidUpdate(prevProps) {
    const { ensgId, efoId, dataSourceId, indirects } = this.props;
    if (
      ensgId !== prevProps.ensgId ||
      efoId !== prevProps.efoId ||
      dataSourceId !== prevProps.dataSourceId ||
      indirects !== prevProps.indirects
    ) {
      this.getEvidence();
    }
  }
  render() {
    const { columns, data } = this.state;
    return <OtTableRF columns={columns} data={data} />;
  }
}

export default AssociationsEvidenceTable;
