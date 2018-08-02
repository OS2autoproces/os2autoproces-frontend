export type LikertScale = 'VERY_HIGH' | 'HIGH' | 'LOW' | 'VERY_LOW' | 'UNKNOWN' | 'NOT_SET';

export const LikertScaleLabels: { [likert in LikertScale]: string } = {
  HIGH: 'I nogen grad',
  LOW: 'I mindre grad',
  VERY_HIGH: 'I høj grad',
  VERY_LOW: 'Slet ikke',
  UNKNOWN: 'Ved ikke',
  NOT_SET: ''
};

export const LikertScaleKeys: { [likert in LikertScale]: likert } = {
  HIGH: 'HIGH',
  LOW: 'LOW',
  UNKNOWN: 'UNKNOWN',
  VERY_HIGH: 'VERY_HIGH',
  VERY_LOW: 'VERY_LOW',
  NOT_SET: 'NOT_SET'
};
