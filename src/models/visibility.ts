export type Visibility = 'PERSONAL' | 'MUNICIPALITY' | 'PUBLIC';

export const VisibilityLabels: { [x in Visibility]: string } = {
  PERSONAL: 'Privat',
  MUNICIPALITY: 'Egen organisation',
  PUBLIC: 'Alle i OS2autoproces'
};

export const VisibilityKeys: { [x in Visibility]: x } = {
  PERSONAL: 'PERSONAL',
  MUNICIPALITY: 'MUNICIPALITY',
  PUBLIC: 'PUBLIC'
};

export const VisibilityOrder: Visibility[] = ['PERSONAL', 'MUNICIPALITY', 'PUBLIC'];
