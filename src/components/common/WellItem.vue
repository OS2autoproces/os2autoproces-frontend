<template>
  <div class="well-item-wrap">
    <div class="well-item-label" :style="{flexBasis: labelWidth}">
      <div class="label-wrapper">
        {{required ? `${label} *`: `${label}`}}
        <InfoTooltip class="tooltip" v-if="tooltip">{{tooltip}}</InfoTooltip>
      </div>
    </div>
    <div class="well-input">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    InfoTooltip
  }
})
export default class WellItem extends Vue {
  @Prop(String)
  label!: string;
  @Prop(String)
  tooltip!: string;
  @Prop({ default: '50%', type: String })
  labelWidth!: string;
  @Prop(Boolean)
  required!: boolean;
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.well-item-wrap {
  display: flex;

  .well-item-label {
    @include field-label;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .label-wrapper {
    display: flex;
    align-items: center;
  }

  .tooltip {
    display: inline-flex;
  }

  .well-input {
    @include field-input-text;
    flex-grow: 1;
    align-self: center;
    overflow-wrap: break-word;
    min-width: 1px;
  }
}
</style>
