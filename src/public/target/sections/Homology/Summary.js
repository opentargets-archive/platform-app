const Summary = ({ orthologuesBySpecies }) =>
  `${orthologuesBySpecies.reduce(
    (acc, d) => acc + d.orthologuesCount,
    0
  )} orthologues in ${orthologuesBySpecies.length} species`;

export default Summary;
