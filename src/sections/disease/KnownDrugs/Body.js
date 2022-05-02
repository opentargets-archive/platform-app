import React from 'react';
import { loader } from 'graphql.macro';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';
import { sentenceCase } from '../../../utils/global';

const KNOWN_DRUGS_BODY_QUERY = loader('./KnownDrugsQuery.gql');

const exportColumns = [
  {
    label: 'diseaseId',
    exportValue: row => row.disease.id,
  },
  {
    label: 'diseaseName',
    exportValue: row => row.disease.name,
  },
  {
    label: 'drugId',
    exportValue: row => row.drug.id,
  },
  {
    label: 'drugName',
    exportValue: row => row.drug.name,
  },
  {
    label: 'type',
    exportValue: row => row.drugType,
  },
  {
    label: 'mechanismOfAction',
    exportValue: row => row.mechanismOfAction,
  },
  {
    label: 'actionType',
    exportValue: ({ drug: { mechanismsOfAction }, target }) => {
      if (!mechanismsOfAction) return '';
      const at = new Set();
      mechanismsOfAction.rows.forEach(row => {
        row.targets.forEach(t => {
          if (t.id === target.id) {
            at.add(row.actionType);
          }
        });
      });
      const actionTypes = Array.from(at);
      return actionTypes.map(actionType => sentenceCase(actionType));
    },
  },
  {
    label: 'symbol',
    exportValue: row => row.target.approvedSymbol,
  },
  {
    label: 'name',
    exportValue: row => row.target.approvedName,
  },
  {
    label: 'phase',
    exportValue: row => row.phase,
  },
  {
    label: 'status',
    exportValue: row => row.status,
  },
  {
    label: 'source',
    exportValue: row => row.urls.map(reference => reference.url),
  },
];

function Body({ definition, id: efoId, label: name }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="disease"
      variables={{ efoId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description name={name} />}
      columnsToShow={['disease', 'drug', 'target', 'clinicalTrials']}
      stickyColumn="drug"
      exportColumns={exportColumns}
    />
  );
}

export default Body;
