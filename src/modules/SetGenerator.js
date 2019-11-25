export default {
  computed: {
    alphabet() {
      let alphabet = [];
      for (let i = 65; i < 91; i++) {
        alphabet.push(String.fromCharCode(i));
      }
      return alphabet;
    }
  },
  methods: {
    generateAlphabeticalSet() {
      return this.alphabet.map(letter => ({
        letter,
        action: this.randomAction()
      }));
    },
    generateReverseAlphabeticalSet() {
      return this.alphabet.reverse().map(letter => ({
        letter,
        action: this.randomAction()
      }));
    },
    generateRandomSet() {
      let alphabet = [...this.alphabet];
      let rSet = [];
      for (let j = 0; j < 26; j++) {
        let i = Math.min(
          (Math.random() * alphabet.length) >> 0,
          alphabet.length - 1
        );
        rSet.push({
          letter: alphabet.splice(i, 1),
          action: this.randomAction()
        });
      }
      return rSet;
    },
    randomAction() {
      let actions = ["L", "R", "T"];
      let i = Math.min((Math.random() * 3) >> 0, 2);
      return actions[i];
    }
  }
};
