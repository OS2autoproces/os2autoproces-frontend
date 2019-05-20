export type Status = 'REJECTED' | 'FAILED' | 'PENDING' | 'INPROGRESS' | 'NOT_RATED';

export const StatusLabels: { [x in Status]: string } = {
  REJECTED: 'Afvist',
  FAILED: 'Mislykket',
  PENDING: 'Afventer',
  INPROGRESS: 'Igang',
  NOT_RATED: 'Ikke vurderet',
};

export const StatusKeys: { [x in Status]: x } = {
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  NOT_RATED: 'NOT_RATED'
};
