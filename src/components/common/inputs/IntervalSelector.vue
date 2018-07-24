<template>
    <div class="wrapper" :class="{ disabled }">
        <div class="value-display">
            {{value}}
        </div>

        <div class="intervals" v-if="!disabled">
            <div class="interval" v-for="interval in intervals" @click="select(interval)" :key="interval">
                <Checkbox class="checkbox" :value="value === interval" :disabled="disabled" /> {{interval}}
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '@/components/common/inputs/Checkbox.vue';

@Component({
  components: {
    Checkbox
  }
})
export default class Button extends Vue {
  @Prop(String) value!: string;
  @Prop(Boolean) disabled!: boolean;

  intervals = ['1', '2-5', '6-10', '10 +'];

  select(interval: string) {
    this.$emit('change', interval);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.wrapper {
  display: inline-flex;
  align-items: center;

  &:not(.disabled) {
    .interval {
      cursor: pointer;
    }

    .value-display {
      background-color: $color-primary;
    }
  }
}

.value-display {
  border-radius: 50%;
  line-height: 140px;
  height: 140px;
  width: 140px;
  white-space: nowrap;
  color: $color-background;
  background-color: $color-secondary;
  text-align: center;
  font-size: 3.5rem;
}

.checkbox {
  margin-right: $size-unit/2;
}

.intervals {
  margin-left: $size-unit;

  .interval {
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: $size-unit/2;
    }
  }
}
</style>

