<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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

  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.7s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
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
}

.page {
  width: 100%;
  height: 100vh;
}

button {
  background: var(--card-color);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 15px;
  font-family: inherit;
}

h1 {
  font-weight: 300;
  font-size: 60px;
  margin: 20px auto;
}

ul {
  list-style: none;
  padding: 0;

  li {
    padding: 0;
    font-size: 20px;
    margin: 13px 0;
    cursor: pointer;
  }
}
</style>
