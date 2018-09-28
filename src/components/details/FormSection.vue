<template>
  <div class="form-section">
    <div class="section-header" :class="{ disabled }">
      <div>{{heading}}</div>
      <div v-if="state.process.canEdit" class="edit-button" role="button" @click="toggleEdit">
        <EditIcon />
      </div>
      <InfoTooltip class="tooltip" v-if="tooltip">{{tooltip}}</InfoTooltip>
      <div class="flex-grow"></div>
      <div class="section-action">
        <div role="button" @click="expand = true" v-if="isExpandable && !expand">
          <ArrowDownIcon />
        </div>
        <div role="button" @click="expand = false" v-if="isExpandable && expand">
          <ArrowUpIcon />
        </div>
        <div class="warning-icon" v-if="invalid">
          <WarningIcon />
        </div>
      </div>
    </div>
    <div class="section-content" v-if="isExpanded">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import EditIcon from '@/components/icons/EditIcon.vue';
import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';

@Component({
  components: {
    EditIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    InfoTooltip,
    WarningIcon
  }
})
export default class FormSection extends Vue {
  @Prop(String)
  heading!: string;
  @Prop(String)
  tooltip!: string;
  @Prop(Boolean)
  alwaysOpen!: boolean;
  @Prop(Boolean)
  invalid!: boolean;
  @Prop(Boolean)
  disabled!: boolean;

  expand = false;

  toggleEdit() {
    this.$emit('edit', !this.disabled);
  }

  get state() {
    return this.$store.state;
  }

  get isExpandable() {
    return !this.alwaysOpen && !this.invalid && this.disabled;
  }

  get isExpanded() {
    return this.expand || this.alwaysOpen || this.invalid || !this.disabled;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.section-header {
  display: flex;
  padding: 2rem;
  @include heading;
  color: $color-primary;
  font-size: 1.5rem;

  .edit-button {
    margin-left: 1rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &:not(.disabled) {
    .edit-button svg /deep/ path {
      fill: $color-primary;
    }
  }

  .section-action {
    svg {
      width: 20px;
      height: 20px;
    }

    .warning-icon {
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
}

.section-content {
  padding: 2rem;
  padding-top: 0;
}

.tooltip {
  margin-left: 1rem;
}
</style>
