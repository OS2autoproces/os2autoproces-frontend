<template>
    <FormSection heading="Grundlæggende oplysninger" id="general-information" :disabled="state.disabled" @edit="update({disabled: $event})" always-open>
        <div class="general-information-wrapper">
            <Well>
                <div class="section-col">
                    <div class="labels">
                        <div>KLE-nr:</div>
                        <div>Lov og paragraf:</div>
                    </div>
                    <div class="fields">
                        <SelectionField :disabled="state.disabled" :value="state.kleNumber" @change="update({kleNumber: $event})" :items="kleNumbers" />
                        <InputField :disabled="state.disabled" :value="state.paragraf" @change="update({paragraf: $event})" />
                    </div>
                </div>
                <div class="section-col">
                    <div class="labels">
                        <div>Afdeling:</div>
                        <div>Fagområde:</div>
                        <div>Synlighed:</div>
                    </div>
                    <div class="fields">
                        <InputField :disabled="state.disabled" :value="state.department" @change="update({department: $event})" />
                        <SelectionField :disabled="state.disabled" :value="state.field" @change="update({field: $event})" :items="fields" />
                        <SelectionField :disabled="state.disabled" :value="state.visibility" @change="update({visibility: $event})" :items="visibilityLevels" />
                    </div>
                </div>
                <div class="section-col">
                    <div class="labels">
                        <div>Kontaktperson:</div>
                        <div>Mail:</div>
                        <div>Procestid:</div>
                    </div>
                    <div class="fields">
                        <InputField :disabled="state.disabled" :value="state.contactPerson" @change="update({contactPerson: $event})" />
                        <InputField :disabled="state.disabled" :value="state.email" @change="update({email: $event})" />
                        <InputField :disabled="state.disabled" :value="state.procesTime" @change="update({procesTime: $event})" />
                    </div>
                </div>
                <div class="section-col">
                    <div class="labels">
                        <div>Leverandør:</div>
                        <div>Projektleder:</div>
                    </div>
                    <div class="fields">
                        <InputField :disabled="state.disabled" :value="state.supplier" @change="update({supplier: $event})" />
                        <InputField :disabled="state.disabled" :value="state.projectManager" @change="update({projectManager: $event})" />
                    </div>
                </div>
                <AssociatedPersonsInput slot="well-footer" :disabled="state.disabled" />
            </Well>
        </div>

        <div class="resume-phases">
            <div class="resume">
                <p>Resume</p>
                <TextArea :disabled="state.disabled" @change="update({resume: $event})" :value="state.resume" />
            </div>
            <div class="general-phases">
                <Phases :disabled="state.disabled" :value="state.phase" @change="update({phase: $event})" />
                <SelectionField :disabled="state.disabled" class="status-selection" :value="state.status" @change="update({status: $event})" :items="statusItems" />
            </div>
        </div>
    </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { generalInformationActionTypes } from '@/store/modules/details/general-information/actions';

import InputField from '@/components/common/inputs/InputField.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import AssociatedPersonsInput from '@/components/details/general-information/AssociatedPersonsInput.vue';
import Well from '@/components/common/Well.vue';
import FormSection from '@/components/details/FormSection.vue';

@Component({
  components: {
    InputField,
    SelectionField,
    TextArea,
    Phases,
    AssociatedPersonsInput,
    Well,
    FormSection
  }
})
export default class GeneralInformationForm extends Vue {
  @Action(generalInformationActionTypes.UPDATE_GENERAL_INFORMATION) update: any;

  get state() {
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
