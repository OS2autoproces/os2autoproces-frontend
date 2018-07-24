<template>
    <div class="search-option">
        <div>
            <slot />
        </div>
        <Checkbox :value="value" @change="$emit('change', $event)" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '../common/inputs/Checkbox.vue';

@Component({
  components: {
    Checkbox
  }
})
export default class SearchOption extends Vue {
  @Prop(Boolean) value!: boolean;
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.search-option {
  display: flex;

  > div:first-of-type {
    flex-grow: 1;
  }
}
</style>
