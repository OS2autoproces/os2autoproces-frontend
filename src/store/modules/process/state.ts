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
  esdhReference: string;
  phase: Phase;
  status: Status;
  statusText: string;
  created: Date | null;
  lastChanged: Date | null;
  decommissioned: Date | null;
  title: string;
  shortDescription: string;
  longDescription: string;
  domain: Domain;
  visibility: Visibility;
  legalClause: string;
  legalClauseLastVerified: string | null;
  kle: string;
  kla: string;
  klaProcess: boolean;
  links: Link[];
  vendor: string | null;
  cvr: string;
  internalNotes: string;
  processChallenges: string;
  solutionRequests: string;
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
  technicalImplementationNotes: string;
  organizationalImplementationNotes: string;
  rating: number;
  ratingComment: string;
  searchWords: string;

  users: User[];
  owner: User | null;
  contact: User | null;

  itSystems: ITSystem[];
  orgUnits: OrgUnit[];
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