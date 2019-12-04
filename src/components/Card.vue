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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: var(--card-color);
  border-radius: 15px;
  transition: transform 0.7s, box-shadow 0.7s;
  will-change: transition;

  &.selected {
    transform: scale(1.1);
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.16);
  }

  .title {
    font-size: 2em;
  }
  .subtitle {
    font-size: 1.3em;
  }
}
</style>
