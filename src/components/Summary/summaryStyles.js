import { makeStyles } from '@material-ui/core';

const summaryStyles = makeStyles(theme => ({
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  avatarError: {
    backgroundColor: theme.palette.secondary.main,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHasData: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover $titleHasData': {
      color: 'white',
    },
    '&:hover $subtitle': {
      color: 'white',
    },
    '&:hover $subheaderHasData': {
      color: 'white',
    },
    '&:hover $avatarHasData': {
      color: theme.palette.primary.main,
      backgroundColor: 'white !important',
    },
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  content: {
    height: '100%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingTop: 4,
    '&:last-child': {
      paddingBottom: 4,
    },
  },
  subheader: {
    color: theme.palette.grey[500],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  subheaderHasData: {
    color: theme.palette.primary.main,
  },
  subheaderError: {
    color: theme.palette.secondary.main,
  },
  summaryContainer: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  title: {
    color: theme.palette.grey[500],
    wordBreak: 'break-word',
  },
  titleHasData: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.palette.grey[500],
  },
  subtitleHasData: {
    color: theme.palette.text.primary,
  },
  titleError: {
    color: theme.palette.secondary.main,
  },
}));

export default summaryStyles;
