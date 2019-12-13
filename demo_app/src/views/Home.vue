<template>
  <div class="two-columns">
    <div class="swipe-view">
      <notification-center />
      <swipeable-cards :cards="cards"
        @match="onmatch"
        @reject="onreject"
      />
    </div>
    <analytics class="analytics-view"/>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import SwipeableCards from "@/components/SwipeableCards.vue";
import Swiping from "@/views/Swiping.vue";
import Analytics from "@/views/Analytics.vue";
import {Socket} from "vue-socket.io-extended";
import NotificationCenter from "@/components/NotificationCenter.vue";

@Component({
  components: {
    Analytics,
    SwipeableCards,
    NotificationCenter,
  }
})
export default class Home extends Swiping {

  protected roomId?: number;

  @Socket()
  receiveNewCode(code: number) {
      this.roomId = code;
  }

  mounted() {
    this.$socket.client.emit('getNewCode');
  }
}
</script>

<style>
  body {
    margin: 0;
    z-index: 0;
    font-family: "IBM Plex Sans", sans-serif;
  }
</style>

<style scoped lang="scss">
  .two-columns {
    display: flex;

    .swipe-view {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      width: 50vh;
      position: relative;
    }

    .analytics-view {
      width: calc(100% - 50vh);
      height: 100vh;
      overflow-y: auto;
    }
  }
</style>
