<template>
  <FormSection
    :invalid="!state.isUmbrellaValid"
    heading="Paraplyproces"
    :disabled="state.disabled.generalInformationEdit"
    @edit="update({ disabled: { generalInformationEdit: $event } })"
    always-open
  >
    <div class="umbrella-wrapper">
      <div class="title-row" id="title">
        <div class="title-label">Titel: *</div>
        <InputField
          class="title-field flex-grow"
          :value="state.title"
          :hasError="isInErrors('title')"
          :disabled="state.disabled.generalInformationEdit"
          :class="{ disabled: state.disabled.generalInformationEdit }"
          @change="update({ title: $event })"
        />
        <div v-if="!isReporting" class="bookmark-button" role="button" @click="setBookmark(!state.hasBookmarked)">
          <StarIcon :class="{ selected: state.hasBookmarked }" />
        </div>
        <MunicipalityLogo :src="logo" />
      </div>

      <Well>
        <div>
          <WellItem id="id" labelWidth="200px" label="ID:">
            <InputField disabled :value="state.id" />
          </WellItem>
          <WellItem id="kle" labelWidth="200px" label="KLE-nr:">
            <SelectionField
              :disabled="state.disabled.generalInformationEdit"
              :value="state.kle"
              :hasError="isInErrors('kle')"
              @change="setKle($event)"
              :items="common.kles"
              itemText="code"
              clearable
            />
          </WellItem>
          <WellItem id="form" labelWidth="200px" label="FORM:" v-if="state.kle">
            <SelectionField
              :disabled="state.disabled.generalInformationEdit"
              :value="state.form"
              :hasError="isInErrors('form')"
              @change="update({ form: $event })"
              :items="common.forms"
              itemText="code"
              clearable
            />
          </WellItem>
          <WellItem id="klId" labelWidth="200px" label="KL ID:">
            <InputField
              :disabled="state.disabled.generalInformationEdit"
              :value="state.klId"
              :hasError="isInErrors('klId')"
              @change="update({ klId: $event })"
            />
          </WellItem>
          <WellItem
            id="kla"
            labelWidth="200px"
            label="KL’s Arbejdsgangsbank:"
            tooltip="KL’s Arbejdsgangsbank nummeret henviser til en proces fra KL’s Arbejdsgangsbank."
          >
            <MaskableInput
              :disabled="state.disabled.generalInformationEdit"
              mask="##.##.##.##.##"
              :value="state.kla"
              :hasError="isInErrors('kla')"
              @change="setKla"
            />
          </WellItem>
        </div>

        <div>
          <WellItem id="domains" labelWidth="120px" label="Fagområder:">
            <DomainsField
              :disabled="state.disabled.generalInformationEdit"
              :value="state.domains"
              :hasError="isInErrors('domains')"
              @change="assign({ domains: $event })"
            />
          </WellItem>
          <WellItem id="contact" labelWidth="120px" label="Kontaktperson:">
            <SelectionField
              itemSubText="email"
              :disabled="state.disabled.generalInformationEdit"
              :value="state.contact"
              :hasError="isInErrors('contact')"
              itemText="name"
              @search="search($event)"
              isItemsPartial
              @change="update({ contact: $event })"
              :items="common.users"
              clearable
            />
          </WellItem>
          <WellItem labelWidth="120px" v-if="state.contact" label="Mail:">{{ state.contact.email }}</WellItem>
        </div>

        <div>
          <WellItem labelWidth="120px" label="Synlighed:">{{ TypeLabels[state.type] }}</WellItem>
          <WellItem labelWidth="120px" label="Oprettet:" id="created">
            <DatePicker :value="state.created" disabled />
          </WellItem>
          <WellItem labelWidth="120px" label="Sidst opdateret:" id="lastChanged">
            <DatePicker :value="state.lastChanged" disabled />
          </WellItem>
        </div>
      </Well>
    </div>

    <div class="description" id="shortDescription">
      <h2>Resume *</h2>
      <TextArea
        :disabled="state.disabled.generalInformationEdit"
        @change="update({ shortDescription: $event })"
        :value="state.shortDescription"
        :hasError="isInErrors('shortDescription')"
        :maxLength="140"
      />

      <h2 id="longDescription">Beskrivelse</h2>
      <TextArea
        :disabled="state.disabled.generalInformationEdit"
        @change="update({ longDescription: $event })"
        :value="state.longDescription"
        :hasError="isInErrors('longDescription')"
        :maxLength="10000"
      />
    </div>

    <div class="processes">
      <h2>Tilknyttede processer</h2>
      <div v-for="process in state.children" :key="process.id" class="process">
        <router-link :to="'/details/' + process.id" class="search-result-link">
          <SmallSearchResult :process="process" />
          <div class="visibility-warning" v-if="isLessVisible(process.visibility)">
            <WarningIcon class="visibility-icon" /> Synligheden ændres fra
            {{ VisibilityLabels[process.visibility] }} til {{ VisibilityLabels[state.visibility] }}
          </div>
        </router-link>

        <div
          v-if="!state.disabled.generalInformationEdit"
          class="delete-icon"
          @click="removeProcess(process)"
          role="button"
        >
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
import Well from '@/components/common/Well.vue';
import WellItem from '@/components/common/WellItem.vue';
import FormSection from '@/components/details/FormSection.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { User } from '@/store/modules/auth';
import { StatusKeys, StatusLabels } from '@/models/status';
import { VisibilityKeys, VisibilityLabels, VisibilityOrder, Visibility } from '@/models/visibility';
import { ProcessReport } from '@/store/modules/processInterfaces';
import { Kle, OrgUnit, UserSearchRequest } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { TypeLabels, TypeKeys } from '@/models/types';
import { Domain } from '@/models/domain';
import { Phase, PhaseKeys } from '@/models/phase';
import MunicipalityLogo from '@/components/common/MunicipalityLogo.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import { AuthModule } from '@/store/modules/auth';
import { ProcessModule, ProcessState } from '@/store/modules/process';
import { ErrorModule } from '@/store/modules/error';

