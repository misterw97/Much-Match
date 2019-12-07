<template>
  <div class="two-columns">
    <div class="swipe-view">
      <swipeable-cards
        v-bind:title="
          this.currentIndex >= 0 ? this.cards[this.currentIndex].title : null
        "
        v-bind:cards="cards"
        @match="onmatch"
        @reject="onreject"
      />
    </div>
    <analytics class="analytics-view"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SwipeableCards from "@/components/SwipeableCards.vue";
import Swiping from "@/views/Swiping.vue";
import Analytics from "@/views/Analytics.vue";

@Component({
  components: {
    Analytics,
    SwipeableCards
  },
  sockets: {
      receiveNewCode(code) {
          this.roomId = code;
      },
  }
})
export default class Home extends Swiping {

  protected roomId?: number;

  mounted() {
    super.mounted();
    this.$socket.emit('getNewCode');
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
