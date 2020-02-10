import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const DrugDetail = ({ data }) => {
  return (
    <CardContent>
      <Typography>{data.name}</Typography>
      <Typography variant="h6">Drug Type</Typography>
      <Typography>{data.drugType}</Typography>
      <Typography variant="h6">Maximum Clinical Trial Phase</Typography>
      <Typography>{data.maximumClinicalTrialPhase}</Typography>
      {data.hasBeenWithdrawn && (
        <>
          <Typography variant="h6">Withdrawn message</Typography>
          <Typography>{data.withdrawnNotice.year}</Typography>
        </>
      )}
      <Typography variant="h6">Indications</Typography>
      {data.linkedDiseases.rows.map(disease => (
        <span key={disease}>{disease}</span>
      ))}
      <Typography variant="h6">Drug targets</Typography>
      {data.linkedTargets.rows.map(target => (
        <span key={target.id}>{target.approvedSymbol}</span>
      ))}
      <Typography variant="h6">Synonyms</Typography>
      {data.synonyms.map(synonym => (
        <span key={synonym}>{synonym}</span>
      ))}
      <Typography variant="h6">Trade names</Typography>
      {data.tradeNames.map(tradeName => (
        <span key={tradeName}>{tradeName}</span>
      ))}
    </CardContent>
  );
};

export default DrugDetail;
