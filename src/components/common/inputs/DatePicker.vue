<template>
    <div class="date-picker-wrap">
        <InputField :disabled="disabled" :value="value" placeholder="DD/MM/YYYY" @change="onInputChange($event)" />
        <v-menu v-if="!disabled" :close-on-content-click="false" transition="scale-transition">
            <v-date-picker :value="datePickerValue" no-title @input="onDatePickerChange($event)" />
            <i slot="activator" class="material-icons md-36 calender-icon">today</i>
        </v-menu>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import InputField from '@/components/common/inputs/InputField.vue';
import { DateTime } from 'luxon';

@Component({
  components: {
    InputField
  }
})
export default class DatePicker extends Vue {
  @Prop() disabled!: boolean;
  @Prop() value!: string;

  format = 'dd/MM/yyyy';

  get datePickerValue(): string {
    const date = this.parseDate(this.value);
    return date.isValid ? date.toISODate() : '';
  }

  onDatePickerChange(date: string): void {
    if (date) {
      this.valueChanged(DateTime.fromFormat(date, 'yyyy-MM-dd'));
    }
  }

  onInputChange(date: string): void {
    if (date && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      this.valueChanged(this.parseDate(date));
    }
  }

  valueChanged(date: DateTime): void {
    if (date.isValid) {
      this.$emit('change', date.toFormat(this.format));
    }
  }

  parseDate(date: string): DateTime {
    return date ? DateTime.fromFormat(date, this.format) : DateTime.invalid('');
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.date-picker-wrap {
  display: flex;
  align-items: center;
}

.calender-icon {
  color: $color-primary;
}

.menu {
  cursor: pointer;
  height: 24px;
  margin-left: $size-unit/2;
}
</style>

