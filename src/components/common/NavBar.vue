<template>
  <div class="navbar">
    <router-link class="logo-link" to="/search">
      <div class="logo">OS2autoproces</div>
    </router-link>
    <router-link class="link" v-if="isFrontpageEditor" to="/">Forside</router-link>
    <router-link class="link" to="/dashboard">Dashboard</router-link>
    <router-link class="link" to="/search">Procesoverblik</router-link>
    <a class="link" :href="`/organisation/${cvr}`">Min organisation</a>
    <router-link class="link" v-if="isAdministrator" to="/manage-systems">Systemer</router-link>
    <router-link class="link" v-if="isAdministrator" to="/manage-technologies">Teknologier</router-link>
    <a class="link" rel="noopener noreferrer" target="_blank" href="https://boks.os2.eu/s/CR6pmmnwqR2REBg"
      >Information</a
    >
    <div class="flex-grow"></div>
    <div class="user-info" v-if="state.user">
      <div class="user">
        <div>{{ state.user.name }}</div>
        <div>{{ roles }}</div>
        <a class="logout-button" :href="logoutUrl">Log ud</a>
      </div>
      <ProfileIcon class="profile-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ProfileIcon from '../icons/ProfileIcon.vue';
import { AuthModule, UserRole, UserRoleName } from '@/store/modules/auth';
import { State } from 'vuex-class';

@Component({
  components: {
    ProfileIcon
  }
})
export default class NavBar extends Vue {
  logoutUrl = `${window.autoProcessConfiguration.apiUrl}/saml/logout`;

  get isAdministrator() {
    return AuthModule.user && AuthModule.user.roles && AuthModule.user.roles.includes(UserRole.administrator);
  }

  get isFrontpageEditor() {
    return AuthModule.user && AuthModule.user.roles.includes(UserRole.frontpageEditor);
  }

  get cvr() {
    return AuthModule.user?.cvr
  }

  get state() {
    return AuthModule;
  }

  get roles() {
    return AuthModule.user?.roles?.map(r => UserRoleName[r])?.join(', ') ?? '';
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.navbar {
  display: flex;
  align-items: center;
  background-color: $color-primary;
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
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.logout-button {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.logo-link {
  text-decoration: none;
  color: $color-primary;
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
