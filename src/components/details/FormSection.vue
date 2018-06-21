<template>
    <div class="form-section">
        <div class="section-header" :class="{ disabled }">
            <div>{{heading}}</div>
            <div class="edit-button" role="button" @click="toggleEdit">
                <EditIcon />
            </div>
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

@Component({
  components: {
    EditIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    WarningIcon
  }
})
export default class FormSection extends Vue {
  @Prop() heading!: string;
  @Prop() alwaysOpen!: boolean;
  @Prop() invalid!: boolean;
  @Prop() disabled!: boolean;

  expand = false;

  toggleEdit() {
    this.$emit('edit', !this.disabled);
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
  padding: 2 * $size-unit;
  @include heading;
  color: $color-primary;
  font-size: 1.5 * $size-unit;

  .edit-button {
    margin-left: $size-unit;

    svg {
      width: $size-unit;
      height: $size-unit;
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
  padding: $size-unit*2;
  padding-top: 0;
}
</style>
