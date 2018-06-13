<template>
    <div class="navbar">
        <div class="logo">AutoProces</div>
        <div class="flex-grow"></div>
        <div class="user-info">
            <div class="user">
                <div>{{user && user.name}}</div>
                <div>{{user && user.roles.join(', ')}}</div>
                <div>
                    <router-link to="/">Log ud</router-link>
                </div>
            </div>
            <ProfileIcon class="profile-icon" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IUser } from '../../models/user';
import ProfileIcon from '../icons/ProfileIcon.vue';

@Component({
  components: {
    ProfileIcon
  }
})
export default class NavBar extends Vue {
  get user() {
    return (
      this.$store.state.user || {
        name: 'Julie',
        roles: ['superbruger', 'Admin']
      }
    );
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
</style>
