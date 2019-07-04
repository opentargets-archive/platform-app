import React from 'react';
// import gql from 'graphql-tag';
// import { print } from 'graphql/language/printer';
// import _ from 'lodash';

// import { evidenceSectionsDefaultOrder } from '../configuration';
// import * as sectionsObject from './sectionIndex';
// import BaseProfile from '../common/Profile';

// const sections = Object.values(sectionsObject);

// const summariesQuery = gql`
//   query EvidenceSummaryQuery($ensgId: String!) {
//     target(ensgId: $ensgId) {
//       id
//       uniprotId
//       symbol
//       summaries {
//         ${sections
//           .filter(s => s.summaryQuery)
//           .map(s => `...target${_.upperFirst(s.id)}Fragment`)
//           .join('\n')}
//       }
//     }
//   }
//   ${sections
//     .filter(s => s.summaryQuery)
//     .map(s => print(s.summaryQuery))
//     .join('\n')}
// `;

// class EvidenceProfile extends Component {
//   render() {
//     const { ensgId, efoId, target, disease } = this.props;
//     const entity = { target, disease };
//     const entitySummariesAccessor = data =>
//       data && data.evidence && data.evidence.summaries
//         ? data.target.summaries
//         : null;
//     const entitySectionsAccessor = data =>
//       data && data.target && data.target.details ? data.target.details : null;
//     return (
//       <BaseProfile
//         {...{
//           entity,
//           query: summariesQuery,
//           variables: { ensgId, efoId },
//           defaultSectionsOrder: evidenceSectionsDefaultOrder,
//           sections,
//           entitySummariesAccessor,
//           entitySectionsAccessor,
//         }}
//       />
//     );
//   }
// }

const EvidenceProfile = ({ ensgId, efoId }) => (
  <div>{`Some content about ${ensgId} and ${efoId}`}</div>
);

export default EvidenceProfile;
