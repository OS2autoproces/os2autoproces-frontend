<template>
  <div class="date-picker-wrap">
    <InputField
      class="date-picker"
      :disabled="disabled"
      :value="inputValue"
      placeholder="DD/MM/YYYY"
      @change="onInputChange($event)"
    />
    <v-menu eager v-if="!disabled" :close-on-content-click="false" transition="scale-transition">
      <v-date-picker :value="value" no-title @input="onDatePickerChange($event)" />
      <template v-slot:activator="{ on }">
        <em v-on="on" class="material-icons md-36 calender-icon">today</em>
      </template>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InputField from '@/components/common/inputs/InputField.vue';
import { DateTime } from 'luxon';

@Component({
  components: {
    InputField
  }
})
export default class DatePicker extends Vue {
  @Prop(Boolean) disabled!: boolean;
  @Prop(String) value!: string;

  format = 'dd/MM/yyyy';

  get inputValue() {
    const date = DateTime.fromISO(this.value);
    return date.isValid ? date.toFormat(this.format) : '';
  }

  onInputChange(date: string): void {
    if (!date) {
      this.$emit('change', '');
    } else if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      this.valueChanged(DateTime.fromFormat(date, this.format));
    }
  }

  onDatePickerChange(date: string): void {
    if (date) {
      this.valueChanged(DateTime.fromISO(date));
    }
  }

  valueChanged(date: DateTime): void {
    if (date.isValid) {
      this.$emit('change', date.toISO());
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.date-picker-wrap {
  display: flex;
  align-items: center;
}

.date-picker {
  flex-grow: 1;
}

.calender-icon {
  color: $color-primary;
}

.menu {
  cursor: pointer;
  height: 24px;
  margin-left: 0.5rem;
}
</style>
