<template>
  <div class="page exercise-page">
    <div class="scroller"></div>
    <div class="content">
      <global-events
        @keyup.right="nextCard"
        @keyup.left="previousCard"
        @keyup.space="showMenu = !showMenu"
      ></global-events>
      <transition-group
        class="cards"
        name="cards"
        :class="{ centered: cardSlots < 9 }"
        @click="nextCard"
        tag="div"
        ref="cards"
      >
        <Card
          v-for="(card, i) in shownCards"
          :title="card.letter"
          :subtitle="card.action"
          :key="card.letter"
          :class="{ selected: selectedIndex == i }"
          :style="cardStyles"
        ></Card>
      </transition-group>
      <transition name="slide" mode="out-in">
        <nav v-if="!settingsOpen && showMenu">
          <img
            class="icon"
            @click="$router.push('sets')"
            src="@/assets/create-icon.svg"
            alt="create"
          />
          <img
            class="icon"
            @click="settingsOpen = true"
            src="@/assets/layout-icon.svg"
            alt="layout"
          />
          <img class="icon" @click="shuffle" src="@/assets/reset-icon.svg" alt="reset" />
          <img
            class="icon"
            :class="{inactive: !useAudio}"
            @click="useAudio ? turnOffAudio() : turnOnAudio()"
            src="@/assets/audio-icon.svg"
            alt="info"
          />
          <audio ref="audio"></audio>
          <img class="icon" @click="$router.push('info')" src="@/assets/info-icon.svg" alt="info" />
        </nav>
        <nav v-else-if="showMenu" class="layout-menu">
          <div class="top-slot">
            <hr class="divider" />
            <img
              class="close-icon"
              @click="settingsOpen = false"
              src="@/assets/close.svg"
              alt="close"
            />
          </div>
          <div class="options">
            <div v-for="(val, setting) in settings" :key="setting" class="option">
              <vue-slider
                v-model="settings[setting]"
                :min="boundaries[setting][0]"
                :max="boundaries[setting][1]"
                width="100px"
              ></vue-slider>
              <p>{{ setting | parseCamelCase }}</p>
            </div>
          </div>
        </nav>
      </transition>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import SetGenerator from "@/modules/SetGenerator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import GlobalEvents from "vue-global-events";
