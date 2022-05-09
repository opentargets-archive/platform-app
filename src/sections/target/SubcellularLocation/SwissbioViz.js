import React, { useRef, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { loader } from 'graphql.macro';
// import { Typography, List, ListItem, Box } from '@material-ui/core';

// import Description from './Description';
// import SectionItem from '../../../components/Section/SectionItem';
// import Link from '../../../components/Link';
// import { identifiersOrgLink, getUniprotIds } from '../../../utils/global';

import '@swissprot/swissbiopics-visualizer';

const canonicalName = 'sib-swissbiopics-sl';
const CanonicalDefinition = customElements.get(canonicalName);

/**
 * Visualization for the SwissBioPic widget.
 * This is based on Uniprot's approach
 */
function SwissbioViz({ locationIds, taxonId }) {
  /*

  <template id="sibSwissBioPicsSlLiItem">
            <li className="subcellular_location">
                <a className="subcell_name"></a>
                <span className="subcell_description"></span>
            </li>
          </template>

          <template id="sibSwissBioPicsStyle">
      <style>
          ul > li > a {
              font-style:oblique;
          }
          ul.notpresent li > .subcell_description {
              display:none;
          }
      </style>
    </template>
    
          <sib-swissbiopics-sl taxid="9606" sls="SL0073"></sib-swissbiopics-sl>


        
        <template id="sibSwissBioPicsStyle" />
        <div id="fakeContent" />
        <Instance taxid={taxonId} contentid="fakeContent" {...locationIds}>
          {children}
        </Instance>

   */
  const instanceName = useRef(canonicalName + '-go');
  const uniProtLocationIds = uniProtLocations?.map(({ id }) => id).join(',');
  const goLocationIds = goLocations; //goLocations?.map(({ id }) => id).join(',');

  useEffect(
    () => {
      class InstanceClass extends CanonicalDefinition {
        // constructor() {
        //   super();
        // }
      }
      customElements.define(instanceName.current, InstanceClass);
    },
    [locationIds]
  );
  const Instance = props => <instanceName.current {...props} />;
  return (
    <>
      <template id="sibSwissBioPicsStyle" />
      <div id="fakeContent" />

      <Instance taxid={taxonId} contentid="fakeContent" sls={locationIds} />
    </>
  );
}

export default SwissbioViz;
