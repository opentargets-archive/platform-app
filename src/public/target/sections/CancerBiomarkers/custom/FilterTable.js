import React, { Component, Fragment } from 'react';
// import Select from 'react-select';
// import crossfilter from 'crossfilter2';
import _ from 'lodash';
// import * as d3 from 'd3';
// import dc from 'dc';
// import { lighten, darken } from 'polished';
// import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
// import classNames from 'classnames';
import { Link, OtTableRF /*, DataDownloader*/ } from 'ot-ui';
import client from '../../../../client';
import gql from 'graphql-tag';

// import DCContainer from '../../../../common/DCContainer';
/* import {
  upReducerKeyCount,
  downReducerKeyCount,
} from '../../../../../utils/crossfilterReducers'; */

import {
  /*  DC_PIE_INNER_RADIUS,
  DC_PIE_OUTER_RADIUS, */
  DC_PIE_WIDTH,
} from '../../../../common/dcConfig';

import { label } from '../../../../../utils/global';
import { naLabel } from '../../../../configuration';

// const chartColour = lighten(0.3, '#3489ca');

const getColumns = ({
  biomarkerOptions,
  diseaseOptions,
  drugOptions,
  associationOptions,
  evidenceOptions,
  biomarkerFilterHandler,
  diseaseFilterHandler,
  drugFilterHandler,
  associationFilterHandler,
  evidenceFilterHandler,
}) => {
  return [
    {
      id: 'id',
      label: 'Biomarker',
      // renderFilter: () => (
      //   <Select
      //     isClearable
      //     options={biomarkerOptions}
      //     onChange={biomarkerFilterHandler}
      //   />
      // ),
      width: '16%',
    },
    {
      id: 'diseases',
      label: 'Disease',
      renderCell: rowData =>
        rowData.disease ? (
          <Link
            external
            to={`https://www.targetvalidation.org/disease/${
              rowData.disease.id
            }`}
          >
            {label(rowData.disease.name)}
          </Link>
        ) : (
          <>{naLabel}</>
        ),
      // renderFilter: () => (
      //   <Select
      //     isClearable
      //     options={diseaseOptions}
      //     onChange={diseaseFilterHandler}
      //   />
      // ),
      width: '16%',
    },
    {
      id: 'drugName',
      label: 'Drug',
      // renderFilter: () => (
      //   <Select
      //     isClearable
      //     options={drugOptions}
      //     onChange={drugFilterHandler}
      //   />
      // ),
      // width: '15%',
    },
    {
      id: 'associationType',
      label: 'Association',
      renderCell: row => _.capitalize(row.associationType.replace(/_/g, ' ')),
      // renderFilter: () => (
      //   <Select
      //     isClearable
      //     options={associationOptions}
      //     onChange={associationFilterHandler}
      //   />
      // ),
      width: '13%',
    },
    {
      id: 'evidenceLevel',
      label: 'Evidence',
      // renderFilter: () => (
      //   <Select
      //     isClearable
      //     options={evidenceOptions}
      //     onChange={evidenceFilterHandler}
      //   />
      // ),
      width: '13%',
    },
    {
      id: 'sources',
      label: 'Sources',
      renderCell: rowData => {
        return (
          <Fragment>
            {rowData.sources.map((source, i) => (
              <Link key={i} external to={source.link}>
                {source.name}
              </Link>
            ))}
          </Fragment>
        );
      },
      width: '13%',
    },
  ];
};

const styles = theme => ({
  countLabelSection: {
    width: DC_PIE_WIDTH,
    float: 'left',
  },
  countLabel: {
    fontWeight: 'bold',
    padding: '8px',
    borderRadius: '50%',
    color: '#FFF',
    width: '36px',
    height: '36px',
    display: 'inline-block',
    textAlign: 'center',
  },
  countLabelDrug: {
    backgroundColor: theme.palette.primary.main,
  },
  countLabelBiomarker: {
    backgroundColor: theme.palette.primary.main,
  },
  countLabelDisease: {
    backgroundColor: theme.palette.primary.main,
  },
});

