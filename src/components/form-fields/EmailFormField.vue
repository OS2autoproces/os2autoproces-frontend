<template>
    <v-text-field
        label="E-mail"
        required
        :rules="emailRules"
        v-model="email"
    ></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EmailFormField extends Vue {
    fieldName = 'Email';
    email = '';
    emailRules = [
      (email: string) => !!email || 'Email is required',
      (email: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
       'E-mail must be valid'
    ];
}
</script>
