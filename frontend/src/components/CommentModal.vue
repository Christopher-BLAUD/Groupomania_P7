<template>
    <aside id="comment-modal" class="modal">
                        <div class="write-comment">
                            <div class="write-comment_user-pic">
                                <img src="../assets/moi.png" alt="">
                            </div>
                            <div class="write-comment_send">
                                <input type="text" placeholder="Ajoutez un commentaire ...">
                                <i class="fas fa-paper-plane" @click="showModalComment"></i>
                            </div>
                            
                            </div>
                    </aside>
</template>

<script>
export default {
    name: 'CommentModal',
    methods: {
        showModalComment() {
            this.$store.commit('SHOW_MODAL_COMMENT');
        },
    }
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";


#comment-modal{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(14px);
  & .write-comment{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: 400px;
    margin: 100px auto;
    background-color: $bg-modal;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    transform-origin: center;
    animation: show-modal .5s ease-in-out both;
    @include mobile{
        width: 290px;
        margin: 50px auto;
    }
    &_user-pic{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 10px;
        @include mobile{
            display: none;
        }
        & img{
            @include img-size;
        }
    }
    & input{
        margin: 0 10px;
        height: 60px;
        width: 250px;
        border: none;
        border-radius: 15px;
        padding-left: 15px;
        padding-right: 35px;
        font-family: $font;
        background-color: transparent;
        color: #fff;
        &::placeholder{
            color: #fff;
        }
        @include mobile{
            width: 200px;
        }
    }
    &_send{
        position: relative;
        & i{
            position: absolute;
            right: 26px;
            top: 22px;
            color: $primary-color;
            cursor: pointer;
        }
    }
  }
}
@keyframes show-modal{
    from{
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
}
</style>
