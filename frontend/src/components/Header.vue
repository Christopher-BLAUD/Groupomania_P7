<template>
    <header class="header-logo">
        <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania">
    </header>
</template>

<script>
export default {
    name: 'HeaderMod'
}
</script>

<style lang="scss">
@import "../sass/utils/mixins";

.header-logo{
    display: flex;
    justify-content: flex-end;
    padding: 30px;
    margin: 0 10px;
    @include mobile{
        justify-content: center;
    }
    & img{
        width: 252px;
        height: 41px;
        @include mobile{
          width: 290px;
        }
    }
}
</style>