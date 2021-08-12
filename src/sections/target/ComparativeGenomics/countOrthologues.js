export default function countOrthologues(homologues) {
  let orthologueCount = 0;
  homologues.forEach(({ homologyType }) => {
    if (
      homologyType === 'ortholog_one2one' ||
      homologyType === 'ortholog_one2many' ||
      homologyType === 'ortholog_many2many'
    ) {
      orthologueCount++;
    }
  });
  return orthologueCount;
}
