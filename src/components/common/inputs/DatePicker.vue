<template>
    <div class="date-picker-wrap">
        <input :value="formattedDate" placeholder="DD/MM/YYYY" @change="parseDate($event.target.value)" />
        <v-menu :close-on-content-click="true" transition="scale-transition">
            <v-date-picker :v-model="datePickerValue" no-title @input="formatDate($event)" />
            <i slot="activator" class="material-icons md-36 calender-icon">today</i>
        </v-menu>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { DateTime } from 'luxon';

@Component({})
export default class DatePicker extends Vue {
  formattedDate: string = '';
  datePickerValue: string = '';

  formatDate(newDate: string) {
    if (!newDate) {
      return;
    }
    const [year, month, day] = newDate.split('-');

    this.formattedDate = `${day}/${month}/${year}`;
    this.valueChanged(this.formattedDate);
  }

  valueChanged(date: string) {
    this.$emit('change', date);
  }

  parseDate(formatted: string) {
    if (!formatted) {
      return;
    }

    const match = formatted.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
      return;
    }

    const [valid, day, month, year] = match;
    const dt = { year: Number(year), month: Number(month), day: Number(day) };
    const isValidDate = DateTime.fromObject(dt);

    if (!isValidDate.isValid) {
      return;
    }
    this.datePickerValue = isValidDate.toISODate();
    this.valueChanged(formatted);
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

input {
  border: 1px solid $color-primary;
  border-radius: 30px;
  padding-left: 10px !important;
  height: 32px;
  width: 100%;
}
</style>