import { animateEl, delay } from "@/modules/anim";
import { parseCamelCase } from "@/modules/parsers";
import { VolumeSensor } from "@/modules/VolumeSensor";
export default {
  components: {
    Card,
    VueSlider,
    GlobalEvents
  },
  mixins: [SetGenerator],
  data() {
    return {
      cards: [],
      cardIndex: 0,
      settingsOpen: false,
      showMenu: true,
      contentWidth: window.innerWidth,
      contentHeight: window.innerHeight,
      useAudio: false,
      setInfo: {
        name: "alphabetical",
        staticLetters: true,
        staticActions: false
      },
      settings: {
        cardSize: 200,
        cardMargin: 30,
        fontSize: 55
      },
      boundaries: {
        cardSize: [30, 580],
        cardMargin: [0, 100],
        fontSize: [25, 100]
      }
    };
  },
  computed: {
    cardSlots() {
      let { cardSize, cardMargin } = this.settings;
      let h = Math.floor(this.contentWidth / (cardSize * 0.8 + cardMargin * 2));
      let v = Math.floor(this.contentHeight / (cardSize + cardMargin * 2));
      return h * v;
    },
    shownCards() {
      let currentSet = Math.floor(this.cardIndex / this.cardSlots);
      let start = currentSet * this.cardSlots;
      return this.cards.slice(
        start,
        Math.min(start + this.cardSlots, this.cards.length)
      );
    },
    selectedIndex() {
      return this.cardIndex % this.cardSlots;
    },
    cardStyles() {
      let { cardSize, cardMargin, fontSize } = this.settings;
      return {
        width: cardSize * 0.8 + "px",
        height: cardSize + "px",
        fontSize: fontSize * 0.01 * cardSize + "%",
        margin: cardMargin + "px"
      };
    }
  },
  methods: {
    nextCard() {
      this.cardIndex < this.cards.length - 1 ? this.cardIndex++ : 0;
    },
    previousCard() {
      this.cardIndex > 0 ? this.cardIndex-- : 0;
    },
    scrollToCard(index) {
      let len = this.cards.length - 1;
      let position =
        (index / len) * (document.body.scrollHeight - window.innerHeight);
      window.scroll(0, position);
    },
    onResize() {
      //Necessary to select el because we are referring to a vue transition instance
      this.contentWidth = this.$refs.cards.$el.clientWidth;
      this.contentHeight = this.$refs.cards.$el.clientHeight;
    },
    async initAudio() {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
      } catch (err) {
        console.log("Could not use microphone becase", err);
        this.useAudio = false;
        return;
      }
      this.volumeSensor = new VolumeSensor(stream, this.$refs.audio);
      this.volumeSensor.onThresholdHit(() => this.nextCard());
    },
    async turnOnAudio() {
      await delay(500);
      if (!this.volumeSensor) await this.initAudio();
      this.useAudio = true;
      this.volumeSensor.listen();
    },
    turnOffAudio() {
      this.useAudio = false;
      this.volumeSensor.stop();
    },
    shuffle(e) {
      let mix = arr => {
        for (let i = 0; i < arr.length; i++) {
          let el = Math.round(Math.random() * (arr.length - 1));
          let dest = Math.round(Math.random() * (arr.length - 1));
          let temp = arr[dest];
          arr[dest] = arr[el];
          arr[el] = temp;
        }
        return arr;
      };

      let [letters, actions] = this.cards.reduce(
        (group, card) => {
          group[0].push(card.letter);
          group[1].push(card.action);
          return group;
        },
        [[], []]
      );
      if (!this.setInfo.staticLetters) letters = mix(letters);
      if (!this.setInfo.staticActions) actions = mix(actions);

      let vals = [letters, actions];
      let cards = [];
      for (let i = 0; i < letters.length; i++) {
        cards.push({ letter: letters[i], action: actions[i] });
      }
      this.cards = cards;

      animateEl(e.target, "spin");
      this.cardIndex = 0;
    },
    onScroll() {
      //steps through the card array
      requestAnimationFrame(() => {
        let i = Math.floor(
          Math.min(
            (window.scrollY /
              (document.body.scrollHeight - window.innerHeight)) *
              (this.cards.length - 1),
            this.cards.length - 1
          )
        );
        if (Math.abs(this.cardIndex - i) > 2) {
          return this.scrollToCard(this.cardIndex);
        }

        if (this.cardIndex != i) this.cardIndex = i;
      });
    }
  },
  filters: {
    parseCamelCase
  },
  created() {
    this.cards = this.generateAlphabeticalSet();
  },
  mounted() {
    if (this.$route.params.metadata) {
      this.cards = this.$route.params.set;
      this.setInfo = this.$route.params.metadata;
    }
    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss">
.exercise-page {
  padding: 20px;
  height: 100vh;

  .scroller {
    height: 500vh;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    .cards {
      flex-wrap: wrap;
      display: flex;
      width: 95%;
      height: calc(100vh - 50px);
      margin: 0 auto;

      &.centered {
        justify-content: center;
        align-items: center;
      }

      &-enter,
      &-leave-to {
        opacity: 0;
        transform: scale(0.8);
      }
      &-enter-active,
      &-leave-active {
        transition: opacity 0.7s, transform 0.7s;
      }

      &-leave-active {
        z-index: 0;
        position: absolute;
      }
    }

    nav {
      z-index: 2;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 15px 0;
      display: flex;
      justify-content: center;

      .divider {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        border: 1px solid rgb(233, 233, 233);
      }

      .icon {
        margin: 0 10px;
        cursor: pointer;
        transition: opacity 0.7s;

        &.spin {
          animation: spin 0.7s;
        }

        &.inactive {
          opacity: 0.5;
        }
      }
    }

    .layout-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 0;
      left: 0;
      background: white;

      width: 100%;

      .top-slot {
        width: 100%;
        margin-bottom: 20px;

        .divider {
          width: 80%;
          border: 1px solid var(--card-color);
        }

        .close-icon {
          cursor: pointer;
          width: 30px;
        }
      }
      .options {
        display: flex;

        .option {
          width: 33%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .grid-dimensions {
            input {
              display: inline-block;
              border: none;
              background: transparent;
              font-family: inherit;
            }
            p {
              display: inline-block;
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
}

.slide {
  &-enter,
  &-leave-to {
    transform: translateY(200%);
    opacity: 0.5;
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.7s;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
