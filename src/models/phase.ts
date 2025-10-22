export type Phase =
  | 'RAPID'  
  | 'IDEA'
  | 'PREANALYSIS'
  | 'SPECIFICATION'
  | 'DEVELOPMENT'
  | 'IMPLEMENTATION'
  | 'OPERATION'
  | 'DECOMMISSIONED';

export const PhaseLabels: { [x in Phase]: string } = {
  RAPID: 'Deling (ingen fase)',
  IDEA: 'Idé',
  PREANALYSIS: 'Foranalyse',
  SPECIFICATION: 'Specifikation',
  DEVELOPMENT: 'Udvikling',
  IMPLEMENTATION: 'Implementering',
  OPERATION: 'I drift',
  DECOMMISSIONED: 'Taget ud af drift'
};

export const PhaseKeys: { [phase in Phase]: phase } = {
  RAPID: 'RAPID',
  IDEA: 'IDEA',
  PREANALYSIS: 'PREANALYSIS',
  SPECIFICATION: 'SPECIFICATION',
  DEVELOPMENT: 'DEVELOPMENT',
  IMPLEMENTATION: 'IMPLEMENTATION',
  OPERATION: 'OPERATION',
  DECOMMISSIONED: 'DECOMMISSIONED'
};

export const PhaseOrder = [
  'RAPID',
  'IDEA',
  'PREANALYSIS',
  'SPECIFICATION',
  'DEVELOPMENT',
  'IMPLEMENTATION',
  'OPERATION',
  'DECOMMISSIONED',
];
