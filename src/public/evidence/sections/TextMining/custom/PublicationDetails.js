import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import _ from 'lodash';

import { Button } from 'ot-ui';

import SimplePublication from '../../../../common/sections/Bibliography/custom/SimplePublication';
// import Abstract from '../../../../common/sections/Bibliography/custom/Abstract';
import BibliographyHtmlText from '../../../../common/sections/Bibliography/custom/BibliographyHtmlText';
import BibliographyDetailPanel from '../../../../common/sections/Bibliography/custom/BibliographyDetailPanel';
// import LevelBar from '../../../../common/LevelBar';

const getFormattedText = (sentence) => {
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
  // let formattedText = '';

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
  breakpoints.sort(function (a, b) {
    return a.pos - b.pos;
  });

  // Calculate the acc of offsets
  breakpoints = breakpoints.reduce(function (bps, bp, i) {
    bp.acc = i ? bps[i - 1].acc + bps[i - 1].extra.length : 0;
    bps.push(bp);
    return bps;
  }, []);

  breakpoints.forEach(function (bp) {
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
  const sectionMatches = matches.find((m) => m[0].section === section);
  // process matches an return formatted text for the section or raw text
  return (sectionMatches || []).reduce((acc, sm) => {
    return acc.replace(sm.text, getFormattedText(sm));
  }, text);
};

const styles = (theme) => ({
  matchSection: {
    marginTop: '20px',
  },
});

class PublicationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      this.setState({ showDetails: false });
    }
  }

  render = () => {
    const { data, classes } = this.props;
    const { showDetails } = this.state;

    return (
      <Fragment>
        <SimplePublication
          pmId={data.publication.id}
          titleHtml={getFormattedSection(
            'title',
            data.publication.title,
            data.publication.matches
          )}
          authors={data.publication.authors}
          journal={{
            title: data.journal.title,
            date: '' + data.journal.year,
            ref: {
              volume: data.journal.volume,
              issue: data.journal.issue,
              pgn: data.journal.page,
            },
          }}
        />

        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            this.setState({ showDetails: !showDetails });
          }}
        >
          {showDetails ? '- Hide match details' : '+ Show match details'}
        </Button>

        {showDetails ? (
          <BibliographyDetailPanel>
            <Typography variant="subtitle2" gutterBottom>
              Abstract
            </Typography>
            <BibliographyHtmlText
              text={getFormattedSection(
                'abstract',
                data.publication.abstract,
                data.publication.matches
              )}
            />

            {data.publication.matches
              .filter(
                (m) =>
                  m[0].section.toLowerCase() !== 'abstract' &&
                  m[0].section.toLowerCase() !== 'title'
              )
              .map((m, i) => {
                const sec = _.upperFirst(_.lowerCase(m[0].section));
                return (
                  <div key={i} className={classes.matchSection}>
                    <Typography variant="subtitle2">
                      {sec}{' '}
                      <small>
                        {m.length} matched sentence{m.length === 1 ? '' : 's'}
                      </small>
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
                  </div>
                );
              })}
          </BibliographyDetailPanel>
        ) : null}
      </Fragment>
    );
  };
}

export default withStyles(styles)(PublicationDetails);
