<template>
  <div class="main-container">
    <div class="cache"></div>
    <h1>Analytics</h1>
    <img :src="require('../assets/logo_cut.png')" class="logo">
    <apexchart ref="chart" class="chart" :options="options" :series="series"/>
    <div class="features">
      <div class="gauge">
        <span>credibility</span>
        <normal-distribution-bar value="20"/>
      </div>
      <div class="gauge">
        <normal-distribution-bar title="je ne sais pas" description="c'est genant de pas savoir ce que tu fais roger" value="40"/>
      </div>
      <div class="gauge">
        <span>credibility</span>
        <normal-distribution-bar value="60"/>
      </div>
      <div class="gauge">
        <span>credibility</span>
        <normal-distribution-bar value="80"/>
      </div>
      <div class="gauge">
        <span>credibility</span>
        <normal-distribution-bar value="70"/>
      </div>
    </div>
    <ul>
      <li v-for="a in series[0].data">{{a.x}} = {{a.y}}</li>
    </ul>
  </div>
</template>

<script>
    import ProgressBar from "@/components/ProgressBar";
    import NormalDistributionBar from "@/components/NormalDistributionBar";
    import {EventBus} from "@/event-bus";

    export default {
        name: "Analytics",
        components: {NormalDistributionBar, ProgressBar},
        data() {
            return {
                swipes: {},
                series: [{
                    name: 'time',
                    data: [],
                }],
                options: {
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false,
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    chart: {
                        animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350
                            }
                        },
                        background: '#000000',
                        fontFamily: 'IBM Plex Sans, Helvetica, Arial, sans-serif',
                        foreColor: '#ffffff',
                        toolbar: {
                            show: false,
                        },
                        height: '200px',
                        type: 'area',
                    },
                    colors: ['#ff6900'],
                    title: {
                        text: 'Swipe progress',
                        align: 'left',
                        style: {
                            fontSize: '14px'
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        title: {
                            text: 'time',
                            offsetY: -30
                        }
                    },
                    yaxis: {
                        tickAmount: 4,
                        floating: false,
                        title: {
                           text: 'x movement'
                        },
                        seriesName: 'x movement',
                        labels: {
                            style: {
                                color: '#8e8da4',
                            },
                            offsetY: -7,
                            offsetX: 0,
                        },
                        axisBorder: {
                            show: false,
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    fill: {
                        opacity: 0.5
                    },
                    tooltip: {
                        enabled: false,
                    },
                    grid: {
                        yaxis: {
                            lines: {
                                offsetX: -30
                            }
                        },
                        padding: {
                            left: 20
                        }
                    },
                }
            }
        },
        mounted() {
            EventBus.$on('swipe-event', () => this.swipes = {});
            EventBus.$on('swipe-data', data => {
                const swipeId = data.t0;
                const x = data.timeStamp;
                const y = data.clientX - data.clientX0;
                if (Object.keys(this.swipes).length === 0)
                    this.swipes[0] = [{x: x + 2000, y: 0}];

                if (!this.swipes[swipeId])
                    this.swipes[swipeId] = [];

                const currentSwipe = this.swipes[swipeId];
                currentSwipe.push({x, y});

                this.$refs.chart.updateSeries([
                    ...Object.values(this.swipes).map(swipe => ({data: swipe}))
                ])
            });
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

    .chart {
      width: 50%;
      height: 200px;
      max-height: 200px;
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
