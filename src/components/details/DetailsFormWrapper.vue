<template>
    <div class="form-border">
        <div class="validation-form">
            <div class="details-title">
                Grundlæggende Oplysninger
                <span @click="toggleEditMode()">
                  <EditIcon class="edit-button"></EditIcon>
                </span>
            </div>
            <GeneralInformationForm :disabled="disabled" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import GeneralInformationForm from './general-information/GeneralInformationForm.vue';
import EditIcon from '@/components/icons/EditIcon.vue';

@Component({
  components: {
    GeneralInformationForm,
    EditIcon
  }
})
export default class DetailsFormWrapper extends Vue {

  disabled = true;

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
  }
}
</style>
