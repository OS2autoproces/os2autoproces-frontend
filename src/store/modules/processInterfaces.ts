import { Phase } from '@/models/phase';
import { Status } from '@/models/status';
import { RunPeriod } from '@/models/runperiod';
import { Type } from '@/models/types';
import { Domain } from '@/models/domain';
import { Visibility } from '@/models/visibility';
import { Kle, Form, ITSystem, OrgUnit, Technology, Service } from './commonInterfaces';
import { LikertScale } from '@/models/likert-scale';
import { User } from './auth';

export interface ProcessReport {
  id: string;
  klId: string | null;
  children: ProcessReport[] | null;
  parents: ProcessReport[] | null;
  hasChanged: boolean | null;
  sepMep: boolean | null;
  esdhReference: string | null;
  phase: Phase | null;
  status: Status | null;
  runPeriod: RunPeriod | null;
  statusText: string | null;
  created: string | null;
  lastChanged: string | null;
  putIntoOperation: string | null;
  decommissioned: string | null;
  title: string | null;
  type: Type | null;
  shortDescription: string | null;
  longDescription: string | null;
  domains: Domain[] | null;
  visibility: Visibility | null;
  legalClause: string | null;
  legalClauseLastVerified: string | null;
  kle: Kle | null;
  kla: string | null;
  klaProcess: boolean | null;
  codeRepositoryUrl: string | null;
  links: Link[] | null;
  vendor: string | null;
  cvr: string | null;
  internalNotes: string | null;
  processChallenges: string | null;
  itSystemsDescription: string | null;
  solutionRequests: string | null;
  timeSpendOccurancesPerEmployee: string | null;
  timeSpendPerOccurance: string | null;
  expectedDevelopmentTime: string | null;
  timeSpendEmployeesDoingProcess: string | null;
  timeSpendPercentageDigital: string | null;
  timeSpendComputedTotal: string | null;
  timeSpendComment: string | null;
  targetsCompanies: boolean | null;
  targetsCitizens: boolean | null;
  municipalityName: string | null;
  levelOfProfessionalAssessment: LikertScale | null;
  levelOfChange: LikertScale | null;
  levelOfStructuredInformation: LikertScale | null;
  levelOfUniformity: LikertScale | null;
  levelOfDigitalInformation: LikertScale | null;
  form: Form | null;
  levelOfQuality: LikertScale | null;
  levelOfSpeed: LikertScale | null;
  levelOfRoutineWorkReduction: LikertScale | null;
  evaluatedLevelOfRoi: LikertScale | null;
  technicalImplementationNotes: string | null;
  organizationalImplementationNotes: string | null;
  rating: number | null;
  ratingComment: string | null;
  automationDescription: string | null;
  searchWords: string | null;
  users: User[] | null;
  owner: User | null;
  contact: User | null;
  otherContactEmail: string | null;
  reporter: User | null;
  itSystems: ITSystem[] | null;
  services: Service[] | null;
  orgUnits: OrgUnit[] | null;
  technologies: Technology[] | null;
  hasBookmarked: boolean | null;
  canEdit: boolean | null;
  emailNotification: boolean | null;
  seenByCount: number;
  base64Logo: string | null;
  employees: string | null;
  inhabitants: string | null;
  canEditOtherContact: boolean | null;
}
export interface Link {
  url: string;
  internal: boolean;
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

export interface NewComment {
  message: string;
  processId: string;
}

export interface BackendManagedFields {
  id: string;
  created?: string;
  lastChanged?: string;
  klaProcess: boolean;
  cvr: string;
  municipalityName: string;
}
