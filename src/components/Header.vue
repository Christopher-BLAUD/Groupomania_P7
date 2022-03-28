<template>
    <div class="header-logo">
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania">
    </div>
</template>

<script>
export default {
    name: 'HeaderMod'
}
</script>

<style lang="scss">
@import "../sass/utils/mixins";

.header-logo{
    margin-top: 20px;
    & img{
        width: 334px;
        height: 65px;
        @include mobile{
          width: 290px;
        }
    }
}
</style>