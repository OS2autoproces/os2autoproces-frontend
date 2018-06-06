<template>
        <v-select
          :items="items"
          single-line
          @change="valueChanged"
          autocomplete
          :value="value"
        >
        </v-select>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class InputField extends Vue {
  @Prop() value!: string;
  @Prop() items!: string[];

  valueChanged(value: any) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
div>.input-group--autocomplete {
        padding: 0;

    .input-group__input {
        border: 1px solid $color-primary;
        border-radius: 20px;
        padding-left: 13px;

        .icon {
            color: $color-primary !important;
        }
    }

    .input-group__details {
        display: none;
    }
}
</style>
