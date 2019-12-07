<template>
  <div class="margin-box">
    <div class="gauge-title">
      {{ config.title }}
      <div class="information" v-if="!!config.description">i
        <span class="tooltip-text">{{ config.description }}</span>
      </div>
    </div>
    <div class="main-progress-bar-container">
      <progress-bar :percent="val"/>
      <div class="average-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import ProgressBar from "./ProgressBar.vue";

    export interface GaugeStdRange {
      mean: number,
      std: number,
    }
  
    export interface GaugeMinMaxRange {
      min: number,
      max: number,
    }

    export interface GaugeData {
      title: string,
      description?: string,
      rangeMinMax?: GaugeMinMaxRange,
      rangeStd?: GaugeStdRange,
    }

    @Component({
      components: {ProgressBar}
    })
    export default class Gauge extends Vue {

      @Prop()
      private value!: number;
      @Prop()
      private config!: GaugeData;

      private min = 0;
      private max = 100;

      protected beforeMount() {
        console.log('value', this.value);
        
        if (!!this.config.rangeMinMax) {
          this.min = this.config.rangeMinMax.min;
          this.max = this.config.rangeMinMax.max;
        } else if (!!this.config.rangeStd) {
          // unorm std has 97% of all values between -3 and 3
          this.min = -3;
          this.max = 3;
        }
      }

      private scaleValue(value: number): number {
        const MIN = 0, MAX = 100;
        const val = ((MAX-MIN)*(value-this.min))/(this.max-this.min) + MIN;
        return val > MAX ? MAX : (val < MIN ? MIN : val);
      }

      get val() {
        let value = this.value;
        if (!!this.config.rangeStd) {
          value = (value-this.config.rangeStd.mean)/this.config.rangeStd.std;
        }
        return this.scaleValue(value);
      }
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
