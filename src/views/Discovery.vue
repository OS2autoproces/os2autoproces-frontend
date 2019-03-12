<template>
  <div class="page">

    <div
      v-for="(data, index) in loginProviders"
      :key="index"
    >

      {{data.name}}: {{data.entityId}}
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";

interface IdProviders {
  entityId: string;
  name: string;
}

@Component({
  components: {}
})
export default class Discovery extends Vue {
  @Prop(Array) loginProviders!: IdProviders;

  async mounted() {
    const loginProviders = (await HTTP.get<IdProviders>(
      `public/identityproviders`
    )).data;
    this.loginProviders = loginProviders;
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.page {
  background-color: $color-secondary;
}
</style>
