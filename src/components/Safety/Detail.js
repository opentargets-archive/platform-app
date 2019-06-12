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
      return (
        <ul>
          {activationEffects.general.map((effect, i) => (
            <li key={i}>
              {effect.mapped_term.length > 0
                ? effect.mapped_term
                : effect.term_in_paper}
            </li>
          ))}
        </ul>
      );
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
                <li key={i}>
                  {effect.mapped_term.length > 0
                    ? effect.mapped_term
                    : effect.term_in_paper}
                </li>
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
            <li key={i}>{organ.mapped_term}</li>
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

const SafetyDetail = ({ safety }) => {
  return (
    <Fragment>
      <Typography variant="h6">Known safety effects</Typography>
      <DataDownloader columns={effectsColumns} data={safety.adverse_effects} />
      <OtTableRF columns={effectsColumns} data={safety.adverse_effects} />
      <Typography variant="h6">Safety risk information</Typography>
      <DataDownloader columns={riskColumns} data={safety.safety_risk_info} />
      <OtTableRF columns={riskColumns} data={safety.safety_risk_info} />
    </Fragment>
  );
};

export default SafetyDetail;
