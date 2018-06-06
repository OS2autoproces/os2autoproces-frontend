<template>
        <v-select
          :items="fields"
          single-line
          @change=" valueChanged"
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
  @Prop() fields!: string[];

  valueChanged(value: any) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
</style>
