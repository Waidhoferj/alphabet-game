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
      let lastActions = [null, null];
      let action;
      let sameAction = prev => prev === action;
      return this.alphabet.map(letter => {
        action = this.randomAction();
        while (lastActions.every(sameAction)) {
          action = this.randomAction();
        }
        lastActions[1] = lastActions[0];
        lastActions[0] = action;
        return {
          letter,
          action
        };
      });
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
        let i = Math.round(Math.random() * (alphabet.length - 1));
        rSet.push({
          letter: alphabet.splice(i, 1)[0],
          action: this.randomAction()
        });
      }
      return rSet;
    },
    randomAction() {
      let actions = ["L", "R", "T"];
      let i = Math.round(Math.random() * 2);
      return actions[i];
    }
  }
};
