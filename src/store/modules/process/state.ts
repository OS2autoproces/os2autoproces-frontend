import { Domain } from '@/models/domain';
import { LikertScale } from '@/models/likert-scale';
import { Phase } from '@/models/phase';
import { Status } from '@/models/status';
import { RunPeriod } from '@/models/runperiod';
import { Type } from '@/models/types';
import { Visibility } from '@/models/visibility';
import { User } from '@/store/modules/auth/state';
import { Form, Kle } from '@/store/modules/common/actions';

export interface ProcessState extends Process {
  disabled: Disabled;
  attachments: Attachment[];
  comments: Comment[];
}

export interface Process {
  id: string;
  klId: string;
  children: Process[];
  parents: Process[];

  hasChanged: boolean;
  sepMep: boolean;
  esdhReference: string;
  phase: Phase;
  status: Status;
  runPeriod: RunPeriod;
  statusText: string;
  created: string;
  lastChanged: string;
  decommissioned: string;
  title: string;
  type: Type;
  shortDescription: string;
  longDescription: string;
  domains: Domain[];
  visibility: Visibility;
  legalClause: string;
  legalClauseLastVerified: string | null;
  kle: Kle | null;
  kla: string | null;
  klaProcess: boolean;
  codeRepositoryUrl: string;
  links: Link[];
  vendor: string | null;
  cvr: string;
  internalNotes: string;
  processChallenges: string;
  itSystemsDescription: string;
  solutionRequests: string;
  timeSpendOccurancesPerEmployee: string;
  timeSpendPerOccurance: string;
  timeSpendEmployeesDoingProcess: string;
  timeSpendPercentageDigital: string;
  timeSpendComputedTotal: string;
  timeSpendComment: string;
  targetsCompanies: boolean;
  targetsCitizens: boolean;
  municipalityName: string;
  levelOfProfessionalAssessment: LikertScale;
  levelOfChange: LikertScale;
  levelOfStructuredInformation: LikertScale;
  levelOfUniformity: LikertScale;
  levelOfDigitalInformation: LikertScale;
  form: Form | null;

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
  reporter: User | null;

  itSystems: ITSystem[];
  orgUnits: OrgUnit[];
  technologies: Technology[];
  hasBookmarked: boolean;
  canEdit: boolean;
  emailNotification: boolean;
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

export interface Municipality {
  name: string;
  cvr: string;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Attachment {
  id: number;
  fileName: string;
  visibleToOtherMunicipalities: boolean;
  url: string;
}

export interface AttachmentFile {
  id: number;
  fileName: string;
  visibleToOtherMunicipalities: boolean;
  file: File;
}

export interface Comment {
  name: string;
  message: string;
  created: string;
}

export interface Disabled {
  generalInformationEdit: boolean;
  challengesEdit: boolean;
  timeAndProcessEdit: boolean;
  assessmentEdit: boolean;
  operationEdit: boolean;
  implementationEdit: boolean;
  attachmentsEdit: boolean;
  internalNotesEdit: boolean;
}
