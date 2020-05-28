import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Tabs, Tab } from 'ot-ui';

import ProtVistaRenderer from './custom/ProtVistaRenderer';

const styles = () => ({
  keywordCategory: {
    paddingBottom: '0.8rem',
  },
  tabPanel: {
    marginTop: '20px',
  },
});

class Section extends React.Component {
  state = {
    value: 'protvista',
  };
  handleChange = (_, value) => {
    this.setState({ value });
  };
  makePmidLink = match => {
    var id = match.substring(7);
    return `PMID: <a href="https://europepmc.org/abstract/med/${id}" target="_blank">${id}</a>`;
  };
  render() {
    const { classes, data } = this.props;
    const { value } = this.state;

    const { id, subcellularLocations, subunits } = data;

    /* const keywordsGrouped = keywords.reduce((acc, d) => {
      if (!acc[d.category]) {
        acc[d.category] = [];
      }
      acc[d.category].push(d);
      return acc;
      }, {}); */

    return (
      <Fragment>
        <Tabs
          value={value}
          onChange={this.handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="protvista" label="Protvista" />
          <Tab value="subCellularLocation" label="Sub-cellular location" />
          <Tab value="subUnit" label="Subunit data" />
          {/* <Tab value="keywords" label="UniProt keywords" /> */}
        </Tabs>
        <div className={classes.tabPanel}>
          {value === 'protvista' ? <ProtVistaRenderer uniprotId={id} /> : null}
          {value === 'subCellularLocation' ? (
            <div>
              <ul>
                {subcellularLocations.map((d, i) => (
                  <li key={i}>
                    <Typography variant="body2">
                      {/* <Link external to={`https://www.uniprot.org/locations/${d.id}`} > */}
                      {d}
                      {/* </Link> */}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {value === 'subUnit' ? (
            <div>
              <ul>
                {subunits.map((d, i) => {
                  // replace PMIDs and 'by similarity' with appropriate links
                  const desc = d
                    .replace(/Pubmed:\d+/gi, this.makePmidLink)
                    .replace(
                      /\(By similarity\)/gi,
                      match =>
                        `(<a href='https://www.uniprot.org/uniprot/${id}#interaction' target="_blank" rel="noopener noreferrer">By similarity</a>)`
                    );

                  return (
                    <li key={i}>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {/* value === 'keywords' ? (
            <div>
              {Object.keys(keywordsGrouped)
                .sort()
                .map(c => (
                  <div key={c} className={classes.keywordCategory}>
                    <Typography variant="h6">{c}</Typography>
                    <Typography>
                      {keywordsGrouped[c].map((d, i) => (
                        <Fragment key={d.id}>
                          {i > 0 ? ' | ' : null}

                          <Link
                            external
                            to={`https://www.uniprot.org/keywords/${d.id}`}
                          >
                            {d.name}
                          </Link>
                        </Fragment>
                      ))}
                    </Typography>
                  </div>
                ))}
            </div>
        ) : null */}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Section);
