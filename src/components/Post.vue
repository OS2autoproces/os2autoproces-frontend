<template>
    <v-container grid-list-x1>
        <v-layout wrap column>
            <v-flex xs10 sm6>
                <v-form ref="formRef" v-model="formIsValid">
                    <ExpansionPanel>
                        <ExpansionContent panelName="Name Form">
                            <NameFormField></NameFormField>
                        </ExpansionContent>
                    </ExpansionPanel>   
                    <br>
                    <ExpansionPanel v-if="radioValue === 'email'">
                        <ExpansionContent panelName="Email Form">
                            <EmailFormField />
                            <EvaluateFormField evaluationText="1 + 2 = "/>                            
                            <RadioGroup>
                                <RadioButton radioButtonLabel='Slet Ikke' groupName="How you like it?" />
                                <RadioButton radioButtonLabel='I mindre grad' groupName="How you like it?"/>
                                <RadioButton radioButtonLabel='I nogen Grad' groupName="How you like it?"/>
                            </RadioGroup>

                        </ExpansionContent>
                    </ExpansionPanel>                    
                    <v-btn
                    :disabled="!formIsValid"
                    @click="submit"
                    >
                     submit
                    </v-btn>
                    <p> {{formIsValid}} </p>
                    <p> {{ forValue }}</p>
                    <TextFieldComponent />
                </v-form>
            </v-flex>           

        </v-layout>
                <v-radio-group :manditory="false" column v-model="radioValue">
                    <v-radio label="name" value="name"/>
                    <v-radio label="email" value="email"/>
                </v-radio-group>
    </v-container>
    
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

<style lang="scss" scoped>

</style>
