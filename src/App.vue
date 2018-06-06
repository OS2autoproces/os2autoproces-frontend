<template>
    <div id="app">
        <v-app light>

            <router-view/>
            <div class="footer">
                <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
                <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
                <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
                <div>Her skal der stå noget <br> Her skal der være et link <br> Her kan der stå noget mere</div>
            </div>
        </v-app>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="scss">
html {
  font-size: 16px;
}

body {
  min-height: 100vh;
}
</style>

<style lang="scss" scoped>
@import "./styles/helpers";

.footer {
  background-color: #f2f3f4;
  border-top: 10px solid $color-secondary;
  display: flex;
  padding: 40px;
  font-weight: bold;
  justify-content: space-between;
}
</style>
