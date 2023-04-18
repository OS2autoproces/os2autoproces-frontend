export type Domain =
  | 'HEALTH'
  | 'ENVIRONMENT'
  | 'DEMOCRACY'
  | 'ADMINISTRATION'
  | 'EMPLOYMENT'
  | 'PROFESSION'
  | 'FAMILY'
  | 'EDUCATION'
  | 'TECHNIQUE'
  | 'SOCIAL'
  | 'SUSTAINABILITY'
  | 'HR'
  | 'IT'
  | 'CULTURE'
  | 'ECONOMY';

export const DomainLabels: { [x in Domain]: string } = {
  ADMINISTRATION: 'Administration',
  EMPLOYMENT: 'Beskæftigelse',
  PROFESSION: 'Erhverv',
  FAMILY: 'Familie',
  EDUCATION: 'Uddannelse',
  DEMOCRACY: 'Demokrati',
  ENVIRONMENT: 'Miljø',
  TECHNIQUE: 'Teknik',
  SOCIAL: 'Social',
  HEALTH: 'Sundhed',
  SUSTAINABILITY: 'Bæredygtighed',
  HR: 'HR',
  IT: 'IT',
  CULTURE: 'Kultur',
  ECONOMY: 'Økonomi'
};

export const DomainKeys: { [x in Domain]: x } = {
  ADMINISTRATION: 'ADMINISTRATION',
  EMPLOYMENT: 'EMPLOYMENT',
  PROFESSION: 'PROFESSION',
  FAMILY: 'FAMILY',
  EDUCATION: 'EDUCATION',
  DEMOCRACY: 'DEMOCRACY',
  ENVIRONMENT: 'ENVIRONMENT',
  TECHNIQUE: 'TECHNIQUE',
  SOCIAL: 'SOCIAL',
  HEALTH: 'HEALTH',
  SUSTAINABILITY: 'SUSTAINABILITY',
  HR: 'HR',
  IT: 'IT',
  CULTURE: 'CULTURE',
  ECONOMY: 'ECONOMY'
};
