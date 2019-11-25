export default {
  data() {
    return {
      pageWidth: window.innerWidth,
      pageHeight: window.innerHeight
    };
  },
  methods: {
    onResize() {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
    },
    trackViewport() {
      window.addEventListener("resize", this.onResize);
    },
    stopTrackingViewport() {
      window.removeEventListener("resize", this.onResize);
    }
  }
};
