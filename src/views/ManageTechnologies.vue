<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <h1>Teknologier</h1>
      <div class="technology" v-for="technology in technologies" :key="technology.id">
        <InputField class="name" :value="technology.name" @change="technology.name = $event" :disabled="technology.id !== editing" />
        <div class="icon" @click="editing = technology.id" role="button" v-if="technology.id !== editing">
          <EditIcon />
        </div>
        <div class="icon" @click="remove(technology.id)" role="button" v-if="technology.id !== editing">
          <DeleteIcon />
        </div>
        <Button class="button" @click="edit(technology)" v-if="technology.id === editing">Gem</Button>
      </div>

      <div class="technology">
        <InputField class="name" :value="newTechnology" @change="newTechnology = $event" />
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
import { commonActionTypes } from '@/store/modules/common/actions';
import { Technology } from '@/store/modules/process/state';
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
export default class ManageTechnologies extends Vue {
  technologies: Technology[] = [];
  newTechnology = '';
  editing: number | null = null;

  mounted() {
    this.load();
  }

  async load() {
    this.technologies = await this.$store.dispatch(commonActionTypes.LOAD_TECHNOLOGIES);
  }

  edit(technology: Technology) {
    if (!technology.name) {
      return;
    }

    this.$store.dispatch(commonActionTypes.EDIT_TECHNOLOGY, technology);
    this.editing = null;
  }

  remove(id: number) {
    if (confirm('Er du sikker?')) {
      this.$store.dispatch(commonActionTypes.REMOVE_TECHNOLOGY, id);
      this.technologies = this.technologies.filter(t => t.id !== id);
    }
  }

  async add() {
    if (!this.newTechnology) {
      return;
    }

    const technology: Technology = {
      name: this.newTechnology,
      id: (await this.$store.dispatch(commonActionTypes.ADD_TECHNOLOGY, this.newTechnology)).id
    };

    this.newTechnology = '';
    this.technologies.push(technology);
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
  color: $color-secondary;
  margin-top: 2rem;
}

.technology {
  display: flex;
  padding: 1rem;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid $color-secondary;
  }

  .name {
    flex-grow: 1;
  }

  .icon {
    height: 1rem;
    width: 1rem;
  }

  .button,
  .icon {
    margin-left: 1rem;
  }
}
</style>
