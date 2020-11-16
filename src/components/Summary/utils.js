import { gql } from '@apollo/client';

export function createSummaryFragment(sections, entity, fragmentName) {
  const sectionFragments = [];
  const sectionFragmentNames = [];
  const fragmentNameStr = fragmentName || `${entity}ProfileSummaryFragment`;

  sections.forEach(section => {
    if (!section.Summary.fragments) return;

    const sectionFragmentName = Object.keys(section.Summary.fragments)[0];

    sectionFragmentNames.push(sectionFragmentName);
    sectionFragments.push(section.Summary.fragments[sectionFragmentName]);
  });

  return gql`
    fragment ${fragmentNameStr} on ${entity} {
      ${
        sectionFragmentNames.length
          ? sectionFragmentNames.map(sfn => `...${sfn}`).join('\n')
          : 'id'
      }
    }
    ${sectionFragments.reduce(
      (acc, fragment) => gql`
        ${acc}
        ${fragment}
      `,
      ''
    )}
  `;
}

export function createShortName(definition) {
  return (
    definition.shortName ||
    definition.name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('')
  );
}
