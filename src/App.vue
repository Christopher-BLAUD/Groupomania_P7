<template>
<div>
  <Header />
  <main>
    <div class="router-container">
      <nav>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/sign-up">Inscription</router-link>
      </nav>
      </div>
        <router-view/>
  </main>
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
  padding: 0;  
}

main{
  padding: 0 20px;
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
.router-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 80px;
  @include mobile{
    flex-direction: column;
    margin-top: 0;
  }
  nav{
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    @include mobile{
      flex-direction: row;
      padding: 0;
      margin: 60px 0;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 200px;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      text-decoration: none;
      margin: 30px 0;
      transition: all .2s ease-in-out;
      @include mobile{
        border: none;
        width: 150px;
      }
      &:hover{
        color: darken(#fff, 35%);
      }
      &.router-link-exact-active {
        color: $primary-color;
        font-size: 25px;
      }
    }
  }
}
</style>


