<template>
<div class="overall-wrap">
  <div class="general-information-wrapper">
    <div class="general-information">
      <div class="section-col">
        <div class="labels">
          <div>KLE-nr:</div>
          <div>Lov og paragraf:</div>
        </div>
        <div class="fields">
          <SelectionField :value="generalInformation.kleNumber" @change="updateGeneranlInformation({kleNumber: $event})" :items="kleNumbers" />
          <InputField :value="generalInformation.paragraf" @change="updateGeneranlInformation({paragraf: $event})" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Afdeling:</div>
          <div>Fagområde:</div>
          <div>Synlighed:</div>
        </div>
        <div class="fields">
          <InputField :value="generalInformation.department" @change="updateGeneranlInformation({department: $event})" />
          <SelectionField :value="generalInformation.field" @change="updateGeneranlInformation({field: $event})" :items="fields" />
          <SelectionField :value="generalInformation.visibility" @change="updateGeneranlInformation({visibility: $event})" :items="visibilityLevels" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Kontaktperson:</div>
          <div>Mail:</div>
          <div>Procestid:</div>
        </div>
        <div class="fields">
          <InputField :value="generalInformation.contactPerson" @change="updateGeneranlInformation({contactPerson: $event})" />
          <InputField :value="generalInformation.email" @change="updateGeneranlInformation({email: $event})" />
          <InputField :value="generalInformation.procesTime" @change="updateGeneranlInformation({procesTime: $event})" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Leverandør:</div>
          <div>Projektleder:</div>
        </div>
        <div class="fields">
          <InputField :value="generalInformation.supplier" @change="updateGeneranlInformation({supplier: $event})" />
          <InputField :value="generalInformation.projectManager" @change="updateGeneranlInformation({projectManager: $event})" />
        </div>
      </div>
    </div>
    <AssociatedPersonsInput />
  </div>
  
  <div class="resume-phases">
    <div class="resume">
      <p>Resume</p>
      <TextArea @change="updateGeneranlInformation({resume: $event})" :value="generalInformation.resume" />
    </div>
    <div class="general-phases">
      <Phases />
      <SelectionField class="status-selection" :value="generalInformation.status" @change="updateGeneranlInformation({status: $event})" :items="statusItems"/>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { namespace, generalInformationActionTypes } from '@/store/modules/details/general-information/actions';

import InputField from "@/components/common/inputs/InputField.vue";
import SelectionField from "@/components/common/inputs/SelectionField.vue";
import TextArea from "@/components/common/inputs/TextArea.vue";
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';


@Component({
  components: {
    InputField,
    SelectionField,
    TextArea,
    Phases,
    AssociatedPersonsInput
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(generalInformationActionTypes.UPDATE_GENERAL_INFORMATION, { namespace })
  updateGeneranlInformation: any;

  get generalInformation() {
    return this.$store.state.details.generalInformation;
  }

  fields = ['Teknik', 'Diverse', 'ETC'];

  visibilityLevels = ['Privat', 'Tværkommunalt', 'Kommunalt'];

  kleNumbers = ['1234', '134324', '54353'];

  statusItems = ['Afventer', 'Igang', 'Produktions Klar'];
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.general-information-wrapper {
  background-color: $color-edit-background;
  border-radius: 12px;

  .general-information {
    display: flex;
    flex-direction: row;
    padding: $size-unit;
  }

  .section-col {
    display: flex;
    flex: 0 0 25%;

    padding: 0 $size-unit/2;

    &:not(:last-of-type) {
      border-right: 1px solid $color-background;
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
        line-height: $size-unit * 2;
        text-align: left;
      }
    }

    .labels > div,
    .fields > * {
      margin-bottom: $size-unit;
      padding: 0;
    }
  }
}

.resume-phases {
  background-color: white;
  border-radius: 0;
  display: flex;
  margin-top: 50px;

  .resume {
    width: 30%;
  }
  .general-phases {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    .status-selection {
      align-self: center;
      max-width: 230px;
    }
  }
}
</style>
