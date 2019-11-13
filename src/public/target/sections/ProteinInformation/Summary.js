const Summary = ({ hasSubCellularLocation }) => {
  // only need to check hasSubCellularLocation, since the widget is
  // all or nothing as everything comes from UniProt
  return hasSubCellularLocation
    ? 'Positional, Structural and Functional Information'
    : null;
};

export default Summary;
