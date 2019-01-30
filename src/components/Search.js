import React from 'react';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';

import { AdvancedSearch as OtSearch } from 'ot-ui';

import SearchOption from './SearchOption';

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

const buildPrefixRegex = question => {
  const questionReverse = question
    .split('')
    .reverse()
    .join('');
  const words = questionReverse.split(' ');
  let regexString = '(?:\\?|$)';
  words.forEach((w, i, wordArray) => {
    // handle space
    if (i > 0) {
      regexString = `(?: ${regexString}|$)`;
    }

    // handle word
    const letters = w.split('');
    letters.forEach((l, j, word) => {
      if (l === '*') {
        // handle unknown
        regexString = `(\\w+${regexString}|$)`;
      } else {
        // handle letter
        if (i === wordArray.length - 1 && j === word.length - 1) {
          // handle very first letter
          regexString = `(?:${l}${regexString})`;
        } else {
          // handle any other letter
          regexString = `(?:${l}${regexString}|$)`;
        }
      }
    });
  });
  return new RegExp(`^${regexString}`, 'gi');
};

const QUESTIONS = [
  {
    id: 'Q001',
    regex: /Which tissues is (\w+) expressed in\?/gi,
    prefixRegex: buildPrefixRegex('which tissues is * expressed in'),
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
    prefixRegex: buildPrefixRegex('which diseases is * associated with'),
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
    prefixRegex: buildPrefixRegex('which genes is * associated with'),
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
    prefixRegex: buildPrefixRegex('is * part of a protein complex'),
    template: (
      <React.Fragment>
        Is <strong>gene</strong> part of a protein complex?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
  {
    id: 'Q005',
    regex: /Which pathways is (\w+) involved in\?/gi,
    prefixRegex: buildPrefixRegex('which pathways is * involved in'),
    template: (
      <React.Fragment>
        Which pathways is <strong>gene</strong> involved in?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
  {
    id: 'Q006',
    regex: /Which drugs target (\w+)\?/gi,
    prefixRegex: buildPrefixRegex('which drugs target *'),
    template: (
      <React.Fragment>
        Which drugs target <strong>gene</strong>?
      </React.Fragment>
    ),
    groupTypes: ['gene'],
  },
  {
    id: 'Q007',
    regex: /Does (\w+) have any adverse effects\?/gi,
    prefixRegex: buildPrefixRegex('does * have any adverse effects'),
    template: (
      <React.Fragment>
        Does <strong>drug</strong> have any adverse effects?
      </React.Fragment>
    ),
    groupTypes: ['drug'],
  },
  {
    id: 'Q008',
    regex: /What evidence is there for (\w+) and (\w+) being associated\?/gi,
    prefixRegex: buildPrefixRegex(
      'what evidence is there for * and * being associated'
    ),
    template: (
      <React.Fragment>
        What evidence is there for <strong>gene</strong> and{' '}
        <strong>disease</strong> being associated?
      </React.Fragment>
    ),
    groupTypes: ['gene', 'disease'],
  },
  {
    id: 'Q009',
    regex: /Which genes are highly expressed in (\w+)\?/gi,
    prefixRegex: buildPrefixRegex('which genes are highly expressed in *'),
    template: (
      <React.Fragment>
        Which genes are highly expressed in <strong>tissue</strong>?
      </React.Fragment>
    ),
    groupTypes: ['tissue'],
  },
];

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
  const matchedQuestions = QUESTIONS.map(q => {
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
    const isPartialMatch = queryStringLower.match(q.prefixRegex);
    return {
      ...q,
      isMatch,
      isPartialMatch,
      groups,
    };
  });
  return queryStringLower.length > 0
    ? matchedQuestions.filter(q => q.isPartialMatch)
    : matchedQuestions;
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
  return questions.length > 0 ? (
    <div style={{ backgroundColor: '#ddd', padding: '5px' }}>
      <div
        style={{
          padding: '3px',
          fontSize: '0.9rem',
          color: 'black',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        Questions (replace bold parts):
      </div>
      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            padding: '3px 6px',
            fontSize: '0.7rem',
            color: 'black',
            fontStyle: 'italic',
            textDecoration: q.isMatch ? 'underline solid green' : 'none',
          }}
        >
          {q.template}
        </div>
      ))}
    </div>
  ) : null;
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
  };
  handleLoadOptions = inputValue => {
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
    questions.forEach(q => {
      if (q.isMatch) console.log(q.groups);
    });
    return (
      <OtSearch
        menuMessage={asQuestionSuggestions(questions)}
        value={this.state.value}
        onLoadOptions={this.handleLoadOptions}
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
