export interface ErrorState {
  generalInformation: { section: string; errors: string[] };
  challenges: { section: string; errors: string[] };
  assessment: { section: string; errors: string[] };
  timeAndProcess: { section: string; errors: string[] };
  specification: { section: string; errors: string[] };
  implementation: { section: string; errors: string[] };
  operation: { section: string; errors: string[] };
}
