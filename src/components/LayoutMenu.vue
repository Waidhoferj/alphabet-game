<template>
  <div class="layout-menu">
    <hr class="divider" />
    <img src alt="close" />
  </div>
</template>

<script>
export default {
  props: ["settings"],
  methods: {
    updateSettings(event, setting, value) {
      //Reference issue?
      this.settings[setting] = value;
      this.$emit("input", this.settings);
    }
  }
};
</script>

<style lang="scss">
.layout-menu {
  height: 200px;
  width: 100%;
  display: flex;

  .divider {
    width: 80%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .font-size {
  }

  .grid-size {
  }
}
</style>