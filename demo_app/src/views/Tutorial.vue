<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

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

<script>
import SwipeableCards from "@/components/SwipeableCards.vue";
import shuffle from "@/utils/shuffle";
import Analytics from "@/views/Analytics";

export default {
  name: "swipe",
  components: {
      Analytics,
    SwipeableCards
  },
  sockets: {
      receiveNewCode(code) {
          this.roomId = code;
      },
  },
  data() {
    return {
      cards: [],
      currentIndex: -1,
      dialog: false,
      expected: false,
      roomId: null,
    };
  },
  methods: {
    onmatch(data) {
      data.liked = true;
      this.next(data);
    },
    onreject(data) {
      data.liked = false;
      this.next(data);
    },
    next(data) {
      this.currentIndex++;
    }
  },
  mounted() {
    this.$socket.emit('getNewCode');
    let cards = [
      {
        expectLike: true,
        title: "Swipe it right!"
      },
      {
        expectLike: false,
        title: "Swipe it left!"
      },
      {
        expectLike: false,
        title: "Don't like it!"
      },
      {
        expectLike: true,
        title: "Like it!"
      },
      {
        expectLike: true,
        title: "Love it!"
      }
    ];
    let catsImages = [
      "alexander.jpg",
      "bona.jpg",
      "ichi.jpg",
      "karina.jpg",
      "lloyd.jpg",
      "luiza.jpg",
      "max.jpg",
      "mona.jpg",
      "naru.jpg",
      "ramdan.jpg",
      "tucker.jpg",
      "uriel.jpg",
      "zoe.jpg"
    ];
    catsImages = shuffle(catsImages);
    for (let i = 0; i < cards.length; ++i) {
      cards[i].src = catsImages[i];
      const catName = catsImages[i].split(".")[0];
      const title = catName.charAt(0).toUpperCase() + catName.slice(1);
      cards[i].title = title;
    }
    this.cards = cards;
    this.currentIndex = 0;
  }
};
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