const BATCH_SIZE = 1000;

const COUNT_QUERY = gql`
  query CancerBiomarkersCount($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      cancerBiomarkers {
        count
      }
    }
  }
`;

const PAGE_QUERY = gql`
  query CancerBiomarkersSectionQuery($ensgId: String!, $page: Pagination!) {
    target(ensemblId: $ensgId) {
      id
      cancerBiomarkers(page: $page) {
        uniqueDrugs
        uniqueDiseases
        uniqueBiomarkers
        count
        rows {
          id
          associationType
          drugName
          evidenceLevel
          sources {
            link
            name
          }
          pubmedIds
          target {
            approvedSymbol
          }
          disease {
            name
            id
          }
        }
      }
    }
  }
`;

const getRows = async ensgId => {
  // find how many rows there are
  const result = await client.query({
    query: COUNT_QUERY,
    variables: {
      ensgId,
    },
  });
  const { count } = result.data.target.cancerBiomarkers;
  const numBatches = Math.ceil(count / BATCH_SIZE);
  const batchPromises = [];

  for (let i = 0; i < numBatches; i++) {
    batchPromises.push(
      client.query({
        query: PAGE_QUERY,
        variables: {
          ensgId,
          page: { index: i, size: BATCH_SIZE },
        },
      })
    );
  }

  return Promise.all(batchPromises).then(batches => {
    const allRows = [];

    batches.forEach(batch => {
      const { rows } = batch.data.target.cancerBiomarkers;
      rows.forEach(row => {
        allRows.push(row);
      });
    });

    return {
      count,
      rows: allRows,
    };
  });
};

// const getBiomarkerOptions = rows => {
//   return _.uniq(rows.map(row => row.biomarker)).map(row => ({
//     label: row,
//     value: row,
//   }));
// };

// const getDiseaseOptions = rows => {
//   console.log('getDiseaseOptions: ', rows);
//   return _.uniq(
//     rows.reduce((acc, row) => {
//       acc.push(row.disease.name);
//       return acc;
//     }, [])
//   ).map(disease => ({ label: disease, value: disease }));
// };

// const getDrugOptions = rows => {
//   return _.uniq(rows.map(row => row.drugName)).map(row => ({
//     label: row,
//     value: row,
//   }));
// };

// const getAssociationOptions = rows => {
//   return _.uniq(rows.map(row => row.associationType)).map(row => ({
//     label: row,
//     value: row,
//   }));
// };

// const getEvidenceOptions = rows => {
//   return _.uniq(rows.map(row => row.evidenceLevel)).map(row => ({
//     label: row,
//     value: row,
//   }));
// };

// const getDownloadColumns = () => {
//   return [
//     { id: 'biomarker', label: 'Biomarker' },
//     { id: 'diseases', label: 'Diseases' },
//     { id: 'efo', label: 'EFO codes' },
//     { id: 'drugName', label: 'Drug' },
//     { id: 'associationType', label: 'Association' },
//     { id: 'evidenceLevel', label: 'Evidence' },
//     { id: 'sources', label: 'Sources' },
//   ];
// };

// const getDownloadRows = rows => {
//   return rows.map(row => ({
//     biomarker: row.biomarker,
//     diseases: row.diseases.map(disease => disease.name).join(', '),
//     efo: row.diseases.map(disease => disease.id).join(', '),
//     drugName: row.drugName,
//     associationType: row.associationType,
//     evidenceLevel: row.evidenceLevel,
//     sources: row.sources.map(source => source.url).join(', '),
//   }));
// };

// const getPieColors = (items, chartColour) => {
//   return items.reduce((acc, item, i) => {
//     acc[item.label] = darken(0.05 * i, chartColour);
//     return acc;
//   }, {});
// };

class FilterTable extends Component {
  state = {};

