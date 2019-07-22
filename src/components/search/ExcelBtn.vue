<template>
  <appButton class="btn" @click="downloadExcel()">Hent resultat som Excel</appButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Button from '../common/inputs/Button.vue';
import { downloadSearchResultsExcel } from '../../services/excel-service';

@Component({
  components: {
    appButton: Button
  }
})
export default class ExcelBtn extends Vue {
  async downloadExcel() {
    const excel = await downloadSearchResultsExcel();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.btn {
  display: flex;
  background: $color-secondary;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 20px;
  margin-left: 1rem;
}
</style>
