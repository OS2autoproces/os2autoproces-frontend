export type Type = 'CHILD' | 'PARENT' | 'GLOBAL_PARENT';

export const TypeLabels: {[x in Type]: string} = {
  CHILD: 'barn',
  PARENT: 'forældre',
  GLOBAL_PARENT: 'global forældre',
};

export const TypeKeys: {[x in Type]: x} = {
  CHILD: 'CHILD',
  PARENT: 'PARENT',
  GLOBAL_PARENT: 'GLOBAL_PARENT',
};
