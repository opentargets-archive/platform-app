import React, { useState } from 'react';
import ls from 'local-storage';

import usePlatformApi from '../hooks/usePlatformApi';

const SectionOrderContext = React.createContext();

function SectionOrderProvider({ sections, children }) {
  const { data, entity, lsSectionsField } = usePlatformApi();
  const [sectionOrder, setSectionOrder] = useState(
    ls.get(`${lsSectionsField || entity}SectionsOrder`) ||
      sections.map(section => section.definition.id)
  );

  const updateSectionOrder = newSectionOrder => {
    setSectionOrder(newSectionOrder);
    ls.set(`${lsSectionsField || entity}SectionsOrder`, newSectionOrder);
  };

  const shouldRender = section => {
    const { hasData, external } = section.props.definition;

    //TODO: review this.
    return external || (data && hasData(data?.[entity])) || false;
  };

  return (
    <SectionOrderContext.Provider
      value={{ sectionOrder, updateSectionOrder, shouldRender }}
    >
      {children}
    </SectionOrderContext.Provider>
  );
}

export default SectionOrderProvider;
export { SectionOrderContext };
