<template>
    <div class="result">
        <div class="result-column">
            <div class="name">{{result.name}}</div>
            <div class="resume">{{result.resume}}</div>
        </div>
        <div class="result-column">
            <div>
                <div>Vurderet potentiale:</div>
                <div>Kommune:</div>
                <div>Unik ID:</div>
            </div>
            <div>
                <div>{{result.assessedPotential}}</div>
                <div>{{result.municipality}}</div>
                <div>{{result.id}}</div>
            </div>
        </div>
        <div class="result-column">
            <div>
                <div>Fagområde:</div>
                <div>KLE-nr:</div>
                <div>Lov og paragraf:</div>
            </div>
            <div>
                <div>{{result.field}}</div>
                <div>{{result.kleNumber}}</div>
                <div>{{result.law}}</div>
            </div>
        </div>
        <div class="result-column"></div>
        <star-icon class="selected" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import StarIcon from "../icons/StarIcon.vue";

@Component({
  components: {
    StarIcon
  }
})
export default class NavBar extends Vue {
  @Prop() result: any;
}
</script>

<style lang="stylus" scoped>
@import '../../styles/helpers.styl';

.result {
    border: 2px solid $colors.secondary;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    max-width: 1400px;
    position: relative;
}

.star-icon {
    position: absolute;
    top: -14px;
    right: -14px;
    height: 40px;
    width: 40px;
}

.result-column {
    flex: 0 0 25%;

    &:nth-child(2), &:nth-child(3) {
        display: flex;

        > div:last-of-type {
            padding-left: 1rem;
            font-weight: bold;
        }

        > div > div:not(:last-of-type) {
            padding-bottom: 1rem;
        }
    }
}
</style>
