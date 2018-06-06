<template>
    <v-container grid-list-xl>
        <v-layout column wrap>
            <v-flex xs10 sm6>
                <div class="ccb-Card2">
                    <h3 class="cbb-card-title">{{title}}</h3>
                    <div class="textWrapper">
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BlogItem extends Vue {
  @Prop() public title!: string;
}
</script>

<style lang="scss" scoped>
.ccb-Card1 {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-bottom-right-radius: 50%;
  border-top-left-radius: 22%;
  height: 200px;
  background-color: antiquewhite;
}

.ccb-Card2 {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.1s;
  // border-bottom-left-radius: 50%;
  // border-top-right-radius: 22%;
  padding: 1em;
  align-content: center;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  height: 1200px;
}

.cbb-card-title {
  background-color: aqua;
  position: relative;
  padding-top: 1em;
  padding-bottom: 1em;
}

.textWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.textItem {
  flex-grow: 1;
  flex-basis: 0;
}
</style>
