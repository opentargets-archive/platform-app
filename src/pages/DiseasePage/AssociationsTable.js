import React from 'react';

import { AssociationsTable as BaseAssociationsTable } from '../../components/Associations';

const AssociationsTable = props => (
  <BaseAssociationsTable firstColumnName="Target" {...props} />
);

export default AssociationsTable;
