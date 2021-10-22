import { Suspense, lazy } from 'react';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import BasePage from '../../components/BasePage';

const DownloadsPage = lazy(() => import('./DownloadsPage.js'));

const DownloadsWrapper = ({ location }) => (
  <BasePage
    title="Variant definitions"
    description="Variant definitions, including Sequence Ontology (SO) consequence terms, descriptions, and accession IDs"
    location={location}
  >
    <Suspense fallback={<LoadingBackdrop />}>
      <DownloadsPage />
    </Suspense>
  </BasePage>
);

export default DownloadsWrapper;
