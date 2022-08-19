import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { DataTable } from '../../components/Table';
import Link from '../../components/Link';
import { naLabel } from '../../constants';

const accessionUrl =
  'http://www.ontobee.org/ontology/SO?iri=http://purl.obolibrary.org/obo/';
const variantData = [
  {
    term: 'transcript ablation',
    definition:
      'A feature ablation whereby the deleted region includes a transcript feature.',
    code: 'SO_0001893',
    score: 1,
  },
  {
    term: 'curator inference',
    definition: 'A sequence variant which is manually curated.',
    score: 1,
  },
  {
    term: 'trinucleotide repeat expansion',
    definition:
      'A short tandem repeat expansion with an increase in a sequence of three nucleotide units repeated in tandem compared to a reference sequence.',
    code: 'SO_0002165',
    score: 1,
  },
  {
    term: 'short tandem repeat expansion',
    definition:
      'A short tandem repeat variant containing more repeat units than the reference sequence.',
    code: 'SO_0002162',
    score: 1,
  },
  {
    term: 'frameshift variant',
    definition:
      'A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three.',
    code: 'SO_0001589',
    score: 0.95,
  },
  {
    term: 'stop gained',
    definition:
      'A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcript.',
    code: 'SO_0001587',
    score: 0.95,
  },
  {
    term: 'splice region variant',
    definition:
      'A sequence variant in which a change has occurred within the region of the splice site, either within 1-3 bases of the exon or 3-8 bases of the intron.',
    code: 'SO_0001630',
    score: 0.95,
  },
  {
    term: 'splice acceptor variant',
    definition:
      "A splice variant that changes the 2 base region at the 3' end of an intron.",
    code: 'SO_0001574',
    score: 0.95,
  },
  {
    term: 'splice donor variant',
    definition:
      "A splice variant that changes the 2 base pair region at the 5' end of an intron.",
    code: 'SO_0001575',
    score: 0.95,
  },
  {
    term: 'coding sequence variant',
    definition: 'A sequence variant that changes the coding sequence.',
    code: 'SO_0001580',
    score: 0.95,
  },
  {
    term: 'start lost',
    definition:
      'A codon variant that changes at least one base of the canonical start codon..',
    code: 'SO_0002012',
    score: 0.95,
  },
  {
    term: 'incomplete terminal codon variant',
    definition:
      'A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed..',
    code: 'SO_0001626',
    score: 0.9,
  },
  {
    term: 'stop lost',
    definition:
      'A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript.',
    code: 'SO_0001578',
    score: 0.9,
  },
  {
    term: 'protein altering variant',
    definition:
      'A sequence_variant which is predicted to change the protein encoded in the coding sequence.',
    code: 'SO_0001818',
    score: 0.7,
  },
  {
    term: 'missense variant',
    definition:
      'A sequence variant that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved.',
    code: 'SO_0001583',
    score: 0.7,
  },
  {
    term: 'initiator codon variant',
    definition:
      'A codon variant that changes at least one base of the first codon of a transcript.',
    code: 'SO_0001582',
    score: 0.7,
  },
  {
    term: 'inframe deletion',
    definition:
      'An inframe non synonymous variant that deletes bases from the coding sequence.',
    code: 'SO_0001822',
    score: 0.7,
  },
  {
    term: 'inframe insertion',
    definition:
      'An inframe non synonymous variant that inserts bases into in the coding sequence.',
    code: 'SO_0001821',
    score: 0.7,
  },
  {
    term: 'non coding transcript exon variant',
    definition:
      'A sequence variant that changes non-coding exon sequence in a non-coding transcript.',
    code: 'SO_0001619',
    score: 0.65,
  },
  {
    term: 'NMD transcript variant',
    definition: 'A variant in a transcript that is the target of NMD.',
    code: 'SO_0001621',
    score: 0.65,
  },
  {
    term: 'intron variant',
    definition: 'A transcript variant occurring within an intron.',
    code: 'SO_0001627',
    score: 0.65,
  },
  {
    term: 'mature miRNA variant',
    definition:
      'A transcript variant located with the sequence of the mature miRNA.',
    code: 'SO_0001620',
    score: 0.65,
  },
  {
    term: '3 prime UTR variant',
    definition: "A UTR variant of the 3' UTR.",
    code: 'SO_0001624',
    score: 0.65,
  },
  {
    term: '5 prime UTR variant',
    definition: "A UTR variant of the 5' UTR.",
    code: 'SO_0001623',
    score: 0.65,
  },
  {
    term: 'non_coding_transcript_exon_variant',
    definition: "A UTR variant of the 5' UTR.",
    code: 'SO_0001792',
    score: 0.65,
  },
  {
    term: 'synonymous variant',
    definition:
      'A sequence variant where there is no resulting change to the encoded amino acid.',
    code: 'SO_0001819',
    score: 0.65,
  },
  {
    term: 'stop retained variant',
    definition:
      'A sequence variant where at least one base in the terminator codon is changed, but the terminator remains.',
    code: 'SO_0001567',
    score: 0.65,
  },
  {
    term: 'regulatory region variant',
    definition: 'A sequence variant located within a regulatory region.',
    code: 'SO_0001566',
    score: 0.6,
  },
  {
    term: 'upstream gene variant',
    definition: "A sequence variant located 5' of a gene.",
    code: 'SO_0001631',
    score: 0.6,
  },
  {
    term: 'downstream gene variant',
    definition: "A sequence variant located 3' of a gene.",
    code: 'SO_0001632',
    score: 0.6,
  },
  {
    term: 'TF binding site variant',
    definition:
      'A sequence variant located within a transcription factor binding site.',
    code: 'SO_0001782',
    score: 0.6,
  },
  {
    term: 'transcript amplification',
    definition: 'A feature amplification of a region containing a transcript.',
    code: 'SO_0001889',
    score: 0.6,
  },
  {
    term: 'regulatory region amplification',
    definition:
      'A feature amplification of a region containing a regulatory region.',
    code: 'SO_0001891',
    score: 0.6,
  },
  {
    term: 'TFBS amplification',
    definition:
      'A feature amplification of a region containing a transcription factor binding site.',
    code: 'SO_0001892',
    score: 0.6,
  },
  {
    term: 'regulatory region ablation',
    definition:
      'A feature ablation whereby the deleted region includes a regulatory region.',
    code: 'SO_0001894',
    score: 0.6,
  },
  {
    term: 'TFBS ablation',
    definition:
      'A feature ablation whereby the deleted region includes a transcription factor binding site.',
    code: 'SO_0001895',
    score: 0.6,
  },
  {
    term: 'feature truncation',
    definition:
      'A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence.',
    code: 'SO_0001906',
    score: 0.6,
  },
  {
    term: 'feature elongation',
    definition:
      'A sequence variant that causes the extension of a genomic feature, with regard to the reference sequence.',
    code: 'SO_0001907',
    score: 0.6,
  },
  {
    term: 'Regulatory nearest gene five prime end',
    definition: "Regulatory nearest gene 5' end.",
    score: 0.5,
  },
  {
    term: 'Nearest gene five prime end',
    definition: "Nearest gene counting from the 5' end.",
    score: 0.5,
  },
  {
    term: 'sequence variant',
    definition:
      'A sequence variant is a non exact copy of a sequence feature or genome exhibiting one or more sequence alteration.',
    code: 'SO_0001060',
    score: 0.5,
  },
  {
    term: 'conservative inframe deletion',
    definition:
      'An inframe decrease in cds length that deletes one or more entire codons from the coding sequence but does not change any remaining codons.',
    code: 'SO_0001825',
    score: 0.5,
  },
];

