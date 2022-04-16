<template>
    <div class="comments">
        <div class="comments_title">
            <h2>Commentaires</h2>
        </div>
        <div class="comments_body">
            <div v-for="comment in comments" :key="comment.id" class="comments_body_message">
                <div class="comments_body_message_header">
                    <div v-if="comment.user.id == userId" @click="deleteComment(comment.id)" class="comments_body_message_delete">
                        <i class="far fa-trash-alt"></i>
                    </div>
                    <div class="comments_body_message_user-pic">
                        <img :src="comment.user.imageUrl" alt="photo du créateur du commentaire">
                    </div>
                </div>
                <div class="comments_body_message_user-txt">
                    <p>{{ comment.content }}</p>
                </div>
            </div>
        </div>
        <div class="comments_add">
            <input v-model="comment" type="text" name="comment" placeholder="Ajoutez un commentaire ...">
            <button type="submit" @click="sendComment()">Publier</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CommentPage',
    data() {
        return {
            comments: [],
            comment: "",
            commentsCount: null,
            userId: localStorage.getItem('id')
        }
    },
    mounted() {
        let postId = localStorage.getItem('postId');
        axios.get('http://localhost:3000/api/comment/post/' + postId)
            .then(res => {
                this.comments = res.data;
                this.hasComments = true
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteComment(id){
            const token = localStorage.getItem('token')
            axios.delete('http://localhost:3000/api/comment/delete/' + id, {
                headers: {
                    "Authorization": "Bearer " + token 
                },
                data: {
                    userId: localStorage.getItem('id')
                }
            })
                .then(res => {
                    console.log('Commentaire supprimé !', res);
                    location.reload();
                    })
                .catch(error => console.log(error));
        },
        sendComment() {
            const userId = localStorage.getItem('id');
            const postId = localStorage.getItem('postId');
            let comment = this.comment;
            axios.post('http://localhost:3000/api/comment/create', {userId, postId, comment})
                .then(res => {
                    console.log(res);
                    location.reload();

                    })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

.comments{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    &_title{
        margin: 30px 0;
        color: $primary-color;
    }
    &_body{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        @include mobile{
            margin-left: 0;
            width: 320px;
        }
        &_message{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
            &_header{
                display: flex;
                align-items: center;
            }
            &_user-pic{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                max-height: 80px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 20px;
                @include mobile{
                    width: 40px;
                    height: 40px
                }
                & img{
                    @include img-size;
                }
            }
            &_user-txt{
                display: flex;
                font-weight: lighter;
                @include mobile{
                    font-size: 14px;
                }

            }
            &_delete{
                margin-left: 20px;
                cursor: pointer;
                @include mobile{
                    font-size: .8em;
                    margin-left: 10px;
                }
            }
        }
    }
    &_add{
            display: flex;
            position: relative;
            align-self: center;
            justify-content: center;
            margin: 30px 0;
            width: 500px;
            @include mobile{
                width: 365px;
            }
            & input{
                width: 100%;
                height: 35px;
                padding-left: 15px;
                border-radius: 20px;
                background-color: #363434;
                border: none;
                color: #fff;
                @include mobile{
                    width: 255px;
                    margin: 0;
                }
                &::placeholder{
                    color: #fff;
                    font-family: $font;
                    font-weight: lighter;
                }
            }
            & button{
                position: absolute;
                top: 27%;
                right: 10px;
                border: none;
                background-color: transparent;
                font-weight: bold;
                font-family: $font;
                color: $primary-color;
                cursor: pointer;
                @include mobile{
                    right: 57px;
                }
            }
        }
}
</style>