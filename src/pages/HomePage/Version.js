import { gql, useQuery } from '@apollo/client';
import { Box } from '@material-ui/core';
import Link from '../../components/Link';

// HELPERS
function getVersion({ month, year }) {
  return `${year}.${month < 10 ? '0' : ''}${month}`;
}

function getFullMonth({ month, year }) {
  const date = new Date(year + 2000, month - 1);
  return date.toLocaleString('default', { month: 'long' });
}

// QUERY
const DATA_VERSION_QUERY = gql`
  query DataVersion {
    meta {
      dataVersion {
        month
        year
      }
    }
  }
`;

// CONTAINER
function VersionContainer({ children }) {
  return (
    <Box display="flex" mt={5} justifyContent="center" alignContent="center">
      {children}
    </Box>
  );
}

// LINK
function VersionLink({ month, year, version }) {
  return (
    <Box ml={1}>
      <Link external to="https://platform-docs.opentargets.org/release-notes">
        {month} 20{year} ({version})
      </Link>
    </Box>
  );
}

// MAIN COMPONENT
function Version() {
  const { data, loading, error } = useQuery(DATA_VERSION_QUERY);
  if (error) return null;
  if (loading)
    return <VersionContainer>Loading data version ...</VersionContainer>;
  const {
    meta: {
      dataVersion: { month, year },
    },
  } = data;
  const version = getVersion({ month, year });
  const fullMonth = getFullMonth({ month, year });

  return (
    <VersionContainer>
      Last update:
      <VersionLink month={fullMonth} year={year} version={version} />
    </VersionContainer>
  );
}

export default Version;
