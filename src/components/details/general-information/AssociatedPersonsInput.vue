<template>
  <div class="associated">
    <div class="associated-list">
      <div class="associated-label">
        Tilknyttede personer
        <InfoTooltip>Her kan du tilføje personer der arbejder med automatisering af processen og derfor skal kunne redigere i beskrivelserne. Det kan f.eks. være projektmedarbejdere og udviklere.</InfoTooltip>
      </div>
      <div class="associated-persons-list" :class="{ disabled, empty: !state.process.users.length }">
        <div v-for="(user, index) in state.process.users" :key="index">
          <div class="name">{{user.name}}</div>
          <div v-if="!disabled" @click="removeUser(user)" class="delete-icon">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
    <div class="add-person" v-if="!disabled">
      <div class="associated-label">Tilknyt person</div>
      <SelectionField ref="userSelectionField" class="search-field" placeholder="Skriv navn for at søge" @search="search($event)" @change="addUser($event)" itemText="name" :items="users" iconName="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { processActionTypes } from '@/store/modules/process/actions';
import { commonActionTypes, UserSearchRequest } from '@/store/modules/common/actions';
import { User } from '@/store/modules/auth/state';

@Component({
  components: {
    SelectionField,
    InfoTooltip,
    DeleteIcon
  }
})
export default class AssociatedPersonsInput extends Vue {
  @Prop(Boolean) disabled!: boolean;

  @Action(commonActionTypes.SEARCH_USERS) searchUsers!: (request: UserSearchRequest) => Promise<void>;

  get state() {
    return this.$store.state;
  }

  get users() {
    return this.$store.state.common.users;
  }

  search(name: string) {
    this.searchUsers({ name, cvr: this.$store.state.auth.user.cvr });
  }

  addUser(user: User) {
    if (!user || this.state.process.users.find((u: User) => user.id === u.id)) {
      return;
    }

    setTimeout(() => (this.$refs.userSelectionField as SelectionField<User>).clear());
    this.$store.dispatch(processActionTypes.ADD_USER, user);
  }

  removeUser(user: User) {
    this.$store.dispatch(processActionTypes.REMOVE_USER, user);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.associated {
  display: flex;
  padding-top: 1rem;

  .associated-list {
    width: 60%;

    .associated-persons-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      border: 1px solid $color-primary;
      border-radius: 1rem;
      padding: 0.5rem;

      &.empty,
      &.disabled {
        border: none;
      }

      > div {
        display: flex;
        align-items: center;
        margin-right: 1rem;

        .name {
          @include field-input-text;
          flex-grow: 1;
        }

        .delete-icon {
          width: 1rem;
          height: 1rem;
          margin-left: 0.5rem;
        }
      }
    }
  }

  .add-person {
    margin-left: 1rem;

    .input-group {
      padding: 0;
    }
  }

  .search-field {
    width: 250px;
  }

  /deep/ .v-autocomplete {
    .v-icon {
      transform: none !important;
    }
  }
}

.associated-label {
  @include field-label;
  padding-bottom: 0.25rem;
}
</style>
