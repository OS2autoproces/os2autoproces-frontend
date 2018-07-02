import { User } from "@/store/modules/auth/state";

export const Status = {
  inProgress: 'Igang',
  waiting: 'Afventer',
  disapproved: 'Afvist',
  stored: 'Arkiveret',
  unsuccessful: 'Mislykket'
};

export interface GeneralInformationState extends GeneralInformation {
  disabled: boolean;
}

export interface GeneralInformation {
  id: number | null;
  localId: string | null;
  klId: string | null;
  phase: number;
  status: string;
  statusText: string;
  kle: string | null;
  kla: string | null;
  klaProcess: boolean;
  shortDescription: string;

  legalClause: string | null;

  created: string;
  lastUpdated: string;

  visibility: string; // synlighed
  domain: string; // fagområde, enum

  owner: User | null; 
  reporter: User | null;
  contact: User | null;
  users: User[] | null; // associated

  orgUnits: string | null;

  department: string | null; // afdeling
  processTime: string; // årlig procestid
}
