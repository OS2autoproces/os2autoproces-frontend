<template>
    <div class="container">
        <div class="section-col kle">
          <div class="labels">
              <div>KLE-nr:</div>
              <div>Lov og paragraf:</div>
          </div>
          <div class="fields">
              <SelectionField :value="getKleNumber" @change="setKleNumber" :fields="kleNumber" />
              <InputField :value="getParagraf" @input="setParagraf" />
          </div>
        </div>

        <div class="section-col">
          <div class="labels">
            <div>Afdeling:</div>
            <div>Fagområde:</div>
            <div>Synlighed:</div>
          </div>
          <div class="fields">
            <InputField :value="getDepartment" @input="setDepartment"/>
            <SelectionField :value="getField" @change="setField" :fields="fields" />
            <SelectionField :value="getVisibility" @change="setVisibility" :fields="visibilityItems"/>
          </div>
        </div>

        <div class="section-col">
          <div class="labels">
            <div>Kontaktperson:</div>
            <div>Mail:</div>
            <div>Procestid:</div>
          </div>
          <div class="fields">
            <InputField :value="getContactPerson" @input="setContactPerson"/>
            <InputField :value="getEmail" @input="setEmail"/>
            <InputField :value="getProcesTime" @input="setProcesTime"/>
          </div>
        </div>

        <div class="section-col">
          <div class="labels">
            <div>Leverandør:</div>
            <div>Projektleder:</div>
          </div>
          <div class="fields">
            <InputField :value="getSupplier" @input="setSupplier"/>
            <InputField :value="getProjectMananger" @input="setProjectMananger"/>
          </div> 
        </div>
        <!-- <ResumeTextArea /> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import InputField from '@/components/details/general-information/inputs/InputField.vue';
import SelectionField from '@/components/details/general-information/inputs/SelectionField.vue';

const namespace = 'generalInformation';

@Component({
  components: {
    InputField,
    SelectionField,
  }
})
export default class GeneralInformationForm extends Vue {
  @Action('setKleNumber', { namespace })
  setKleNumber: any;
  @Action('setParagraf', { namespace })
  setParagraf: any;
  @Action('setDepartment', { namespace })
  setDepartment: any;
  @Action('setContactPerson', { namespace })
  setContactPerson: any;
  @Action('setEmail', { namespace })
  setEmail: any;
  @Action('setProcesTime', { namespace })
  setProcesTime: any;
  @Action('setSupplier', { namespace })
  setSupplier: any;
  @Action('setProjectMananger', { namespace })
  setProjectMananger: any;
  @Action('setField', { namespace })
  setField: any;
  @Action('setVisibility', { namespace })
  setVisibility: any;

  fields = [
      'Teknik',
      'Diverse',
      'ETC'
  ];

  visibilityItems = [
      'Privat',
      'Tværkommunalt',
      'Kommunalt'
  ];

  kleNumber = [
    '1234',
    '134324',
    '54353'
  ];

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
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  background-color: gainsboro;
}

.section-col {
  display: flex;
  flex: 0 0 25%;
  .labels {
    width: 50%;
    > div {
      line-height: 32px;
      text-align: left;
    }
  }

  .labels > div,
  .fields > * {
    margin-bottom: 1rem;
  }
}
</style>
