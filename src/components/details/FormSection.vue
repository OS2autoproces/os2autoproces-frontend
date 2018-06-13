<template>
    <div class="form-section">
        <div class="section-header" :class="{ disabled }">
            <div>{{heading}}</div>
            <div class="edit-button" role="button" @click="toggleEdit">
                <EditIcon />
            </div>
            <div class="fill"></div>
            <div class="section-action">
                <div role="button" @click="expanded = true" v-if="!alwaysOpen && !expanded">
                    <ArrowDownIcon />
                </div>
                <div role="button" @click="expanded = false" v-if="!alwaysOpen && expanded">
                    <ArrowUpIcon />
                </div>
            </div>
        </div>
        <div class="section-content " v-if="alwaysOpen || expanded">

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
  @Prop() disabled!: boolean;

  expanded = false;

  toggleEdit() {
    this.$emit('edit');
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
  }

  .fill {
    flex-grow: 1;
  }
}
</style>
