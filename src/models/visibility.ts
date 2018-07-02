export type Visibility = 'PERSONAL' | 'MUNICIPALITY' | 'PUBLIC';

export const VisibilityLabels: {[x in Visibility]: string} = {
  PERSONAL: 'Privat',
  MUNICIPALITY: 'Kommunalt',
  PUBLIC: 'Tværkommunalt'
};

export const VisibilityKeys: {[x in Visibility]: x} = {
  PERSONAL: 'PERSONAL',
  MUNICIPALITY: 'MUNICIPALITY',
  PUBLIC: 'PUBLIC'
};
