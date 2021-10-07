import { Box, CircularProgress, withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    color: theme.palette.primary.main,
    zIndex: 999,
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

function LoadingBackdrop({ classes }) {
  return (
    <Box className={classes.container}>
      <CircularProgress color="inherit" />
    </Box>
  );
}

export default withStyles(styles)(LoadingBackdrop);