const columns = [
  {
    id: 'term',
    label: 'SO term',
    width: '24%',
  },
  {
    id: 'definition',
    label: 'Definitions',
    width: '50%',
  },
  {
    id: 'code',
    label: 'SO accession',
    renderCell: row =>
      row.code ? (
        <Link to={accessionUrl + row.code} external>
          {row.code}
        </Link>
      ) : (
        naLabel
      ),
    width: '13%',
  },
  {
    id: 'score',
    label: <>Functional consequence score</>,
    width: '13%',
  },
];

const VariantsPage = () => {
  return (
    <Fragment>
      <Typography variant="h4" component="h1" paragraph>
        Variant definitions
      </Typography>
      <Typography paragraph>
        We predict the consequence of variants (germline or somatic) on genes
        associated with diseases based on the evidence for the Genetic
        associations and Somatic mutation data types. This effect is defined by
        consequence terms from the Sequence Ontology (SO) project.
      </Typography>
      <Typography paragraph>
        The SO consequence terms, their descriptions and accession IDs are shown
        in the table below. The terms are shown in decreasing order of severity
        (from more severe to less severe) based on the functional score in
        Koscielny et al (Supplementary Table 2).
      </Typography>

      <DataTable
        columns={columns}
        rows={variantData}
        noWrap={false}
        noWrapHeader={false}
        fixed
        pageSize={100}
        showPagination={false}
      />
    </Fragment>
  );
};

export default VariantsPage;
