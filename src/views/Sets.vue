<template>
  <div class="page sets-page">
    <h1>Sets</h1>
    <ul class="sets">
      <li
        v-for="(funcName,set) in sets"
        @click="generateSet(funcName)"
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
        alphabetical: "generateAlphabeticalSet",
        reverseAlphabetical: "generateReverseAlphabeticalSet",
        randomOrder: "generateRandomSet"
      }
    };
  },
  methods: {
    generateSet(funcName, setName) {
      let set = this[funcName]();
      let metadata = {
        name: setName,
        staticLetters: true,
        staticActions: false
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