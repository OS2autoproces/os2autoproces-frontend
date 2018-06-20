export type AssessmentChoice = number | null;

export interface AssessmentState {
  disabled: boolean;
  degreeOfAssessment: AssessmentChoice;
  degreeOfFrequentChanges: AssessmentChoice;
  degreeOfStructuredInformation: AssessmentChoice;
  degreeOfSolutionVariation: AssessmentChoice;
  degreeOfAvailableInformation: AssessmentChoice;
  degreeOfAutomationGain: AssessmentChoice;
  degreeOfAutomationPotential: AssessmentChoice;
}
