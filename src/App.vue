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

<style lang="stylus">
    @import '~vuetify/src/stylus/main'

    html {
        font-size: 16px;
    }

    body {
        min-height: 100vh;
    }
</style>

<style lang="stylus" scoped>

@import './styles/helpers.styl'

.footer {
    background-color: #F2F3F4;
    border-top: 10px solid $colors.secondary;
    display: flex;
    padding: 40px;
    font-weight: bold;
    justify-content: space-between;
}

</style>
