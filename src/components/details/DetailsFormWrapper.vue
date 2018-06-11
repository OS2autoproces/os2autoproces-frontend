<template>
    <div class="form-border">
        <GeneralInformationForm />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import GeneralInformationForm from './general-information/GeneralInformationForm.vue';

@Component({
    components: {
        GeneralInformationForm
    }
})
export default class DetailsFormWrapper extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
    .form-border {
        border-width: 1px;
        border-style: solid;
        margin: 10px;
        border-color: $color-secondary;
        padding: 2%;
    }
</style>
