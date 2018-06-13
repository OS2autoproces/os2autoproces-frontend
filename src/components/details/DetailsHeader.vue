<template>
    <div class="details-header">
        <div class="row">
            <InputField class="name" :value="name" :disabled="!editName" :class="{ disabled: !editName }" />
            <div class="edit-button" role="button" @click="editName = !editName" :class="{ editing: editName }">
                <EditIcon />
            </div>
            <div class="favorite-button" role="button" @click="favorite = !favorite">
                <StarIcon :class="{ selected: favorite }" />
            </div>

            <div class="flex-grow"></div>
            <img src="https://www.syddjurs.dk/sites/all/themes/custom/site/dist/img/logo.png" alt="Kommune logo">
        </div>
        <div class="row">
            <Button class="button" @click="deleteProces">Slet proces</Button>
            <Button class="button" @click="copyProces">Kopier proces</Button>
            <div class="flex-grow"></div>
            <Toggle :value="notification" @change="notification = $event">Mail notifikation</Toggle>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import StarIcon from '@/components/icons/StarIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import InputField from '@/components/common/inputs/InputField.vue';
import Button from '@/components/common/inputs/Button.vue';
import Toggle from '@/components/common/inputs/Toggle.vue';

@Component({
  components: {
    StarIcon,
    EditIcon,
    InputField,
    Toggle,
    Button
  }
})
export default class DetailsMenu extends Vue {
  // TODO: Bind these to the store
  favorite = true;
  notification = true;
  editName = false;
  name = 'Rekruttering';

  deleteProces() {
    // TODO: Show confirmation
  }

  copyProces() {
    // TODO: copy proces
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

.favorite-button {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
  margin-left: 50px;
}
</style>
