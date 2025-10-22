import { merge } from 'lodash';
import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { HTTP } from '@/services/http-service';

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
  id: number;
  uuid: string;
  email: string;
  name: string;
  cvr: string;
  roles: UserRole[];
  bookmarks?: number[];
  active: boolean;
}

interface BookmarkResponse {
  id: number;
}

export interface AuthState {
  user: User | null;
}

@Module({ dynamic: true, store, name: 'auth', namespaced: true })
export default class Auth extends VuexModule implements AuthState {
  user: User | null = null;

  @Mutation
  SET_USER(user: User | null) {
    this.user = user;
  }

  @Mutation
  UPDATE(partial: Partial<User>) {
    merge(this.user, partial);
  }

  @Mutation
  REMOVE_BOOKMARK(id: number) {
    if (this.user) {
      this.user.bookmarks = this.user.bookmarks?.filter(bookmark => bookmark !== id);
    }
  }

  @Action
  async loadUser() {
    const user = (await HTTP.get<User>('public/whoami')).data;

    if (user.uuid !== null) {
      this.SET_USER(user);
      this.loadBookmarks();
    } else {
      this.SET_USER(null);
    }
  }

  @Action
  async loadBookmarks() {
    const bookmarks = (await HTTP.get<BookmarkResponse[]>('api/bookmarks')).data.map(bookmark => bookmark.id);

    this.UPDATE({ bookmarks });
  }

  @Action
  async bookmark(id: number) {
    await HTTP.put(`api/bookmarks/${id}`);
    if (this.user) {
      if (this.user.bookmarks) {
        this.UPDATE({ bookmarks: [...this.user.bookmarks, id] });
      } else {
        this.UPDATE({ bookmarks: [id] });
      }
    }
  }

  @Action
  async removeBookmark(id: number) {
    await HTTP.delete(`api/bookmarks/${id}`);
    this.REMOVE_BOOKMARK(id);
  }

  get hasRole() {
    return (roles: UserRole | UserRole[]) => {
      const validRoles = Array.isArray(roles) ? roles : [roles];
      return !!this.user?.roles ? this.user.roles.some(role => validRoles.includes(role)) : false;
    };
  }

  get isFrontpageEditor() {
    return !!this.user?.roles ? this.user.roles.some(role => role === UserRole.frontpageEditor) : false;
  }

  @Action
  async editUser(): Promise<boolean> {
    const response = await HTTP.put(`api/profile`, {
      name: AuthModule.user?.name,
      email: AuthModule.user?.email,
      uuid: AuthModule.user?.uuid,
      cvr: AuthModule.user?.cvr
    });

    if (response.status !== 200) {
      throw new Error();
    }

    return true;
  }

}

export const AuthModule = getModule(Auth);
