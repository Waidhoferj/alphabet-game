export default {
  data() {
    return {
      raf: -1,
      stream: null
    };
  },
  methods: {
    listen() {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const data = new Float32Array(analyser.frequencyBinCount);
      requestAnimationFrame(function test() {
        requestAnimationFrame(test);
        void analyser.getFloatFrequencyData(data);
        console.log(data);
      });
    }
  }
};
