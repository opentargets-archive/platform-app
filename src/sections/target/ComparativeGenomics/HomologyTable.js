import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';
import { DataTable } from '../../../components/Table';
import { identifiersOrgLink } from '../../../utils/global';
import { defaultRowsPerPageOptions, decimalPlaces } from '../../../constants';

import ChimpanzeeIcon from './ChimpanzeeIcon';
import HumanIcon from './HumanIcon';
import RatIcon from './RatIcon';
import FrogIcon from './FrogIcon';
import DogIcon from './DogIcon';
import FlyIcon from './FlyIcon';
import RabbitIcon from './RabbitIcon';
import MacaqueIcon from './MacaqueIcon';
import PigIcon from './PigIcon';
import WormIcon from './WormIcon';
import ZebrafishIcon from './ZebrafishIcon';
import GuineaPigIcon from './GuineaPigIcon';
import MouseIcon from './MouseIcon';

// map species ids to species icon component
const speciesIcons = {
  9598: ChimpanzeeIcon,
  10116: RatIcon,
  9606: HumanIcon,
  8364: FrogIcon,
  9615: DogIcon,
  7227: FlyIcon,
  9986: RabbitIcon,
  9544: MacaqueIcon,
  9823: PigIcon,
  6239: WormIcon,
  7955: ZebrafishIcon,
  10141: GuineaPigIcon,
  10090: MouseIcon,
};

const useStyles = makeStyles(theme => ({
  star: {
    color: theme.palette.primary.main,
  },
  iconContainer: {
    display: 'inline-block',
    textAlign: 'right',
    width: '43px',
    marginRight: '5px',
  },
  container: {
    display: 'inline-block',
    width: '16px',
  },
}));

function getColumns(classes) {
  return [
    {
      id: 'speciesName',
      label: 'Species',
      renderCell: ({ speciesId, speciesName }) => {
        const SpeciesIcon = speciesIcons[speciesId];
        return (
          <>
            <span className={classes.iconContainer}>
              <SpeciesIcon />
            </span>{' '}
            {speciesName}
          </>
        );
      },
    },
    {
      id: 'homologyType',
      label: 'Homology type',
      renderCell: ({ isHighConfidence, homologyType }) => {
        return (
          <>
            <span className={classes.container}>
              {isHighConfidence === 'NULL' ? null : (
                <Tooltip
                  title={
                    isHighConfidence === '1'
                      ? 'High confidence orthologue'
                      : 'Low confidence orthologue'
                  }
                >
                  <span>
                    <FontAwesomeIcon
                      className={isHighConfidence === '1' ? classes.star : ''}
                      icon={isHighConfidence === '1' ? faStarSolid : faStar}
                    />
                  </span>
                </Tooltip>
              )}
            </span>{' '}
            {homologyType.replaceAll('_', ' ')}
          </>
        );
      },
    },
    {
      id: 'targetGeneSymbol',
      label: 'Homologue',
      renderCell: ({ targetGeneId, targetGeneSymbol }) => (
        <Link external to={identifiersOrgLink('ensembl', targetGeneId)}>
          {targetGeneSymbol || targetGeneId}
        </Link>
      ),
    },
    {
      id: 'queryPercentageIdentity',
      label: `Query %id`,
      renderCell: ({ queryPercentageIdentity }) =>
        queryPercentageIdentity
          ? queryPercentageIdentity.toFixed(decimalPlaces)
          : 'N/A',
    },
    {
      id: 'targetPercentageIdentity',
      label: `Target %id`,
      renderCell: ({ targetPercentageIdentity }) =>
        targetPercentageIdentity
          ? targetPercentageIdentity.toFixed(decimalPlaces)
          : 'N/A',
    },
  ];
}

function HomologyTableTab({ homologues, query, variables }) {
  const classes = useStyles();

  return (
    <DataTable
      showGlobalFilter
      dataDownloader
      columns={getColumns(classes)}
      rows={homologues}
      rowsPerPageOptions={defaultRowsPerPageOptions}
      query={query}
      variables={variables}
    />
  );
}

export default HomologyTableTab;
