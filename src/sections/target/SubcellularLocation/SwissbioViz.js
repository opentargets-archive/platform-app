import React, { useRef, useEffect } from 'react';
import { v1 } from 'uuid';

import '@swissprot/swissbiopics-visualizer';
import config from '../../../config';

const shapes = [
  'path',
  'circle',
  'ellipse',
  'polygon',
  'rect',
  'polyline',
  'line',
];
const shapesSelector = shapes.join(', ');
// const scopedShapesSelector = shapes.map((s) => `:scope ${s}`).join(', ');
const reMpPart = /(mp|part)_(?<id>\w+)/;

const canonicalName = 'sib-swissbiopics-sl';
const CanonicalDefinition = customElements.get(canonicalName);

const getUniProtTextSelectors = subcellularPresentSVG => [
  `#${subcellularPresentSVG.id}term`,
  ...Array.from(subcellularPresentSVG.classList)
    .map(className => {
      const id = className.match(reMpPart)?.groups?.id;
      return id && `#${id}term`;
    })
    .filter(sel => Boolean(sel)),
];

/**
 * Visualization for the SwissBioPic widget.
 * This is based on Uniprot's approach
 */
function SwissbioViz({ locationIds, taxonId, children }) {
  const instanceName = useRef(`${canonicalName}-${v1()}`);

  useEffect(
    () => {
      class InstanceClass extends CanonicalDefinition {
        // constructor() {
        //   super();
        // }
      }
      // customElements.get(instanceName.current) || customElements.define(instanceName.current, InstanceClass);
      customElements.define(instanceName.current, InstanceClass);
      const instance = document.querySelector(instanceName.current);
      const shadowRoot = instance?.shadowRoot;

      const onSvgLoaded = () => {
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
          .subcell_present > .coloured {
            fill: '#F00';
            fill-opacity: 0.7 !important;
          }
          .lookedAt {
            stroke: black !important;
            fill: ${config.profile.primaryColor} !important;
            fill-opacity: 1 !important;
          }
        `;

        // add styles
        const style = document.createElement('style');
        style.innerText = css;
        shadowRoot?.appendChild(style);

        // add a slot to inject content
        const slot = document.createElement('slot');
        const terms = shadowRoot?.querySelector('.terms');
        terms?.appendChild(slot);

        // This finds all subcellular location SVGs that will require a tooltip
        const subcellularPresentSVGs =
          shadowRoot?.querySelectorAll(
            'svg .subcell_present, svg [class*="mp_"], svg [class*="part_"]'
          ) || [];

        subcellularPresentSVGs.forEach(subcellularPresentSVG => {
          const textSelectors = getUniProtTextSelectors(subcellularPresentSVG);
          for (const textSelector of textSelectors) {
            const locationText = instance?.querySelector(textSelector);

            if (locationText) {
              locationText.classList.add('inpicture');
              const locationSVG = shadowRoot?.querySelector(
                `#${subcellularPresentSVG.id}`
              );
              // TODO: need to remove event listeners on unmount. Will leave for now until
              // to see what changes are made to @swissprot/swissbiopics-visualizer
              locationText.addEventListener('mouseenter', () => {
                instance?.highLight(locationText, locationSVG, shapesSelector);
              });
              locationText.addEventListener('mouseleave', () => {
                instance?.removeHiglight(
                  locationText,
                  locationSVG,
                  shapesSelector
                );
              });
            }
          }
        });
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

      <Instance taxid={taxonId} contentid="fakeContent" sls={locationIds}>
        {children}
      </Instance>
    </>
  );
}

export default SwissbioViz;
