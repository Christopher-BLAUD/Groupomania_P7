<template>
<img src="../public/images/icon-above-font.png" alt="">
  <nav>
    <router-link to="/">Connexion</router-link>
    <router-link to="/about">Inscription</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 200px;
    background-color: #FFD7D7;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #F30000;
      background-color: #FFF1F1;
    }
  }
}

img{
  width: 200px;
  height: 200px;
}
</style>

