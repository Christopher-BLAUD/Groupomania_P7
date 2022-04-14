<template>
    <div class="comments">
        <div class="comments_title">
            <h2>Commentaires</h2>
        </div>
        <div class="comments_body">

            <div class="comments_body_message">
                <div class="comments_body_message_user-pic">
                    <img src="../assets/moi.png" alt="">
                </div>
                <div class="comments_body_message_user-txt">
                    <p>Lorem ipsum dolor sit amet. Ad possimus sapiente et unde minus et molestiae culpa eos nostrum impedit et molestias neque est perspiciatis dolore. Non sint cumque qui nihil voluptatem ut temporibus unde. Cum nihil maiores est fugit modi quo enim expedita non minima dolorem ad neque dicta eum rerum adipisci.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentPage'
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

.comments{
    min-height: 100vh;
    &_title{
        margin: 30px 0;
    }
    &_body{
        padding: 10px;
        &_message{
            display: flex;
            align-items: center;
            &_user-pic{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                margin-left: 20px;
                & img{
                    @include img-size
                }
            }
            &_user-txt{
                display: flex;
                text-align: start;
                padding: 15px;
                margin-left: 20px;
                width: 800px;
                & p{
                    word-break: break-all;
                }
            }
        }
    }
}
</style>