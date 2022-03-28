<template>
  <div class="login">
    <div class="login_form">
      <h2 class="login_form_title">Connectez-vous</h2>
    <form action="">
      <BaseInput type="email" name="email"  placeholder="Adresse email" id="form-email" @change="emailValidation()" />
      <span class="email-msg-err">Adresse email incorrect !</span>
      <div id="pass-container">
        <BaseInput type="password" name="password" placeholder="Mot de passe" id="form-password" />
        <i class="fas fa-eye" @click="showPassword()" id="eye"></i>
      </div>
      
      <button type="submit" class="submit-btn"><router-link to="/home">Se connecter</router-link></button>     
      <span class="id-msg-err"><i class="fa-solid fa-circle-xmark"></i> Identifiants inconnus</span>
    </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue"



let e = true;


export default {
  name: 'LoginPage',
  components: {
    BaseInput
    },
    methods: {
      showPassword() {
        const eye = document.querySelector('#eye');
        if(e){
          document.querySelector('#form-password').setAttribute("type", "text");
          eye.classList.replace("fa-eye", "fa-eye-slash");
          e = false;
        }
        else{
          document.querySelector('#form-password').setAttribute("type", "password");
          eye.classList.replace("fa-eye-slash", "fa-eye");
          e = true;
        }
      }
      }
    
}



</script>

<style lang="scss" scoped>
@import "../sass/utils/mixins";
.login{
  display: flex;
  justify-content: center;
  align-self: center;
  &_form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    border: 1px solid #ffffff24;
    border-radius: 15px;
    @include mobile{
      width: 300px;
    }
    &_title{
      color: #FDA054;
      margin: 30px 0;
      font-size: 20px;
    }
    & form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      align-items: center;
      margin-bottom: 20px;
      & span{
        display: inline-block;
        background-color: #FF0000;
        color: #ffff;
        padding: 5px;
        position: absolute;
        &.email-msg-err{
          visibility: hidden;
          top: 33px;
          left: 8px;
          &::after{
            content: "";
            position: absolute;
            bottom: -5px;
            left: 90px;
            width: 10px;
            height: 10px;
            background-color: #FF0000;
            transform: rotate(45deg);
          }
        }
        &.id-msg-err{
          visibility: hidden;
          position: absolute;
          bottom: 25px;
          background: none;
          color: #FF0000;
          font-weight: bold;
          & i{
            font-size: 20px;
          }
      }
      }
      & #pass-container{
        position: relative;
        & i{
          position: absolute;
          top: 25px;
          right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
.submit-btn {
    background-color: #42B72A;        
        border-radius: 10px;
        width: 200px;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 25px 0;
        & a{
          text-decoration: none;
          color: #ffff;
          font-weight: bold;
          font-size: 16px;
        }
}
 // Apparition des messages d'erreur
.reveal{
  visibility: initial!important;
}
</style>
