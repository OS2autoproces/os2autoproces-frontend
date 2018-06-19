<template>
  <div>
    <div class="tag-list">
      <div v-for="(tag, index) in value" :key="index" class="tag-item">
        {{tag}}
        <span role="button" @click="removeTag(index)" class="delete-icon" v-if="!disabled">
          <DeleteIcon />
        </span>
      </div>
    </div>
    <InputField v-if="!disabled" class="tag-input" :placeholder="placeholder" @submit="valueChanged" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import InputField from '@/components/common/inputs/InputField.vue';

@Component({
  components: {
    DeleteIcon,
    InputField
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

.tag-list {
  padding: $size-unit/3 0;

  .tag-item {
    display: inline-block;
    text-align: center;
    position: relative;
    color: $color-background;
    background-color: $color-secondary;
    border-radius: $size-unit;
    padding: 1px 5px;
    margin: $size-unit/2 $size-unit $size-unit/2 0;
    min-width: $size-unit * 7;

    .delete-icon {
      position: absolute;
      right: $size-unit / -2;
      top: $size-unit / -2;
      width: $size-unit;
      height: $size-unit;
    }
  }
}

.tag-input {
  width: 33%;
}
</style>
