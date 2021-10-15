import React from 'react';
import { getGeneDiseaseGtexPlot } from '../../../utils/externalAPI';
import Description from './Description';

import {getData} from './Summary'; 
import {Body as OpenPedCanGeneExpressionBody} from '../../common/OpenPedCanGeneExpression'

function Body({ definition, id, label}) {
  const { ensgId: ensemblId, efoId } = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}-${efoId}`;
  const imageAlt = "Single-gene single-disease all-GTEx-tissue-subgroups";

  return (
    <OpenPedCanGeneExpressionBody
      definition={definition}
      id={id}
      getData={getData}
      getPlot={getGeneDiseaseGtexPlot}
      label={label}
      entity="evidence"
      Description={Description}
      fileStem={downloadFileName}
      imageAlt={imageAlt}
    />
  )
}

export default Body;
