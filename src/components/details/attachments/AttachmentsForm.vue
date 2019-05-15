<template>
  <FormSection
    :invalid="!isAttachmentsValid"
    v-if="minPhase(PhaseKeys.PREANALYSIS)"
    heading="Bilag og links"
    id="attachments"
    :disabled="state.disabled.attachmentsEdit"
    @edit="update({disabled: { attachmentsEdit: $event}})"
  >
    <div v-if="isWithinMunicipality && minPhase(PhaseKeys.SPECIFICATION)">
      <h2>Sagsreference i ESDH</h2>
      <InfoTooltip>Skriv sagsreferencen eller indsæt et direkte link til sagen i ESDH systemet.</InfoTooltip>
      <TextArea
        :max-length="300"
        @change="update({esdhReference: $event})"
        :disabled="state.disabled.attachmentsEdit"
        :value="state.esdhReference"
      />
    </div>

    <h2>Bilag</h2>
    <div v-if="!showPlaceholder">
      <AttachmentUpload :disabled="state.disabled.attachmentsEdit"/>
    </div>
    <div v-else>Det er først muligt at tilføje et bilag, efter du har klikket på Gem første gang.</div>
  </FormSection>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TextArea from '@/components/common/inputs/TextArea.vue';
import { Action, Getter } from 'vuex-class';
import FormSection from '@/components/details/FormSection.vue';
import AttachmentUpload from '@/components/common/inputs/AttachmentUpload.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { processGetterTypes } from '@/store/modules/process/getters';
import { Phase, PhaseKeys } from '@/models/phase';

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

  @Action(processActionTypes.UPDATE) update: any;

  @Getter(processGetterTypes.IS_ATTACHMENTS_VALID) isAttachmentsValid!: any;
  @Getter(processGetterTypes.MIN_PHASE) minPhase!: (phase: Phase) => boolean;

  PhaseKeys = PhaseKeys;

  get isWithinMunicipality() {
    const state = this.$store.state;
    return state.auth.user.cvr === state.process.cvr;
  }

  get state() {
    return this.$store.state.process;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  @include heading;
  color: $color-secondary;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;

  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  &.with-margin {
    margin-top: 2rem;
  }
}
</style>
