export class VolumeSensor {
  constructor(stream, controller) {
    this.stream = stream;
    let context = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = context.createAnalyser();
    let source = context.createMediaStreamSource(stream);
    this.controller = context.createMediaElementSource(controller);
    source.connect(this.analyser);
    // source.connect(this.controller);

    this.analyser.fftSize = 4096;
    let bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    this.raf = -1;
    this.threshold = 0;
    this.debounceTimer = -1;
    this.thresholdCallbacks = [];
  }
  listen() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let padding = 0;
    this.threshold = this.rms(this.dataArray) + padding;
    console.log("Threshold", this.threshold, "analyser:", this.analyser);
    this.raf = setInterval(() => {
      this.analyser.getByteTimeDomainData(this.dataArray);
      let soundLevel = this.rms(this.dataArray);
      if (soundLevel > this.threshold) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.thresholdCallbacks.forEach(func => func());
        }, 50);
      }
    }, 2);
  }
  rms(arr) {
    let sum = 0;
    for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
      sum += arr[i] * arr[i];
    }
    return Math.sqrt(sum / this.analyser.frequencyBinCount);
  }
  stop() {
    clearInterval(this.raf);
    clearTimeout(this.debounceTimer);
    console.log("off");
  }
  onThresholdHit(func) {
    this.thresholdCallbacks.push(func);
  }
  clearCallbacks() {
    this.thresholdCallbacks = [];
  }
}

function debounce(func, delay) {
  var debounceTimer;
  console.log("ran");
  return () => {
    console.log("inised");
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };
}
