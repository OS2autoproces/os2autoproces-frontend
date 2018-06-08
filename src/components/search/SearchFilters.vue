<template>
    <div>
        <div class="wrapper">
            <div class="types">
                <PillCheckbox :value="checked" @change="checked = !checked">Indberettede</PillCheckbox>
                <PillCheckbox :value="checked" @change="checked = !checked">Tilknyttede</PillCheckbox>
                <PillCheckbox :value="checked" @change="checked = !checked">Favoritter</PillCheckbox>
            </div>
            <SearchField class="search-text" />
            <h1>AVANCERET SØGNING</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Checkbox from "../common/inputs/Checkbox.vue";
import SearchField from "../common/inputs/SearchField.vue";
import PillCheckbox from "../common/inputs/PillCheckbox.vue";

@Component({
  components: {
    SearchField,
    Checkbox,
    PillCheckbox
  }
})
export default class NavBar extends Vue {
  checked: boolean = false;
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.wrapper {
  padding: 4 * $size-unit 3 * $size-unit;
}

.types {
  margin-bottom: 4 * $size-unit;

  > div {
    margin-bottom: $size-unit;
  }
}

h1 {
    color: $color-secondary;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.2em;
}

.search-text {
    margin: 2*$size-unit 0;
}
</style>
