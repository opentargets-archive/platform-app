import React from 'react';
import Link from '../../../components/Link';

const Description = ({ symbol }) => (
  <React.Fragment>
    Physical and functional molecular interactions with{' '}
    <strong>{symbol}</strong>. Source:{' '}
    <Link
      to="https://platform-docs.opentargets.org/target/molecular-interactions"
      external
    >
      Open Targets
    </Link>
    ,{' '}
    <Link
      to="https://platform-docs.opentargets.org/target/molecular-interactions#intact"
      external
    >
      IntAct
    </Link>
    ,{' '}
    <Link
      to="https://platform-docs.opentargets.org/target/molecular-interactions#signor"
      external
    >
      Signor
    </Link>
    ,{' '}
    <Link
      to="https://platform-docs.opentargets.org/target/molecular-interactions#reactome"
      external
    >
      Reactome
    </Link>
    ,{' '}
    <Link
      to="https://platform-docs.opentargets.org/target/molecular-interactions#string"
      external
    >
      String
    </Link>
  </React.Fragment>
);

export default Description;
