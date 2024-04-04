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
  SUSTAINABILITY: 'Bæredygtighed',
  DEMOCRACY: 'Demokrati',
  PROFESSION: 'Erhverv',
  FAMILY: 'Familie',
  HR: 'HR',
  IT: 'IT',
  CULTURE: 'Kultur',
  ENVIRONMENT: 'Miljø',
  SOCIAL: 'Social',
  HEALTH: 'Sundhed',
  TECHNIQUE: 'Teknik',
  EDUCATION: 'Uddannelse',
  ECONOMY: 'Økonomi'
};

export const DomainKeys: { [x in Domain]: x } = {
  ADMINISTRATION: 'ADMINISTRATION',
  EMPLOYMENT: 'EMPLOYMENT',
  SUSTAINABILITY: 'SUSTAINABILITY',
  DEMOCRACY: 'DEMOCRACY',
  PROFESSION: 'PROFESSION',
  FAMILY: 'FAMILY',
  HR: 'HR',
  IT: 'IT',
  CULTURE: 'CULTURE',
  ENVIRONMENT: 'ENVIRONMENT',
  SOCIAL: 'SOCIAL',
  HEALTH: 'HEALTH',
  TECHNIQUE: 'TECHNIQUE',
  EDUCATION: 'EDUCATION',
  ECONOMY: 'ECONOMY'
};
