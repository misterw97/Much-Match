export const CHART_CONFIG = {
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  stroke: {
    curve: "straight"
  },
  chart: {
    animations: {
      enabled: true,
      easing: "easeinout",
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
    background: "#000000",
    fontFamily: "IBM Plex Sans, Helvetica, Arial, sans-serif",
    foreColor: "#ffffff",
    toolbar: {
      show: false
    },
    type: "area"
  },
  colors: ["#ff6900"],
  title: {
    text: "Swipe progress",
    align: "left",
    style: {
      fontSize: "14px"
    }
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    title: {
      text: "time",
      offsetY: -30
    }
  },
  yaxis: {
    tickAmount: 4,
    floating: false,
    title: {
      text: "x movement"
    },
    seriesName: "x movement",
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    opacity: 0.5
  },
  tooltip: {
    enabled: false
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
  }
};
