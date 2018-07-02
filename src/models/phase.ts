export type Phase = 'IDEA' | 'PREANALYSIS' | 'SPECIFICATION' | 'DEVELOPMENT' | 'IMPLEMENTATION' | 'OPERATION';

export const PhaseLabels: {[x in Phase]: string} = {
  IDEA: 'Idé',
  PREANALYSIS: 'Foranalyse',
  SPECIFICATION: 'Specifikation',
  DEVELOPMENT: 'Udvikling',
  IMPLEMENTATION: 'Implementering',
  OPERATION: 'Drift'
};

export const PhaseKeys: {[phase in Phase]: phase} = {
  IDEA: 'IDEA',
  PREANALYSIS: 'PREANALYSIS',
  SPECIFICATION: 'SPECIFICATION',
  DEVELOPMENT: 'DEVELOPMENT',
  IMPLEMENTATION: 'IMPLEMENTATION',
  OPERATION: 'OPERATION',
};
