import React, { Suspense, lazy } from 'react';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import BasePage from '../../components/BasePage';

const VariantsPage = lazy(() => import('./VariantsPage.js'));

const VariantsWrapper = ({ location }) => (
  <BasePage
    title="Variant definitions"
    description="Variant definitions, including Sequence Ontology (SO) consequence terms, descriptions, and accession IDs"
    location={location}
  >
    <Suspense fallback={<LoadingBackdrop />}>
      <VariantsPage />
    </Suspense>
  </BasePage>
);

export default VariantsWrapper;
