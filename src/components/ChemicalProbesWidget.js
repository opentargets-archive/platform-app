import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Widget from './Widget';
import ChemicalProbesModal from './ChemicalProbesModal';
import CheckboxList from './CheckboxList';

// const styles = theme => ({
//   widget: {
//     height: theme.widgetHeight,
//   },
// });

// class ChemicalProbesWidget extends Component {
//   handleClick = e => {
//     // if the click is coming from a link, stop it to prevent opening the modal
//     if (e.target.tagName.toLowerCase() === 'a') {
//       e.stopPropagation();
//       return;
//     }

//     if (this.props.chemicalProbes.portalProbeCount) {
//       const { history, match } = this.props;
//       history.push(`${match.url}/chemical-probes`);
//     }
//   };

//   handleClose = () => {
//     const { history, match } = this.props;
//     history.push(match.url);
//   };

//   render() {
//     const { ensgId, symbol, chemicalProbes, classes, match } = this.props;
//     const {
//       hasStructuralGenomicsConsortium,
//       hasChemicalProbesPortal,
//       hasOpenScienceProbes,
//       hasProbeMiner,
//     } = chemicalProbes;

//     const items = [
//       {
//         value: hasStructuralGenomicsConsortium,
//         label: 'Structural Genomics Consortium',
//       },
//       { value: hasChemicalProbesPortal, label: 'Chemical Probes Portal' },
//       { value: hasOpenScienceProbes, label: 'Open Science Probes' },
//       { value: hasProbeMiner, label: 'ProbeMiner' },
//     ];
//     return (
//       <Grid item md={3}>
//         <Card onClick={this.handleClick} className={classes.widget}>
//           <CardContent>
//             <Typography variant="h5" align="center">
//               Chemical probes
//             </Typography>

// <Grid
//   container
//   direction="column"
//   alignItems="stretch"
//   justify="space-evenly"
//   className={classes.checkboxListContainer}
// >
//   <Grid item xs={12}>
//     <CheckboxList items={items} />
//   </Grid>
// </Grid>

//             <Typography variant="caption" gutterBottom>
//               Chemical probes information from{' '}
//               <a
//                 href="https://www.thesgc.org/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Structural Genomics Consortium
//               </a>
//               , the{' '}
//               <a
//                 href="http://www.chemicalprobes.org/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Chemical Probes Portal
//               </a>
//               , and{' '}
//               <a
//                 href="http://www.sgc-ffm.uni-frankfurt.de/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Open Science Probes
//               </a>
//               .
//             </Typography>
//           </CardContent>
//         </Card>
//         <Route
//           path={`${match.path}/chemical-probes`}
//           render={() => {
//             return (
//               <ChemicalProbesModal
//                 open
//                 onClose={this.handleClose}
//                 ensgId={ensgId}
//                 symbol={symbol}
//               />
//             );
//           }}
//         />
//       </Grid>
//     );
//   }
// }

const ChemicalProbesWidget = ({ ensgId, symbol, chemicalProbes }) => {
  const {
    hasStructuralGenomicsConsortium,
    hasChemicalProbesPortal,
    hasOpenScienceProbes,
    hasProbeMiner,
    sources,
  } = chemicalProbes;

  const hasData =
    hasStructuralGenomicsConsortium ||
    hasChemicalProbesPortal ||
    hasOpenScienceProbes ||
    hasProbeMiner;
  const items = [
    {
      value: hasStructuralGenomicsConsortium,
      label: 'Structural Genomics Consortium',
    },
    { value: hasChemicalProbesPortal, label: 'Chemical Probes Portal' },
    { value: hasOpenScienceProbes, label: 'Open Science Probes' },
    { value: hasProbeMiner, label: 'ProbeMiner' },
  ];
  return (
    <Widget
      title="Chemical probes"
      detailUrlStem="chemical-probes"
      detail={() => (
        <ChemicalProbesModal
          open
          onClose={() => {}}
          ensgId={ensgId}
          symbol={symbol}
        />
      )}
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
};

ChemicalProbesWidget.widgetName = 'chemical probes';

export default ChemicalProbesWidget;
