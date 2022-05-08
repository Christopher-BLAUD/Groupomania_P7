<template>
<div class="not-found">
    <router-link to="/login">
        <i class="fas fa-arrow-alt-circle-left"></i>
    </router-link>
    <div class="not-found_msg">
        <h2>404 Not found</h2>
        <p>Désolé, la page que vous avez demandée est introuvable ...
            <br> Assurez-vous d'avoir saisi vos identifiants de connexion
        </p>
    </div>
</div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style lang="scss" scoped>
@import "../sass/utils/mixins";

.not-found{
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    @include mobile{
        padding: 0 15px;
        margin-top: 30px;
    }
    & a{
        display: flex;
        justify-self: flex-start;
        text-decoration: none;
        font-size: 1.5em;
        margin: 0 30px;
        &:hover{
            color: darken(#fff, 25%);
        }
        @include mobile{
            margin: 30px 0;
        }
    }
    &_msg{
    margin: 80px 0;
    & h2{
        font-size: 7em;
        @include mobile{
            font-size: 2.5em;
        }
    }
    & p{
        font-size: 1.5em;
        @include mobile{
            font-size: 16px;

        }
    }
    }
}
</style>
