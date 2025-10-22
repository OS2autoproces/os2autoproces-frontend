<template>
  <FormSection
    :invalid="!state.isAttachmentsValid"
    v-if="state.minPhase(PhaseKeys.PREANALYSIS)"
    heading="Bilag og links"
    id="attachments"
    :disabled="state.disabled.attachmentsEdit"
    @edit="state.update({ disabled: { attachmentsEdit: $event } })"
  >
    <h2 v-if="isWithinMunicipality && state.minPhase(PhaseKeys.SPECIFICATION)">Sagsreference i ESDH</h2>
    <div v-if="isWithinMunicipality && state.minPhase(PhaseKeys.SPECIFICATION)" id="esdhReference">
      <InfoTooltip>Skriv sagsreferencen eller indsæt et direkte link til sagen i ESDH systemet.</InfoTooltip>
      <TextArea
        :max-length="300"
        @change="state.update({ esdhReference: $event })"
        :disabled="state.disabled.attachmentsEdit"
        :value="state.esdhReference"
        :hasError="isInErrors('esdhReference')"
        :minHeight="'50px'"
      />
    </div>

    <h2>Links</h2>
    <div>
      <TextArea
        :readonly-html="readonlyLinks"
        :value="state.disabled.attachmentsEdit ? '' : state.codeRepositoryUrl"
        @change="state.update({ codeRepositoryUrl: $event })"
        :disabled="state.disabled.attachmentsEdit"
        :max-length="10000"
      />
    </div>

    <h2>Bilag</h2>
    <div>
      <div v-if="!showPlaceholder">
        <AttachmentUpload :disabled="state.disabled.attachmentsEdit" />
      </div>
      <div v-else>Det er først muligt at tilføje et bilag, efter du har klikket på Gem første gang.</div>
    </div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter, State } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { Phase, PhaseKeys } from '@/models/phase';
import { RootState } from '@/store';
import { ProcessState, ProcessModule } from '@/store/modules/process';
import { AuthModule } from '@/store/modules/auth';
import { ErrorModule } from '@/store/modules/error';

@Component({
  components: {
    TextArea,
    FormSection,
    AttachmentUpload,
    InfoTooltip
  }
})
export default class AttachmentsForm extends Vue {
  @Prop({ type: Boolean, default: false })
  showPlaceholder!: boolean;

  PhaseKeys = PhaseKeys;

  get isWithinMunicipality() {
    return ProcessModule.cvr === AuthModule.user?.cvr;
  }

  get state() {
    return ProcessModule;
  }

  get readonlyLinks() {
    // This function parses links and makes them clickable when the user is not editing.
    // First, it uses a long regex that matches urls (from http://urlregex.com) to match all urls in the text. Then it wraps them with an 'a' html tag.
    const firstPass = !ProcessModule.disabled?.attachmentsEdit
      ? ''
      : ProcessModule.codeRepositoryUrl?.replace(
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g,
          '<a href="$1" target="_blank">$1</a>'
        );
    // After wrapping the links with an 'a' tag, all matched links that start with 'www' but lack a protocol get an http protocol prepended in the href attribute.
    // Finally, the result is returned.
    return firstPass?.replace(/href="www/g, 'href="http://www');
    // TODO: Fix mails without schema and maybe other edge cases
  }

  isInErrors(name: string) {
    return ErrorModule.errorInField(ErrorModule.attachments, name);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-primary;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;

  &:not(:first-of-type) {
    margin-top: 2rem;
  }
}
</style>
