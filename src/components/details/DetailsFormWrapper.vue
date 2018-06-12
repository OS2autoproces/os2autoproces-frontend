<template>
    <div class="form-border">
        <div class="validation-form" id="general-information">
            <div class="details-title">
                Grundlæggende Oplysninger
                <span @click="toggleEditMode()">
                    <EditIcon :class="{disabled}" class="edit-button"></EditIcon>
                </span>
            </div>
            <GeneralInformationForm :disabled="disabled" />
        </div>
        <div class="validation-form">
          <div class="details-title">
            Problemstillinger
            <EditIcon class="edit-button"></EditIcon>
          </div>
          <IssuePanelForm :disabled="disabled"/>
        </div>

        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="challenges">challenges</div>
        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="process">process</div>
        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="field">field</div>
        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="spec">spec</div>
        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="impl">impl</div>
        <div style="border: 1px solid black; height: 1500px; display: flex; align-items: center; justify-content: center; background: grey; font-size: 20rem" id="drift">drift</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import GeneralInformationForm from './general-information/GeneralInformationForm.vue';
import IssuePanelForm from './issue-panel/IssuePanelForm.vue';
import EditIcon from '@/components/icons/EditIcon.vue';

@Component({
  components: {
    GeneralInformationForm,
    EditIcon,
    IssuePanelForm
  }
})
export default class DetailsFormWrapper extends Vue {
  disabled = true;

  get issuePanel() {
    return this.$store.state.details.issuePanel;
  }

  toggleEditMode() {
    this.disabled = !this.disabled;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.form-border {
  margin: $size-unit; // temperary

  .validation-form {
    padding: $size-unit * 3;
    border-width: 1px;
    border-style: solid;
    border-color: $color-secondary;

    &:first-of-type {
      border-top-left-radius: $size-unit;
      border-top-right-radius: $size-unit;
    }

    &:last-of-type {
      border-bottom-left-radius: $size-unit;
      border-bottom-right-radius: $size-unit;
    }
  }
}

.details-title {
  color: $color-primary;
  font-size: 2rem;
  margin-bottom: $size-unit * 2;

  .edit-button {
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
    margin-left: $size-unit;
    /deep/ path {
      fill: $color-primary;
    }
    &.disabled {
      /deep/ path {
        fill: $color-secondary;
      }
    }
  }
}
</style>
