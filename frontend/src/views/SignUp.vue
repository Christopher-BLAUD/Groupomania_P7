<template>
  <div class="register">
  <Navi />
  <div class="sign-up">
    <div class="sign-up_form">
    <form action="">
      <h2 class="info">Créer un compte</h2>
      <input v-model="lastName" type="text" name="last-name" placeholder="Nom" id="lastName" @input="lastNameValidation()"/>
      <span class="lastname-err-msg">Nom incorrect</span>
      <input v-model="firstName" type="text" name="first-name" placeholder="Prénom" id="firstName" @input="firstNameValidation()" />
      <span class="firstname-err-msg">Prénom incorrect</span>
      <input v-model="email" type="email" name="email" placeholder="Adresse email" id="email" />
      <!-- <span class="email-err-msg">Format d'adresse email incorrect (ex: jean.dupont@gmail.com)</span> -->
      <div id="pass-container">
        <input v-model="password" type="password" name="password" placeholder="Mot de passe" id="form-password" @input="passwordValidation()"/>
        <i class="fas fa-eye" @click="showPassword()" id="eye"></i>
        <span class="pass-msg-err">Votre mot de passe doit commencer par une majuscule et contenir <strong>au moins 8 caractères</strong> <br> ( dont au moins <strong>2 chiffres</strong> )</span>
      </div>
        <BaseButton value="S'inscrire" @click.prevent="createUser()"/>   
        <span class="user-msg-err">Adresse email déja liée à un compte utilisateur</span>   
    </form>
    </div>
  </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue"
import Navi from '../components/Navi.vue'
import axios from 'axios'

// Définition des Regex
const passwordRegex = /^[A-Z][a-z]{5,}[0-9]{2,}/;
const nameRegex = /[a-zA-Z\- éèàëïäüêâê']{2,}/;


let e = true;
export default {
  name: 'SignUp',
  components: {
    BaseButton,
    Navi,
    },
    data() {
      return {
        lastName: "",
        firstName: "",
        password: "",
        email: ""
      }
    },
    methods: {
      
      // Affiche le mot de passe en clair dans le champs
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
      // Contrôle de le saisie formulaire
      lastNameValidation() {
        if(nameRegex.test(this.lastName) || this.lastName === ""){
          document.querySelector('.lastname-err-msg').classList.remove('reveal');
        }
        else{
          document.querySelector('.lastname-err-msg').classList.add('reveal');
        }
      },
      firstNameValidation() {        
        if(nameRegex.test(this.firstName) || this.firstName === ""){
          document.querySelector('.firstname-err-msg').classList.remove('reveal');
        }
        else{
          document.querySelector('.firstname-err-msg').classList.add('reveal');
        }
      },
      passwordValidation() {
        if(passwordRegex.test(this.password) || this.password === ""){
          document.querySelector('.pass-msg-err').classList.remove('reveal');
        }
        else{
          document.querySelector('.pass-msg-err').classList.add('reveal');
        }
      },
      // Redirection vers la page Login quand le compte a été crée
      loginRedirection() {
        if(this.lastName !== "" && this.firstName !== "" && this.email && this.password !== "") {
          alert('Votre compte a été créé avec succès !')
          this.$router.push({path: '/login'})
        } 
      },
      createUser() {
        const existingUser = document.querySelector('.user-msg-err')
        if(nameRegex.test(this.lastName) && nameRegex.test(this.firstName) && passwordRegex.test(this.password) && this.lastName !== '' && this.firstName !== '' && this.email !== '' && this.password !== ''){
        axios.post('http://localhost:3000/api/user/signup', {
          lastname: this.lastName,
          firstname: this.firstName,
          email: this.email,
          password: this.password
      })
      .then((response) => {
        console.log(response)
        this.$router.push({path: '/login'});
        })
      .catch(err => {
        console.log(err)
        existingUser.classList.add('reveal')
        });
      }
      else{
        alert('Merci de compléter tous les champs du formulaire')
      }
      }
    }}

</script>

<style lang="scss" scoped>
@import "../sass/utils/mixins";
@import "../sass/utils/variables";

.register{
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
.user-msg-err{
          visibility: hidden;
          background: none!important;
          color: #FF0000!important;
          font-weight: bold;
          & i{
            font-size: 20px;
          }
      }
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
    &_avatar{
      background-color: darken($primary-color, 10%) ;
      padding: 10px;
      min-width: 190px;
      color: #fff;
      font-weight: bold;
      font-family: $font;
    }
    @include mobile{
      width: 300px;
    }
    & form{
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
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
      & span{
        display: inline-block;
        background-color: #FF0000;
        color: #ffff;
        width: 250px;
        padding: 5px;
        &.pseudo-err-msg{
          visibility: hidden;
          top: 288px;
          right: 324px;
          &::after{
            @include left-arrow(37px)
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
      & label{
        margin-top: 30px;
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
    &::after{
      @include left-arrow(51px)
    }
}
.lastname-err-msg{
  visibility: hidden;
  position: absolute;
  right: 323px;
  top: 115px;
  &::after{
      @include left-arrow(11px);
    }
}
.firstname-err-msg{
  visibility: hidden;
  position: absolute;
  right: 323px;
  top: 183px;
  &::after{
      @include left-arrow(9px);
    }
}
.show-img{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px 0;
  border: none;
  & img{
    @include img-size;
  }
}
 // Apparition des messages d'erreur
.reveal{
  visibility: initial!important;
}
</style>


