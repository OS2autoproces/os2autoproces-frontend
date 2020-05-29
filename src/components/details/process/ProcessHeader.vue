<template>
  <div class="details-header" v-if="!isReporting">
    <Button class="button" @click="remove" v-if="state.canEdit">Slet proces</Button>
    <Button class="button" @click="copy" v-if="!isUmbrella">Kopier proces</Button>
    <div class="flex-grow"></div>
    <InfoTooltip class="mail-tooltip"
      >Ved at slå mail notifikationer til, vil du modtage en mail, når der sker ændringer på denne proces.</InfoTooltip
    >
    <Toggle :value="state.emailNotification" @change="setEmailNotification($event)">Mail notifikation</Toggle>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import Button from '@/components/common/inputs/Button.vue';
import Toggle from '@/components/common/inputs/Toggle.vue';
import { ProcessState, ProcessModule } from '@/store/modules/process';

@Component({
  components: {
    Toggle,
    InfoTooltip,
    Button
  }
})
export default class ProcessHeader extends Vue {
  @Prop(Boolean)
  isReporting!: boolean;
  @Prop(Boolean)
  isUmbrella!: boolean;

  get state() {
    return this.$store.state.process;
  }

  async copy() {
    const id = await ProcessModule.copyProcess();
    this.$router.push(`/details/${id}`);
  }

  async remove() {
    if (confirm('Vil du slette denne proces permanent?')) {
      await ProcessModule.removeProcess();
      this.$router.push(`/search`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.details-header {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.button {
  margin-right: 1rem;
}

.mail-tooltip {
  margin: 0 1rem;
}
</style>
