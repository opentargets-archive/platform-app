const Summary = ({ data }) => {
  const safetyDataTypes = [
    {
      id: 'adverseEffects',
      label: 'Known effects',
    },
    {
      id: 'safetyRiskInfo',
      label: 'Risk info',
    },
    {
      id: 'experimentalToxicity',
      label: 'Non-clinical toxicity',
    },
  ];
  return safetyDataTypes
    .filter(d => data[d.id].length > 0)
    .map(d => d.label)
    .join(' • ');
};

export default Summary;
