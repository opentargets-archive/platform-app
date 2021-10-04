import { Backdrop, CircularProgress } from '@material-ui/core';

function LoadingBackdrop() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 999 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingBackdrop;
