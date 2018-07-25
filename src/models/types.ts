export type Type = 'CHILD' | 'PARENT' | 'GLOBAL_PARENT';

export const TypeLabels: { [x in Type]: string } = {
  CHILD: 'proces',
  PARENT: 'paraply proces',
  GLOBAL_PARENT: 'paraply proces'
};

export const TypeKeys: { [x in Type]: x } = {
  CHILD: 'CHILD',
  PARENT: 'PARENT',
  GLOBAL_PARENT: 'GLOBAL_PARENT'
};
