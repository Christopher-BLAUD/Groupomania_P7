<template>
    <main>
        <div v-if="userId" class="home-page">          
            <section class="user-banner">
                <div class="user-banner_body">
                    <div v-if="userInfo.imageUrl" class="user-banner_body_img-profil">
                        <img  :src="userInfo.imageUrl" alt="photo de profil utilisateur">
                    </div>
                    <div class="user-banner_body_name">
                        <span>{{ userInfo.firstname }} {{ userInfo.lastname }} </span>
                    </div>
                    <div class="user-banner_body_action">
                        <a href="#" tabindex="0" class="user-banner_body_action_edit-profil" @click.prevent="showModalProfil">
                            <i class="fas fa-user-cog" aria-label="Bouton modification du profil"></i>
                        </a>
                        <a class="user-banner_body_action_disconnet" @click.prevent="disconnect">
                            <i class="fas fa-power-off" aria-label="Bouton déconnexion"></i>
                        </a>
                    </div>
                </div>                
            </section>
            <ProfilModal v-if="$store.state.modalProfil" />
<!-- Main Page -->
            <section>
                <div class="user-msg">
                    <input v-model="$store.state.postMessage" type="text" name="message" id="" placeholder="Quoi de neuf aujourd'hui ?">
                    <button type="submit" @click="showModalPost"><i class="fas fa-link"></i> Poster</button>
                </div>
                <PostModal v-if="$store.state.modalPost" />
<!-- Post -->
                <div v-for="post in postInfo" :key="post.id" class="user-post">
                    <div class="user-post_header">
                        <div class="user-post_header_user-info">
                            <div class="user-post_header_pic">
                                <img :src="post.userAvatar" alt="Photo de profil du créateur du post">
                            </div>
                            <div class="user-post_header_info">
                                <div class="user-post_header_info_name">
                                    <span>{{ post.userFirstname }} {{ post.userLastname }}</span>
                                </div>
                                <div class="user-post_header_info_date">
                                    <span>Le {{ post.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + post.createdAt.slice(11,16) }}</span>
                                </div>
                            </div>
                        </div>
                        <a href="#" v-if="post.userId == userId || userInfo.isAdmin" @click.prevent="deletePost(post.id)" class="user-post_header_delete" aria-label="Supprimer le post">
                            <i class="far fa-trash-alt"></i>
                        </a>
                    </div>
                    <div class="user-post_body">
                        <div class="user-post_body_legend">
                            <p>{{ post.content }}</p>
                        </div>
                        <div v-if="post.image !== null" class="user-post_body_pic">
                            <img :src="post.image" alt="Image du post">
                        </div>
                            <div  class="user-post_body_pic_action">
                                <a href="#" @click.prevent="likePost(post)" class="user-post_body_pic_action_like">
                                    <i v-if="post.userWhoLiked == userId" class="fas fa-heart" id="full-heart" aria-label="Bouton j'aime"></i>
                                    <i v-else class="far fa-heart" id="empty-heart" aria-label="Bouton j'aime"></i>
                                    <span v-if="post.likesCount >= 1" id="like">{{ post.likesCount }}</span>
                                </a>
                                <a href="#" @click.prevent="getComments(post.id)" class="user-post_body_pic_action_comment">
                                    <i class="far fa-comment" aria-label="bouton commentaire"></i>
                                    <span v-if="post.commentsCount >= 1" id="comment">{{ post.commentsCount }}</span>
                                </a>
                            </div>
                    </div>
                </div>
            </section>
        </div>
            <NotFound v-else />
    </main>
</template>

<script>
import ProfilModal from '../components/ProfilModal.vue'
import PostModal from '../components/PostModal.vue'
import NotFound from '../components/404NotFound.vue'

import axios from 'axios';


