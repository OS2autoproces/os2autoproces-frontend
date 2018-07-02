export type Domain = 'WORK' | 'HEALTH' | 'CHILDREN' | 'ENVIRONMENT' | 'DEMOCRACY' | 'ADMINISTRATION';

export const DomainLabels: {[x in Domain]: string} = {
  WORK: 'Arbejdsmarked & Erhverv',
  HEALTH: 'Social & Sundhed',
  CHILDREN: 'Børn & Læring',
  ENVIRONMENT: 'Miljø, Teknik & Forsyning',
  DEMOCRACY: 'Demokrati & Involvering',
  ADMINISTRATION: 'Administation & Organisation',
};

export const DomainKeys: {[x in Domain]: x} = {
  WORK: 'WORK',
  HEALTH: 'HEALTH',
  CHILDREN: 'CHILDREN',
  ENVIRONMENT: 'ENVIRONMENT',
  DEMOCRACY: 'DEMOCRACY',
  ADMINISTRATION: 'ADMINISTRATION',
};
