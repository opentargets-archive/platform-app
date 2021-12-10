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
    const {snvByGene, snvByVariant, cnvByGene, fusionByGene} = data;
    if (snvByGene && snvByGene.count === 0 && snvByVariant.count !== 0) {
      defaultTab = "snvByVariant"
    } else if (snvByVariant && snvByVariant.count === 0 && cnvByGene.count !== 0) {
      defaultTab = "cnvByGene"
    } else if (cnvByGene && cnvByGene.count === 0 && fusionByGene.count !== 0) {
      defaultTab = "fusionByGene"
    } else if (fusionByGene && fusionByGene.count === 0) {
      defaultTab = "fusion"
    }
  }
  return defaultTab;
}
