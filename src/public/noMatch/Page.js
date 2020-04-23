import React from 'react';
import Typography from '@material-ui/core/Typography';
import BasePage from '../common/BasePage';
import EmptyPage from '../common/EmptyPage';

const NoMatchPage = () => {
  return (
    <BasePage>
      <EmptyPage>
        <Typography>404 Page Not Found</Typography>
      </EmptyPage>
    </BasePage>
  );
};

export default NoMatchPage;
