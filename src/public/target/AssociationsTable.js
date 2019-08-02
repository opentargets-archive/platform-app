import React from 'react';

import BaseAssociationsTable from '../common/AssociationsTable';

const AssociationsTable = props => (
  <BaseAssociationsTable firstColumnName="Disease" {...props} />
);

export default AssociationsTable;
