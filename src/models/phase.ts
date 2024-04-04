export type Phase =
  | 'IDEA'
  | 'PREANALYSIS'
  | 'SPECIFICATION'
  | 'DEVELOPMENT'
  | 'IMPLEMENTATION'
  | 'OPERATION'
  | 'DECOMMISSIONED';

export const PhaseLabels: { [x in Phase]: string } = {
  IDEA: 'Idé',
  PREANALYSIS: 'Foranalyse',
  SPECIFICATION: 'Specifikation',
  DEVELOPMENT: 'Udvikling',
  IMPLEMENTATION: 'Implementering',
  OPERATION: 'I drift',
  DECOMMISSIONED: 'Taget ud af drift'
};

export const PhaseKeys: { [phase in Phase]: phase } = {
  IDEA: 'IDEA',
  PREANALYSIS: 'PREANALYSIS',
  SPECIFICATION: 'SPECIFICATION',
  DEVELOPMENT: 'DEVELOPMENT',
  IMPLEMENTATION: 'IMPLEMENTATION',
  OPERATION: 'OPERATION',
  DECOMMISSIONED: 'DECOMMISSIONED'
};

export const PhaseOrder = [
  'IDEA',
  'PREANALYSIS',
  'SPECIFICATION',
  'DEVELOPMENT',
  'IMPLEMENTATION',
  'OPERATION',
  'DECOMMISSIONED'
];
