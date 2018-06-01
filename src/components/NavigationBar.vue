<template>
    <v-card flat height="100px">
        <v-bottom-nav :value="true" absolute color="tranperent">
            <v-btn v-for="route in routes" :key="route.name" :to="route.path" router>
                {{route.name}}
            </v-btn>
        </v-bottom-nav>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { routes } from '../router';

@Component
export default class NavigationBar extends Vue {
    routes = routes;
}
</script>
