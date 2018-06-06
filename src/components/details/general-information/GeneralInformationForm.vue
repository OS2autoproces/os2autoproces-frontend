<template>
    <div class="container">
        <div class="section-col kle">
            <div class="labels">
                <div>KLE-nr:</div>
                <div>Lov og paragraf:</div>
            </div>
            <div class="fields">
                <KleNumberField />
                <ParagrafField />
            </div>
        </div>
        <div class="section-col">
            <FieldSelection />
            <DepartmentField />
            <VisibilitySelection />
        </div>
        <div class="section-col">
            <ContactPersonField />
            <EmailField />
            <ProcesTimeField />
        </div>
        <div class="section-col">
            <SupplierField />
            <ProjectManagerField />
        </div>
        <!-- <ResumeTextArea /> -->
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

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: row;
        background-color: gainsboro;
    }
    .section-col {
        flex: 0 0 25%;
        display: flex;

        .labels {
            width: 50%;

            > div {
                line-height: 32px;
            }
        }

        .labels > div,
        .fields > * {
            margin-bottom: 1rem;
        }
    }
</style>
