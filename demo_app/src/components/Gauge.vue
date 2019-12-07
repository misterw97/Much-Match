<template>
  <div class="margin-box">
    <div class="gauge-title">
      {{title}}
      <div class="information" v-if="!!description">i
        <span class="tooltip-text">{{description}}</span>
      </div>
    </div>
    <div class="main-progress-bar-container">
      <progress-bar :percent="value"/>
      <div class="average-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ProgressBar from "./ProgressBar.vue";

    @Component({
      components: {ProgressBar},
      props: ['value', 'mean', 'std', 'title', 'description']
    })
    export default class Gauge extends Vue {

    }
</script>

<style scoped lang="scss">
  $bar-width: 2px;
  $bar-extra-height: 4px;

  .margin-box {
    margin-bottom: 20px;
  }

  .gauge-title {
    display: flex;
    margin-bottom: 10px;

    .information {
      background-color: #c0c0c0;
      padding: 3px 10px;
      min-width: 20px;
      width: 22px;
      border-radius: 15px;
      font-size: 12px;
      margin-left: 10px;

      &:hover {
        background-color: #909090;
      }

      .tooltip-text {
        visibility: hidden;
        position: absolute;
        color: #ffffff;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.57);
        z-index: 999;
        border: 1px solid white;
        font-size: 14px;
      }

      &:hover .tooltip-text {
        visibility: visible;
      }
    }
  }

  .main-progress-bar-container {
    position: relative;
    margin: $bar-extra-height 0;

    .average-bar {
      position: absolute;
      top: -#{$bar-extra-height};
      background-color: white;
      left: calc(50% - #{$bar-width/2});
      width: $bar-width;
      height: calc(100% + #{2*$bar-extra-height});
    }
  }
</style>
