<template>
    <div class="details-header">
        <div class="row">
            <InputField class="name disabled" value="Rekruttering" disabled />
            <div class="edit-button" role="button">
                <EditIcon />
            </div>
            <div class="favorite-icon" role="button" @click="favorite = !favorite">
                <StarIcon :class="{ selected: favorite }" />
            </div>

            <div class="flex-grow"></div>
            <img src="https://www.syddjurs.dk/sites/all/themes/custom/site/dist/img/logo.png" alt="Kommune logo">
        </div>
        <div class="row">
            <Button class="button">Slet proces</Button>
            <Button class="button">Kopier proces</Button>
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
  favorite = true;
  notification = true;
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

.favorite-icon {
  height: 2 * $size-unit;
  width: 2 * $size-unit;
  margin-left: 50px;
}
</style>
