<template>
  <div class="main-container">
    <div class="cache"></div>
    <h1>Analytics</h1>
    <img :src="require('../assets/logo_cut.png')" class="logo">
    <apexchart ref="chart" class="chart" :options="options" :series="series"/>
    <div class="features">
        <gauge class="gauge"
            v-for="gauge in gauges" 
            :key="gauge.name" 
            :title="gauge.label"
            :description="gauge.description"
            :value="!!swipe ? swipe[gauge.label] : 0" />
    </div>
  </div>
</template>

<script>
    import Gauge from "@/components/Gauge";
    import { EventBus } from "@/event-bus";
    import extend from "@/utils/extend_features";

    export default {
        name: "Analytics",
        components: {Gauge},
        data() {
            return {
                swipe: undefined,
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
                },
                gauges: [{
                    name: "speedMean",
                    label: "Determination",
                    description: "Average swiping speed"
                }]
            }
        },
        mounted() {
            const catchSwipe = swipe => this.swipe = extend(swipe);
            EventBus.$on('match', catchSwipe);
            EventBus.$on('reject', catchSwipe);
            EventBus.$on('swipe-event', () => this.swipes = {});
            EventBus.$on('swipe-data', data => {
                this.swipe = undefined;
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
