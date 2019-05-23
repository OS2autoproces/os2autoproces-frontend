<style lang="scss" scoped>
.actions {
  position: fixed;
  bottom: 2rem;
  left: 0;
  width: $dimension-search-filters-width;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.form-header {
  margin-bottom: 1rem;
}

.save-filters-form {
  display: flex;
  flex-direction: column;

  .input {
    flex: 1;
    margin-right: 2rem;
  }
  .dialog-actions {
    display: flex;
    justify-content: flex-end;

    button {
      margin: 1rem 0.5rem;
    }
  }
}
</style>

<template>
  <transition name="slide-y-reverse-transition">
    <div class="actions" v-if="filtersTouched">
      <Button class="action elevation-3" v-ripple @click="dispatchClearFilters()">Ryd filtre</Button>
      <Button
        class="action elevation-3"
        v-ripple
        @click.stop.prevent="toggleSaveFiltersDialog()"
      >Gem Søgning</Button>
      <AppDialog :open="saveFiltersDialogOpen" @close="closeSaveFilterDialog">
        <DialogContent>
          <h2 class="form-header">Gem din søgning</h2>
          <div class="save-filters-form">
            <InputField class="input" placeholder="Navn" :value="name" @change="onNameChange"></InputField>
            <span class="error--text" v-if="!!error">{{error}}</span>
            <div class="dialog-actions">
              <Button @click="closeSaveFilterDialog()">Annullér</Button>
              <Button :primary="true" @click="submitSaveFilters()">GEM</Button>
            </div>
          </div>
        </DialogContent>
      </AppDialog>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RootState } from '@/store/store';
import { State, Action } from 'vuex-class';
import { searchActionTypes } from '@/store/modules/search/actions';
import Button from '../common/inputs/Button.vue';
import AppDialog from '../common/Dialog.vue';
import DialogContent from '../common/DialogContent.vue';
import InputField from '../common/inputs/InputField.vue';
import { SavedSearchFilters } from '../../store/modules/search/state';

@Component({
  components: {
    Button,
    AppDialog,
    InputField,
    DialogContent
  }
})
export default class SearchFiltersActions extends Vue {
  @Action(searchActionTypes.CLEAR_FILTERS) dispatchClearFilters!: VoidFunction;
  @Action(searchActionTypes.SAVE_FILTERS) dispatchSaveFilters!: (name: string) => void;

  @State((state: RootState) => state.search.savedFilters) savedFilters!: SavedSearchFilters[];
  @State((state: RootState) => state.search.filtersTouched)
  filtersTouched!: boolean;

  name = '';
  touched = false;

  get error() {
    if (!this.touched) {
      return '';
    }

    return !this.name
      ? 'Skriv et navn'
      : !this.isSavedFilterNameUnique(this.name)
      ? 'Dette navn er allerede brugt, indtast venligst et nyt'
      : '';
  }

  saveFiltersDialogOpen = false;

  submitSaveFilters() {
    this.touched = true;
    if (!!this.error) {
      return;
    }

    this.dispatchSaveFilters(this.name);
    this.closeSaveFilterDialog();
    this.name = '';
    this.touched = false;
  }

  onNameChange(name: string) {
    this.name = name;
  }

  toggleSaveFiltersDialog() {
    this.saveFiltersDialogOpen = !this.saveFiltersDialogOpen;
  }
  closeSaveFilterDialog() {
    this.saveFiltersDialogOpen = false;
  }

  private isSavedFilterNameUnique(name: string) {
    return this.savedFilters.findIndex(({ text }) => text.toLowerCase() === name.toLowerCase()) < 0;
  }
}
</script>