  /*
  setupCharts() {
    // set up DC charts, not crossfilter stuff
    this.drugCountLabel = dc.numberDisplay('#biomarkers-drug-count');
    this.biomarkerCountLabel = dc.numberDisplay('#biomarkers-biomarker-count');
    this.diseaseCountLabel = dc.numberDisplay('#biomarkers-disease-count');
    this.biomarkersByAssociationChart = dc.pieChart(
      '#biomarkers-by-association'
    );
    this.biomarkersByEvidenceChart = dc.pieChart('#biomarkers-by-evidence');

    const {
      biomarkers,
      drugCount,
      biomarkerCount,
      diseaseCount,
      associationDim,
      associationGroup,
      evidenceDim,
      evidenceGroup,
    } = this.state;

    this.drugCountLabel
      .group(drugCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.biomarkerCountLabel
      .group(biomarkerCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.diseaseCountLabel
      .group(diseaseCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.biomarkersByAssociationChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .valueAccessor(d => Object.keys(d.value).length)
      .dimension(associationDim)
      .group(associationGroup)
      .colors(association => this.associationColors[association])
      .render();

    this.biomarkersByEvidenceChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .valueAccessor(d => Object.keys(d.value).length)
      .dimension(evidenceDim)
      .group(evidenceGroup)
      .colors(evidence => this.evidenceColors[evidence])
      .render();

    this.biomarkersByAssociationChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    this.biomarkersByEvidenceChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });
  }

  redrawCharts() {
    this.drugCountLabel.redraw();
    this.biomarkerCountLabel.redraw();
    this.diseaseCountLabel.redraw();
    this.biomarkersByAssociationChart.redraw();
    this.biomarkersByEvidenceChart.redraw();
  }

  biomarkerFilterHandler = selection => {
    const { biomarkers, biomarkerDim } = this.state;
    if (selection) {
      biomarkerDim.filter(d => d === selection.value);
    } else {
      // if the selection has been cleared, clear any filters on the
      // biomarkersDim dimension
      biomarkerDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  diseaseFilterHandler = selection => {
    const { biomarkers, diseaseDim } = this.state;
    if (selection) {
      diseaseDim.filter(d => {
        const index = d.findIndex(disease => disease.name === selection.value);
        return index !== -1;
      });
    } else {
      diseaseDim.filterAll();
    }
    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  drugFilterHandler = selection => {
    const { biomarkers, drugDim } = this.state;
    if (selection) {
      drugDim.filter(d => d === selection.value);
    } else {
      drugDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  associationFilterHandler = selection => {
    const { biomarkers, associationDim } = this.state;
    if (selection) {
      associationDim.filter(d => d === selection.value);
    } else {
      associationDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  evidenceFilterHandler = selection => {
    const { biomarkers, evidenceDim } = this.state;
    if (selection) {
      evidenceDim.filter(d => d === selection.value);
    } else {
      evidenceDim.filterAll();
    }
    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  static getDerivedStateFromProps(props, state) {
    const prevProps = state.prevProps || {};

    if (props.rows !== prevProps.rows) {
      // only create a new crossfilter, groups, and dimensions
      // when the rows prop has changed
      const biomarkers = crossfilter(props.rows);
      const biomarkerDim = biomarkers.dimension(row => row.biomarker);
      const diseaseDim = biomarkers.dimension(row => row.diseases);
      const drugDim = biomarkers.dimension(row => row.drugName);
      const associationDim = biomarkers.dimension(row => row.associationType);
      const evidenceDim = biomarkers.dimension(row => row.evidenceLevel);

      const drugAccessor = data => data.drugName;
      const biomarkerAccessor = data => data.biomarker;

      const drugCount = biomarkers
        .groupAll()
        .reduce(
          upReducerKeyCount(drugAccessor),
          downReducerKeyCount(drugAccessor),
          () => ({})
        );

      const biomarkerCount = biomarkers
        .groupAll()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
          () => ({})
        );

      const diseaseCount = biomarkers.groupAll().reduce(
        (acc, data) => {
          data.diseases.forEach(d => {
            if (d.name in acc) {
              acc[d.name]++;
            } else {
              acc[d.name] = 1;
            }
          });
          return acc;
        },
        (acc, data) => {
          data.diseases.forEach(d => {
            acc[d.name]--;
            if (acc[d.name] === 0) {
              delete acc[d.name];
            }
          });
          return acc;
        },
        () => ({})
      );

      const associationGroup = associationDim
        .group()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
          () => ({})
        );

      const evidenceGroup = evidenceDim
        .group()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
          () => ({})
        );

      return {
        prevProps: props,
        filteredRows: biomarkers.allFiltered(),
        biomarkers,
        biomarkerDim,
        biomarkerCount,
        diseaseDim,
        drugDim,
        drugCount,
        diseaseCount,
        associationDim,
        associationGroup,
        evidenceDim,
        evidenceGroup,
      };
    }

    return null;
  }
  */

