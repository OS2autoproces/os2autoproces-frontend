<template>

</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator';
import EmailFormField from './form-fields/EmailFormField.vue';
import NameFormField from './form-fields/NameFormField.vue';
import ExpansionPanel from './expansion/ExpansionPanel.vue';
import ExpansionContent from './expansion/ExpansionContent.vue';
import EvaluateFormField from './form-fields/EvaluateFormField.vue';
import TextFieldComponent from './form-fields/TextField.vue';
import RadioButton from './form-fields/RadioButton.vue';
import RadioGroup from './form-fields/RadioGroup.vue';

@Component({
    components: {
        EmailFormField,
        NameFormField,
        ExpansionPanel,
        ExpansionContent,
        EvaluateFormField,
        TextFieldComponent,
        RadioButton,
        RadioGroup
    },
})
export default class Post extends Vue {
    radioValue = 'name';
    formIsValid = false;
    forValue = '';

    submit() {
        return;
    }
}
</script>

<style lang="stylus" scoped>

</style>
