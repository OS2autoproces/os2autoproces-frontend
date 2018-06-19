<template>
    <div class="details">
        <NavBar />

        <div class="page">
            <div class="details-menu">
                <DetailsMenu @save="save" />
            </div>

            <div class="details-wrapper">
                <DetailsHeader />

                <div class="form-sections">
                    <GeneralInformationForm />
                    <ChallengesForm />
                </div>

                <div class="usage">
                    <div class="usage-heading">Antal kommuner der bruger løsningen</div>
                    <IntervalSelector value="10 +" disabled />
                </div>

                <div class="comments">
                    <div class="comments-heading">Kommentarer</div>
                    <Comments />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import NavBar from '../components/common/NavBar.vue';
import Comments from '../components/comments/Comments.vue';
import IntervalSelector from '../components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import DetailsMenu from '@/components/details/DetailsMenu.vue';
import DetailsHeader from '@/components/details/DetailsHeader.vue';
import GeneralInformationForm from '@/components/details/general-information/GeneralInformationForm.vue';
import ChallengesForm from '@/components/details/challenges/ChallengesForm.vue';
import { detailsActionTypes } from '@/store/modules/details/actions';

@Component({
  components: {
    NavBar,
    FormSection,
    DetailsMenu,
    DetailsHeader,
    GeneralInformationForm,
    Comments,
    IntervalSelector,
    ChallengesForm
  }
})
export default class Details extends Vue {
  @Action(detailsActionTypes.SAVE) save: any;
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  display: flex;
}

.details-menu {
  flex: 0 0 200px;
  margin-left: $size-unit;

  > * {
    position: fixed;
    top: 80px + 2 * $size-unit;
  }
}

.details-wrapper {
  flex-grow: 1;
  margin: 0 auto;
  margin-top: $size-unit;
  max-width: 1200px;
}

.form-sections {
  border: 1px solid $color-secondary;
  border-radius: $size-unit;
  margin-top: 2 * $size-unit;

  > *:not(:last-of-type) {
    border-bottom: 1px solid $color-secondary;
  }
}

.usage,
.comments {
  margin: 5 * $size-unit 0;
}

.usage {
  text-align: center;
}

.usage-heading,
.comments-heading {
  font-style: italic;
  margin: $size-unit / 2 0;
}
</style>
