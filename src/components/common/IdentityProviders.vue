<template>
  <v-card class="card">
    <v-toolbar class="toolbar">
      <v-spacer></v-spacer>Log ind som
      <v-spacer></v-spacer>
    </v-toolbar>
    <div>
      <v-list>
        <template v-for="item in identityProviders">
          <v-list-item class="list-elements" :key="item.name" ripple :href="item.url">
            <v-list-item-content>
              <v-list-item-title class="element-title">{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HTTP } from '@/services/http-service';

interface IdentityProvider {
  entityId: string;
  name: string;
}

interface IdentityProviderLink {
  url: string;
  name: string;
}

@Component({})
export default class IdentityProviders extends Vue {
  identityProviders: IdentityProviderLink[] = [];

  async mounted() {
    const response = await HTTP.get<IdentityProvider[]>(`public/identityproviders`);

    const apiUrl = window.autoProcessConfiguration.apiUrl;

    this.identityProviders = response.data.map(provider => {
      return {
        name: provider.name,
        url: `${apiUrl}/saml/login?idp=${encodeURIComponent(provider.entityId)}`
      };
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.theme--light.v-toolbar.v-sheet {
  margin: auto;
  color: white;
  background-color: $color-secondary;
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
