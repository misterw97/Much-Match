<template>
  <div class="main-container">
    <div class="cache"></div>
    <h1>Analytics</h1>
    <img :src="require('../assets/logo_cut.png')" class="logo">
    <apexchart height="300px" ref="chart" class="chart" :options="options" :series="series"/>
    <div class="features">
        <gauge class="gauge"
            v-for="gauge in gauges"
            :key="gauge.name+(swipe?swipe.id:'')"
            :config="gauge.config"
            :value="!!swipe ? swipe[gauge.name] : 0" />
    </div>
  </div>
</template>

<script>
    import Gauge from "@/components/Gauge";
    import {EventBus} from "@/event-bus";
    import extend from "@/utils/extend_features";

    export default {
        name: "Analytics",
        components: {Gauge},
        data() {
            return {
                swipe: undefined,
                rogerCounter: 0,
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
                            show: false
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
                    config: {
                        title: "Determination",
                        description: "Average swiping speed",
                        rangeStd: {
                            mean: 2106.85661,
                            std: 1216.818629,
                        }
                    },
                }, {
                    name: "speedMax",
                    config: {
                        title: "Pulsion",
                        description: "Maximum swiping speed",
                        rangeStd: {
                            mean: 5360.130943,
                            std: 7473.387816,
                        }
                    },
                }, {
                    name: "accMean",
                    config: {
                        title: "Intensity",
                        description: "Average acceleration",
                        rangeStd: {
                            mean: 11.725722,
                            std: 174.36487,
                        }
                    },
                }, {
                    name: "reactionTime",
                    config: {
                        title: "Reactivity",
                        description: "Time spent on card before swiping",
                        rangeStd: {
                            mean: 7476.705882,
                            std: 163453.821581,
                        }
                    },
                }, {
                    name: "normTrajLength",
                    config: {
                        title: "Insistence",
                        description: "Swipe trajectory length",
                        rangeStd: {
                            mean: 0.694734,
                            std: 0.379383,
                        }
                    },
                }, {
                    name: "hesitation",
                    config: {
                        title: "Hesitation",
                        description: "Time with swiping speed at zero",
                        rangeStd: {
                            mean: 0,
                            std: 1,
                        }
                    },
                }
                ]
            }
        },
        sockets: {
            swipe_event(event) {
                this.renderEvent(event);
            },
            swipe_data(data) {
                this.renderData(data);
            }
        },
        methods: {
            renderData(data) {
                this.swipe = undefined;
                this.rogerCounter++;
                const swipeId = data.t0;
                const x = data.timeStamp;
                const y = data.clientX - data.clientX0;
                if (Object.keys(this.swipes).length === 0)
                    this.swipes[0] = [{x: x + 2000, y: 0}];

                if (!this.swipes[swipeId])
                    this.swipes[swipeId] = [];

                const currentSwipe = this.swipes[swipeId];
                currentSwipe.push({x, y});

                if (this.rogerCounter % 2 === 0)
                    this.$refs.chart.updateSeries([
                        ...Object.values(this.swipes).map(swipe => ({data: swipe}))
                    ])
            },
            renderEvent(swipeData) {
                this.swipe = extend(swipeData);
                this.swipes = {};
            }
        },
        mounted() {
            EventBus.$on('swipe-event', swipeData => this.renderEvent(swipeData));
            EventBus.$on('swipe-data', data => this.renderData(data));
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
