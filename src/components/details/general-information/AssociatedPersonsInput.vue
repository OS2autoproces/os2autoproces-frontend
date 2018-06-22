<template>
  <div class="associated">
    <div class="associated-list" v-if="!disabled">
      <div class="associated-label">Tilknyttede personer</div>
      <div class="associated-persons-list">
        <div v-for="(person, index) in associatedPeople" :key="index">
          {{person}}
          <span @click="removePerson(person)" class="delete-icon">
            <DeleteIcon />
          </span>
        </div>
      </div>
    </div>
    <div class="add-person" v-if="!disabled">
      <div class="associated-label">Tilknyt person</div>
      <SelectionField class="search-field" placeholder="Skriv navn" @change="addPerson" :items="people" iconName="search" />
    </div>
    <div class="associated-list-readonly" v-if="disabled">
      <div class="associated-label">Tilknyttede personer:</div>
      {{ this.associatedPersonsDisabled }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { generalInformationActionTypes } from '@/store/modules/details/general-information/actions';

@Component({
  components: {
    SelectionField,
    DeleteIcon
  }
})
export default class AssociatedPersonsInput extends Vue {
  @Action(generalInformationActionTypes.ADD_ASSOCIATED_PERSON) addAssociatedPerson: any;
  @Action(generalInformationActionTypes.REMOVE_ASSOCIATED_PERSON) removeAssociatedPerson: any;

  @Prop() disabled!: boolean;

  associatedPeople: string[] = [];

  people = ['Christian Branstrup Bondesdfsdfa', 'Rasmus', 'Jakob'];

  addPerson(name: string) {
    this.associatedPeople.push(name);
    this.addAssociatedPerson(name);
  }

  removePerson(person: string) {
    this.associatedPeople = this.associatedPeople.filter(p => p !== person);
    this.removeAssociatedPerson(person);
  }

  get getAssociatedPersons() {
    return this.$store.state.details.generalInformation.associatedPersons;
  }

  get associatedPersonsDisabled() {
    return this.$store.state.details.generalInformation.associatedPersons.join(', ');
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.associated {
  display: flex;
  padding-top: $size-unit;
  padding-bottom: $size-unit * 2;

  .associated-list {
    width: 60%;

    .associated-persons-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      height: 150px;
      border: 1px solid $color-primary;
      border-radius: $size-unit;
      padding: $size-unit/2;

      > div {
        display: flex;
        align-items: center;
        width: 20%;

        .delete-icon {
          width: $size-unit;
          height: $size-unit;
          margin-left: auto;
        }
      }
    }
  }

  .add-person {
    margin-left: $size-unit;

    .input-group {
      padding: 0;
    }
  }

  .search-field {
    width: 250px;
  }

  /deep/ .input-group--autocomplete {
    .icon {
      transform: none !important;
    }
  }
}

.associated-label {
  @include field-label;
  padding-bottom: $size-unit/4;
}
</style>
