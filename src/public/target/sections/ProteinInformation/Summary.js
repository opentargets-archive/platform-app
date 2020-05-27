import _ from 'lodash';

const Summary = ({ data }) => {
  // only need to check hasSubCellularLocation, since the widget is
  // all or nothing as everything comes from UniProt
  return _.get(data, 'subcellularLocations.length', 0) > 0
    ? 'Positional, Structural and Functional Information'
    : null;
};

export default Summary;
