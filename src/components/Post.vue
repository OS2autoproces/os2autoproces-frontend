<template lang="pug">
v-container(grid-list-x1='')
  v-layout(wrap='', column='')
    v-flex(xs10='', sm6='')
      v-form(ref='formRef', v-model='formIsValid')
        expansionpanel
          expansioncontent(panelname='Name Form')
            nameformfield
        br
        expansionpanel(v-if="radioValue === 'email'")
          expansioncontent(panelname='Email Form')
            emailformfield
              evaluateformfield(evaluationtext='1 + 2 = ')
                radiogroup
                  radiobutton(radiobuttonlabel='Slet Ikke', groupname='How you like it?')
                    radiobutton(radiobuttonlabel='I mindre grad', groupname='How you like it?')
                      radiobutton(radiobuttonlabel='I nogen Grad', groupname='How you like it?')
        v-btn(:disabled='!formIsValid', @click='submit')
          | submit
        p  {{formIsValid}} 
        p  {{ forValue }}
        textfieldcomponent
  v-radio-group(:manditory='false', column='', v-model='radioValue')
    v-radio(label='name', value='name')
      v-radio(label='email', value='email')
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
