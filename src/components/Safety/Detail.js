import React, { Fragment } from 'react';
import { capitalize } from 'lodash';
import Typography from '@material-ui/core/Typography';
import { Link, OtTableRF, DataDownloader } from 'ot-ui';

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
          <Fragment key={key}>
            <Typography variant="subtitle2">{capitalize(key)}</Typography>
            <ul>
              {activationEffects[key].map((effect, i) => (
                <li key={i}>{effect.mapped_term || effect.term_in_paper}</li>
              ))}
            </ul>
          </Fragment>
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
          <Fragment key={key}>
            <Typography variant="subtitle2">{capitalize(key)}</Typography>
            <ul>
              {inhibitionEffects[key].map((effect, i) => (
                <li key={i}>{effect.mapped_term || effect.term_in_paper}</li>
              ))}
            </ul>
          </Fragment>
        );
      });
    },
  },
  {
    id: 'references',
    label: 'References',
    renderCell: ({ references }) => {
      return references.map((reference, i) => (
        <Fragment key={i}>
          <Link external to={reference.ref_link}>
            {reference.ref_label}
          </Link>{' '}
        </Fragment>
      ));
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
    label: 'References',
    renderCell: ({ references }) => {
      return references.map((reference, i) => (
        <Fragment key={i}>
          <Link external to={reference.ref_link}>
            {reference.ref_label}
          </Link>{' '}
        </Fragment>
      ));
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

const SafetyDetail = ({ symbol, safety }) => {
  const {
    adverse_effects: adverseEffects = [],
    safety_risk_info: safetyRiskInfo = [],
  } = safety;

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SafetyDetail;
