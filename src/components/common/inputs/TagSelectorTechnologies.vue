<template>
  <div>
    <div class="tag-list" :class="{ 'has-error': hasError }">
      <div v-for="(tag, index) in value" :key="index" class="tag-item">
        {{ tag.name }}
        <span role="button" @click="removeTag(index)" class="delete-icon" v-if="!disabled">
          <DeleteIcon />
        </span>
      </div>
    </div>
    <SelectionField
      :hasError="hasError"
      v-if="!disabled"
      class="tag-input"
      :value="item"
      placeholder="Tilføj flere teknologier her"
      @change="addTag"
      itemText="name"
      :items="items"
      iconName="search"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import { Technology } from '@/store/modules/commonInterfaces';

@Component({
  components: {
    DeleteIcon,
    SelectionField
  }
})
export default class TagSelector extends Vue {
  @Prop(Boolean) disabled!: boolean;
  @Prop(Boolean) hasError!: boolean;
  @Prop(String) placeholder!: string;
  @Prop(Array) value!: Technology[];
  @Prop(Array) items!: Technology[];

  item: Technology | null = null;

  addTag(item: Technology) {
    if (!item) {
      return;
    }

    this.item = item;
    this.$emit('add', item);
  }

  removeTag(index: number) {
    this.item = null;
    this.$emit('remove', index);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.tag-list {
  min-height: 50px;

  .tag-item {
    display: inline-block;
    text-align: center;
    position: relative;
    color: $color-background;
    background-color: $color-secondary;
    border-radius: 1rem;
    padding: 0 0.5rem;
    line-height: 1.8em;
    margin: 0.5rem 0;
    margin-right: 1rem;
    min-width: 7rem;

    .delete-icon {
      position: absolute;
      right: -0.5rem;
      top: -0.5rem;
      width: 1rem;
      height: 1rem;
    }
  }

  &.has-error {
    border: 0.2em solid $color-error;
    border-width: 0.2em;
    border-radius: 20px;
  }
}

.tag-input {
  width: 33%;

  ::v-deep .v-autocomplete {
    .v-icon {
      transform: none !important;
    }
  }
}
</style>
