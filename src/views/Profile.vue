<template>
  <div class="page">
    <NavBar />

    <div class="wrapper">
      <h1>Kontaktinformationer</h1>
      <div class="user">
        <WellItem id="name" labelWidth="50px" label="Navn:">
          <InputField class="name" :value="user.name" @change="user.name = $event" />
        </WellItem>
        <WellItem id="email" labelWidth="50px" label="Email:">
          <InputField class="email" :value="user.email" @change="user.email = $event" />
        </WellItem>
        <div style="display: flex;">
          <p style="margin-right: 1rem;">
            OS2autoproces ønsker at fremme den gode vidensdeling og derfor opfordrer vi dig til at oplyse navn og email
            så andre brugere kan kontakte dig.
          </p>
          <Button class="button" @click="edit()">Gem</Button>
        </div>
      </div>
    </div>

    <SnackBar
      :showButton="false"
      :value="showSaveError"
      :timeout="5000"
      color="error"
      @onSnackClose="showSaveError = false"
      >Dine kontaktinformationer kunne ikke gemmes, da en ukendt fejl opstod. Prøv igen.</SnackBar
    >

    <SnackBar
      :showButton="false"
      :value="showSaveSuccess"
      :timeout="3000"
      color="success"
      @onSnackClose="showSaveSuccess = false"
      >Dine kontaktinformationer er gemt! Du bliver sendt videre til forsiden om lidt.</SnackBar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NavBar from '../components/common/NavBar.vue';
import InputField from '../components/common/inputs/InputField.vue';
import WellItem from '../components/common/WellItem.vue';
import Button from '../components/common/inputs/Button.vue';
import { AuthModule, User } from '@/store/modules/auth';
import SnackBar from '@/components/common/SnackBar.vue';

@Component({
  components: {
    NavBar,
    InputField,
    WellItem,
    Button,
    SnackBar
  }
})
export default class ManageTechnologies extends Vue {
  showSaveSuccess = false;
  showSaveError = false;

  get user() {
    return AuthModule.user;
  }

  mounted() {
    this.load();
  }

  async load() {
    AuthModule.loadUser();
  }

  async edit() {
    try {
      const success = await AuthModule.editUser();
      this.showSaveSuccess = success;
      setTimeout(() => {
        this.$router.push('/dashboard');
      }, 3 * 1000);
    } catch (e) {
      this.showSaveError = true;
    }
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

.user {
  padding: 1rem;
  align-items: center;

  #name,
  #email {
    padding-bottom: 1rem;
  }

  .row {
    display: flex;
  }

  .icon {
    height: 1rem;
    width: 1rem;
  }

  .button {
    float: right;
    height: 45px;
  }
}
</style>
