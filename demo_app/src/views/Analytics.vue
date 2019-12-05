<template>
  <div class="container">
    <div class="cache"></div>
    <h1>Analytics</h1>
    <apexchart width="100%" type="area" :options="options" :series="series"/>
    <div class="gauge">
      credibility
      <progress-bar percent="60" />
    </div>
  </div>
</template>

<script>
    import ProgressBar from "@/components/ProgressBar";
    export default {
        name: "Analytics",
        components: {ProgressBar},
        data() {
            return {
                series: [{
                    name: 'time',
                    data: [
                        {
                            x: 1996,
                            y: 162
                        },
                        {
                            x: 1997,
                            y: 90
                        },
                        {
                            x: 1998,
                            y: 50
                        },
                        {
                            x: 1999,
                            y: 77
                        },
                        {
                            x: 2000,
                            y: 35
                        },
                        {
                            x: 2001,
                            y: -45
                        },
                        {
                            x: 2002,
                            y: -88
                        },
                        {
                            x: 2003,
                            y: -120
                        },
                        {
                            x: 2004,
                            y: -156
                        },
                        {
                            x: 2005,
                            y: -123
                        },
                        {
                            x: 2006,
                            y: -88
                        },
                        {
                            x: 2007,
                            y: -66
                        },
                        {
                            x: 2008,
                            y: -45
                        },
                        {
                            x: 2009,
                            y: -29
                        },
                        {
                            x: 2010,
                            y: -45
                        },
                        {
                            x: 2011,
                            y: -88
                        },
                        {
                            x: 2012,
                            y: -132
                        },
                        {
                            x: 2013,
                            y: -146
                        },
                        {
                            x: 2014,
                            y: -169
                        },
                        {
                            x: 2015,
                            y: -184
                        }
                    ]
                }],
                options: {
                    dataLabels: {
                        enabled: false
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
                        width: '100%',
                    },
                    colors: ['#ff6900'],
                    title: {
                        text: 'Titre du truc',
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
                        }
                    },
                    yaxis: {
                        tickAmount: 4,
                        floating: false,
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
                        x: {
                            format: "yyyy",
                        },
                        fixed: {
                            enabled: false,
                            position: 'topRight'
                        }
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
        }
    }
</script>

<style scoped lang="scss">
  .container {
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
  }
</style>
