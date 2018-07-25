<template>
  <div>
    <div class="tag-list">
      <div v-for="(tag, index) in value" :key="index" class="tag-item">
        {{tag.name}}
        <span role="button" @click="removeTag(index)" class="delete-icon" v-if="!disabled">
          <DeleteIcon />
        </span>
      </div>
    </div>
    <SelectionField v-if="!disabled" class="tag-input" :value="item" placeholder="Tilføj flere teknologier her" @change="addTag" itemText="name" :items="items" iconName="search" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import { Technology } from '@/store/modules/process/state';

@Component({
  components: {
    DeleteIcon,
    SelectionField
  }
})
export default class TagSelector extends Vue {
  @Prop(Boolean) disabled!: boolean;
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

  /deep/ .v-autocomplete {
    .v-icon {
      transform: none !important;
    }
  }
}
</style>
