<template>
  <div class="navbar">
    <div class="logo">OS2autoproces</div>
    <router-link class="link" v-if="isAdministrator" to="/search">Søgning</router-link>
    <router-link class="link" v-if="isAdministrator" to="/manage-technologies">Teknologier</router-link>
    <div class="flex-grow"></div>
    <div class="user-info" v-if="user">
      <div class="user">
        <div>{{user.name}}</div>
        <div>{{roles.join(', ')}}</div>
        <a class="logout-button" :href="logoutUrl">Log ud</a>
      </div>
      <ProfileIcon class="profile-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ProfileIcon from '../icons/ProfileIcon.vue';
import { AuthState, UserRoleName, UserRole } from '@/store/modules/auth/state';

@Component({
  components: {
    ProfileIcon
  }
})
export default class NavBar extends Vue {
  logoutUrl = `${window.autoProcessConfiguration.apiUrl}/saml/logout`;

  get user() {
    return this.$store.state.auth.user;
  }

  get isAdministrator() {
    return this.$store.state.auth.user && this.$store.state.auth.user.roles.includes(UserRole.administrator);
  }

  get roles() {
    const user: AuthState['user'] = this.$store.state.auth.user;

    if (!user) {
      return [];
    }

    return user.roles.map(role => UserRoleName[role]);
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.navbar {
  display: flex;
  align-items: center;
  background-color: $color-secondary;
  height: 5 * $size-unit;
  padding: $size-unit;
}

.logo {
  color: $color-background;
  @include heading;
  font-size: 1.75rem;
}

.link {
  margin-left: $size-unit * 2;
}

.user {
  text-align: right;
  color: $color-grey;
  line-height: 1.3em;
}

.profile-icon {
  height: 3 * $size-unit;
  width: 3 * $size-unit;
  margin-left: $size-unit;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>
