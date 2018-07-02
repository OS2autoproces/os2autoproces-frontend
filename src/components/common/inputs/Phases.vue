<template>
    <div class="phases" :class="{ small }">
        <div class="row">
            <PhaseComponent :phase="PhaseKeys.PREANALYSIS" :value="value" @select="select" :small="small" :disabled="disabled" />
            <PhaseComponent :phase="PhaseKeys.SPECIFICATION" :value="value" @select="select" :small="small" :disabled="disabled" reverse />
        </div>

        <div class="row">
            <PhaseComponent :phase="PhaseKeys.IDEA" :value="value" @select="select" :small="small" :disabled="disabled" />
            <PhaseComponent :phase="PhaseKeys.DEVELOPMENT" :value="value" @select="select" :small="small" :disabled="disabled" reverse />
        </div>

        <div class="row">
            <PhaseComponent :phase="PhaseKeys.OPERATION" :value="value" @select="select" :small="small" :disabled="disabled" />
            <PhaseComponent :phase="PhaseKeys.IMPLEMENTATION" :value="value" @select="select" :small="small" :disabled="disabled" reverse />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PhaseComponent from "./Phase.vue";
import { Phase, PhaseKeys } from '@/models/phase';

@Component({
  components: {
    PhaseComponent
  }
})
export default class Phases extends Vue {
  @Prop() private value!: string;
  @Prop() private disabled!: boolean;
  @Prop() private small!: boolean;

  private PhaseKeys = PhaseKeys;

  private select(phase: Phase) {
    if (phase !== this.value) {
      this.$emit("change", phase);
    }
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
