export type AssessmentChoice = number | null;

export interface AssessmentState extends Assessment {
  disabled: boolean;
}

export interface Assessment {
  levelOfProfessionalAssessment: AssessmentChoice;
  levelOfChange: AssessmentChoice;
  levelOfStructuredInformation: AssessmentChoice;
  levelOfUniformity: AssessmentChoice;
  levelOfDigitalInformation: AssessmentChoice;
  levelOfRoiFromAutomization: AssessmentChoice;
  evaluatedLevelOfRoi: AssessmentChoice;
}
