import React from 'react';

import { decimalPlaces } from '../../../constants';
import Link from '../../../components/Link';
import OtTableRF from '../../../components/OtTableRF';
import DataDownloader from '../../../components/DataDownloader';

const scientificName2CommonName = {
  homo_sapiens: 'Human',
  mus_musculus_reference: 'Mouse',
  mus_musculus: 'Mouse',
  cavia_porcellus: 'Guinea pig',
  macaca_mulatta: 'Macaque',
  canis_lupus_familiaris: 'Dog',
  canis_familiaris: 'Dog',
  oryctolagus_cuniculus: 'Rabbit',
  rattus_norvegicus: 'Rat',
  sus_scrofa: 'Pig',
  sus_scrofa_usmarc: 'Pig',
  xenopus_tropicalis: 'Frog',
  danio_rerio: 'Zebrafish',
  drosophila_melanogaster: 'Fly',
  caenorhabditis_elegans: 'Worm',
  pan_troglodytes: 'Chimpanzee',
  'mus_musculus_reference_(CL57BL6)': 'Mouse',
  caenorhabditis_elegans_N2: 'Worm',
};

const homologyTypeDictionary = {
  ortholog_one2one: 'orthologue: 1 to 1',
  ortholog_one2many: 'orthologue: 1 to many',
  within_species_paralog: 'paralogue',
};

export async function getData(ensgId) {
  const urlData = `https://rest.ensembl.org/homology/id/${ensgId}.json?format=full;sequence=none;type=all;target_taxon=9606;target_taxon=10090;target_taxon=10141;target_taxon=9544;target_taxon=9615;target_taxon=9986;target_taxon=10116;target_taxon=9823;target_taxon=8364;target_taxon=7955;target_taxon=9598;target_taxon=7227;target_taxon=6239`;
  const urlTargetIdLookup = 'https://rest.ensembl.org/lookup/id/';
  const rawData = await fetch(urlData).then(res => res.json());
  const homologies = rawData.data[0].homologies.filter(
    d => scientificName2CommonName[d.target.species]
  );
  const targetIds = homologies.map(d => d.target.id);
  const targetIdLookup = await fetch(urlTargetIdLookup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: targetIds }),
  }).then(res => res.json());
  const rows = homologies
    .filter(d => Object.keys(homologyTypeDictionary).indexOf(d.type) >= 0)
    .map(d => ({
      dNdS: d.dn_ds,
      species: scientificName2CommonName[d.target.species],
      speciesId: d.target.species,
      homologyType: homologyTypeDictionary[d.type],
      queryPercentageIdentity: d.source.perc_id,
      targetPercentageIdentity: d.target.perc_id,
      targetGeneId: d.target.id,
      targetGeneSymbol: targetIdLookup[d.target.id]
        ? targetIdLookup[d.target.id].display_name
        : null,
    }));

  return { rows };
}

const columns = [
  {
    id: 'species',
    label: 'Species',
  },
  {
    id: 'homologyType',
    label: 'Homology type',
  },
  {
    id: 'targetGeneSymbol',
    label: 'Homologue and ID',
    renderCell: d => (
      <React.Fragment>
        {d.targetGeneSymbol} (
        <Link
          external
          to={`http://www.ensembl.org/${d.speciesId}/Gene/Summary?g=${
            d.targetGeneId
          }`}
        >
          {d.targetGeneId}
        </Link>
        )
      </React.Fragment>
    ),
  },
  {
    id: 'dNdS',
    label: `dN/dS`,
    renderCell: d => (d.dNdS ? d.dNdS.toFixed(decimalPlaces) : 'N/A'),
  },
  {
    id: 'queryPercentageIdentity',
    label: `Query %id`,
    renderCell: d =>
      d.queryPercentageIdentity
        ? d.queryPercentageIdentity.toFixed(decimalPlaces)
        : 'N/A',
  },
  {
    id: 'targetPercentageIdentity',
    label: `Target %id`,
    renderCell: d =>
      d.targetPercentageIdentity
        ? d.targetPercentageIdentity.toFixed(decimalPlaces)
        : 'N/A',
  },
];

const downloadColumns = [
  {
    id: 'species',
    label: 'Species',
  },
  {
    id: 'homologyType',
    label: 'Homology type',
  },
  {
    id: 'targetGeneSymbol',
    label: 'Homologue symbol',
  },
  {
    id: 'targetGeneId',
    label: 'Homologue ID',
  },
  {
    id: 'dNdS',
    label: `dN/dS`,
  },
  {
    id: 'queryPercentageIdentity',
    label: `Query %id`,
  },
  {
    id: 'targetPercentageIdentity',
    label: `Target %id`,
  },
];

function HomologyTableTab({ symbol, data }) {
  return (
    <>
      <DataDownloader
        tableHeaders={downloadColumns}
        rows={data.rows}
        fileStem={`${symbol}-orthologues`}
      />
      <OtTableRF columns={columns} data={data.rows} />
    </>
  );
}

export default HomologyTableTab;
