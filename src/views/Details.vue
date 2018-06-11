<template>
    <DetailsFormWrapper />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import DetailsFormWrapper from '@/components/details/DetailsFormWrapper.vue';

@Component({
    components: {
        DetailsFormWrapper
    }
})
export default class Details extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
