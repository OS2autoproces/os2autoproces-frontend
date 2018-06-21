export const Status = {
  inProgress: 'Igang',
  waiting: 'Afventer',
  disapproved: 'Afvist',
  stored: 'Arkiveret',
  unsuccessful: 'Mislykket'
}

export interface GeneralInformationState {
  disabled: boolean;
  kleNumber: string; // KL Nummer
  paragraf: string; // paragraf og lov
  field: string; // field of study eller fagområde
  department: string; // afdeling
  visibility: string; // synlighed
  contactPerson: string; // kontaktperson
  email: string; // mail
  processTime: string; // årlig procestid
  projectManager: string; // projektleder
  supplier: string; // leverrandør
  resume: string; // resumé
  associatedPersons: string[];
  status: string;
  phase: number;

  // Status text
  waiting: string;
  disapproved: string;
  stored: string;
  unsuccessful: string;
}


