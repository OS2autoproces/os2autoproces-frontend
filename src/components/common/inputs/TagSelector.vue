<template>
    <div class="tag-selector-wrap">
        <div class="tag-list">
            <div v-for="(tag, index) in value" :key="index" class="tag-item">
                <span class="tag">
                    {{tag}}
                </span>
                <span @click="removeTag(index)" class="delete-icon" v-if="!disabled">
                    <DeleteIcon />
                </span>
            </div>
        </div>
        <div class="tag-input-wrap" v-if="!disabled">
            <input class="tag-input" :placeholder="placeholder" @keyup.enter="valueChanged">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

@Component({
  components: {
    DeleteIcon
  }
})
export default class TagSelector extends Vue {
  @Prop() disabled!: boolean;
  @Prop() placeholder!: string;
  @Prop() value!: string[];

  valueChanged(event: any) {
    this.$emit('change', event.target.value);
  }

  removeTag(index: number) {
    this.$emit('remove', index);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.tag-selector-wrap {
  display: flex;
  flex-direction: column;
  .tag-list {
    display: flex;
    padding: $size-unit/3 0;
    .tag-item {
      position: relative;
      display: flex;
      color: $color-background;
      background-color: $color-secondary;
      border-radius: $size-unit;
      padding: 1px 5px;
      margin: $size-unit/2 $size-unit $size-unit/2 0;
      .tag {
        display: flex;
        justify-content: center;
        min-width: $size-unit * 7;
      }
      .delete-icon {
        position: absolute;
        right: $size-unit / -2;
        top: $size-unit / -2;
        width: $size-unit;
        height: $size-unit;
        vertical-align: $size-unit * 2;
        cursor: pointer;
      }
    }
  }
  .tag-input {
    border: 1px solid $color-primary;
    border-radius: $size-unit * 2;
    padding-left: 10px !important;
    height: $size-unit * 2;
    width: 33%;
  }
}
</style>
