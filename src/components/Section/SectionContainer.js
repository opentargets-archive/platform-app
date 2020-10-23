import React from 'react';
import { Grid } from '@material-ui/core';

import { NavPanel } from '../NavPanel';
import useSectionOrder from '../../hooks/useSectionOrder';

function SectionContainer({ children }) {
  const { sectionOrder, updateSectionOrder, shouldRender } = useSectionOrder();
  const sortedChildren = sectionOrder.map(sectionId =>
    React.Children.toArray(children).find(
      child => child.props.definition.id === sectionId
    )
  );

  const handleSectionReorder = newSectionOrder => {
    updateSectionOrder(newSectionOrder);
  };

  return (
    <>
      <NavPanel
        sections={sortedChildren}
        onSectionReorder={handleSectionReorder}
      />
      <Grid id="summary-section" container spacing={1}>
        {sortedChildren.map(Section =>
          shouldRender(Section) ? Section : null
        )}
      </Grid>
    </>
  );
}

export default SectionContainer;
