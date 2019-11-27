<template>
  <div class="page sets-page">
    <h1>Sets</h1>
    <ul class="sets">
      <li
        v-for="(details,set) in sets"
        @click="generateSet(set,details)"
        :key="set"
      >{{set | parseCamelCase}}</li>
    </ul>
    <img class="close" @click="$router.push('/')" src="@/assets/close.svg" alt="close" />
  </div>
</template>

<script>
import { parseCamelCase } from "@/modules/parsers";
import SetGenerator from "@/modules/SetGenerator";
export default {
  mixins: [SetGenerator],
  data() {
    return {
      sets: {
        alphabetical: {
          func: "generateAlphabeticalSet",
          staticLetters: true,
          staticActions: false
        },
        reverseAlphabetical: {
          func: "generateReverseAlphabeticalSet",
          staticLetters: true,
          staticActions: false
        },
        randomOrder: {
          func: "generateRandomSet",
          staticLetters: false,
          staticActions: false
        }
      }
    };
  },
  methods: {
    generateSet(setName, details) {
      let set = this[details.func]();
      let metadata = {
        setName,
        staticLetters: details.staticLetters,
        staticActions: details.staticActions
      };
      this.$router.push({ name: "exercise", params: { metadata, set } });
    }
  },
  filters: {
    parseCamelCase
  }
};
</script>

<style lang="scss">
.sets-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sets {
    padding: 15px;
    background: var(--card-color);
    border-radius: 7px;
    width: 500px;
    li {
      transition: letter-spacing 1s;

      &:hover {
        letter-spacing: 2px;
      }
    }
  }
  .close {
    width: 50px;
    cursor: pointer;
    margin: 20px auto;
  }
}
</style>