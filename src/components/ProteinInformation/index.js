import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Widget from '../Widget';
import CheckboxList from '../CheckboxList';
import ProteinInformationDetail from './Detail';

const ProteinInformationWidget = ({ ensgId, symbol, protein }) => {
  if (protein) {
    const {
      hasSequenceAnnotationVisualisation,
      hasProteinStructure,
      hasSubCellularLocation,
      hasSubUnitData,
      hasUniprotKeywords,
      sources,
    } = protein;

    const hasData =
      hasSequenceAnnotationVisualisation ||
      hasProteinStructure ||
      hasSubCellularLocation ||
      hasSubUnitData ||
      hasUniprotKeywords;
    const items = [
      {
        value: hasSequenceAnnotationVisualisation,
        label: 'Sequence annotation',
      },
      {
        value: hasProteinStructure,
        label: '3D structure',
      },
      {
        value: hasSubCellularLocation,
        label: 'Subcellular location',
      },
      {
        value: hasSubUnitData,
        label: 'Sub-unit data',
      },
      {
        value: hasUniprotKeywords,
        label: 'UniProt keywords',
      },
    ];
    return (
      <Widget
        title="Protein information"
        detailUrlStem="protein-information"
        detail={<ProteinInformationDetail ensgId={ensgId} symbol={symbol} />}
        detailHeader={{
          title: (
            <React.Fragment>{symbol} - Protein information</React.Fragment>
          ),
          description: (
            <React.Fragment>
              General information about {symbol} protein from UniProt and PDBe.
            </React.Fragment>
          ),
        }}
        hasData={hasData}
        sources={sources}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="space-evenly"
        >
          <Grid item xs={12}>
            <CheckboxList items={items} />
          </Grid>
        </Grid>
      </Widget>
    );
  } else {
    return (
      <Widget
        title="Protein information"
        detailUrlStem="protein-information"
        detail={<ProteinInformationDetail ensgId={ensgId} symbol={symbol} />}
        detailHeader={{
          title: `${symbol} - Protein information`,
          description: `General information about ${symbol} protein from UniProt and PDBe`,
        }}
        hasData={false}
      >
        <Typography color="error" align="center">
          Error fetching data
        </Typography>
      </Widget>
    );
  }
};

ProteinInformationWidget.widgetName = 'protein information';

export default ProteinInformationWidget;
