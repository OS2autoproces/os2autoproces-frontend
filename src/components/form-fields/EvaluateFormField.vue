<template>
    <div>
        <div>
            {{this.evaluationText}}
        </div>
        <v-radio-group v-model="evalValue" row :rules="this.evalRules">
            <v-radio
                v-for="option in evalOptions"
                :key="option.label"
                :label="option.label"
                :value="option.value"
                color="	orange darken-3"
            />
        </v-radio-group>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

interface EvalOptions {
    label: string;
    value: string;
}

@Component
export default class EvaluateFormField extends Vue {
    @Prop() evaluationText!: string;
    evalValue = '';
    evalOptions: EvalOptions[] = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
    ];

    evalRules = [
        (v: any) => !!v || 'Select One Eval Point'
    ];
}
</script>
