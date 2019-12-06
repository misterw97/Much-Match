<template>
  <div class="general-container">
    <div class="cache"/>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="`width: ${percent}%;`"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: ['percent']
    }
</script>

<style scoped lang="scss">
  .general-container {
    width: 100%;
    height: 16px;
    border-radius: 10px;
    background: #FDC830; /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #F37335, #FDC830); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    position: relative;

    .cache {
      background-color: black;
      width: calc(100% - 4px);
      height: 12px;
      position: absolute;
      top: 2px;
      left: 2px;
      border-radius: 10px;
    }

    .progress-bar-container {
      height: 12px;
      position: absolute;
      width: calc(100% - 8px);
      top: 4px;
      left: 4px;
      overflow: hidden;

      .progress-bar {
        background: #FDC830; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #F37335, #FDC830); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        height: 8px;
        min-width: 8px;
        max-width: 100%;
        border-radius: 5px;
      }
    }
  }
</style>
