<template>
    <div>
        <div class="types">

        </div>

        <input class="query-text">

        <h1>Avanceret søgning</h1>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class NavBar extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/helpers";
</style>