@Component({
  components: {
    StarIcon,
    MunicipalityLogo,
    InputField,
    DomainsField,
    SelectionField,
    SmallSearchResult,
    AssociatedProcesses,
    MappedSelectionField,
    DatePicker,
    TextArea,
    Well,
    FormSection,
    MaskableInput,
    WellItem,
    WarningIcon,
    DeleteIcon
  }
})
export default class UmbrellaForm extends Vue {
  @Prop(Boolean)
  isReporting!: boolean;

  TypeLabels = TypeLabels;
  VisibilityLabels = VisibilityLabels;
  VisibilityKeys = VisibilityKeys;

  get state() {
    return ProcessModule;
  }

  get common() {
    return CommonModule;
  }

  get logo() {
    return `/logos/${ProcessModule.cvr}.png`;
  }

  update(state: Partial<ProcessState>) {
    ProcessModule.update(state);
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.generalInformation, name);
  }

  search(name: string) {
    const request: UserSearchRequest = { name: `${name}`, cvr: '' };
    if (AuthModule.user) {
      request.cvr = AuthModule.user.cvr;
      CommonModule.searchUsers(request);
    } else {
      CommonModule.searchUsers(request);
    }
  }

  isLessVisible(visiblity: Visibility) {
    return !!ProcessModule.visibility
      ? VisibilityOrder.indexOf(visiblity) < VisibilityOrder.indexOf(ProcessModule.visibility)
      : false;
  }

  setKla(kla: string) {
    // Inserts periodes for every 2 characters, to match format: ##.##.##.##.##
    ProcessModule.update({ kla: kla.replace(/(\d{2})(?=\d)/g, '$1.') });
  }

  setKle(kle: Kle) {
    if (!kle) {
      ProcessModule.update({ kle, form: null });
    } else {
      ProcessModule.update({ kle });
    }
    CommonModule.loadFormsByKle(kle);
  }

  setBookmark(bookmarked: boolean) {
    ProcessModule.setBookmark(bookmarked);
  }

  addProcess(process: ProcessReport) {
    if (ProcessModule.children && !ProcessModule.children?.find((child: ProcessReport) => child.id === process.id)) {
      ProcessModule.assign({ children: [...ProcessModule.children, process] });
    }
  }

  removeProcess(process: ProcessReport) {
    ProcessModule.assign({
      children: ProcessModule.children?.filter((child: ProcessReport) => child.id !== process.id)
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
    margin-bottom: 0.5rem;
  }
}

.visibility-warning {
  display: flex;
  align-items: center;
  color: $color-primary;
}

.visibility-icon {
  height: 2rem;
  width: 2rem;
}

.title-row {
  display: flex;
  align-items: center;

  .title-label {
    margin-right: 1rem;
    color: $color-secondary;
  }

  .title-label,
  .title-field {
    @include heading;
    font-size: 2rem;
  }
}

.process {
  position: relative;
  margin-bottom: 1rem;

  .delete-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    height: 30px;
    width: 30px;
  }

  .search-result-link {
    text-decoration: inherit;
    color: inherit;
  }
}

.bookmark-button {
  height: 2rem;
  width: 2rem;
  margin-left: 50px;
}
</style>
