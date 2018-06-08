<template>
    <div>
        <div class="wrapper">
            <div class="types">
                <PillCheckbox :value="filters.reported" @change="setReported">Indberettede</PillCheckbox>
                <PillCheckbox :value="filters.related" @change="setRelated">Tilknyttede</PillCheckbox>
                <PillCheckbox :value="filters.favorites" @change="setFavorites">Favoritter</PillCheckbox>
            </div>

            <SearchField class="search-text" :value="filters.text" @change="setText" />

            <h1>AVANCERET SØGNING</h1>

            <div class="municipality-level">
                <SearchOption :value="filters.municipal" @change="setMunicipal">Kommunalt</SearchOption>
                <SearchOption :value="filters.intermunicipal" @change="setIntermunicipal">Tværkommunalt</SearchOption>
            </div>

            <ExpandPanel title="Fase">
                <SearchOption :value="checked" @change="checked = !checked">Idé</SearchOption>
                <SearchOption :value="checked" @change="checked = !checked">Foranalyse</SearchOption>
                <SearchOption :value="checked" @change="checked = !checked">Specifikation</SearchOption>
                <SearchOption :value="checked" @change="checked = !checked">Udvikling</SearchOption>
                <SearchOption :value="checked" @change="checked = !checked">Implementering</SearchOption>
                <SearchOption :value="checked" @change="checked = !checked">Drift</SearchOption>
            </ExpandPanel>

            <ExpandPanel title="Fagområde">
            </ExpandPanel>

            <ExpandPanel title="Timeforbrug">
            </ExpandPanel>

            <ExpandPanel title="System">
            </ExpandPanel>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Checkbox from '../common/inputs/Checkbox.vue';
import SearchField from '../common/inputs/SearchField.vue';
import SearchOption from './SearchOption.vue';
import PillCheckbox from '../common/inputs/PillCheckbox.vue';
import ExpandPanel from '../common/ExpandPanel.vue';
import { Action } from 'vuex-class';
import { searchActionTypes } from '@/store/modules/search/actions';

@Component({
  components: {
    SearchField,
    SearchOption,
    ExpandPanel,
    Checkbox,
    PillCheckbox
  }
})
export default class SearchFilters extends Vue {
  checked = false;

  @Action(searchActionTypes.SET_REPORTED) setReported: any;
  @Action(searchActionTypes.SET_RELATED) setRelated: any;
  @Action(searchActionTypes.SET_FAVORITES) setFavorites: any;
  @Action(searchActionTypes.SET_TEXT) setText: any;
  @Action(searchActionTypes.SET_MUNICIPAL) setMunicipal: any;
  @Action(searchActionTypes.SET_INTERMUNICIPAL) setIntermunicipal: any;

  get filters() {
    return this.$store.state.search.filters;
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

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
  margin: 2 * $size-unit 0;
}

.search-option {
  margin-top: $size-unit;
}

.expand-panel {
  margin-top: 3 * $size-unit;
}
</style>
