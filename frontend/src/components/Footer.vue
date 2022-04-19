<template>
  <footer>
      <div class="footer">
      <ul class="footer_list">
        <li>A propos</li>
        <li>Politique de Confidentialité</li>
        <li>Politique relative aux cookies</li>
      </ul>
      <span class="footer_copyright"><i class="fa-solid fa-copyright"></i> 2022 Groupomania, Inc</span>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'FooterMod'
}
</script>

<style lang="scss">
@import "../sass/utils/mixins";
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 260px;
  color: #fff;
  font-size: 14px;
  @include mobile{
    flex-direction: column;
    align-items: flex-start;
  }
  &_copyright{
    margin-right: 20px;
    @include mobile{
      padding: 0;
      margin: 5px;
      }
  }
  &_list{
    display: flex;
    padding: 0;
    @include mobile{
      padding: 0 15px;
      flex-wrap: wrap;
      justify-content: center;
      text-align: start;
    }
    & li{
      margin: 0 15px;
      list-style: none;
      @include mobile{
        margin: 10px;
      }
    }
  }
}
</style>