export default {
    name: 'HomePage',
    components: {ProfilModal, PostModal, NotFound},
    data() {
        return {
            userInfo: {},
            postInfo: [],
            postUser: [],
            postLikes: [],
            userId: localStorage.getItem('id')
        }
    },
    mounted() {
        let id = localStorage.getItem('id')
       

        // Permet d'afficher les informations de l'utilisateur connecté
        axios.get('http://localhost:3000/api/user/' + id)
            .then(res => {
                this.userInfo = res.data;
                this.$store.state.isUserConnected = true;                               
            })
            .catch(error => {
                console.log(error)
             });

        // Affiche les 6 derniers posts 
        axios.get('http://localhost:3000/api/post/user/' + id)
            .then(res => {
                this.postInfo = res.data;
                console.log(this.postInfo)
            })
            .catch(error => {
                console.log(error)
             });

    },
    methods: {

        // Affiche le fenetre modal du profil
        showModalProfil() {
            this.$store.commit('SHOW_MODAL_PROFIL');
        },

        // Affiche le fenetre modal du post
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },

        // Renvoi vers la page commentaire du post concerné
        getComments(postId) {
            localStorage.setItem('postId', postId)
            this.$router.push({path: '/post/comments'})
        },

        // Déconnecte l'utilisateur
        disconnect() {
            localStorage.clear();
            this.$router.push({path: '/login'});
        },

        // Supprime un post en vérifiant si l'utilisateur à le status d'admin
        deletePost(id) {
            const token = localStorage.getItem('token');
            if(confirm('Êtes-vous sûr(e) de vouloir supprimer ce post ?'))
            axios.delete('http://localhost:3000/api/post/delete/' + id, {
                data: {
                    userId: localStorage.getItem('id'),
                    isAdmin: this.userInfo.isAdmin
                },
                headers: {
                    "Authorization": "Bearer " + token 
                }

            })
                .then(res => {
                    console.log(res);
                    location.reload();
                    })
                .catch((error) => console.log(error))
        },

        // Like le post concerné            
        likePost(post) {
            let postLiked = this.postInfo.find(p => p.id == post.id)
            const userId = parseInt(localStorage.getItem('id'), 10)

            axios.get('http://localhost:3000/api/like/post/' + post.id + '/user/' + userId)
                .then(res => {
                    let like = res.data;
                    if(like == null){
                        postLiked.likesCount++
                        postLiked.userWhoLiked = this.userId
                       axios.post('http://localhost:3000/api/like/post/' + post.id + '/user/' + userId)
                            .then(res => console.log(res))
                            .catch(error => console.log(error))
                    }
                    else {
                        postLiked.likesCount--
                        postLiked.userWhoLiked = !this.userId
                        axios.delete('http://localhost:3000/api/like/post/' + post.id + '/user/' + userId)
                            .then(res => console.log("Le like a bien été supprimé !", res))
                            .catch(error => console.log(error))
                    }
                })
                .catch(error => console.log(error))
        }
    }
}

</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";
a{
    color: #fff;
    text-decoration: none;
}

main{
    display: flex;
    justify-content: center;
    position: relative;
    @include mobile{
        padding: 0;
    }
}
.home-page{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 500px;
    font-family: $font;
    padding-bottom: 30px;
    @include mobile{
        width: 100%;
        align-items: center;
    }
}
.user-banner{
    min-height: 125px;
    padding: 15px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    position: relative;
    @include mobile{
        width: 330px;
        padding: 15px 0;
    }
    @include touch-pad{
        width: 530px;
        margin: 0!important;
    }
    &_body{
        display: flex;
        align-items: center;
        align-self: flex-start;
        margin-left: 20px;
        @include mobile{
            flex-direction: column;
            align-self: initial;
            margin-left: 0;
        }
        @include touch-pad{
            margin-left: 0;
        }
        @include large-screen{
            margin-top: 20px;
        }
        &_name{
            display: flex;
            text-align: start;
            justify-content: center;
            min-width: 165px;
            max-width: 170px;
            word-break: break-all;
            margin: 0 10px;
            color: $primary-color;
            font-weight: bold;
        }
        &_img-profil{
            display: flex;
            width: 90px;
            height: 110px;
            border-radius: 50%;
            overflow: hidden;
            @include mobile{
                align-self: center;
                margin: 40px;
                width: 150px;
                height: 170px;
            }
            @include touch-pad{
                align-self: center;
                margin: 30px;
                width: 150px;
                height: 170px;
            }
                & img{
                    @include img-size;
                }
            }
        &_action{
            display: flex;
            @include mobile{
                margin: 30px 0;
            }
                &_edit-profil{
                    background-color: #202020;
                    padding: 15px;
                    border-radius: 25px;
                    margin: 0 10px;
                    cursor: pointer;
                    transition: all .2s ease-in-out;
                    & a{
                        display: flex;
                        flex-direction: column;
                        color: $primary-color;
                        font-size: 1em;
                        text-decoration: none;
                        &:hover{
                            color: darken($primary-color, 25%);
                        }
                    }
                    &:hover{
                        transform: scale(1.3)
                    }
                    
                }
                &_disconnet{
                    @extend .user-banner_body_action_edit-profil;
                }
            }
    }
    @include touch-pad{
        flex-direction: column;
        margin: 70px 0;
    }
}
section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    @include mobile{
        margin: 0;
    }
}
.user-msg{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 700px;
        position: relative;
        margin: 50px 0;
        margin-left: 60px;
        background-color: #202020;
        border-radius: 25px;
        box-shadow: 11px 9px 21px #030202;
        overflow: hidden;
        & button{
            @include button;
            position: absolute;
            top: 25%;
            right: 20px;
            @include mobile{
                width: 85px;
            }
        }
        @include mobile{
            width: 300px;
            margin: 20px 0;
            border-radius: 15px;
            margin-left: 0;
        }
        @include touch-pad{
            width: 650px;
            margin: 30px 0;
            margin-bottom: 60px;
        }
        & input{
            width: 100%;
            height: 50px;
            padding-left: 30px;
            padding-right: 130px;
            background-color: #202020;
            border: none;
            border-radius: 25px;
            color: #fff;
            font-family: $font;
            @include mobile{
                padding-left: 15px;
                padding-right: 115px;
                font-size: 12px;
            }
            &::placeholder{
                color: rgba(255, 255, 255, 0.514);
                @include mobile{
                    color: #fff;
                }
            }
        }
    }

