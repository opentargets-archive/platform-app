import React from 'react';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../../components/RMTL/NonRelevantIcon';

/*
 * Expected input as a String and their associate Icon return
 * Relevant Molecular Target (PMTL version x.x) => Icon [R]
 * Non-Relevant Molecular Target (PMTL version x.x) => Icon [NR]
 * "" => No Icon
 */
export const renderPMTLCell = (pmtlText) => {
  let PMTLIcon = ''
  if (pmtlText) {
    if (pmtlText.indexOf("Non-Relevant", 0) !== -1) {
      PMTLIcon = <NonRelevantIcon/>
    } else {
      PMTLIcon = <RelevantIcon/>
    }
  } 
  return PMTLIcon;
  
}

