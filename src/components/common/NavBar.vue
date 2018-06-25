<template>
  <div class="navbar">
    <div class="logo">AutoProces</div>
    <div class="flex-grow"></div>
    <div class="user-info" v-if="user">
      <div class="user">
        <div>{{user.name}}</div>
        <div>{{roles.join(', ')}}</div>
        <div role="button" class="logout-button" @click="logout">
          Log ud
        </div>
      </div>
      <ProfileIcon class="profile-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ProfileIcon from '../icons/ProfileIcon.vue';
import { AuthState, UserRoleName } from '@/store/modules/auth/state';
import { Action } from 'vuex-class';
import { authActionTypes } from '@/store/modules/auth/actions';

@Component({
  components: {
    ProfileIcon
  }
})
export default class NavBar extends Vue {
  @Action(authActionTypes.LOGOUT) logout: any;

  get user() {
    return this.$store.state.auth.user;
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

.logout-button {
  text-decoration: underline;
  color: $color-primary;
}
</style>
