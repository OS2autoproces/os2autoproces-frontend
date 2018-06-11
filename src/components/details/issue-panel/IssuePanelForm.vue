<template>
    <div class="issue-panel-form">
        <div :class="{'double-column': this.$store.state.details.issuePanel.description > 1600 }" class="issue-description">
            {{this.$store.state.details.issuePanel.description}}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from '@/store/modules/details/issue-panel/actions';

@Component({})
export default class GeneralInformationForm extends Vue {

}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.issue-panel-form {
    display: flex;

    .issue-description {
        width: 40%;
    }
    .double-column {
        column-count: 2;
        column-gap: 5rem;
    }
}
</style>
