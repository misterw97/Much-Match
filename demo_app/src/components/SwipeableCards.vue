<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->
<template>
  <section class="container">
    <div class="fixed header">
      <div class="header-row bottom-border">
        <div class="left">
          <img :src="require('../assets/left-arrow.svg')">️
        </div>
        <div class="right">
          <div class="has-badge">
            <img :src="require('../assets/heart.svg')">
            <span class="badge primary" v-if="true">1</span>
          </div>
          <img :src="require('../assets/bag.svg')">
        </div>
      </div>
      <div class="header-row">
        <div class="left">
          <img :src="require('../assets/filled-menu.svg')" class="disabled-filter">
          <img :src="require('../assets/filled-square.svg')" class="disabled-filter">
          <img :src="require('../assets/swipe.svg')" class="swipe-icon">
        </div>
        <div class="right">
          <span class="bold">FILTER</span>
        </div>
      </div>
    </div>
    <div
      v-if="current"
      id="card--one--container"
      class="fixed fixed--center"
      style="z-index: 3"
      :class="{ transition: isVisible }"
    >
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        :interact-event-bus-events="interactEventBus"
        interact-block-drag-down
        @onmove="console"
        @draggedRight="emitAndNext('match')"
        @draggedUp="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        class="rounded-borders card card--one"
      >
        <div style="height: 100%">
          <img
            :src="require(`../assets/images/${current.src}`)"
            class="rounded-borders"
          />
          <!-- <div class="text">
            <h2>
              {{current.name}},
              <span>{{current.age}}</span>
            </h2>
          </div>-->
        </div>
      </Vue2InteractDraggable>
    </div>
    <div
      v-if="next"
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2"
    >
      <div style="height: 100%">
        <img
          :src="require(`../assets/images/${next.src}`)"
          class="rounded-borders"
        />
        <!-- <div class="text">
          <h2>
            {{ next.name }},
            <span>{{ next.age }}</span>
          </h2>
        </div>-->
      </div>
    </div>
    <div
      v-if="index + 2 < cards.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
    >
      <div style="height: 100%"></div>
    </div>
    <div class="footer fixed">
      <div class="btn primary--text btn--decline">
        <i class="material-icons">close</i>
      </div>
      <div class="btn primary--text btn--decline">
        <i class="material-icons">shopping_basket</i>
      </div>
      <div class="btn primary btn--like">
        <i class="material-icons">favorite</i>
      </div>
    </div>

    <v-dialog v-model="helpDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
        >Heyy!
        </v-card-title
        >

        <v-card-text>
          <br/>The idea here is to collect data on swiping features...
          therefore you should not use the buttons to indicate your preference!
          <br/>
          <br/>
          You {{ helpLiked ? "liked" : "didn't like" }} this picture? Just press
          your finger on the card and drag it to the
          {{ helpLiked ? "right" : "left" }} of your screen until it disappears.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="helpDialog = false"
          >Let's swipe!
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
    import {InteractEventBus, Vue2InteractDraggable} from "vue2-interact";
    import {EventBus} from '../event-bus.js';

    const EVENTS = {
        MATCH: "match",
        SKIP: "skip",
        REJECT: "reject"
    };

    export default {
        name: "SwipeableCards",
        components: {Vue2InteractDraggable},
        props: ["cards", "title"], // {src, name, age}
        data() {
            return {
                isVisible: true,
                index: 0,
                interactEventBus: {
                    draggedRight: EVENTS.MATCH,
                    draggedLeft: EVENTS.REJECT
                },
                swipeData: {
                    rawX: [],
                    rawTimestamps: [],
                    rawTime: [],
                    rawY: [],
                    rawSpeedX: [],
                    rawSpeedY: [],
                    rawSpeed: []
                },
                swipeRelativeData: {
                    startTime: 0,
                    lastX: 0,
                    lastY: 0,
                    lastT: 0
                },
                window: {
                    width: 0,
                    height: 0
                },
                helpDialog: false,
                helpLiked: false
            };
        },
        mounted() {
            this.swipeRelativeData.startTime = new Date().getTime();
        },
        created() {
            window.addEventListener("resize", this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener("resize", this.handleResize);
        },
        computed: {
            current() {
                return this.cards[this.index];
            },
            next() {
                return this.cards[this.index + 1];
            }
        },
        methods: {
            openhelper(liked) {
                this.helpDialog = true;
                this.helpLiked = liked;
            },
            match() {
                InteractEventBus.$emit(EVENTS.MATCH);
            },
            reject() {
                InteractEventBus.$emit(EVENTS.REJECT);
            },
            skip() {
                InteractEventBus.$emit(EVENTS.SKIP);
            },
            emitAndNext(event) {
                const endTime = new Date().getTime();
                const meta = {
                    image: this.cards[this.index].id,
                    appWidth: this.window.width,
                    appHeight: this.window.height,
                    duration: endTime - this.swipeRelativeData.startTime
                };
                this.$emit(event, {...meta, ...this.swipeData});
                EventBus.$emit('swipe-event', event);
                this.swipeData = {
                    rawX: [],
                    rawTimestamps: [],
                    rawTime: [],
                    rawY: [],
                    rawSpeedX: [],
                    rawSpeedY: [],
                    rawSpeed: []
                };
                this.swipeRelativeData = {
                    startTime: endTime,
                    lastX: 0,
                    lastY: 0,
                    lastT: 0
                };
                setTimeout(() => (this.isVisible = false), 200);
                setTimeout(() => {
                    this.index++;
                    this.isVisible = true;
                }, 200);
            },
            console(data) {
                // eslint-disable-next-line no-console
                // console.log(data);
                EventBus.$emit('swipe-data', data);

                this.swipeRelativeData.lastX += data.dx;
                this.swipeRelativeData.lastY += data.dy;
                this.swipeRelativeData.lastT += data.dt;

                this.swipeData.rawX.push(this.swipeRelativeData.lastX);
                this.swipeData.rawY.push(this.swipeRelativeData.lastY);
                this.swipeData.rawTime.push(this.swipeRelativeData.lastT);

                this.swipeData.rawTimestamps.push(data.timeStamp);
                this.swipeData.rawSpeedX.push(data.velocityX);
                this.swipeData.rawSpeedY.push(data.velocityY);
                this.swipeData.rawSpeed.push(data.speed);
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            }
        }
    };
</script>

<style lang="scss" scoped>
  .container {
    background: #eceff1;
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .has-badge {
    position: relative;
    display: flex;

    .badge {
      position: absolute;
      border-radius: 50%;
      top: -10px;
      font-size: 10px;
      margin: 0 !important;
      right: -16px;
      line-height: 20px;
      color: white;
      font-weight: bold;
    }
  }

  .header {
    width: 100%;
    z-index: 0;
    top: 0;
    left: 0;
    color: black;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;

      .swipe-icon {
        width: 29px;
      }

      img {
        width: 20px;

        &.disabled-filter {
          filter: invert(76%) sepia(47%) saturate(8%) hue-rotate(35deg) brightness(99%) contrast(92%);
        }
      }

      .bold {
        font-weight: bold;
      }

      .left, .right {
        display: flex;
        align-content: center;

        * {
          & + * {
            margin-left: 30px;
          }
        }
      }
    }

    .bottom-border {
      box-shadow: 0 0 4px 0 black;
    }


    span {
      text-align: center;
      // padding-top: 2rem;
      width: 100%;


    }

    i {
      padding: 24px;
    }
  }

  .footer {
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    padding-bottom: 30px;
    justify-content: space-around;
    align-items: center;
  }

  .btn {
    position: relative;
    width: 50px;
    height: 50px;
    padding: 0.2rem;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.02),
    0 10px 14px 1px rgba(0, 0, 0, 0.02), 0 4px 18px 3px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: translateY(4px);
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &::before {
        content: "";
      }
    }

    &--like {
      background-color: red;
      padding: 0.5rem;
      color: white;
      // box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      //   0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
      i {
        font-size: 32px;
      }
    }

    &--decline {
      color: red;
    }

    &--skip {
      color: green;
    }
  }

  .flex {
    display: flex;

    &--center {
      align-items: center;
      justify-content: center;
    }
  }

  .fixed {
    position: absolute;

    &--center {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .rounded-borders {
    border-radius: 12px;
  }

  #card--one--container {
    width: 78%;
    height: 60%;

    .card {
      width: 100%;
      height: 100%;
    }
  }

  .card {
    width: 78%;
    height: 60%;
    max-width: 500px;
    max-height: 200vw;
    color: white;
    background: white;

    img {
      object-fit: cover;
      display: block;
      width: 100%;
      height: 100%;
    }

    &--one {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
    }

    &--two {
      transform: translate(-48%, -48%);
      box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
    }

    &--three {
      background: rgba(black, 0.8);
      transform: translate(-46%, -46%);
      box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
    }

    .text {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: black;
      background: rgba(0, 0, 0, 0.5);
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      text-indent: 20px;

      span {
        font-weight: normal;
      }
    }
  }

  .transition {
    animation: appear 200ms ease-in;
  }

  @keyframes appear {
    from {
      transform: translate(-48%, -48%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
</style>
