// Section imports
import * as DrugWarnings from '../../sections/drug/DrugWarnings';
import * as Bibliography from '../../sections/drug/Bibliography';
import * as ClinicalPrecedence from '../../sections/drug/KnownDrugs';
import * as Indications from '../../sections/drug/Indications';
import * as MechanismsOfAction from '../../sections/drug/MechanismsOfAction';
import * as Pharmacovigilance from '../../sections/drug/AdverseEvents';

const sections = [
  MechanismsOfAction,
  Indications,
  ClinicalPrecedence,
  DrugWarnings,
  Pharmacovigilance,
  Bibliography,
];
export default sections;
