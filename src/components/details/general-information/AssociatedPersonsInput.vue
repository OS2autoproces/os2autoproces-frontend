<template>
  <div class="associated">
    <div class="associated-list">
      <div class="associated-label">
        Tilknyttede personer
        <InfoTooltip
          >Her kan du tilføje personer der arbejder med automatisering af processen og derfor skal kunne redigere i
          beskrivelserne. Det kan f.eks. være projektmedarbejdere og udviklere.</InfoTooltip
        >
      </div>
      <div class="associated-persons-list" :class="{ disabled, empty: !state.users.length }">
        <div v-for="(user, index) in state.users" :key="index">
          <div class="name">{{ user.name }}</div>
          <div v-if="!disabled" @click="removeUser(user)" class="delete-icon">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
    <div class="add-person" v-if="!disabled">
      <div class="associated-label">Tilknyt person</div>
      <SelectionField
        itemSubText="email"
        ref="userSelectionField"
        class="search-field"
        :hasError="hasError"
        placeholder="Skriv navn for at søge"
        @search="search($event)"
        @change="addUser($event)"
        itemText="name"
        :items="users"
        iconName="search"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import SelectionField from '@/components/common/inputs/SelectionField.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import { UserSearchRequest } from '@/store/modules/commonInterfaces';
import { CommonModule } from '@/store/modules/common';
import { User, AuthModule } from '@/store/modules/auth';
import { ProcessModule } from '@/store/modules/process';

@Component({
  components: {
    SelectionField,
    InfoTooltip,
    DeleteIcon
  }
})
export default class AssociatedPersonsInput extends Vue {
  @Prop(Boolean)
  disabled!: boolean;
  @Prop(Boolean)
  hasError!: boolean;

  get state() {
    return ProcessModule;
  }

  get users() {
    return CommonModule.users;
  }

  search(name: string) {
    const request: UserSearchRequest = { name: `${name}`, cvr: '' };
    if (AuthModule.user) {
      request.cvr = AuthModule.user.cvr;
      CommonModule.searchUsers(request);
    } else {
      CommonModule.searchUsers(request);
    }
  }

  addUser(user: User) {
    if (!user || ProcessModule.users?.find((u: User) => user.id === u.id)) {
      return;
    }

    setTimeout(() => (this.$refs.userSelectionField as SelectionField<User>).clear());
    ProcessModule.addUser(user);
  }

  removeUser(user: User) {
    ProcessModule.removeUser(user);
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
      background: $color-background;
      padding: 0.5rem;

      &.empty,
      &.disabled {
        border: none;
        background: none;
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

  ::v-deep .v-autocomplete {
    .v-icon {
      transform: none !important;
    }
  }
}

.associated-label {
  @include field-label;
  display: inline-flex;
  align-items: center;
  padding-bottom: 0.25rem;
}
</style>
