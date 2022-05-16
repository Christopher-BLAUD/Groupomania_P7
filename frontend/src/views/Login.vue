<template>
<div class="connect">
  <Navi />
  <div class="login">
    <div class="login_form">
      <h2 class="login_form_title">Connectez-vous</h2>
    <form action="">
      <input v-model="email" type="email" name="email"  placeholder="Adresse email" id="form-email" />
      <span class="email-msg-err">Adresse email incorrect !</span>
      <div id="pass-container">
        <input v-model="password" type="password" name="password" placeholder="Mot de passe" id="form-password" @input="passwordValidation()" />
        <i class="fas fa-eye" @click="showPassword()" id="eye"></i>
        <span class="pass-msg-err">Votre mot de passe doit commencer par une majuscule et contenir <strong>au moins 8 caractères</strong> <br> ( dont au moins <strong>2 chiffres</strong> )</span>
      </div>
      <BaseButton value="Se connecter" @click.prevent="login()" />     
      <span class="id-msg-err"><i class="fa-solid fa-circle-xmark"></i> Identifiants inconnus</span>
    </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import BaseButton from "../components/BaseButton.vue"
import Navi from '../components/Navi.vue'
const passwordRegex = /^[A-Z][a-z]{5,}[0-9]{2,}/;
let e = true;

export default {
  name: 'LoginPage',
  components: {
    Navi, BaseButton
    },
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {

      // Affiche le mot de passe en clair
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
      },

      // Connexion à l'application
      login(){
        const unknowId = document.querySelector('.id-msg-err');
        if(passwordRegex.test(this.password) && this.email !== "" && this.password !== "") {
          axios.post('http://localhost:3000/api/user/login', {
            email: this.email,
            password: this.password
          })
          .then((response) => {
            localStorage.setItem('id', response.data.userId)
            this.$store.state.currentUserId = response.data.userId;
            localStorage.setItem('token', response.data.token)
            this.$router.push({name: 'home'})
          })
          .catch(error => {
            console.log(error);
            unknowId.classList.add('reveal');
            });
        }
      },

      // Contrôle du mot de passe
      passwordValidation() {
        if(passwordRegex.test(this.password) || this.password === ""){
          document.querySelector('.pass-msg-err').classList.remove('reveal');
        }
        else{
          document.querySelector('.pass-msg-err').classList.add('reveal');
        }
      }
      }   
}
</script>

<style lang="scss" scoped>
@import "../sass/utils/mixins";

.connect{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 200px;
  @include mobile{
    flex-direction: column;
    margin: 0;
  }
  @include touch-pad{
    flex-direction: column;
    margin-top: 115px;
  }
}

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
      & input{
        padding: 10px;
        width: 250px;
        margin: 15px 0;
        border: 1px solid #0000003b;
        border-radius: 25px;
        padding-right: 40px;
        @include mobile{
          width: 200px;
        }
      }
      & span{
        display: inline-block;
        background-color: #FF0000;
        color: #ffff;
        min-width: 250px;
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
          bottom: -17px;
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
            color: #000;
          }
      }
    }
  }
}
.pass-msg-err{
  position: absolute;
  visibility: hidden;
  background-color: #FF0000;
  padding: 15px;
  bottom: -27px;
  right: 309px;
  text-align: center;
  @include mobile{
    bottom: 67px;
    right: -18px;
  }
  @include touch-pad{
    bottom: 67px;
    right: -18px;
  }
    &::after{
      @include left-arrow(54px);
      @include mobile{
        @include bottom-arrow;
      }
      @include touch-pad{
        @include bottom-arrow;
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
