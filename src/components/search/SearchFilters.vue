<template>
    <div>
        <div class="types">

        </div>

        <input class="query-text">

        <h1>Avanceret søgning</h1>

        <Checkbox :value="checked" @change="checked = !checked" />
        <Checkbox :value="checked" @change="checked = !checked" disabled />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Checkbox from "../common/inputs/Checkbox.vue";

@Component({
  components: {
    Checkbox
  }
})
export default class NavBar extends Vue {
    checked: boolean = false;
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
</style>
