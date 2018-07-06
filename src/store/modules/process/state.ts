import { Phase } from '@/models/phase';
import { Status } from '@/models/status';
import { Visibility } from '@/models/visibility';
import { LikertScale } from '@/models/likert-scale';
import { User } from '@/store/modules/auth/state';
import { Domain } from '@/models/domain';

export interface ProcessState extends Process {
  disabled: Disabled;
  attachments: Attachment[] | null;
  comments: Comment[];
}

export interface Process {
  id: string;
  localId: string;
  klId: string;
  esdhReference: string | null;
  phase: Phase;
  status: Status;
  statusText: string | null;
  created: Date | null;
  lastChanged: Date | null;
  decommissioned: Date | null;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  domain: Domain;
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
  timeSpendOccurancesPerEmployee: string;
  timeSpendPerOccurance: string;
  timeSpendEmployeesDoingProcess: string;
  timeSpendPercentageDigital: string;
  timeSpendComputedTotal: string;
  timeSpendComment: string;
  targetsCompanies: boolean;
  targestsCitizens: boolean;
  municipalityName: string;
  levelOfProfessionalAssessment: LikertScale;
  levelOfChange: LikertScale;
  levelOfStructuredInformation: LikertScale;
  levelOfUniformity: LikertScale;
  levelOfDigitalInformation: LikertScale;

  levelOfQuality: LikertScale;
  levelOfSpeed: LikertScale;
  levelOfRoutineWorkReduction: LikertScale;

  evaluatedLevelOfRoi: LikertScale;
  technicalImplementationNotes: string | null;
  organizationalImplementationNotes: string | null;
  rating: number | null;
  ratingComment: string | null;
  searchWords: string | null;

  users: User[];
  owner: User | null;
  contact: User | null;

  itSystems: ITSystem[] | null;
  orgUnits: OrgUnit[] | null;
  technologies: Technology[];
  hasBookmarked: boolean;
  canEdit: boolean;
}

export interface Link {
  url: string;
  internal: boolean;
}

export interface ITSystem {
  id: string;
  name: string;
  vendor: string | null;
}

export interface OrgUnit {
  id: string;
  uuid: string;
  name: string;
  active: boolean;
  cvr: string;
}

export interface Technology {
  id: string;
  name: string;
}

export interface Attachment {
  fileName: string;
  id?: string;
  url?: string;
  uploading?: boolean;
}

export interface Comment {
    name: string;
    message: string;
    created: string;  
}

export interface Disabled {
  titleEdit: boolean;
  generalInformationEdit: boolean;
  challengesEdit: boolean;
  timeAndProcessEdit: boolean;
  assessmentEdit: boolean;
  operationEdit: boolean;
  specificationEdit: boolean;
  implementationEdit: boolean;
  attachmentsEdit: boolean;
  municipalityUsingEdit: boolean;
}