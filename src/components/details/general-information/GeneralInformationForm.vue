<template>
    <div class="container">
        <KleNumberField />
        <FieldSelection />
        <ContactPersonField />
        <ProjectManagerField />
        <DepartmentField />
        <EmailField />
        <SupplierField />
        <ParagrafField />
        <VisibilitySelection />
        <ProcesTimeField />
        <ResumeTextArea />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import KleNumberField from '@/components/details/general-information/inputs/KleNumberField.vue';
import ParagrafField from '@/components/details/general-information/inputs/ParagrafField.vue';
import FieldSelection from '@/components/details/general-information/inputs/FieldSelection.vue';
import DepartmentField from '@/components/details/general-information/inputs/DepartmentField.vue';
import VisibilitySelection from '@/components/details/general-information/inputs/VisibilitySelection.vue';
import ContactPersonField from '@/components/details/general-information/inputs/ContactPersonField.vue';
import EmailField from '@/components/details/general-information/inputs/EmailField.vue';
import ProcesTimeField from '@/components/details/general-information/inputs/ProcesTimeField.vue';
import ProjectManagerField from '@/components/details/general-information/inputs/ProjectManagerField.vue';
import SupplierField from '@/components/details/general-information/inputs/SupplierField.vue';
import ResumeTextArea from '@/components/details/general-information/inputs/ResumeTextArea.vue';

@Component({
    components: {
        KleNumberField,
        ParagrafField,
        FieldSelection,
        DepartmentField,
        VisibilitySelection,
        ContactPersonField,
        EmailField,
        ProcesTimeField,
        ProjectManagerField,
        SupplierField,
        ResumeTextArea
    }
})
export default class GeneralInformationForm extends Vue {

}
</script>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: row;
        background-color: gainsboro;
        flex-wrap: wrap;
    }
</style>
