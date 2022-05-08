<template>
    <div class="comments">
        <div class="comments_title">
            <div class="comments_title_come-back">
                <router-link @click="clearStorage()" to="/home">
                    <i class="fas fa-arrow-alt-circle-left"></i>
                    <span>Retour au fil d'actualité</span>
                </router-link>
            </div>
            <h2 v-if="comments.length >= 1">Commentaires</h2>
        </div>
        <div class="comments_body">
            <div v-if="comments.length == 0" class="comments_body_no-comments">
                <span>Aucun commentaire pour le moment.</span>
            </div>
            <div v-else v-for="comment in comments" :key="comment.id" class="comments_body_message">
                <div class="comments_body_message_header">
                    <a href="#" v-if="comment.userId == userId || userInfo.isAdmin" @click.prevent="deleteComment(comment.id)" class="comments_body_message_delete">
                        <i class="far fa-trash-alt"></i>
                    </a>
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
            <input class="comments_add_input" v-model="comment" type="text" name="comment" placeholder="Ajoutez un commentaire ...">
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
            userInfo: {},
            userId: localStorage.getItem('id')
        }
    },
    mounted() {
        let postId = localStorage.getItem('postId');

        // Affiche tous les commentaires liés au post
        axios.get('http://localhost:3000/api/comment/post/' + postId)
            .then(res => {
                this.comments = res.data;
                this.hasComments = true
            })
            .catch(error => console.log(error));
        let id = localStorage.getItem('id')

        // Importe les informations de l'utilisateur pour vérifier son status
        axios.get('http://localhost:3000/api/user/' + id)
            .then(response => {
                this.userInfo = response.data;
                               
            })
            .catch(error => {
                console.log(error)
             });
    },
    methods: {

        // Supprime le commentaire concerné en vérifiant le status de l'utilisateur 
        deleteComment(id){
            const token = localStorage.getItem('token')
            axios.delete('http://localhost:3000/api/comment/delete/' + id, {
                headers: {
                    "Authorization": "Bearer " + token 
                },
                data: {
                    userId: localStorage.getItem('id'),
                    isAdmin: this.userInfo.isAdmin
                }
            })
                .then(res => {
                    console.log('Commentaire supprimé !', res);
                    location.reload();
                    })
                .catch(error => console.log(error));
        },

        // Envoi un nouveau commentaire
        sendComment() {
            const userId = localStorage.getItem('id');
            const postId = localStorage.getItem('postId');
            const token = localStorage.getItem('token');
            let comment = this.comment;
            if(comment == "") {
                alert(`Attention votre commentaire est vide `)
            }
            else {
                axios.post('http://localhost:3000/api/comment/create', {userId, postId, comment}, {
                    headers: {
                        "Authorization": "Bearer " + token 
                    }
                })
                    .then(res => {
                        console.log(res);
                        location.reload();
    
                        })
                    .catch(error => console.log(error))
            }
        },
        clearStorage() {
            localStorage.removeItem('postId');
        }
    }
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

a{
    color: #fff ;
}
.comments{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    &_title{
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        margin: 30px 0;
        color: $primary-color;
        @include mobile{
            margin-bottom: 0;
        }
        &_come-back{
            position: absolute;
            left: 0;
            & a{
                display: flex;
                align-items: center;
                margin: 0 15px;
                font-size: 1.5em;
                color: #fff;
                cursor: pointer;
                text-decoration: none;
                & span{
                    margin: 0 10px;
                    font-size: 12px;
                    color: #fff;
                    @include mobile{
                        display: none;
                    }
                }
            }
        }
    }
    &_body{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-top: 60px;
        @include mobile{
            margin-left: 0;
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
                    width: 240px;
                    text-align: start;
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
        &_no-comments{
            display: flex;
            width: 100%;
            justify-content: center;
            margin-bottom: 30px;
            font-size: 20px;
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
                width: 320px;
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
                    right: 30px;
                }
            }
        }
}

</style>