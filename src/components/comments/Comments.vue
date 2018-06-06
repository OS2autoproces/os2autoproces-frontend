<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <CommentInput />

        <v-btn :disabled="!valid" @click="submit">
            submit
        </v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CommentInput from "./CommentInput.vue";

@Component({
  components: {
    CommentInput
  }
})
export default class Comments extends Vue {
  @Prop() private disabled!: boolean;

  private valid = false;

  private submit(comment: string) {
    this.$emit("submit", comment);
  }
}
</script>

<style scoped lang="scss">
</style>