<template>
  <div class="page">
    <v-layout row>
      <v-flex
        xs8
        sm6
        md4
        offset-xs2
        offset-sm3
        offset-md4
      >
        <v-card class="card">
          <v-toolbar class="toolbar">
            <v-spacer></v-spacer>
            <v-toolbar-title>Vælg Region</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div>
            <v-list>
              <template v-for="item in loginProviders">
                <v-list-tile
                  class="list-elements"
                  :key="item.name"
                  ripple
                  @click="login(item.entityId)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title class="list-title">
                      {{item.name}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";

interface IdProvider {
  entityId: string;
  name: string;
}

@Component({
  components: {}
})
export default class Discovery extends Vue {
  loginProviders: IdProvider[] = [];

  async mounted() {
    const loginProvidersRequest = (await HTTP.get<IdProvider[]>(
      `public/identityproviders`
    )).data;
    this.loginProviders = loginProvidersRequest;
  }

  login(entityId: string) {
    window.location.href = `${
      window.autoProcessConfiguration.apiUrl
    }/saml/login?idp=${encodeURIComponent(entityId)}`;
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.page {
  background-color: $color-secondary;
  padding-top: 3rem;
}

.toolbar {
  margin: auto;
  color: white;
  background-color: $color-primary;
}

.list-elements {
  background-color: $color-background;
  color: $color-text;
}

.card {
  border-radius: 0.5rem;
}

.list-title {
  text-align: center;
}
</style>
