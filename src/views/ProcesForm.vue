<template>
    <FormWrapper />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import FormWrapper from '@/components/details/FormWrapper.vue';

@Component({
    components: {
        FormWrapper
    }
})
export default class ProcesForm extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
