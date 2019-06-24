import React from 'react';
import { capitalize } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { OtTableRF, Link, DataDownloader } from 'ot-ui';

const effectsColumns = [
  {
    id: 'organs_systems_affected',
    label: 'Main organs & systems affected',
    renderCell: ({ organs_systems_affected: organs }) => {
      return (
        <ul>
          {organs.map(organ => (
            <li key={organ.code}>{organ.mapped_term}</li>
          ))}
        </ul>
      );
    },
  },
  {
    id: 'activation_effects',
    label: 'Agonism or activation effects',
    renderCell: ({ activation_effects: activationEffects }) => {
      return Object.keys(activationEffects).map(key => {
        return (
          <React.Fragment key={key}>
            <Typography variant="subtitle2">{capitalize(key)}</Typography>
            <ul>
              {activationEffects[key].map((effect, i) => (
                <li key={i}>{effect.mapped_term || effect.term_in_paper}</li>
              ))}
            </ul>
          </React.Fragment>
        );
      });
    },
  },
  {
    id: 'inhibition_effects',
    label: 'Antagonism or inhibition effects',
    renderCell: ({ inhibition_effects: inhibitionEffects }) => {
      return Object.keys(inhibitionEffects).map(key => {
        return (
          <React.Fragment key={key}>
            <Typography variant="subtitle2">{capitalize(key)}</Typography>
            <ul>
              {inhibitionEffects[key].map((effect, i) => (
                <li key={i}>{effect.mapped_term || effect.term_in_paper}</li>
              ))}
            </ul>
          </React.Fragment>
        );
      });
    },
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => {
      return references.map((reference, i) => {
        const isHecatos = reference.ref_link.indexOf('hecatos') !== -1;
        return (
          <React.Fragment key={i}>
            <Link external to={reference.ref_link}>
              <Tooltip
                title={
                  isHecatos
                    ? "HeCaToS Deliverable D01.5 (2015) funded by 'EU 7th Framework Programme (HEALTH-F4-2013-602156).'"
                    : ''
                }
                placement="top"
              >
                <span>{reference.ref_label}</span>
              </Tooltip>
            </Link>{' '}
          </React.Fragment>
        );
      });
    },
  },
];

const riskColumns = [
  {
    id: 'organs_systems_affected',
    label: 'Main organs & systems affected',
    renderCell: ({ organs_systems_affected: organs }) => {
      return (
        <ul>
          {organs.map((organ, i) => (
            <li key={i}>{organ.mapped_term || organ.term_in_paper}</li>
          ))}
        </ul>
      );
    },
  },
  {
    id: 'safety_liability',
    label: 'Safety liability information',
    renderCell: ({ safety_liability }) => {
      return safety_liability;
    },
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => {
      return references.map((reference, i) => {
        const isHecatos = reference.ref_link.indexOf('hecatos') !== -1;
        return (
          <React.Fragment key={i}>
            <Link external to={reference.ref_link}>
              <Tooltip
                title={
                  isHecatos
                    ? "HeCaToS Deliverable D01.5 (2015) funded by 'EU 7th Framework Programme (HEALTH-F4-2013-602156).'"
                    : ''
                }
                placement="top"
              >
                <span>{reference.ref_label}</span>
              </Tooltip>
            </Link>{' '}
          </React.Fragment>
        );
      });
    },
  },
];

const getAdverseDownloadData = rows => {
  return rows.map(row => {
    const activationEffects = [];
    const inhibitionEffects = [];

    Object.keys(row.activation_effects).forEach(key => {
      row.activation_effects[key].forEach(effect => {
        activationEffects.push(effect.mapped_term || effect.term_in_paper);
      });
    });

    Object.keys(row.inhibition_effects).forEach(key => {
      row.inhibition_effects[key].forEach(effect => {
        inhibitionEffects.push(effect.mapped_term || effect.term_in_paper);
      });
    });

    return {
      organs_systems_affected: row.organs_systems_affected
        .map(organ => organ.mapped_term)
        .join(', '),
      activation_effects: activationEffects.join(', '),
      inhibition_effects: inhibitionEffects.join(', '),
      references: row.references.map(ref => ref.ref_link).join(', '),
    };
  });
};

const getRiskDownloadData = rows => {
  return rows.map(row => {
    return {
      organs_systems_affected: row.organs_systems_affected
        .map(organ => organ.mapped_term || organ.term_in_paper)
        .join(', '),
      safety_liability: row.safety_liability,
      references: row.references.map(ref => ref.ref_link).join(', '),
    };
  });
};

class Section extends React.Component {
  state = { loading: true };

  componentDidMount() {
    // TODO: safety data should be loaded through graphql api
    fetch(
      `https://platform-api-qc.opentargets.io/v3/platform/private/target/${
        this.props.ensgId
      }`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ loading: false, safety: data.safety });
      });
  }

  render() {
    const { symbol } = this.props;
    const { loading, safety } = this.state;

    if (!safety) {
      return null;
    }

    const {
      adverse_effects: adverseEffects = [],
      safety_risk_info: safetyRiskInfo = [],
    } = safety;

    return !loading ? (
      <React.Fragment>
        <Typography variant="h6">Known safety effects</Typography>
        <DataDownloader
          tableHeaders={effectsColumns}
          rows={getAdverseDownloadData(adverseEffects)}
          fileStem={`${symbol}-safety-effects`}
        />
        <OtTableRF columns={effectsColumns} data={adverseEffects} />
        <Typography variant="h6">Safety risk information</Typography>
        <DataDownloader
          tableHeaders={riskColumns}
          rows={getRiskDownloadData(safetyRiskInfo)}
          fileStem={`${symbol}-risk-information`}
        />
        <OtTableRF columns={riskColumns} data={safetyRiskInfo} />
      </React.Fragment>
    ) : null;
  }
}

export default Section;
