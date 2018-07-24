<template>
    <div class="search-field">
        <InputField placeholder="Søg f.eks. på KLE-numre" :value="value" @change="valueChanged">
          <SearchIcon />
        </InputField>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

import InputField from './InputField.vue';
import SearchIcon from '../../icons/SearchIcon.vue';

@Component({
  components: {
    InputField,
    SearchIcon
  }
})
export default class SearchField extends Vue {
  @Prop(String) value!: string;

  valueChanged(value: string) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.search-field {
    position: relative;
}
</style>
