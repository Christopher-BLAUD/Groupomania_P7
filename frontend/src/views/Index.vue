<template>
  <main>
    <div class="router-container">
      <nav>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/sign-up">Inscription</router-link>
      </nav>
    </div>
  </main>
</template>
<script>
export default {
  name: 'IndexPage'
}
</script>
<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

main{
    display: flex;
    justify-content: center;
    position: relative;
}
.router-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 150px 0;
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