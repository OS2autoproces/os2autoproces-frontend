<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
    </p>
    <div>
      <!-- {{common.networkCalls}} -->
    </div>
    <!-- <v-btn @click="incrementNetworkCalls"></v-btn> -->
    <br>
    <br>
    <br>
    <KleNumberField />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import KleNumberField from '@/components/details/general-information/KleNumberField.vue';

const namespace = 'common';

@Component({
  components: {
    KleNumberField
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
<style scoped lang="stylus">
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
