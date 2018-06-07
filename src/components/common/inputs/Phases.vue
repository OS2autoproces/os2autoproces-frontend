<template>
    <div class="phases" :class="{ small }">
        <div class="row">
            <Phase text="Foranalyse" @select="select(2)" :small="small" :disabled="disabled" :selected="value === 2" />
            <Phase text="Specifikation" @select="select(3)" :small="small" :disabled="disabled" :selected="value === 3" reverse />
        </div>

        <div class="row">
            <Phase text="Idé" @select="select(1)" :small="small" :disabled="disabled" :selected="value === 1" />
            <Phase text="Udvikling" @select="select(4)" :small="small" :disabled="disabled" :selected="value === 4" reverse />
        </div>

        <div class="row">
            <Phase text="Drift" @select="select(6)" :small="small" :disabled="disabled" :selected="value === 6" />
            <Phase text="Implementering" @select="select(5)" :small="small" :disabled="disabled" :selected="value === 5" reverse />
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
  @Prop() private value!: number;
  @Prop() private disabled!: boolean;
  @Prop() private small!: boolean;

  private select(phase: number) {
    this.$emit("change", phase);
  }
}
</script>

<style lang="scss" scoped>
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

.phases.small {
  .row {
    margin-bottom: 7px;
  }

  .row:not(:nth-child(2)) .phase:first-child {
    margin-right: 10px;
  }

  .row:nth-child(2) .phase:first-child {
    margin-right: 37px;
  }
}
</style>