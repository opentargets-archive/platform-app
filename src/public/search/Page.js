import React from 'react';
import BasePage from '../common/BasePage';

const SearchPage = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  return <BasePage>Search results for {searchParams.get('q')}</BasePage>;
};

export default SearchPage;
