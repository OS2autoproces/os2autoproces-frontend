<template>
    <div class="navbar">
        <div class="logo">AutoProces</div>
        <div class="fill"></div>
        <div class="user-info">
            <div class="user">
                <div>{{user && user.name}}</div>
                <div>{{user && user.roles.join(', ')}}</div>
                <div>
                    <a href="/a">Log ud</a>
                </div>
            </div>
            <img class="user-icon" src="https://openclipart.org/download/247324/abstract-user-flat-1.svg">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IUser } from "../../models/user";

@Component({
  components: {}
})
export default class NavBar extends Vue {
  @Prop() user!: IUser;
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.navbar {
  display: flex;
  background-color: $color-secondary;
  height: 60px;
  padding: $size-unit;
}

.fill {
  flex-grow: 1;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: $color-background;
}

.user {
  text-align: right;
  color: $color-grey;
}

.user-icon {
  height: 50px;
  width: 50px;
  margin-left: $size-unit;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>
