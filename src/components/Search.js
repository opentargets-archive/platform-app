import React from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { AdvancedSearch as OtSearch } from 'ot-ui';

import SearchOption from './SearchOption';

// const SEARCH_QUERY = gql`
//   query SearchQuery($queryString: String!) {
//     search(queryString: $queryString) {
//       totalGenes
//       totalVariants
//       totalStudies
//       genes {
//         id
//         symbol
//         chromosome
//         start
//         end
//       }
//       variants {
//         variant {
//           id
//           rsId
//           chromosome
//           position
//           refAllele
//           altAllele
//         }
//       }
//       studies {
//         studyId
//         traitReported
//         pmid
//         pubAuthor
//         pubDate
//         pubJournal
//         nInitial
//       }
//     }
//   }
// `;

const MOCK_SEARCH_DATA = {
  genes: [
    { id: 'ENSG00000157764', symbol: 'BRAF' },
    { id: 'ENSG00000089234', symbol: 'BRAP' },
    { id: 'ENSG00000224775', symbol: 'BRAFP1' },
    { id: 'ENSG00000171862', symbol: 'PTEN' },
  ],
  diseases: [
    { id: 'EFO_0000756', name: 'melanoma' },
    { id: 'EFO_0000313', name: 'carcinoma' },
    { id: 'EFO_0000305', name: 'breast carcinoma' },
    { id: 'EFO_0000183', name: 'Hodgkins lymphoma' },
    { id: 'EFO_0000220', name: 'acute lymphoblastic leukemia' },
    { id: 'EFO_1000068', name: 'acute leukemia' },
  ],
};

const mockQuery = queryString => {
  // console.log(queryString);
  const queryStringLower = queryString.toLowerCase();
  const genes = MOCK_SEARCH_DATA.genes.filter(d => {
    // console.log(d.symbol, d.symbol.startsWith(queryStringLower));
    return (
      d.symbol.toLowerCase().startsWith(queryStringLower) ||
      d.id.toLowerCase().startsWith(queryStringLower)
    );
  });
  const diseases = MOCK_SEARCH_DATA.diseases.filter(
    d =>
      d.name.toLowerCase().startsWith(queryStringLower) ||
      d.id.toLowerCase().startsWith(queryStringLower)
  );
  // console.log(genes, diseases);
  return {
    totalGenes: genes.length,
    totalDiseases: diseases.length,
    genes,
    diseases,
  };
};

const asGroupedOptions = data => {
  return [
    {
      label: 'Genes',
      options: data.genes.map(d => ({ ...d, groupType: 'gene' })),
    },
    {
      label: 'Diseases',
      options: data.diseases.map(d => ({ ...d, groupType: 'disease' })),
    },
  ];
};

class Search extends React.Component {
  handleSelectOption = (value, { action }) => {
    const { history } = this.props;
    if (action === 'select-option') {
      switch (value.groupType) {
        case 'gene':
          history.push(`/gene/${value.id}`);
          break;
        case 'variant':
          history.push(`/variant/${value.variant.id}`);
          break;
        case 'study':
          history.push(`/study/${value.studyId}`);
          break;
        default:
          break;
      }
    }
  };
  handleInputChange = inputValue => {
    if (!inputValue || inputValue.length < 3) {
      return;
    }

    // const { client } = this.props;
    // return client
    //   .query({
    //     query: SEARCH_QUERY,
    //     variables: { queryString: inputValue },
    //   })
    //   .then(response => {
    //     if (response.data && response.data.search) {
    //       return asGroupedOptions(response.data.search);
    //     } else {
    //       return asGroupedOptions({
    //         genes: [],
    //         variants: [],
    //         studies: [],
    //       });
    //     }
    //   });
    const options = asGroupedOptions(mockQuery(inputValue));
    console.log(options);
    return Promise.resolve(options);
  };
  handleFocus = () => {};
  render() {
    return (
      <OtSearch
        onInputChange={this.handleInputChange}
        onFocus={this.handleFocus}
        optionComponent={SearchOption}
        onSelectOption={this.handleSelectOption}
        placeholder="Search for a gene, variant or trait..."
      />
    );
  }
}

export default withApollo(withRouter(Search));
