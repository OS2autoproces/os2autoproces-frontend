<template>
    <div>
        <div class="general-information">
            <div class="section-col">
                <div class="labels">
                    <div>KLE-nr:</div>
                    <div>Lov og paragraf:</div>
                </div>
                <div class="fields">
                    <SelectionField :value="getKleNumber" @change="setKleNumber" :items="kleNumbers" />
                    <InputField :value="getParagraf" @change="setParagraf" />
                </div>
            </div>
            <div class="section-col">
                <div class="labels">
                    <div>Afdeling:</div>
                    <div>Fagområde:</div>
                    <div>Synlighed:</div>
                </div>
                <div class="fields">
                    <InputField :value="getDepartment" @change="setDepartment" />
                    <SelectionField :value="getField" @change="setField" :items="fields" />
                    <SelectionField :value="getVisibility" @change="setVisibility" :items="visibilityLevels" />
                </div>
            </div>
            <div class="section-col">
                <div class="labels">
                    <div>Kontaktperson:</div>
                    <div>Mail:</div>
                    <div>Procestid:</div>
                </div>
                <div class="fields">
                    <InputField :value="getContactPerson" @change="setContactPerson" />
                    <InputField :value="getEmail" @change="setEmail" />
                    <InputField :value="getProcesTime" @change="setProcesTime" />
                </div>
            </div>
            <div class="section-col">
                <div class="labels">
                    <div>Leverandør:</div>
                    <div>Projektleder:</div>
                </div>
                <div class="fields">
                    <InputField :value="getSupplier" @change="setSupplier" />
                    <InputField :value="getProjectMananger" @change="setProjectMananger" />
                </div>
            </div>
        </div>
        <div class="associated">
          <div class="associated-list">
            <div class="associated-label">Tilknyttede personer:</div>
            <div v-for="(person, index) in associatedPeople">
              <div>
                 {{person}} <div @click="removePerson(person)">X</div>
              </div>
            </div>
          </div>
          <SelectionField :value="getAssociatedPersons" @change="addPerson" :items="people" />
        </div>

        <TextArea :max-length="1200" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { namespace } from "@/store/modules/details/general-information/actions";

import InputField from "@/components/common/inputs/InputField.vue";
import SelectionField from "@/components/common/inputs/SelectionField.vue";
import TextArea from "@/components/common/inputs/TextArea.vue";

@Component({
  components: {
    InputField,
    SelectionField,
    TextArea
  }
})
export default class GeneralInformationForm extends Vue {
  @Action("setKleNumber", { namespace })
  setKleNumber: any;
  @Action("setParagraf", { namespace })
  setParagraf: any;
  @Action("setDepartment", { namespace })
  setDepartment: any;
  @Action("setContactPerson", { namespace })
  setContactPerson: any;
  @Action("setEmail", { namespace })
  setEmail: any;
  @Action("setProcesTime", { namespace })
  setProcesTime: any;
  @Action("setSupplier", { namespace })
  setSupplier: any;
  @Action("setProjectMananger", { namespace })
  setProjectMananger: any;
  @Action("setField", { namespace })
  setField: any;
  @Action("setVisibility", { namespace })
  setVisibility: any;
  @Action("addAssociatedPerson", { namespace })
  addAssociatedPerson: any;

  associatedPeople = [];
  
  people = ['Christian', 'Rasmus', 'Jakob'];

  fields = ["Teknik", "Diverse", "ETC"];

  visibilityLevels = ["Privat", "Tværkommunalt", "Kommunalt"];

  kleNumbers = ["1234", "134324", "54353"];

  addPerson(name: string) {
    this.associatedPeople.push(name);
    this.addAssociatedPerson(name);
  }

  removePerson(person: string) {
    this.associatedPeople = this.associatedPeople.filter(p => p !== person);
  }

  get getKleNumber() {
    return this.$store.state.kleNumber;
  }
  get getParagraf() {
    return this.$store.state.paragraf;
  }
  get getDepartment() {
    return this.$store.state.department;
  }
  get getContactPerson() {
    return this.$store.state.contactPerson;
  }
  get getEmail() {
    return this.$store.state.email;
  }
  get getProcesTime() {
    return this.$store.state.procesTime;
  }
  get getSupplier() {
    return this.$store.state.supplier;
  }
  get getProjectMananger() {
    return this.$store.state.projectManager;
  }
  get getField() {
    return this.$store.state.field;
  }
  get getVisibility() {
    return this.$store.state.visibility;
  }
  get getAssociatedPersons() {
    return this.$store.state.associatedPersons;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.general-information {
  display: flex;
  flex-direction: row;
  background-color: $color-edit-background;
  border-radius: 12px;
  padding: $size-unit;
}

.section-col {
  display: flex;
  flex: 0 0 25%;
  
  padding: 0 $size-unit/2;

  &:not(:last-of-type) {
    border-right: 1px solid white;
  }

  &:last-of-type {
    padding-right: 0;
  }

  &:first-of-type {
    padding-left: 0;
  }

  .labels {
    width: 50%;
    > div {
      line-height: 32px;
      text-align: left;
    }
  }

  .labels > div,
  .fields > * {
    padding: 0;
    margin-bottom: 1rem;
  }
}

.associated {
  display: flex;
   > div {
     width: 50%;
   }
}
</style>
