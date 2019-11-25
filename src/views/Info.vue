<template>
  <div class="info-page">
    <div class="content">
      <h1>The Alphabet Game</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta accusamus
        expedita voluptas. Quos amet, possimus soluta libero suscipit officiis ut
        reiciendis? Inventore illum, suscipit ea nemo qui non saepe quia!
      </p>
      <button @click="$router.push('/')">Play</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.info-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    text-align: center;
    max-width: 700px;

    button {
      margin-top: 30px;
    }
  }
}
</style>
