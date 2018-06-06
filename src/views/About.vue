<template>
    <div class="about">
        <h1>This is an about page</h1>
        <Post/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Post from "../components/Post.vue";

@Component({
  components: {
    Post
  }
})
export default class About extends Vue {}
</script>
