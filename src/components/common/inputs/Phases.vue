<template>
    <div class="phases">
        <div class="row">
            <Phase text="Foranalyse" @select="select(2)" :disabled="disabled" :selected="selected === 2" />
            <Phase text="Specifikation" @select="select(3)" :disabled="disabled" :selected="selected === 3" reverse />
        </div>

        <div class="row">
            <Phase text="Idé" @select="select(1)" :disabled="disabled" :selected="selected === 1" />
            <Phase text="Udvikling" @select="select(4)" :disabled="disabled" :selected="selected === 4" reverse />
        </div>

        <div class="row">
            <Phase text="Drift" @select="select(6)" :disabled="disabled" :selected="selected === 6" />
            <Phase text="Implementering" @select="select(5)" :disabled="disabled" :selected="selected === 5" reverse />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Phase from "./Phase.vue";

@Component({
  components: {
    Phase
  }
})
export default class Phases extends Vue {
  @Prop() private selected!: number;
  @Prop() private disabled!: boolean;

  private select(phase: number) {
    this.$emit("select", phase);
  }
}
</script>

<style scoped lang="scss">
.phases {
  width: 400px;
}

.row {
  display: flex;
  margin-bottom: 14px;
}

.row:not(:nth-child(2)) .phase:first-child {
  margin-right: 21px;
}

.row:nth-child(2) .phase:first-child {
  margin-right: 75px;
}
</style>