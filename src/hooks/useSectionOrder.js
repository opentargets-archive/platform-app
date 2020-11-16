import { useContext } from 'react';

import { SectionOrderContext } from '../contexts/SectionOrderProvider';

function useSectionOrder() {
  const context = useContext(SectionOrderContext);

  if (context === undefined) {
    throw new Error(
      'useSectionOrder must be used within a SectionOrderProvider'
    );
  }

  return context;
}

export default useSectionOrder;
