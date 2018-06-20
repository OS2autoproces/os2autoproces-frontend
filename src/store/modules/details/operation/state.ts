export interface OperationState {
  disabled: boolean;
  potential: number | null;
  lastUpdated: string;
  lastChecked: string;
  decommissioned: string;
  realizedPotential: string;
}
