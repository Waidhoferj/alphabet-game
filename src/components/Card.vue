<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<script>
export default {
  props: ["title", "subtitle"]
};
</script>

<style lang="scss">
.card {
  padding: 15px;
  text-align: center;
  width: 100%;
  height: 100%;
  background: var(--card-color);
  border-radius: 15px;
  transition: all 0.7s;
  will-change: transition;

  &.selected {
    transform: scale(1.1);
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.16);
  }

  .title {
    font-size: calc(var(--card-font-size) * 1.3);
  }
  .subtitle {
    font-size: var(--card-font-size);
  }
}
</style>
