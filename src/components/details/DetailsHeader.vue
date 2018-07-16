<template>
  <div class="details-header">
    <div class="row">
      <InputField class="name" :value="state.title" :disabled="state.disabled.titleEdit" :class="{ disabled: state.disabled.titleEdit }" @change="update({ title: $event })" />
      <div class="edit-button" role="button" @click="toggleEdit" :class="{ editing: !state.disabled.titleEdit }">
        <EditIcon />
      </div>
      <div class="bookmark-button" role="button" @click="toggleBookmark">
        <StarIcon :class="{ selected: state.hasBookmarked }" />
      </div>

      <div class="flex-grow"></div>
      <img src="https://www.syddjurs.dk/sites/all/themes/custom/site/dist/img/logo.png" alt="Kommune logo">
    </div>
    <div class="row">
      <Button class="button" @click="deleteProces">Slet proces</Button>
      <Button class="button" @click="copy">Kopier proces</Button>
      <div class="flex-grow"></div>
      <Toggle :value="notification" @change="notification = $event">Mail notifikation</Toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import StarIcon from '@/components/icons/StarIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import Button from '@/components/common/inputs/Button.vue';
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
    Button
  }
})
export default class DetailsHeader extends Vue {
  @Action(processActionTypes.UPDATE) update!: any;
  @Action(processActionTypes.COPY_PROCESS) copyProcess!: () => Promise<string>;

  // TODO: Bind these to the store
  notification = true;

  get state() {
    return this.$store.state.process;
  }

  toggleEdit() {
    this.update({
      disabled: {
        titleEdit: !this.state.disabled.titleEdit
      }
    });
  }

  toggleBookmark() {
    this.update({ hasBookmarked: !this.state.hasBookmarked });
  }

  deleteProces() {
    // TODO: Show confirmation
  }

  async copy() {
    const id = await this.copyProcess();
    debugger
    this.$router.push(`/details/${id}`);    
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
  margin-right: $size-unit;
}

.name.disabled {
  @include heading;
  font-size: 2rem;
  color: $color-secondary;
}

.edit-button {
  height: $size-unit;
  width: $size-unit;
  margin-left: $size-unit / 2;

  &.editing /deep/ path {
    fill: $color-primary;
  }
}

.bookmark-button {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
  margin-left: 50px;
}
</style>
