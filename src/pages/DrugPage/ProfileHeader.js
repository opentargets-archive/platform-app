import React, { Fragment } from 'react';
import { gql } from '@apollo/client';

import {
  ChipList,
  Description,
  Field,
  ProfileHeader as BaseProfileHeader,
} from '../../components/ProfileHeader';
import Link from '../../components/Link';
import Smiles from './Smiles';
import usePlatformApi from '../../hooks/usePlatformApi';
import WithdrawnNotice from '../../components/WithdrawnNotice';

const DRUG_PROFILE_HEADER_FRAGMENT = gql`
  fragment DrugProfileHeaderFragment on Drug {
    description
    drugType
    synonyms
    parentMolecule {
      id
      name
    }
    childMolecules {
      id
      name
    }
    hasBeenWithdrawn
    maximumClinicalTrialPhase
    tradeNames
    withdrawnNotice {
      classes
      countries
      reasons
      year
    }
    yearOfFirstApproval
    isApproved
  }
`;

function ProfileHeader({ chemblId }) {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const {
    description,
    parentMolecule,
    childMolecules = [],
    synonyms,
    tradeNames,
    withdrawnNotice,
    drugType,
    yearOfFirstApproval,
    maximumClinicalTrialPhase,
    isApproved,
  } = data?.drug || {};

  return (
    <BaseProfileHeader>
      <>
        <Description loading={loading}>{description}</Description>
        <WithdrawnNotice withdrawnNotice={withdrawnNotice} />

        <Field loading={loading} title="Molecule type">
          {drugType}
        </Field>
        <Field loading={loading} title="First approval">
          {yearOfFirstApproval || 'N/A'}
        </Field>
        <Field loading={loading} title="Max phase">
          {maximumClinicalTrialPhase}
        </Field>
        <Field loading={loading} title="Status">
          {isApproved ? 'Approved' : null}
        </Field>
        <Field loading={loading} title="Parent molecule">
          {parentMolecule ? (
            <Link to={`/drug/${parentMolecule.id}`}>{parentMolecule.name}</Link>
          ) : null}
        </Field>
        <Field loading={loading} title="Child molecules">
          {childMolecules.map(({ id, name }, i) => (
            <Fragment key={id}>
              <Link to={`/drug/${id}`}>{name}</Link>
              {i < childMolecules.length - 1 ? ', ' : null}
            </Fragment>
          ))}
        </Field>
        <ChipList title="Synonyms" inline loading={loading}>
          {synonyms}
        </ChipList>
        <ChipList title="Known trade names" inline loading={loading}>
          {tradeNames}
        </ChipList>
      </>
      <Smiles chemblId={chemblId} />
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DRUG_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
