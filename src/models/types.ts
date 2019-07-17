export type Type = 'CHILD' | 'PARENT' | 'GLOBAL_PARENT';

export const TypeLabels: { [x in Type]: string } = {
  CHILD: 'Proces',
  PARENT: 'Egen paraply',
  GLOBAL_PARENT: 'Fælles paraply'
};

export const TypeKeys: { [x in Type]: x } = {
  CHILD: 'CHILD',
  PARENT: 'PARENT',
  GLOBAL_PARENT: 'GLOBAL_PARENT'
};
