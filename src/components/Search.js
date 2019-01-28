import React from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { AdvancedSearch as OtSearch } from 'ot-ui';

import SearchOption from './SearchOption';

const SEARCH_QUERY = gql`
  query SearchQuery($queryString: String!) {
    search(queryString: $queryString) {
      totalGenes
      totalVariants
      totalStudies
      genes {
        id
        symbol
        chromosome
        start
        end
      }
      variants {
        variant {
          id
          rsId
          chromosome
          position
          refAllele
          altAllele
        }
      }
      studies {
        studyId
        traitReported
        pmid
        pubAuthor
        pubDate
        pubJournal
        nInitial
      }
    }
  }
`;

const asGroupedOptions = data => {
  return [
    {
      label: 'Genes',
      options: data.genes.map(d => ({ ...d, groupType: 'gene' })),
    },
    {
      label: 'Variants',
      options: data.variants.map(d => ({ ...d, groupType: 'variant' })),
    },
    {
      label: 'Studies',
      options: data.studies.map(d => ({ ...d, groupType: 'study' })),
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

    const { client } = this.props;
    return client
      .query({
        query: SEARCH_QUERY,
        variables: { queryString: inputValue },
      })
      .then(response => {
        if (response.data && response.data.search) {
          return asGroupedOptions(response.data.search);
        } else {
          return asGroupedOptions({
            genes: [],
            variants: [],
            studies: [],
          });
        }
      });
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
