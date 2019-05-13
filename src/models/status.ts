export type Status = 'REJECTED' | 'FAILED' | 'PENDING' | 'INPROGRESS' | 'NOTASSESSED';

export const StatusLabels: { [x in Status]: string } = {
  REJECTED: 'Afvist',
  FAILED: 'Mislykket',
  PENDING: 'Afventer',
  INPROGRESS: 'Igang',
  NOTASSESSED: 'Ikke vurderet',
};

export const StatusKeys: { [x in Status]: x } = {
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  NOTASSESSED: 'NOTASSESSED'
};
