<template>
    <div class="scale" :class="{ disabled }">
        <div class="scale-option" v-for="item in items" :key="item.value" @click="select(item)">
            <Checkbox class="checkbox" :disabled="disabled" :value="item.value === value" />
            <div class="label">{{item.name}}</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from './Checkbox.vue';

interface Item {
  value: number;
  name: string;
}

@Component({
  components: {
    Checkbox
  }
})
export default class LikertScale extends Vue {
  @Prop() value!: number;
  @Prop() disabled!: boolean;

  items: Item[] = [
    { value: 0, name: 'Slet ikke' },
    { value: 1, name: 'I mindre grad' },
    { value: 2, name: 'I nogen grad' },
    { value: 3, name: 'I høj grad' },
    { value: 4, name: 'Ved ikke' }
  ];

  select(item: Item) {
    if (!this.disabled) {
      this.$emit('change', item.value);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.scale {
  display: flex;
  justify-content: space-between;

  &:not(.disabled) .scale-option {
    cursor: pointer;
  }
}

.scale-option {
  text-align: center;

  &:last-of-type .checkbox {
    border-color: $color-grey;
  }
}

.checkbox {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
}

.label {
  white-space: nowrap;
  font-style: italic;
}
</style>

