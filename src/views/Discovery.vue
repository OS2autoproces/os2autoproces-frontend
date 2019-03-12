<template>
  <div class="page">

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";

@Component({
  components: {}
})
export default class Discovery extends Vue {
  async mounted() {
    await HTTP.get("public/identityproviders");
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
</style>
