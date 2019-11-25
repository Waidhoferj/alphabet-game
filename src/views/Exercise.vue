<template>
  <div class="page exercise-page" @keyup.space="cardIndex++">
    <global-events @keyup.right.space="nextCard" @keyup.left="previousCard">
    </global-events>
    <div class="content">
      <Card
        v-for="(card, i) in shownCards"
        :title="card.letter"
        :subtitle="card.action"
        :key="card.letter"
        :class="{ selected: selectedIndex == i }"
      ></Card>
    </div>
    <transition name="slide">
      <nav v-if="!settingsOpen">
        <img class="icon" src="@/assets/create-icon.svg" alt="create" />
        <img class="icon" src="@/assets/layout-icon.svg" alt="layout" />
        <img class="icon" src="@/assets/reset-icon.svg" alt="reset" />
        <img class="icon" src="@/assets/info-icon.svg" alt="info" />
      </nav>
      <div v-else class="layout-menu">
        <hr class="divider" />
        <div class="option">
          <vue-slider v-model="settings.cardSize"></vue-slider>
          <p>card size</p>
        </div>
        <div class="option">
          <div class="grid-dimensions">
            <input type="text" />
            <p>x</p>
            <input type="text" />
          </div>
        </div>
        <div class="option">
          <vue-slider v-model="settings.fontSize"></vue-slider>
          <p>card size</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Card from "@/components/Card";
import SetGenerator from "@/modules/SetGenerator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import GlobalEvents from "vue-global-events";
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
      settings: {
        gridCols: 3,
        gridRows: 3,
        cardSize: 200,
        fontSize: 30
      }
    };
  },
  computed: {
    shownCards() {
      let numCardsDisplayed = this.settings.gridCols * this.settings.gridRows;
      let currentSet = Math.floor(this.cardIndex / numCardsDisplayed);
      let start = currentSet * numCardsDisplayed;
      return this.cards.slice(
        start,
        Math.min(start + numCardsDisplayed, this.cards.length)
      );
    },
    selectedIndex() {
      return this.cardIndex % this.shownCards.length;
    },

    numberOfCards() {}
  },
  methods: {
    nextCard() {
      console.log("next");
      if (this.cardIndex < this.cards.length - 1) this.cardIndex++;
    },
    previousCard() {
      if (this.cardIndex > 0) this.cardIndex--;
    },
    updatePageSize() {
      console.log("page resized");
    }
  },
  created() {
    this.cards = this.generateAlphabeticalSet();
  }
};
</script>

<style lang="scss">
.exercise-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
  .content {
    padding: 30px;
    display: grid;

    grid-template-columns: repeat(var(--card-columns), 1fr);
    grid-gap: var(--grid-gap);
    width: min(100vh, 100vw);
    height: min-content;
  }

  nav {
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
    }
  }

  .layout-menu {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;

    .option {
      width: 33%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

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
</style>
