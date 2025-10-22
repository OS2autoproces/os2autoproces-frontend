<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <h1>Systemer</h1>
      <p>Her kan du se en samlet liste over de systemer, der er registreret på tværs af organisationer. Oversigten fungerer som et katalog, hvor du kan slå systemer op og få indblik i de løsninger, der findes.</p>
      <div class="nameAndVendor">
        <h3 class="name">Navn</h3>
        <h3>Leverandør</h3>
      </div>
      <div class="system" v-for="itsystem in itsystems" :key="itsystem.id">
        <div class="nameInput">
          <InputField
            placeholder="Navn"
            :value="itsystem.name"
            @change="itsystem.name = $event"
            :disabled="itsystem.id !== editing"
          />
        </div>
        <div class="vendorInput">
          <InputField
            placeholder="Leverandør"
            :value="itsystem.vendor"
            @change="itsystem.vendor = $event"
            :disabled="itsystem.id !== editing"
          />
        </div>
        <div
          class="editIcon"
          @click="editing = itsystem.id"
          role="button"
          v-if="itsystem.id !== editing && !itsystem.fromKitos"
        >
          <EditIcon />
        </div>
        <div
          class="deleteIcon"
          @click="remove(itsystem.id)"
          role="button"
          v-if="itsystem.id !== editing && !itsystem.fromKitos"
        >
          <DeleteIcon />
        </div>
        <span class="kitosTag" v-if="itsystem.fromKitos">Kitos</span>
        <Button class="button" @click="edit(itsystem)" v-if="itsystem.id === editing">Gem</Button>
      </div>

      <div class="inputFields">
        <InputField class="inputField" placeholder="Navn" :value="newITSystemName" @change="newITSystemName = $event" />
        <InputField
          class="inputField"
          placeholder="Leverandør"
          :value="newITSystemVendor"
          @change="newITSystemVendor = $event"
        />
        <Button class="button" @click="add">Opret ny</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NavBar from '../components/common/NavBar.vue';
import InputField from '../components/common/inputs/InputField.vue';
import Button from '../components/common/inputs/Button.vue';
import { ITSystem } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import EditIcon from '../components/icons/EditIcon.vue';
import DeleteIcon from '../components/icons/DeleteIcon.vue';

@Component({
  components: {
    NavBar,
    InputField,
    Button,
    EditIcon,
    DeleteIcon
  }
})
export default class ManageSystems extends Vue {
  newITSystemName = '';
  newITSystemVendor = '';

  editing: number | null = null;

  get itsystems() {
    return CommonModule.itSystems;
  }

  mounted() {
    this.load();
  }

  async load() {
    CommonModule.loadITSystems();
  }

  edit(itsystem: ITSystem) {
    if (!itsystem.name) {
      return;
    }

    CommonModule.editITSystems(itsystem);
    this.editing = null;
  }

  remove(id: number) {
    if (confirm('Er du sikker?')) {
      CommonModule.removeITSystem(id);
    }
  }

  async add() {
    if (!this.newITSystemName) {
      return;
    }

    const name = this.newITSystemName;
    const vendor = this.newITSystemVendor;

    this.newITSystemName = '';
    this.newITSystemVendor = '';

    await CommonModule.addITSystem({ name, vendor });
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.wrapper {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: $color-primary;
  margin-top: 2rem;
}

.hideButtonIfKitos {
  visibility: hidden;
}

.inputField {
  width: 14em;
}

.name {
  margin-left: 0.5em;
  margin-right: 10.7em;
}

.nameAndVendor {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid $color-primary;
}

.nameInput {
  display: grid;
  grid-column: span 1 / span 1;
  justify-self: start;
  grid-column-start: 1;
  grid-column-end: 8;
}

.vendorInput {
  display: grid;
  grid-column: span 1 / span 1;
  justify-self: start;
  grid-column-start: 8;
  grid-column-end: 15;
}

.inputFields {
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
}

.system {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  padding: 1rem;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid $color-primary;
  }

  .editIcon {
    height: 1rem;
    width: 1rem;

    grid-column: span 1 / span 1;
    justify-self: end;
    grid-column-start: 15;
    grid-column-end: 15;
  }

  .button {
    width: 7rem;
  }
  .deleteIcon {
    height: 1rem;
    width: 1rem;
    grid-column: span 1 / span 1;
    justify-self: end;
    grid-column-start: 16;
    grid-column-end: 16;
  }

  .kitosTag {
    height: 1rem;
    width: 1rem;
    grid-column-start: 15;
    grid-column-end: 16;
    margin-left: 80%;
  }
}
</style>
