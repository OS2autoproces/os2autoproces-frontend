<template>
    <v-container fluid grid-list-md>
        <v-layout wrap>
            <v-flex xs12>
                <v-form v-model="formIsValid">
                    <NameFormField />
                    <EmailFormField v-if="radioValue === 'email'"/>
                    
                    <v-btn
                    :disabled="!formIsValid"
                    @click="submit"
                    >
                     submit
                    </v-btn>
                    <p> {{formIsValid}} </p>
                </v-form>
            </v-flex>
                <!-- <v-radio-group :manditory="false" column v-model="radioValue">
                    <v-radio label="name" value="name"/>
                    <v-radio label="email" value="email"/>
                </v-radio-group> -->
        </v-layout>
    </v-container>
</template>

<script>
import {Vue, Component, Prop} from 'vue-property-decorator';
import EmailFormField from './EmailFormField.vue';
import NameFormField from './NameFormField.vue';


@Component({
    components: {
        EmailFormField,
        NameFormField,
    },
})
export default class Post extends Vue {
    radioValue = 'name';
    formIsValid = false;

    submit = () => {
        return;
    }
}
</script>
