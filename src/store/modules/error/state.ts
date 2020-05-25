export interface ErrorWithDescription {
  name: string;
  description: string;
}

export interface ErrorState {
  generalInformation: { section: string; errors: ErrorWithDescription[] };
  challenges: { section: string; errors: ErrorWithDescription[] };
  assessment: { section: string; errors: ErrorWithDescription[] };
  timeAndProcess: { section: string; errors: ErrorWithDescription[] };
  attachments: { section: string; errors: ErrorWithDescription[] };
  implementation: { section: string; errors: ErrorWithDescription[] };
  operation: { section: string; errors: ErrorWithDescription[] };
}
