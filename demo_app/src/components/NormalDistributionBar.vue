<template>
  <div class="main-container">
    <progress-bar :percent="value"/>
    <div class="average-bar"></div>
  </div>
</template>

<script>
    import ProgressBar from "./ProgressBar";

    export default {
        name: "NormalDistributionBar",
        components: {ProgressBar},
        props: ['value']
    }
</script>

<style scoped lang="scss">
  $bar-width: 2px;
  $bar-extra-height: 4px;

  .main-container {
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
