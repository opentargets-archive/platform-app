import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF } from 'ot-ui';

import SimplePublication from '../../../common/sections/Bibliography/custom/SimplePublication';
import Abstract from '../../../common/sections/Bibliography/custom/Abstract';
import BibliographyHtmlText from '../../../common/sections/Bibliography/custom/BibliographyHtmlText';
import LevelBar from '../../../common/LevelBar';

const getFormattedText = sentence => {
  let breakpoints = [];

  // WARNING: Unicode characters are encoded in the response, so convert them to symbol
  const unicode_re = /u([\dABCDEF]{4})/gi;
  let match;
  let text = sentence.text;

  while ((match = unicode_re.exec(text)) !== null) {
    sentence.text = sentence.text.replace(
      'u' + match[1],
      String.fromCharCode(parseInt(match[1], 16))
    );
    breakpoints.push({
      type: 'unicode',
      pos: match.index,
      extra: '',
      span: 1,
    });
  }

  // Format the text with HTML tags for highlights:
  // create breakpoints for unicodeChars, targets and diseases,
  // then sort the breakpoints by position
  let formattedText = '';

  if (sentence.target && sentence.target.start !== sentence.target.end) {
    breakpoints.push({
      type: 't_start',
      pos: sentence.target.start,
      extra: '<span data-entity="GENE">',
    });
    breakpoints.push({
      type: 't_end',
      pos: sentence.target.end + 1,
      extra: '</span>',
    });
  }

  if (sentence.disease && sentence.disease.start !== sentence.disease.end) {
    breakpoints.push({
      type: 'd_start',
      pos: sentence.disease.start,
      extra: '<span data-entity="DISEASE">',
    });
    breakpoints.push({
      type: 'd_end',
      pos: sentence.disease.end + 1,
      extra: '</span>',
    });
  }
  // Sort the breakpoints by pos
  breakpoints.sort(function(a, b) {
    return a.pos - b.pos;
  });

  // Calculate the acc of offsets
  breakpoints = breakpoints.reduce(function(bps, bp, i) {
    bp.acc = i ? bps[i - 1].acc + bps[i - 1].extra.length : 0;
    bps.push(bp);
    return bps;
  }, []);

  text = sentence.text;
  breakpoints.map(function(bp) {
    if (bp.extra) {
      text =
        text.slice(0, bp.pos + bp.acc) + bp.extra + text.slice(bp.pos + bp.acc);
    }
  });

  return text;
};

// Format the text for the specfied section based on provided matches
// This is used to process specifically abstract and title
// section: string, e.g. 'abstract'
// text: the text of the section
// matches: the full list of matches for the publication
const getFormattedSection = (section, text, matches) => {
  const sectionMatches = matches.find(m => m[0].section === section);
  // process matches an return formatted text for the section or raw text
  return (sectionMatches || []).reduce((acc, sm) => {
    return acc.replace(sm.text, getFormattedText(sm));
  }, text);
};

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    orderable: false,
    style: { verticalAlign: 'top', width: '15%' },
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'publication.title',
    label: 'Publication',
    orderable: false,
    style: { verticalAlign: 'top' },
    renderCell: p => (
      <Fragment>
        <SimplePublication
          pmId={p.publication.id}
          titleHtml={getFormattedSection(
            'title',
            p.publication.title,
            p.publication.matches
          )}
          authors={p.publication.authors.map(a => ({
            ForeName: a.firstName,
            LastName: a.lastName,
          }))}
          journal={{
            title: p.journal.title,
            date: '' + p.journal.year,
            ref: {
              volume: p.journal.volume,
              issue: p.journal.issue,
              pgn: p.journal.page,
            },
          }}
        />
        <BibliographyHtmlText
          text={getFormattedSection(
            'abstract',
            p.publication.abstract,
            p.publication.matches
          )}
        />
        {p.publication.matches
          .filter(
            m =>
              m[0].section.toLowerCase() !== 'abstract' &&
              m[0].section.toLowerCase() !== 'title'
          )
          .map((m, i) => {
            return (
              <Fragment key={i}>
                <Typography variant="subtitle2">
                  {m[0].section} {m.length} matched sentences
                </Typography>
                <ul>
                  {m.map((s, j) => {
                    return (
                      <li key={j}>
                        <BibliographyHtmlText text={getFormattedText(s)} />
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            );
          })}
      </Fragment>
    ),
  },
  {
    id: 'publication.date',
    label: 'Year',
    style: { verticalAlign: 'top', width: '7%' },
    renderCell: d => d.publication.date,
  },
  {
    id: 'score',
    label: 'Relevance',
    style: { verticalAlign: 'top', width: '10%', paddingTop: '5px' },
    renderCell: d => <LevelBar value={d.score * 100} />,
  },
];

const size = 10; // unlikely to change for now, so no need to go into state

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      from: 0,
      sortBy: '', // fall back to API default (score, desc)
      order: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchMore } = this.props;
    const { from, sortBy, order } = this.state;

    if (
      prevState.from !== from ||
      prevState.sortBy !== sortBy ||
      prevState.order !== order
    ) {
      fetchMore({
        variables: { from: from, size: size, sortBy: sortBy, order: order },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign(prev, fetchMoreResult);
        },
      });
    }
  }

  render = () => {
    const {
      ensgId,
      efoId,
      target,
      disease,
      data,
      refetch,
      fetchMore,
    } = this.props;
    const { from } = this.state;

    const onPageSort = pe => {
      const { page, pageSize, sortBy, order } = pe;
      let ns = {};
      if (page !== undefined) {
        // accounts for page 0
        ns.from = page * (pageSize || size);
      }
      if (sortBy) {
        ns.sortBy = sortBy;
        ns.order = order;
      }
      this.setState(ns);
    };

    return (
      <React.Fragment>
        <OtTableRF
          loading={false}
          error={false}
          columns={columns}
          data={data.rows}
          serverSide={true}
          totalRowsCount={data.textMiningCount}
          onPageSort={onPageSort}
          sortBy={'score'}
          order={'desc'}
        />
      </React.Fragment>
    );
  };
}

export default Section;
