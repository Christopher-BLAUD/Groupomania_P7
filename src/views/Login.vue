<template>
  <div class="login">
    <div class="login_form">
    <form action="">
      <input type="email" name="email" placeholder="Adresse email">
      <span class="email-msg-err">Adresse email incorrect !</span>
      <div id="pass-container">
        <input type="password" name="password" placeholder="Mot de passe" id="form-password">
        <i class="fa-solid fa-eye"></i>
      </div>
      <input type="submit" value="Se connecter" class="submit-btn">      
      <span class="id-msg-err"><i class="fa-solid fa-circle-xmark"></i> Identifiants inconnus</span>
    </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage'
}

</script>

<style lang="scss" scoped>
.login{
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
      flex-direction: column;
      justify-content: center;
      position: relative;
      align-items: center;
      height: 340px;
      & input{
        padding: 8px;
        width: 250px;
        margin: 15px 0;
        border: 1px solid #0000003b;
        border-radius: 3px;
        padding-right: 40px;
      }
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
 // Apparition des messages d'erreur
.reveal{
  visibility: initial!important;
}
</style>
