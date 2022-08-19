import React from 'react';
import { getGeneAllCancerPlot } from '../../../utils/externalAPI';
import Description from './Description';

import {getData} from './Summary'; 
import {Body as OpenPedCanGeneExpression} from '../../common/OpenPedCanGeneExpression'

function Body({ definition, id, label: symbol }) {
  const ensemblId = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}`;
  const imageAlt = "Ssingle-gene all-diseases";

  return (
    <OpenPedCanGeneExpression
      definition={definition}
      id={id}
      getData={getData}
      getPlot={getGeneAllCancerPlot}
      label={{symbol}}
      entity="target"
      Description={Description}
      fileStem={downloadFileName}
      imageAlt={imageAlt}
    />
  )
}

export default Body;
