<template>
    <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        required
        >
    </v-text-field>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class NameFormField extends Vue {
    name = '';
    nameRules = [
        (v: string) => !!v || 'Name is required',
        (v: string) => v.length >= 4 && v.length <= 30 || 'Name must be between 4-30 characters',
    ];
}
</script>
