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

// return a default Tab that has available data
export const getSADefaultTab = (data) => {
  let defaultTab = "snvByGene"
  if (data) {
    const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = data;
    if (snvByGene && snvByGene.count !== 0) {
      defaultTab = "snvByGene"
    } else if (snvByVariant && snvByVariant.count !== 0) {
      defaultTab = "snvByVariant"
    } else if (cnvByGene && cnvByGene.count !== 0) {
      defaultTab = "cnvByGene"
    } else if (fusionByGene && fusionByGene.count !== 0) {
      defaultTab = "fusionByGene"
    } else if (fusion && fusion.count !== 0) {
      defaultTab = "fusion"
    }
  }
  return defaultTab;
}

export const addCustomFields = (columns, minWidth='160px') => {
  const labelStyle = {padding: '2px 10px 2px 2px'}
  columns.map((data, i) => 
    columns[i] = data.minWidth ? {...data, labelStyle} : {...data, minWidth: minWidth, labelStyle})
}
