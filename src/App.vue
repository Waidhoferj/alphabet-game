<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --dark: #325c6f;
  --card-color: #f0f0f0;
  --card-font-size: 24px;
  --card-columns: 5;

  --grid-gap: 15px;
  text-align: center;
  color: var(--dark);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .page {
    width: 100%;
    height: 100vh;
    background: whitesmoke;
  }
}
</style>
