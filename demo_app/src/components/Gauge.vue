<template>
  <div class="margin-box">
    <div class="gauge-description">
      <span class="gauge-title" style="margin-right: 8px">{{ config.title }}</span>
      <span>{{ config.description }}</span>
      <i v-if="outlier" class="material-icons primary--text">star</i>
      <!-- <div class="information" v-if="!!config.description">i
        <span class="tooltip-text">{{ config.description }}</span>
      </div>-->
    </div>
    <div class="main-progress-bar-container">
      <progress-bar :percent="val" />
      <div class="average-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProgressBar from "./ProgressBar.vue";
import { GaugeData, GaugeScore } from "@/models/GaugeData";

const STD_THRESHOLD = 2; //95%

@Component({
  components: { ProgressBar }
})
export default class Gauge extends Vue {
  @Prop()
  private value?: number;
  @Prop()
  private config!: GaugeData;

  private min = 0;
  private max = 100;

  private outlier = false;

  protected beforeMount() {
    if (!!this.config.rangeMinMax) {
      this.min = this.config.rangeMinMax.min;
      this.max = this.config.rangeMinMax.max;
    } else if (!!this.config.rangeStd) {
      // unorm std has 95% of all values between -3 and 3
      this.min = -STD_THRESHOLD;
      this.max = STD_THRESHOLD;
    }
  }

  private scaleValue(value: number): number {
    const MIN = 0,
      MAX = 100;
    const val =
      ((MAX - MIN) * (value - this.min)) / (this.max - this.min) + MIN;
    return val > MAX ? MAX : val < MIN ? MIN : val;
  }

  get val() {
    if (!this.value) {
      this.outlier = false;
      return 0;
    }
    let value = this.value;
    if (!!this.config.rangeStd) {
      value = (value - this.config.rangeStd.mean) / this.config.rangeStd.std;
      if (Math.abs(value) > STD_THRESHOLD) {
        this.outlier = true;
      } else {
        this.outlier = false;
      }
      value = this.scaleValue(value);
      this.$emit("scored", {
        value,
        outlier: this.outlier
      } as GaugeScore);
    }
    return value;
  }
}
</script>

<style scoped lang="scss">
$bar-width: 2px;
$bar-extra-height: 4px;

.margin-box {
  margin-bottom: 20px;
}

.gauge-description {
  display: flex;
  margin-bottom: 10px;

  i {
    margin-left: 8px;
    font-size: 1.4em;
  }

  .gauge-title {
    font-weight: bold;
  }

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
    height: calc(100% + #{2 * $bar-extra-height});
  }
}
</style>
