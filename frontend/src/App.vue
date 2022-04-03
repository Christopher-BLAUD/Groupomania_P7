<template>
<div id="app">
  <Header />
  <router-view></router-view>
  <Footer />
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: { Header, Footer }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&family=Roboto:wght@100;300;500&display=swap');
@import "./sass/utils/mixins";
@import "./sass/utils/variables";



body{
  background: $bg;
  box-sizing: border-box;
  margin: 0;
}

main{
  @include touch-pad{
    margin-bottom: 450px;
  }
}
#app {
  font-family: montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  position: relative;
}

</style>


