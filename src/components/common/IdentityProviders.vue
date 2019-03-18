<template>
  <v-card class="card">
    <v-toolbar class="toolbar">
      <v-spacer></v-spacer>
      Vælg Region
      <v-spacer></v-spacer>
    </v-toolbar>
    <div>
      <v-list>
        <template v-for="item in identityProviders">
          <v-list-tile
            class="list-elements"
            :key="item.name"
            ripple
            @click="login(item.entityId)"
          >
            <v-list-tile-content>
              <v-list-tile-title class="element-title">
                {{item.name}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { HTTP } from "@/services/http-service";

interface IdentityProvider {
  entityId: string;
  name: string;
}

@Component({})
export default class IdentityProviders extends Vue {
  identityProviders: IdentityProvider[] = [];

  async mounted() {
    const response = await HTTP.get<IdentityProvider[]>(
      `public/identityproviders`
    );

    this.identityProviders = response.data;
  }

  login(entityId: string) {
    window.location.href = `${
      window.autoProcessConfiguration.apiUrl
    }/saml/login?idp=${encodeURIComponent(entityId)}`;
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.toolbar {
  margin: auto;
  color: white;
  background-color: $color-primary;
  font-size: 1.8rem;
  font-weight: bold;
}

.list-elements {
  background-color: $color-background;
  color: $color-text;
}

.card {
  border-radius: 0.5rem;
}

.element-title {
  text-align: center;
  font-size: 1.5rem;
}

.headline {
  font-weight: bold;
}
</style>
