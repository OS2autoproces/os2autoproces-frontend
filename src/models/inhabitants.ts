export type Inhabitants = 'BELOW_30000' | 'BELOW_45000' | 'BELOW_60000' | 'BELOW_100000' | 'ABOVE_100000';

export const InhabitantsLabels: { [x in Inhabitants]: string } = {
  BELOW_30000: 'Under 30.000 indbyggere',
  BELOW_45000: ' 30.000 - 44.999 indbyggere',
  BELOW_60000: '45.000 - 59.999 indbyggere',
  BELOW_100000: '60.000 - 99.999 indbyggere',
  ABOVE_100000: 'Over 100.000 indbyggere',
};

export const InhabitantsKeys: { [x in Inhabitants]: x } = {
  BELOW_30000: 'BELOW_30000',
  BELOW_45000: 'BELOW_45000',
  BELOW_60000: 'BELOW_60000',
  BELOW_100000: 'BELOW_100000',
  ABOVE_100000: 'ABOVE_100000',
};

export const InhabitantsOrder: Inhabitants[] = ['BELOW_30000', 'BELOW_45000', 'BELOW_60000', 'BELOW_100000', 'ABOVE_100000'];
