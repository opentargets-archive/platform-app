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
      console.log("PMTLText: ", pmtlText, " PMTLIcon: [NR]")
      PMTLIcon = <NonRelevantIcon/>
    } else {
      console.log("PMTLText: ", pmtlText, " PMTLIcon: [R]")
      PMTLIcon = <RelevantIcon/>
    }
  } else {
    console.log("PMTLText: ", pmtlText, " PMTLIcon: [?]")
  }
  return PMTLIcon;
  
}

