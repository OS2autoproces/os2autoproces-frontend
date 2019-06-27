export type Status = 'REJECTED' | 'FAILED' | 'PENDING' | 'INPROGRESS' | 'NOT_RATED';

export const StatusLabels: { [x in Status]: string } = {
  REJECTED: 'Afvist',
  FAILED: 'Mislykket',
  PENDING: 'Afventer',
  INPROGRESS: 'Igang',
  NOT_RATED: 'Ikke vurderet'
};

export const StatusKeys: { [x in Status]: x } = {
  REJECTED: 'REJECTED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  NOT_RATED: 'NOT_RATED'
};

export interface StatusSelect {
  label: string;
  key: Status;
}

export const defaultStatusSelects: StatusSelect[] = [
  {
    label: StatusLabels.REJECTED,
    key: StatusKeys.REJECTED
  },
  {
    label: StatusLabels.FAILED,
    key: StatusKeys.FAILED
  },
  {
    label: StatusLabels.PENDING,
    key: StatusKeys.PENDING
  },
  {
    label: StatusLabels.INPROGRESS,
    key: StatusKeys.INPROGRESS
  },
  {
    label: StatusLabels.NOT_RATED,
    key: StatusKeys.NOT_RATED
  }
];
