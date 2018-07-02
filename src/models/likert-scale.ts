export type LikertScale = 'VERY_HIGH' | 'HIGH' | 'LOW' | 'VERY_LOW' | 'UNKNOWN';

export const LikertScaleLabels: {[likert in LikertScale]: string} = {
  HIGH: 'i nogen grad',
  LOW: 'i mindre grad',
  VERY_HIGH: 'i høj grad',
  VERY_LOW: 'slet ikke',
  UNKNOWN: 'ved ikke',
};

export const LikertScaleKeys: {[likert in LikertScale]: likert} = {
    HIGH: 'HIGH',
    LOW: 'LOW',
    UNKNOWN: 'UNKNOWN',
    VERY_HIGH: 'VERY_HIGH',
    VERY_LOW: 'VERY_LOW'
};
