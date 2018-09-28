<template>
  <div class="details-header">
    <div class="row">
      <InputField class="name" :value="state.title" :disabled="state.disabled.titleEdit" :class="{ disabled: state.disabled.titleEdit }" @change="update({ title: $event })" />
      <em class="name-placeholder" v-if="state.disabled.titleEdit && !state.title">Angiv titel... *</em>
      <div v-if="state.canEdit" class="edit-button" role="button" @click="toggleEdit" :class="{ editing: !state.disabled.titleEdit }">
        <EditIcon />
      </div>
      <div v-if="!isReporting" class="bookmark-button" role="button" @click="setBookmark(!state.hasBookmarked)">
        <StarIcon :class="{ selected: state.hasBookmarked }" />
      </div>

      <div class="flex-grow"></div>
      <MunicipalityLogo :src="logo" />
    </div>
    <div v-if="!isReporting" class="row">
      <Button class="button" @click="remove" v-if="state.canEdit">Slet proces</Button>
      <Button class="button" @click="copy" v-if="!isUmbrella">Kopier proces</Button>
      <div class="flex-grow"></div>
      <InfoTooltip class="mail-tooltip">Ved at slå mail notifikationer til, vil du modtage en mail, når der sker ændringer på denne proces.</InfoTooltip>
      <Toggle :value="state.emailNotification" @change="setEmailNotification($event)">Mail notifikation</Toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import StarIcon from '@/components/icons/StarIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import Button from '@/components/common/inputs/Button.vue';
import MunicipalityLogo from '@/components/common/MunicipalityLogo.vue';
import Toggle from '@/components/common/inputs/Toggle.vue';
import { authGetterTypes } from '@/store/modules/auth/getters';
import { authActionTypes } from '@/store/modules/auth/actions';
import { processActionTypes } from '@/store/modules/process/actions';
import { ProcessState } from '@/store/modules/process/state';

@Component({
  components: {
    StarIcon,
    EditIcon,
    InputField,
    Toggle,
    InfoTooltip,
    Button,
    MunicipalityLogo
  }
})
export default class ProcessHeader extends Vue {
  @Action(processActionTypes.UPDATE) update!: any;
  @Action(processActionTypes.SET_EMAIL_NOTIFICATION)
  setEmailNotification!: (emailNotification: boolean) => Promise<void>;
  @Action(processActionTypes.SET_BOOKMARK) setBookmark!: (hasBookmark: boolean) => Promise<void>;
  @Action(processActionTypes.REMOVE_PROCESS) removeProcess!: () => Promise<void>;
  @Action(processActionTypes.COPY_PROCESS) copyProcess!: () => Promise<string>;

  @Prop(Boolean) isReporting!: boolean;
  @Prop(Boolean) isUmbrella!: boolean;

  get state() {
    return this.$store.state.process;
  }

  get logo() {
    return `/logos/${this.$store.state.process.cvr}.png`;
  }

  toggleEdit() {
    this.update({
      disabled: {
        titleEdit: !this.state.disabled.titleEdit
      }
    });
  }

  async copy() {
    const id = await this.copyProcess();
    this.$router.push(`/details/${id}`);
  }

  async remove() {
    if (confirm('Vil du slette denne proces permanent?')) {
      await this.removeProcess();
      this.$router.push(`/search`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.row {
  display: flex;
  align-items: center;
}

.button {
  margin-right: 1rem;
}

.name.disabled,
.name-placeholder {
  @include heading;
  font-size: 2rem;
}

.name.disabled {
  color: $color-secondary;
}

.edit-button {
  height: 1rem;
  width: 1rem;
  margin-left: 0.5rem;

  &.editing /deep/ path {
    fill: $color-primary;
  }
}

.bookmark-button {
  height: 2rem;
  width: 2rem;
  margin-left: 50px;
}

.mail-tooltip {
  margin: 0 1rem;
}
</style>
