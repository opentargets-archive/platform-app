import React from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import lunr from 'lunr';

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

const QUESTIONS = [
  {
    id: 'Q001',
    regex: /Which tissues is (\w+) expressed in\?/gi,
    text: 'Which tissues is expressed in?',
    template: (
      <React.Fragment>
        Which tissues is <strong>gene</strong> expressed in?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
  {
    id: 'Q002',
    regex: /Which diseases is (\w+) associated with\?/gi,
    text: 'Which diseases is associated with?',
    template: (
      <React.Fragment>
        Which diseases is <strong>gene</strong> associated with?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
  {
    id: 'Q003',
    regex: /Which genes is (\w+) associated with\?/gi,
    text: 'Which genes is associated with?',
    template: (
      <React.Fragment>
        Which genes is <strong>disease</strong> associated with?
      </React.Fragment>
    ),
    groupTypes: ['disease'],
  },
  {
    id: 'Q004',
    regex: /Is (\w+) part of a protein complex\?/gi,
    text: 'Is part of a protein complex?',
    template: (
      <React.Fragment>
        Is <strong>gene</strong> part of a protein complex?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
];

// alternative to lunr is to construct monster regexes,
// such as: ^(?:W(?:h(?:i(?:c(?:h(?: (?:t(?:i(?:s(?:s(?:u(?:e(?:s(?: (?:i(?:s(?: (?:(\w+)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)|$)
// (this seems like a bad idea)
const lunrIndex = lunr(function() {
  this.ref('id');
  this.field('text');

  this.pipeline.remove(lunr.stopWordFilter);
  this.searchPipeline.remove(lunr.stopWordFilter);
  this.pipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stemmer);
  QUESTIONS.forEach(function(q) {
    this.add(q);
  }, this);
});

const standardSearch = queryString => {
  const queryStringLower = queryString.toLowerCase();
  const genes = MOCK_SEARCH_DATA.genes.filter(d => {
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
  return { genes, diseases };
};
const questionSearch = queryString => {
  const queryStringLower = queryString.toLowerCase();
  // const lunrQuery = `${queryStringLower}*`;
  const lunrQuery = queryStringLower
    .split(' ')
    .map((w, i, arr) => `+${w}${i === arr.length - 1 ? '*' : ''}`)
    .join(' ');
  const lunrDocs =
    queryStringLower.length > 0 ? lunrIndex.search(lunrQuery) : [];
  console.log(lunrQuery, lunrDocs);
  return QUESTIONS.map(q => {
    const match = q.regex.exec(queryStringLower);
    const isMatch = match && match.length === q.groupTypes.length + 1;
    const groups = [];
    if (isMatch) {
      match.forEach((d, i) => {
        if (i > 0) {
          groups.push({ query: d, type: q.groupTypes[i - 1] });
        }
      });
    }
    const isPartialMatch = lunrDocs.find(l => l.ref === q.id);
    return {
      ...q,
      isMatch,
      isPartialMatch,
      groups,
    };
  }); //.filter(q => q.isMatch);
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

const asQuestionSuggestions = questions => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <ul>
        {questions.map((q, i) => (
          <li
            key={i}
            style={{
              color: q.isPartialMatch ? 'lightgreen' : 'white',
              textDecoration: q.isMatch ? 'underline wavy yellow' : 'none',
            }}
          >
            {q.template}
          </li>
        ))}
      </ul>
    </div>
  );
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
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
    this.setState({ value: inputValue });
    if (!inputValue || inputValue.length < 3) {
      return Promise.resolve([]);
    } else {
      const options = asGroupedOptions(standardSearch(inputValue));
      return Promise.resolve(options);
    }
  };
  handleFocus = () => {};
  render() {
    const questions = questionSearch(this.state.value);
    // console.log(questions);
    return (
      <OtSearch
        menuMessage={asQuestionSuggestions(questions)}
        value={this.state.value}
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
