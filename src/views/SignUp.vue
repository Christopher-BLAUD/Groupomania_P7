<template>
  <div class="sign-up">
    <div class="sign-up_form">
    <form action="">
      <h2 class="info">Créer un compte</h2>
      <BaseInput type="text" name="pseudo" placeholder="Pseudo" />
      <span class="pseudo-err-msg">Votre pseudo ne peut contenir que des caractères alphanumériques et les signes "., -, _"</span>
      <BaseInput type="email" name="email" placeholder="Adresse email" />
      <span class="email-err-msg">Format d'adresse email incorrect (ex: jean.dupont@gmail.com)</span>
      <div id="pass-container">
        <BaseInput type="password" name="password" placeholder="Mot de passe" id="form-password" />
        <i class="fas fa-eye" @click="showPassword()" id="eye"></i>
      </div>
      <span class="password-err-msg">Le mot de passe doit être composé de 8 caractères minimum, commencé par une majuscule et contenir des chiffres</span>
      <BaseButton value="S'inscrire" />      
    </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../sass/utils/mixins";
.sign-up{
  display: flex;
  justify-content: center;
  align-items: center;
  &_form{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    border: 1px solid #ffffff24;
    border-radius: 15px;
    @include mobile{
      width: 300px;
    }
    & form{
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400px;
      & #pass-container{
        position: relative;
        & i{
          position: absolute;
          top: 25px;
          right: 10px;
          cursor: pointer;
        }
      }
      & span{
        display: inline-block;
        background-color: #FF0000;
        color: #ffff;
        width: 250px;
        padding: 5px;
        position: absolute;
        &.pseudo-err-msg{
          visibility: hidden;
          top: 50px;
          &::after{
            content: "";
            position: absolute;
            bottom: -5px;
            left: 60px;
            width: 10px;
            height: 10px;
            background-color: #FF0000;
            transform: rotate(45deg);
          }
        }
        &.email-err-msg{
          visibility: hidden;
          bottom: 125px;
          left: 10px;
          &::after{
            content: "";
            position: absolute;
            top: -5px;
            left: 60px;
            width: 10px;
            height: 10px;
            background-color: #FF0000;
            transform: rotate(45deg);
          }
        }
        &.password-err-msg{
          visibility: hidden;
          bottom: 37px;
          &::after{
            content: "";
            position: absolute;
            top: -5px;
            left: 60px;
            width: 10px;
            height: 10px;
            background-color: #FF0000;
            transform: rotate(45deg);
          }
        }
      }
      & .info{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        color: #FDA054;
        &::after{
          content: "";
          border: 1px solid #ffffff4f;
          width: 100px;
          margin: 10px 0;
        }
      }
    }
  }
}

 // Apparition des messages d'erreur
.reveal{
  visibility: initial!important;
}
</style>

<script>
let e = true;
export default {
  name: 'SignUp',
  components: {
    BaseInput,
    BaseButton
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

import BaseInput from "../components/BaseInput.vue"
import BaseButton from "../components/BaseButton.vue"

</script>
