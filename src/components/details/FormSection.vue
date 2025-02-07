<template>
  <div class="form-section" v-if="!placeholder">
    <div class="section-header" @click="toggleExpand" :class="{ disabled, isExpandable }">
      <div>{{ heading }}</div>
      <div v-if="canEdit" class="edit-button" role="button" @click="toggleEdit">
        <EditIcon />
      </div>
      <InfoTooltip class="tooltip" v-if="tooltip">{{ tooltip }}</InfoTooltip>
      <div class="flex-grow"></div>
      <div class="section-action">
        <div role="button" v-if="isExpandable && !expanded">
          <ArrowDownIcon />
        </div>
        <div role="button" v-if="isExpandable && expanded">
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
  <div class="form-section" v-else>
    <div class="section-header">
      <div class="placeholder">{{ heading }}</div>
      <span class="placeholder-text">{{ placeholder }}</span>
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
import { ProcessModule } from '@/store/modules/process';
import { CommonModule } from '@/store/modules/common';

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
  @Prop({ type: String, default: '' })
  placeholder!: string;
  @Prop(Boolean)
  expandOnMount!: boolean;

  expanded = false;

  toggleEdit() {
    this.expanded = this.disabled;
    this.$emit('edit', !this.disabled);
    CommonModule.callHighlightByUrlParam();
  }

  toggleExpand() {
    if (!this.disabled) {
      return;
    }
    this.expanded = !this.expanded;

    CommonModule.callHighlightByUrlParam();
  }

  get canEdit() {
    return ProcessModule.canEdit;
  }

  get isExpandable() {
    return !this.alwaysOpen && !this.invalid && this.disabled;
  }

  get isExpanded() {
    return this.expanded || this.alwaysOpen || this.invalid || !this.disabled;
  }

  mounted() {
    if (this.expandOnMount) {
      this.expanded = true;
      CommonModule.callHighlightByUrlParam();
    }
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
  align-items: center;

  .edit-button {
    margin-left: 1rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .placeholder {
    color: $color-grey;
  }

  .placeholder-text {
    @include field-input-text;
    color: $color-text;
    align-self: center;
    margin-left: 3rem;
  }

  &:not(.disabled) {
    .edit-button svg ::v-deep path {
      fill: $color-primary;
    }
  }

  &.isExpandable {
    cursor: pointer;
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