.user-post{
    position: relative;
    width: 840px;
    background-color: #202020;
    border-radius: 20px;
    overflow: hidden;
    margin: 30px 0;
    box-shadow: 11px 9px 21px #030202;
    margin-left: 60px;
    @include mobile{
        width: calc(100% - 60px);
        margin-left: 0;
        margin: 30px 0;
    }
    @include touch-pad{
        width: 80%;
        margin-left: 0;
    }
    &_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 0 15px;
        @include mobile{
            padding-left: 0;
        }
        &_user-info{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &_delete{
            cursor: pointer;
            margin-bottom: 15px;
            margin-right: 10px;
            @include mobile {
                margin-bottom: 5px;
                margin-right: 5px;
            }
            &:hover{
                color: darken(#fff, 15%);
            }
        }
        &_pic{
            width: 50px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin: 15px;
            & img{
                @include img-size;
            }
        }
        &_info{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            max-width: 500px;
            @include mobile{
                max-width: 170px;
            }
            &_name{
                display: flex;
                font-weight: bold;
                color: $primary-color;
                text-align: start;
                @include mobile{
                    word-break: break-all;
                }
            }
            &_date{
                display: flex;
                justify-content: flex-start;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.514);
            }
        }
    }
    &_body{
        position: relative;
        &_legend{
            display: flex;
            justify-content: center;
            font-size: 20px;
            margin: 15px 0;
            padding: 0 13px;
            @include mobile{
                font-size: 16px;
            }
        }
        &_pic{
            overflow: hidden;
            margin: 30px;
            height: 460px;
            border-radius: 15px;
            position: relative;
            & img{
                @include img-size;
                object-fit: contain!important;
            }
            @include mobile{
                margin: 0;
                height: auto;
            }
            &_action{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 10px;
                background-color: #00000066;
                backdrop-filter: blur(80px);
                height: 50px;
                & i{
                    text-decoration: none;
                    color: #20ff03;
                    font-size: 1.2em;
                    margin: 0 10px;
                    cursor: pointer;
                }
                & span{
                    font-size: 14px;
                    font-weight: bold;
                    margin-right: 15px;
                    color: #fff;
                }
                &_comment{
                    display: flex;
                    align-items: center;
                    color: $primary-color;
                }
                &_like{
                    display: flex;
                    & i{
                        color:rgb(255, 0, 0);
                    }
                }
            }
        }
        }
    }

#comment{
    cursor: pointer;
}


.change-icon{
    animation: switchIcon .5s ease-in-out both;
}

@keyframes switchIcon {
    from{
        transform: scale(0)
    }
    to{
        transform: scale(1)
    }
}
</style>