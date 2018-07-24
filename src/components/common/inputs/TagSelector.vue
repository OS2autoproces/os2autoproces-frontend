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
        <InputField v-if="!disabled" class="tag-input" :placeholder="placeholder" :value="tagInput" @change="tagInput = $event" @submit="addTag" />
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
  @Prop(Boolean) disabled!: boolean;
  @Prop(String) placeholder!: string;
  @Prop(Array) value!: string[];

  tagInput = '';

  addTag(tag: string) {
    this.tagInput = '';

    if (tag) {
      this.$emit('add', tag);
    }
  }

  removeTag(index: number) {
    this.$emit('remove', index);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.tag-list {
  .tag-item {
    display: inline-block;
    text-align: center;
    position: relative;
    color: $color-background;
    background-color: $color-secondary;
    border-radius: $size-unit;
    padding: 0 $size-unit/2;
    line-height: 1.8em;
    margin: $size-unit/2 0;
    margin-right: $size-unit;
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
