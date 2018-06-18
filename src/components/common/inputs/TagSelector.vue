<template>
    <div class="tag-selector-wrap">
        <div class="tag-list">
            <div v-for="(tag, index) in tagList" :key="index" class="tag-item">
                <span class="tag">
                    {{tag}}
                </span>
                <span class="delete-icon" v-if="!disabled">
                    <DeleteIcon />
                </span>
            </div>
        </div>
        <div class="tag-input-wrap" v-if="!disabled">
            <input class="tag-input" :placeholder="placeholder" @submit="valueChanged">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

@Component({
  components: {
    DeleteIcon
  }
})
export default class TagSelector extends Vue {
  @Prop() disabled!: boolean;
  @Prop() placeholder!: string;
  @Prop() value!: string;

  tagList = ['VueJs', 'Vuex', 'Vuetify'];

  valueChanged(event: any) {
    this.$emit('change', event.target.value);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.tag-selector-wrap {
  display: flex;
  flex-direction: column;

  .tag-list {
    display: flex;
    flex-direction: row;
    padding: $size-unit/3 0 $size-unit/3 0;
    .tag-item {
      position: relative;
      display: flex;
      color: $color-background;
      background-color: $color-secondary;
      border-radius: $size-unit;
      padding: 1px 5px 1px 5px;
      margin: $size-unit/2 $size-unit $size-unit/2 0;
      .tag {
        display: flex;
        justify-content: center;
        min-width: $size-unit * 7;
      }
      .delete-icon {
        position: absolute;
        right: $size-unit/-2;
        top: $size-unit/-2;
        width: $size-unit;
        height: $size-unit;
        vertical-align: $size-unit * 2;
      }
    }
  }

  .tag-input-wrap {
    display: flex;
    .tag-input {
      border: 1px solid $color-primary;
      border-radius: 30px;
      padding-left: 10px !important;
      height: 32px;
      width: 33%;
    }
    .tag-submit {
        margin-left: $size-unit;
    }
  }
}
</style>
