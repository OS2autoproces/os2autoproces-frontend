import { Phase } from '@/models/phase';
import { Status } from '@/models/status';
import { Visibility } from '@/models/visibility';
import { LikertScale } from '@/models/likert-scale';
import { User } from '@/store/modules/auth/state';

export interface ProcessState extends Process {
  disabled: boolean;
  attachments: Attachment[] | null;
  comments: Comment[];
}

export interface Process {
  id: number;
  localId: string | null;
  klId: string | null;
  esdhReference: string | null;
  phase: Phase;
  status: Status;
  statusText: string | null;
  created: string;
  lastChanged: string;
  decommissioned: string | null;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  domain: string;
  visibility: Visibility;
  legalClause: string | null;
  legalClauseLastVerified: string | null;
  kle: string | null;
  kla: string | null;
  klaProcess: boolean;
  links: Link[] | null;
  vendor: string | null;
  cvr: string;
  internalNotes: string | null;
  processChallenges: string | null;
  solutionRequests: string | null;
  timeSpendOccurancesPerEmployee: number;
  timeSpendPerOccurance: number;
  timeSpendEmployeesDoingProcess: number;
  timeSpendPercentageDigital: number;
  timeSpendComputedTotal: number;
  timeSpendComment: string;
  targetsCompanies: boolean;
  targestsCitizens: boolean;
  levelOfProfessionalAssessment: LikertScale;
  levelOfChange: LikertScale;
  levelOfStructuredInformation: LikertScale;
  levelOfUniformity: LikertScale;
  levelOfDigitalInformation: LikertScale;
  levelOfRoiFromAutomization: LikertScale;
  evaluatedLevelOfRoi: LikertScale;
  technicalImplementationNotes: string | null;
  organizationalImplementationNotes: string | null;
  rating: number | null;
  ratingComment: string | null;
  searchWords: string | null;

  reporter: User | null;
  users: User[] | null;
  owner: User | null;
  contact: User | null;

  itSystems: ITSystem[] | null;
  orgUnits: OrgUnit[] | null;
  technologies: Technology[] | null;
}

export interface Link {
  url: string;
  internal: boolean;
}

export interface ITSystem {
  id: number;
  name: string;
  vendor: string | null;
}

export interface OrgUnit {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  cvr: string;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Attachment {
  fileName: string;
  id?: number;
  url?: string;
  uploading?: boolean;
}

export interface Comment {
    name: string;
    message: string;
    created: string;  
}