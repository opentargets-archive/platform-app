import React, { memo, useRef, useEffect } from 'react';
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
const reMpPart = /(mp|part)_(?<id>\w+)/;

const canonicalName = 'sib-swissbiopics-sl';
const CanonicalDefinition = customElements.get(canonicalName);

// Note that these are without leading zeros eg: GO1 (and not GO0000001) so make sure
// the correct classnames are supplied in SubcellularLocationGOView
const getGoTermClassNames = locationGroup =>
  Array.from(locationGroup.classList.values())
    .filter(className => className.startsWith('GO'))
    .map(goId => `.${goId}`);

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
 * Visualization wrapper for the SwissBioPic widget.
 * This is taken from Uniprot code whic in turn is based on swissprot approach using custom elements.
 */
const SwissbioViz = memo(({ locationIds, taxonId, sourceId, children }) => {
  const instanceName = useRef(`${canonicalName}-${sourceId}-${v1()}`);

  useEffect(
    () => {
      class InstanceClass extends CanonicalDefinition {
        constructor() {
          super();
          this.removedCSSRules = false;
        }

        deleteCSSRule(selectorText) {
          for (const styleSheet of super.shadowRoot?.styleSheets || []) {
            const { cssRules } = styleSheet;
            for (let index = 0; index < cssRules.length; index += 1) {
              const cssRule = cssRules[index];
              if (
                cssRule instanceof CSSStyleRule &&
                cssRule.selectorText === selectorText
              ) {
                styleSheet.deleteRule(index);
                return;
              }
            }
          }
        }

        // logic for highlighting
        getHighlights(image) {
          if (!image) {
            return [];
          }
          const selectors = getGoTermClassNames(image);

          if (image?.id) {
            selectors.push(`#${image.id}term`);
          }
          return this.querySelectorAll(selectors.join(','));
        }

        highLight(text, image, selector) {
          if (!this.removedCSSRules) {
            // Remove the .lookedAt CSS rule to avoid the default styling
            this.deleteCSSRule('.lookedAt');
            // Undo hard-coded cytoskeleton rule
            this.deleteCSSRule('#SL0090 .lookedAt');
            this.removedCSSRules = true;
          }
          super.highLight(text, image, selector);
          // Add "lookedAt" classname to image SVG and text
          for (const highlight of this.getHighlights(image)) {
            highlight?.classList.add('lookedAt');
          }
        }

        // Note that there is no "h" in the middle of this method name
        // This is probably a typo that needs correcting
        removeHiglight(text, image, selector) {
          // Remove "lookedAt" classname from image SVG and text
          for (const highlight of this.getHighlights(image)) {
            highlight?.classList.remove('lookedAt');
          }
          super.removeHiglight(text, image, selector);
        }
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
            .subcell_present .coloured {
              fill: ${config.profile.primaryColor};
              fill-opacity: 0.3;
            }
            .lookedAt {
              stroke: black !important;
              fill: ${config.profile.primaryColor} !important;
              fill-opacity: 1 !important;
            }
            #swissbiopic > svg {
              width: 100%;
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

        // This finds all subcellular location SVGs for which we have a location
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
});

export default SwissbioViz;
