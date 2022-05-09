import React, { useRef, useEffect } from 'react';

import '@swissprot/swissbiopics-visualizer';
import config from '../../../config';

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

  useEffect(
    () => {
      class InstanceClass extends CanonicalDefinition {
        // constructor() {
        //   super();
        // }
      }
      customElements.define(instanceName.current, InstanceClass);
      const instance = document.querySelector(instanceName.current);
      const shadowRoot = instance?.shadowRoot;

      const onSvgLoaded = () => {
        // console.log('svg loaded...');
        const css = `
          #fakeContent {
            display: none;
          }
          .subcell_name {
            display: none;
          }
          .subcell_description {
            display: none;
          }
          .subcell_present .coloured {
            fill: ${config.profile.primaryColor}
          }
        `;
        // add styles
        const style = document.createElement('style');
        style.innerText = css;
        shadowRoot?.appendChild(style);
      };
      shadowRoot?.addEventListener('svgloaded', onSvgLoaded);
      return () => {
        shadowRoot?.removeEventListener('svgloaded', onSvgLoaded);
      };
    },
    [locationIds]
  );
  const Instance = props => <instanceName.current {...props} />;
  return (
    <>
      <div id="fakeContent" />

      <Instance taxid={taxonId} contentid="fakeContent" sls={locationIds} />
    </>
  );
}

export default SwissbioViz;
