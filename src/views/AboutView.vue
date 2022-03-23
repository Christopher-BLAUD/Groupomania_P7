<template>
  <div class="sign-up">
    <div class="sign-up_form">
    <form action="">
      <p class="info">Créer un compte</p>
      <input type="text" name="pseudo" placeholder="Pseudo">
      <span class="pseudo-err-msg">Votre pseudo ne peut contenir que des caractères alphanumériques et les signes "., -, _"</span>
      <input type="email" name="email" placeholder="Adresse email">
      <span class="email-err-msg">Format d'adresse email incorrect (ex: jean.dupont@gmail.com)</span>
      <input type="password" name="password" placeholder="Mot de passe">
      <span class="password-err-msg">Le mot de passe doit être composé de 8 caractères minimum, commencé par une majuscule et contenir des chiffres</span>
      <input type="submit" value="S'incrire" class="submit-btn">      
    </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-up{
  display: flex;
  justify-content: center;
  align-items: center;
  &_form{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    background-color: #FFF1F1;
    & form{
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400px;
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
        &::after{
          content: "";
          border: 1px solid #0000001f;
          width: 100px;
          margin: 10px 0;
        }
      }
      & input{
        padding: 8px;
        margin: 10px 0;
        width: 250px;
        border: 1px solid #0000003b;
        border-radius: 3px;
      }
      & .submit-btn{
        background-color: #42B72A;
        color: #ffff;
        font-weight: bold;
        font-size: 16px;
        border-radius: 10px;
        width: 200px;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 25px 0;
      }
    }
  }
}

 // Apparition des messages d'erreur
.reveal{
  visibility: initial!important;
}
</style>
