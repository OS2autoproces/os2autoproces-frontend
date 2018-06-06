<template>
  <div class="hello">
    <GeneralInformationForm />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import GeneralInformationForm from '@/components/details/general-information/GeneralInformationForm.vue';

const namespace = 'common';

@Component({
  components: {
    GeneralInformationForm
  }
})
export default class HelloWorld extends Vue {
  // @Action('incrementNetworkCalls', { namespace })
  // incrementNetworkCalls: any;
  // @State('common') common!: CommonState;
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
