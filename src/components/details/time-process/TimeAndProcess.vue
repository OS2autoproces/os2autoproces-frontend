<template>
    <div>
      sdfsdfsdf
      <div class="comments-wrap">
        <div>Kommentar vedr. tidsforbrug</div>
        <InfoTooltip>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse unde neque eos, non et vel, aspernatur quod dolore perspiciatis dolorem minus rerum amet animi architecto mollitia alias! Debitis, eveniet sint!
        </InfoTooltip>
        <TextArea :disabled="disabled" />
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import GreyInputBox from '@/components/common/GreyInputBox.vue';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import TextArea from '@/components/common/inputs/TextArea.vue';

@Component({
  components: {
    GreyInputBox,
    InfoTooltip,
    TextArea
  }
})
export default class TimeAndProcess extends Vue {
  @Prop() disabled!: boolean;
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.comments-wrap {
  width: 50%;
}

</style>
