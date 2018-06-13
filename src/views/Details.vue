<template>
    <div class="details">
        <NavBar />

        <div class="page">
            <div class="details-menu">
                <DetailsMenu :items="menuItems" />
            </div>

            <div class="details-wrapper">
                <div class="form-sections">
                    <FormSection :heading="menuItems[0].heading" :id="menuItems[0].id" :disabled="!editGeneralInformation" always-open @edit="editGeneralInformation = !editGeneralInformation">
                        <GeneralInformationForm :disabled="!editGeneralInformation" />
                    </FormSection>

                    <FormSection :heading="menuItems[1].heading" :id="menuItems[1].id">
                      <ChallengesForm />
                    </FormSection>

                    <FormSection :heading="menuItems[2].heading" :id="menuItems[2].id">

                    </FormSection>

                    <FormSection :heading="menuItems[3].heading" :id="menuItems[3].id">

                    </FormSection>

                    <FormSection :heading="menuItems[4].heading" :id="menuItems[4].id">

                    </FormSection>

                    <FormSection :heading="menuItems[5].heading" :id="menuItems[5].id">

                    </FormSection>

                    <FormSection :heading="menuItems[6].heading" :id="menuItems[6].id">
                    </FormSection>
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
import NavBar from '../components/common/NavBar.vue';
import Comments from '../components/comments/Comments.vue';
import IntervalSelector from '../components/common/inputs/IntervalSelector.vue';
import FormSection from '@/components/details/FormSection.vue';
import DetailsMenu from '@/components/details/DetailsMenu.vue';

@Component({
  components: {
    NavBar,
    FormSection,
    DetailsMenu,
    Comments,
    IntervalSelector,
  }
})
export default class Details extends Vue {
  editGeneralInformation = false;

  menuItems = [
    { heading: 'Grundlæggende oplysninger', id: 'general-information' },
    { heading: 'Problemstillinger', id: 'challenges' },
    { heading: 'Tids og proces foretagen', id: 'process' },
    { heading: 'Faglig vurdering', id: 'field' },
    { heading: 'Specifikation', id: 'spec' },
    { heading: 'Udvikling og implementering', id: 'impl' },
    { heading: 'Drift', id: 'drift' }
  ];
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
