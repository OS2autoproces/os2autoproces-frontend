<template>
  <div class="hello">
    <KleNumberField />
    <ParagrafField />
    <FieldSelection />
    <DepartmentField />
    <VisibilitySelection />
    <ContactPersonField />
    <EmailField />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import KleNumberField from '@/components/details/general-information/KleNumberField.vue';
import ParagrafField from '@/components/details/general-information/ParagrafField.vue';
import FieldSelection from '@/components/details/general-information/FieldSelection.vue';
import DepartmentField from '@/components/details/general-information/DepartmentField.vue';
import VisibilitySelection from '@/components/details/general-information/VisibilitySelection.vue';
import ContactPersonField from '@/components/details/general-information/ContactPersonField.vue';
import EmailField from '@/components/details/general-information/EmailField.vue';

const namespace = 'common';

@Component({
  components: {
    KleNumberField,
    ParagrafField,
    FieldSelection,
    DepartmentField,
    VisibilitySelection,
    ContactPersonField,
    EmailField
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