  componentDidMount() {
    // const { theme } = this.props;
    // const chartColour = lighten(0.3, theme.palette.primary.main);
    // this.evidenceColors = getPieColors(
    //   getEvidenceOptions(this.props.rows),
    //   chartColour
    // );
    // this.associationColors = getPieColors(
    //   getAssociationOptions(this.props.rows),
    //   chartColour
    // );
    // this.setupCharts();
    const { ensgId } = this.props;
    getRows(ensgId).then(data => {
      this.setState({ rows: data.rows });
    });
  }

  componentDidUpdate() {
    // this.redrawCharts();
  }

  render() {
    // const {  symbol, classes } = this.props;
    const { rows = [] } = this.state;

    // const biomarkerOptions = getBiomarkerOptions(rows);
    // const diseaseOptions = getDiseaseOptions(rows);
    // const drugOptions = getDrugOptions(rows);
    // const associationOptions = getAssociationOptions(rows);
    // const evidenceOptions = getEvidenceOptions(rows);

    /*return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item>
            <div className={classes.countLabelSection}>
              <strong>Summary</strong>
              <p>
                <span
                  id="biomarkers-drug-count"
                  className={classNames(
                    classes.countLabel,
                    classes.countLabelDrug
                  )}
                />{' '}
                drugs (or drug families)
              </p>
              <p>
                <span
                  id="biomarkers-biomarker-count"
                  className={classNames(
                    classes.countLabel,
                    classes.countLabelBiomarker
                  )}
                />{' '}
                biomarkers
              </p>
              <p>
                <span
                  id="biomarkers-disease-count"
                  className={classNames(
                    classes.countLabel,
                    classes.countLabelDisease
                  )}
                />{' '}
                diseases
              </p>
              <div className="clearfix" />
            </div>
          </Grid>
          <Grid item className="dcChartOverflow">
            <DCContainer id="biomarkers-by-association" title="Association" />
          </Grid>
          <Grid item className="dcChartOverflow">
            <DCContainer id="biomarkers-by-evidence" title="Evidence" />
          </Grid>
        </Grid>
        <DataDownloader
          tableHeaders={getDownloadColumns()}
          rows={getDownloadRows(rows)}
          fileStem={`${symbol}-cancer-biomarkers`}
        />
        <OtTableRF
          columns={getColumns({
            biomarkerOptions,
            diseaseOptions,
            drugOptions,
            associationOptions,
            evidenceOptions,
            biomarkerFilterHandler: this.biomarkerFilterHandler,
            diseaseFilterHandler: this.diseaseFilterHandler,
            drugFilterHandler: this.drugFilterHandler,
            associationFilterHandler: this.associationFilterHandler,
            evidenceFilterHandler: this.evidenceFilterHandler,
          })}
          data={filteredRows}
          filters
        />
      </Fragment>
    );*/

    return <OtTableRF columns={getColumns({})} data={rows} />;
  }
}

export default withStyles(styles, { withTheme: true })(FilterTable);
