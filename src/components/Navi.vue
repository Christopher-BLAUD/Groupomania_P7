<template>
    <nav>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/sign-up">Inscription</router-link>
    </nav>
</template>
<script>
export default {
  name: 'NaviMod'
}
</script>
<style lang="scss">
@import "../sass/utils/mixins";
@import "../sass/utils/variables";
    nav{
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    @include mobile{
      flex-direction: row;
      padding: 0;
      margin: 60px 0;
    }
    @include touch-pad{
        flex-direction: row;
        margin: 30px 0;
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
</style>