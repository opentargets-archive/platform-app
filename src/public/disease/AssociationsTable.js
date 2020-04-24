import React from 'react';

import BaseAssociationsTable from '../common/AssociationsTable';

const AssociationsTable = props => (
  <BaseAssociationsTable firstColumnName="Target" {...props} />
);

export default AssociationsTable;
