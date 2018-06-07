<template>
    <div class="associated">
        <div class="associated-list">
            <div class="associated-label">Tilknyttede personer:</div>
            <div class="associated-persons-list">
                <div v-for="person in associatedPeople" :key="person">
                    {{person}}
                    <span @click="removePerson(person)" class="delete-icon">
                        <DeleteCrossIcon />
                    </span>
                </div>
            </div>
        </div>
        <div class="add-person">
            <div class="associated-label">Tilknyt person</div>
            <SelectionField :value="getAssociatedPersons" @change="addPerson" :items="people" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DeleteCrossIcon from '@/components/icons/DeleteCrossIcon.vue';
import { namespace } from '@/store/modules/details/general-information/actions';

@Component({
  components: {
    SelectionField,
    DeleteCrossIcon
  }
})
export default class AssociatedPersonsInput extends Vue {
  @Action('addAssociatedPerson', { namespace })
  addAssociatedPerson: any;
  @Action('removeAssociatedPerson', { namespace })
  removeAssociatedPerson: any;

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
      justify-content: flex-start;
      align-content: flex-start;
      height: 150px;
      border: 1px solid $color-primary;
      border-radius: 15px;
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
}
</style>
