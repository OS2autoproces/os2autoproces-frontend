export const UserRoleName = {
  ROLE_USER: 'Bruger',
  ROLE_LOCAL_SUPERUSER: 'Superbruger',
  ROLE_SUPERUSER: 'Global superbruger',
  ROLE_ADMINISTRATOR: 'Administrator',
  ROLE_FRONTPAGE_EDITOR: 'Forsideredaktør'
};

export enum UserRole {
  user = 'ROLE_USER',
  localSuperUser = 'ROLE_LOCAL_SUPERUSER',
  superUser = 'ROLE_SUPERUSER',
  administrator = 'ROLE_ADMINISTRATOR',
  frontpageEditor = 'ROLE_FRONTPAGE_EDITOR'
}

export interface User {
  uuid: string;
  email: string;
  name: string;
  cvr: string;
  roles: UserRole[];
  bookmarks: number[];
}

export interface AuthState {
  user: User | null;
}
