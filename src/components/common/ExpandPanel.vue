<template>
    <div class="expand-panel" :class="{ expanded }">
        <div class="panel-header" @click="expanded = !expanded" role="checkbox" :aria-checked="expanded.toString()">
            <div class="panel-title">{{title}}</div>
            <ArrowDownIcon class="panel-icon" />
        </div>
        <div class="panel-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ArrowDownIcon from '../icons/ArrowDownIcon.vue';

@Component({
  components: {
    ArrowDownIcon
  }
})
export default class ExpandPanel extends Vue {
  @Prop() title!: string;

  expanded = false;
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.panel-header {
  display: flex;
  align-items: center;
  cursor: pointer;

  .panel-title {
    flex-grow: 1;
    color: $color-secondary;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .panel-icon {
    height: 20px;
    width: 20px;
  }
}

.panel-content {
  display: none;
}

.expanded {
  .panel-icon {
    transform: rotate(180deg);
  }

  .panel-content {
    display: block;
  }
}
</style>
