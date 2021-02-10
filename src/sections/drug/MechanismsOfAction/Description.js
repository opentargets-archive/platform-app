import React, { Fragment } from 'react';

import Link from '../../../components/Link';

function Description({ name, parentMolecule, childMolecules }) {
  const molecules = [...childMolecules];

  if (parentMolecule) molecules.push(parentMolecule);

  return (
    <Fragment>
      <strong>{name}</strong>
      {molecules.length > 0 ? (
        <>
          , and related molecules{' '}
          {molecules.map(molecule => {
            return (
              <Fragment key={molecule.id}>
                <Link to={`/drug/${molecule.id}`}>{molecule.name}</Link>
                {', '}
              </Fragment>
            );
          })}
        </>
      ) : null}{' '}
      biochemical interactions to produce intended pharmacological effects.
      Curated from scientific literature and post-marketing package inserts.
      Source:{' '}
      <Link to="https://www.ebi.ac.uk/chembl/" external>
        ChEMBL
      </Link>
    </Fragment>
  );
}

export default Description;
