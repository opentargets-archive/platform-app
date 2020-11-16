import { makeStyles } from '@material-ui/core';

const drawerWidth = 280;

const navPanelStyles = makeStyles(theme => ({
  dragIndicator: {
    cursor: 'grab',
  },
  drawer: {
    flexShrink: 0,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    whiteSpace: 'nowrap',
    width: '3.9375rem',
    '&:hover': {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  paper: {
    overflow: 'hidden',
    width: 'inherit',
    zIndex: 1000,
    '&:hover': {
      boxShadow:
        '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    },
    '&:hover > $listOverflowClass': {
      overflowY: 'auto',
    },
  },
  list: {
    paddingTop: '2rem',
    overflow: 'hidden',
  },
  listHome: {
    padding: 0,
  },
  listItem: {
    height: '3.33rem',
    padding: '0 .66rem',
  },
  listItemAvatar: {
    backgroundColor: theme.palette.grey[300],
    marginRight: '1rem',
  },
  listItemAvatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemHome: {
    padding: '.5rem .9375rem',
  },
  listItemLabel: {
    width: '10.1rem',
    whiteSpace: 'normal',
  },
  listItemTxt: {
    margin: 0,
  },
  listItemAvatarHome: {
    height: '2rem',
    width: '2rem',
    backgroundColor: theme.palette.grey[700],
    marginRight: '1rem',
  },
  listOverflowClass: {},
}));

export default navPanelStyles;
