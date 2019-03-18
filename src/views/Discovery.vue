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
        <IdentityProviders />
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";
import IdentityProviders from "../components/common/IdentityProviders.vue";

@Component({
  components: { IdentityProviders }
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
