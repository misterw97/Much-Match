<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="two-columns">
    <div class="swipe-view">
      <swipeable-cards :cards="cards"
        @match="onmatch"
        @reject="onreject"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CardData from "@/models/CardData";
import ISwipe from "@/models/Swipe";
import shuffle from "@/utils/shuffle";
import SwipeableCards from "@/components/SwipeableCards.vue";
import Analytics from "@/views/Analytics.vue";

@Component({
  name: "swipe",
  components: {
    Analytics,
    SwipeableCards
  }
})
export default class Swipe extends Vue {
  protected cards: CardData[] = [];
  private currentIndex = 0;

  protected onmatch(data: ISwipe) {
    data.liked = true;
    this.next(data);
  }

  protected onreject(data: ISwipe) {
    data.liked = false;
    this.next(data);
  }

  protected next(data: ISwipe & { liked: boolean }) {
    this.cards.push(this.cards[this.currentIndex++]);
  }

  protected beforeMount() {
    // const catsImages = shuffle([
    //   "alexander.jpg",
    //   "bona.jpg",
    //   "ichi.jpg",
    //   "karina.jpg",
    //   "lloyd.jpg",
    //   "luiza.jpg",
    //   "max.jpg",
    //   "mona.jpg",
    //   "naru.jpg",
    //   "ramdan.jpg",
    //   "tucker.jpg",
    //   "uriel.jpg",
    //   "zoe.jpg"
    // ]);
    const watchImages: string[] = Array(9).fill(0).map((_: undefined, i: number) => `watch${i}.jpg`);
    this.cards = watchImages.map(src => ({ src }));
    console.log(this.cards);
    
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
    width: 100%;
    position: relative;
  }
}
</style>
