<template>
  <div class="main-container">
    <div class="cache"></div>
    <h1>Analytics</h1>
    <img :src="require('../assets/logo_cut.png')" class="logo" />
    <apexchart height="300px" ref="chart" class="chart" :options="options" :series="series" />
    <div class="features">
      <gauge
        class="gauge"
        v-for="gauge in gauges"
        :key="gauge.name+(!!swipe ? swipe.id:'')"
        :config="gauge.config"
        :value="!!swipe ? swipe[gauge.name] : 0"
        @scored="onScore($event, gauge.name)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EventBus } from "@/event-bus";
import extend from "@/utils/extend_features";
import SwipeExtended from "@/models/SwipeExtended";
import { GaugeData, GaugeScore } from "@/models/GaugeData";
import Swipe from "@/models/Swipe";
import { CHART_CONFIG } from "@/constants/chart.config";
import { GAUGES } from "@/constants/kpi.config";
import { HESITANT_10 } from "@/constants/notifications";
import Gauge from "@/components/Gauge.vue";
import { Socket } from "vue-socket.io-extended";

@Component({
  components: { Gauge }
})
export default class Analytics extends Vue {
  public $refs!: Vue["$refs"] & {
    gauge: Gauge;
  };

  protected scores: any;
  protected swipe: SwipeExtended = {} as SwipeExtended;
  protected rogerCounter: number = 0;
  protected swipes: any = {};
  protected series = [
    {
      name: "time",
      data: []
    }
  ];
  protected options = CHART_CONFIG;
  protected gauges: { name: string; config: GaugeData }[] = GAUGES;

  protected onScore(score: GaugeScore, name: string) {
    this.scores[name] = score;
    this.pushAdIfHesitant();
  }

  protected pushAdIfHesitant() {
    const hesitationScore = this.scores["hesitation"] as GaugeScore | undefined;
    const determinationScore = this.scores["speedMean"] as
      | GaugeScore
      | undefined;
    const intensityScore = this.scores["accMax"] as GaugeScore | undefined;
    // guard: quit if not all scores are computed yet
    if (!hesitationScore || !determinationScore || !intensityScore) return;
    // notify if scores does match hesitation and no determination
    const hesitant = !!hesitationScore.outlier && hesitationScore.value > 0;
    const notDetermined =
      (!determinationScore.outlier || determinationScore.value === 0) &&
      (!intensityScore.outlier || intensityScore.value === 0);
    if (hesitant && notDetermined) {
      EventBus.$emit("notification", HESITANT_10);
      const roomId = (this.$parent as any).roomId;
      if (roomId) this.$socket.client.emit('notify', {to: roomId, data: undefined});
    }
  }

  protected renderData(data: any) {
    this.swipe = {} as SwipeExtended;
    this.scores = {};
    this.rogerCounter++;
    const swipeId = data.t0;
    const x = data.timeStamp;
    const y = data.clientX - data.clientX0;
    if (Object.keys(this.swipes).length === 0)
      this.swipes[0] = [{ x: x + 1000, y: 0 }];

    if (!this.swipes[swipeId]) this.swipes[swipeId] = [];

    const currentSwipe = this.swipes[swipeId];
    currentSwipe.push({ x, y });

    if (this.rogerCounter % 2 === 0)
      (this.$refs.chart as any).updateSeries([
        ...Object.values(this.swipes).map(swipe => ({ data: swipe }))
      ]);
  }

  protected renderEvent(swipeData: Swipe) {
    this.swipe = extend(swipeData);
    this.swipes = {};
  }

  protected mounted() {
    EventBus.$on("swipe-event", (swipeData: Swipe) =>
      this.renderEvent(swipeData)
    );
    EventBus.$on("swipe-data", (data: any) => this.renderData(data));
  }

  @Socket()
  swipe_data(data: any) {
    this.renderData(data);
  }

  @Socket()
  swipe_event(event: any) {
    this.renderEvent(event);
  }
}
</script>

<style scoped lang="scss">
.main-container {
  z-index: 4;
  background-color: black;
  color: white;
  padding: 20px 30px;

  .cache {
    background-color: lawngreen;
    position: absolute;
    width: 100%;
  }

  h1 {
    padding-bottom: 10px;
    position: sticky;
    z-index: 999;
    top: -20px;
    background-color: black;
  }

  .logo {
    max-width: 200px;
    position: absolute;
    top: 10px;
    z-index: 1020;
    right: 20px;
  }

  .features {
    display: flex;
    flex-wrap: wrap;

    $gauge-separation: 15px;

    .gauge {
      width: calc(50% - #{$gauge-separation});

      &:nth-child(even) {
        margin-left: 2 * $gauge-separation;
      }
    }
  }
}
</style>
