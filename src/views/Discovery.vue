<template>
  <div class="page">
    <v-layout row>
      <v-flex
        xs8
        sm6
        md4
        offset-xs2
        offset-sm3
        offset-md4
      >
        <IdentityProvider />
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";
import IdentityProvider from "../components/common/IdentityProvider.vue";

@Component({
  components: { IdentityProvider }
})
export default class Discovery extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.page {
  background-color: $color-secondary;
  padding-top: 3rem;
}
</style>
