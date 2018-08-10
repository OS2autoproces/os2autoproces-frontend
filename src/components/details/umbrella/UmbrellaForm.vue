<template>
  <FormSection :invalid="!isUmbrellaValid" heading="Paraply proces" :disabled="state.disabled.generalInformationEdit" @edit="update({disabled: { generalInformationEdit: $event} })" always-open>
    <div class="umbrella-wrapper">
      <Well>
        <div>
          <WellItem labelWidth="80px" label="ID:">
            <InputField disabled :value="state.id" />
          </WellItem>
          <WellItem labelWidth="80px" label="KLE-nr:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.kle" @change="setKle($event)" :items="kles" itemText="code" clearable />
          </WellItem>
          <WellItem labelWidth="80px" label="FORM:" v-if="state.kle">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.form" @change="update({form: $event})" :items="forms" itemText="code" clearable />
          </WellItem>
          <WellItem labelWidth="80px" label="Lokalt ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.localId" @change="update({localId: $event})" />
          </WellItem>
          <WellItem labelWidth="80px" label="KL ID:">
            <InputField :disabled="state.disabled.generalInformationEdit" :value="state.klId" @change="update({klId: $event})" />
          </WellItem>
          <WellItem labelWidth="80px" label="KLA:">
            <MaskableInput :disabled="state.disabled.generalInformationEdit" mask="##.##.##.##.##" :value="state.kla" @change="setKla" />
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="120px" label="Fagområder:">
            <DomainsField :disabled="state.disabled.generalInformationEdit" :value="state.domains" @change="assign({domains: $event})" />
          </WellItem>
          <WellItem labelWidth="120px" label="Kontaktperson:">
            <SelectionField :disabled="state.disabled.generalInformationEdit" :value="state.contact" itemText="name" @search="search($event)" isItemsPartial @change="update({contact: $event})" :items="users" clearable />
          </WellItem>
          <WellItem labelWidth="120px" v-if="state.contact" label="Mail:">
            {{state.contact.email}}
          </WellItem>
        </div>

        <div>
          <WellItem labelWidth="120px" label="Synlighed:">
            {{TypeLabels[state.type]}}
          </WellItem>
          <WellItem labelWidth="120px" label="Oprettet:">
            <DatePicker :value="state.created" disabled/>
          </WellItem>
          <WellItem labelWidth="120px" label="Sidst opdateret:">
            <DatePicker :value="state.lastChanged" disabled />
          </WellItem>
        </div>
      </Well>
    </div>

    <div class="description">
      <h2>Resume *</h2>
      <TextArea :disabled="state.disabled.generalInformationEdit" @change="update({shortDescription: $event})" :value="state.shortDescription" :maxLength="140" />

      <h2>Beskrivelse</h2>
      <TextArea :disabled="state.disabled.generalInformationEdit" @change="update({longDescription: $event})" :value="state.longDescription" :maxLength="1200" />
    </div>

    <div class="processes">
      <h2>Tilknyttede processer</h2>
      <div v-for="process in state.children" :key="process.id" class="process">
        <router-link :to="'/details/' + process.id" class="search-result-link">
          <SmallSearchResult :process="process" />
        </router-link>

        <div v-if="!state.disabled.generalInformationEdit" class="delete-icon" @click="removeProcess(process)" role="button">
          <DeleteIcon />
        </div>
      </div>
    </div>

    <div class="processes" v-if="!state.disabled.generalInformationEdit">
      <h2>Find og tilknyt processer</h2>
      <AssociatedProcesses @add="addProcess" />
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import InputField from '@/components/common/inputs/InputField.vue';
import DatePicker from '@/components/common/inputs/DatePicker.vue';
import MaskableInput from '@/components/common/inputs/MaskableInput.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import AssociatedProcesses from '@/components/common/inputs/AssociatedProcesses.vue';
import MappedSelectionField from '@/components/common/inputs/MappedSelectionField.vue';
import SmallSearchResult from '@/components/search/SmallSearchResult.vue';
import DomainsField from '@/components/common/inputs/DomainsField.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';
import Phases from '@/components/common/inputs/Phases.vue';
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { commonActionTypes, UserSearchRequest } from '@/store/modules/common/actions';
import { User } from '@/store/modules/auth/state';
import { StatusKeys, StatusLabels } from '@/models/status';
import { VisibilityKeys, VisibilityLabels } from '@/models/visibility';
import { OrgUnit, Process } from '@/store/modules/process/state';
import { TypeLabels, TypeKeys } from '@/models/types';
import { Kle } from '@/store/modules/common/actions';
import { Domain } from '@/models/domain';
import { Phase, PhaseKeys } from '@/models/phase';
import { searchActionTypes } from '@/store/modules/search/actions';

@Component({
  components: {
    InputField,
    DomainsField,
    SelectionField,
    SmallSearchResult,
    AssociatedProcesses,
    MappedSelectionField,
    DatePicker,
    TextArea,
    Phases,
    Well,
    FormSection,
    MaskableInput,
    WellItem,
    WarningIcon,
    DeleteIcon
  }
})
export default class UmbrellaForm extends Vue {
  @Action(processActionTypes.UPDATE) update: any;
  @Action(processActionTypes.ASSIGN) assign: any;
  @Action(commonActionTypes.LOAD_FORMS) loadForms: any;

  @Getter(processGetterTypes.IS_UMBRELLA_VALID) isUmbrellaValid!: any;

  TypeLabels = TypeLabels;

  get users() {
    return this.$store.state.common.users;
  }

  get state() {
    return this.$store.state.process;
  }

  get kles() {
    return this.$store.state.common.kles;
  }

  get forms() {
    return this.$store.state.common.forms;
  }

  search(name: string) {
    this.$store.dispatch(commonActionTypes.SEARCH_USERS, {
      name,
      cvr: this.$store.state.auth.user.cvr
    });
  }

  setKla(kla: string) {
    // Inserts periodes for every 2 characters, to match format: ##.##.##.##.##
    this.update({ kla: kla.replace(/(\d{2})(?=\d)/g, '$1.') });
  }

  setKle(kle: Kle) {
    if (!kle) {
      this.update({ kle: kle, form: null });
    } else {
      this.update({ kle: kle });
    }
    this.loadForms(kle);
  }

  addProcess(process: Process) {
    if (this.state.children.find((child: Process) => child.id === process.id)) {
      return;
    }

    this.assign({ children: [...this.state.children, process] });
  }

  removeProcess(process: Process) {
    this.assign({
      children: this.state.children.filter((child: Process) => child.id !== process.id)
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.description,
.processes {
  h2 {
    margin-top: 2rem;
    @include textarea-heading;
    margin-bottom: .5rem;
  }
}

.process {
  position: relative;
  margin-bottom: 1rem;

  .delete-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 30px;
    width: 30px;
  }

  .search-result-link {
    text-decoration: inherit;
    color: inherit;
  }
}
</style>
