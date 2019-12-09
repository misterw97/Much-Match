export const GAUGES = [
  {
    name: "speedMean",
    config: {
      title: "Determination",
      description: "Average swiping speed",
      rangeStd: {
        mean: 2106.85661,
        std: 1216.818629
      }
    }
  },
  {
    name: "hesitation",
    config: {
      title: "Hesitation",
      description: "Time with swiping speed at zero",
      rangeStd: {
        mean: 4.824155,
        std: 8.624324
      }
    }
  },
  // {
  //   name: "accMean",
  //   config: {
  //     title: "Intensity",
  //     description: "Average acceleration",
  //     rangeStd: {
  //       mean: 11.725722,
  //       std: 174.36487
  //     }
  //   }
  // },
  {
    name: "accMax",
    config: {
      title: "Intensity",
      description: "Maximum acceleration",
      rangeStd: {
        mean: 440.558247,
        std: 2099.491071
      }
    }
  },
  {
    name: "normTrajLength",
    config: {
      title: "Insistence",
      description: "Swipe trajectory length",
      rangeStd: {
        mean: 0.694734,
        std: 0.379383
      }
    }
  },
  {
    name: "reactionTime",
    config: {
      title: "Reactivity",
      description: "Time spent on card before swiping",
      rangeStd: {
        mean: 7476.705882,
        std: 163453.821581
      }
    }
  },
  {
    name: "speedMax",
    config: {
      title: "Pulsion",
      description: "Maximum swiping speed",
      rangeStd: {
        mean: 5360.130943,
        std: 7473.387816
      }
    }
  }
];
