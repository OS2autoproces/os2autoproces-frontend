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
          <SelectionField :disabled="disabled" :value="generalInformation.kleNumber" @change="updateGeneralInformation({kleNumber: $event})" :items="kleNumbers" />
          <InputField :disabled="disabled" :value="generalInformation.paragraf" @change="updateGeneralInformation({paragraf: $event})" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Afdeling:</div>
          <div>Fagområde:</div>
          <div>Synlighed:</div>
        </div>
        <div class="fields">
          <InputField :disabled="disabled" :value="generalInformation.department" @change="updateGeneralInformation({department: $event})" />
          <SelectionField :disabled="disabled" :value="generalInformation.field" @change="updateGeneralInformation({field: $event})" :items="fields" />
          <SelectionField :disabled="disabled" :value="generalInformation.visibility" @change="updateGeneralInformation({visibility: $event})" :items="visibilityLevels" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Kontaktperson:</div>
          <div>Mail:</div>
          <div>Procestid:</div>
        </div>
        <div class="fields">
          <InputField :disabled="disabled" :value="generalInformation.contactPerson" @change="updateGeneralInformation({contactPerson: $event})" />
          <InputField :disabled="disabled" :value="generalInformation.email" @change="updateGeneralInformation({email: $event})" />
          <InputField :disabled="disabled" :value="generalInformation.procesTime" @change="updateGeneralInformation({procesTime: $event})" />
        </div>
      </div>
      <div class="section-col">
        <div class="labels">
          <div>Leverandør:</div>
          <div>Projektleder:</div>
        </div>
        <div class="fields">
          <InputField :disabled="disabled" :value="generalInformation.supplier" @change="updateGeneralInformation({supplier: $event})" />
          <InputField :disabled="disabled" :value="generalInformation.projectManager" @change="updateGeneralInformation({projectManager: $event})" />
        </div>
      </div>
    </div>
    <AssociatedPersonsInput :disabled="disabled" />
  </div>
  
  <div class="resume-phases">
    <div class="resume">
      <p>Resume</p>
      <TextArea :disabled="disabled" @change="updateGeneralInformation({resume: $event})" :value="generalInformation.resume" />
    </div>
    <div class="general-phases">
      <Phases :disabled="disabled" />
      <SelectionField :disabled="disabled" class="status-selection" :value="generalInformation.status" @change="updateGeneralInformation({status: $event})" :items="statusItems"/>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
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
  updateGeneralInformation: any;

  // Todo: set default true in production
  @Prop({ default: true}) disabled!: boolean;

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
