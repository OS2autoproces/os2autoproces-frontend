<template>
  <!-- Todo: Should we hide the associated person, or should they be shown when in readonly mode (disabled) -->
  <div class="associated" v-if="!disabled">
    <div class="associated-list">
      <div class="associated-label">Tilknyttede personer:</div>
      <div class="associated-persons-list">
        <div v-for="person in associatedPeople" :key="person">
          {{person}}
          <span @click="removePerson(person)" class="delete-icon">
            <DeleteIcon />
          </span>
        </div>
      </div>
    </div>
    <div class="add-person">
      <div class="associated-label">Tilknyt person:</div>
      <SelectionField :value="getAssociatedPersons" @change="addPerson" :items="people" iconName="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import {
  namespace,
  generalInformationActionTypes
} from '@/store/modules/details/general-information/actions';

@Component({
  components: {
    SelectionField,
    DeleteIcon
  }
})
export default class AssociatedPersonsInput extends Vue {
  @Action(generalInformationActionTypes.ADD_ASSOCIATED_PERSON, { namespace })
  addAssociatedPerson: any;
  @Action(generalInformationActionTypes.REMOVE_ASSOCIATED_PERSON, { namespace })
  removeAssociatedPerson: any;

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
    return this.$store.state.associatedPersons;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.associated {
  display: flex;
  padding: $size-unit;
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
    .input-group {
      padding: 0;
    }
    margin-left: 100px;
  }

  /deep/ .input-group--autocomplete {
    .icon {
      transform: none !important;
    }
  }
}
</style>
