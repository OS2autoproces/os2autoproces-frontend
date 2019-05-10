<template>
  <div class="navbar">
    <router-link
      class="logo-link"
      to="/search"
    >
      <div class="logo">OS2autoproces</div>
    </router-link>
    <router-link
      class="link"
      v-if="isFrontpageEditor"
      to="/"
    >Forside</router-link>
    <router-link
      class="link"
      v-if="isAdministrator"
      to="/search"
    >Søgning</router-link>
    <router-link
      class="link"
      v-if="isAdministrator"
      to="/manage-technologies"
    >Teknologier</router-link>
    <div class="flex-grow"></div>
    <div
      class="user-info"
      v-if="user"
    >
      <div class="user">
        <div>{{user.name}}</div>
        <div>{{roles.join(', ')}}</div>
        <a
          class="logout-button"
          :href="logoutUrl"
        >Log ud</a>
      </div>
      <ProfileIcon class="profile-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ProfileIcon from '../icons/ProfileIcon.vue';
import { AuthState, UserRoleName, UserRole, User } from '@/store/modules/auth/state';
import { State } from 'vuex-class';
import { RootState } from '../../store/store';

@Component({
  components: {
    ProfileIcon
  }
})
export default class NavBar extends Vue {
  logoutUrl = `${window.autoProcessConfiguration.apiUrl}/saml/logout`;
  @State((state: RootState) => state.auth.user) user: User = {} as User;

  @State((state: RootState) => {
    if (!state.auth.user || !state.auth.user.roles) {
      return [];
    }

    return state.auth.user.roles.map(role => UserRoleName[role]);
  })
  roles: UserRole[] = [];

  get isAdministrator() {
    return this.user && this.user.roles.includes(UserRole.administrator);
  }

  get isFrontpageEditor() {
    return this.user && this.user.roles.includes(UserRole.frontpageEditor);
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.navbar {
  display: flex;
  align-items: center;
  background-color: $color-secondary;
  height: 5rem;
  padding: 1rem;
}

.logo {
  color: $color-background;
  @include heading;
  font-size: 1.75rem;
}

.link {
  margin-left: 2rem;
}

.logo-link {
  text-decoration: none;
}

.user {
  text-align: right;
  color: $color-grey;
  line-height: 1.3em;
}

.profile-icon {
  height: 3rem;
  width: 3rem;
  margin-left: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>
