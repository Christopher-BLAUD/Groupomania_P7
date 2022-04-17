<template>
    <main>
        <div class="home-page">
            <div class="user-banner">
                <div class="user-banner_body">
                    <div class="user-banner_body_img-profil">
                        <img :src="userInfo.imageUrl" alt="photo de profil utilisateur">
                    </div>
                    <div class="user-banner_body_name">
                        <span>{{ userInfo.firstname }} {{ userInfo.lastname }} </span>
                    </div>
                    <div class="user-banner_body_action">
                        <div class="user-banner_body_action_edit-profil" @click="showModalProfil">
                            <i class="fas fa-user-cog"></i>
                        </div>
                        <div class="user-banner_body_action_disconnet" @click="disconnect">
                            <i class="fas fa-power-off"></i>
                        </div>
                    </div>
                </div>                
            </div>
            <ProfilModal v-if="$store.state.modalProfil" />
<!-- Main Page -->
            <section>
                <div class="user-msg">
                    <input v-model="message" type="text" name="message" id="" placeholder="Quoi de neuf aujourd'hui ?">
                    <button type="submit" @click="showModalPost"><i class="fas fa-link"></i> Poster !</button>
                </div>
                <PostModal v-if="$store.state.modalPost" />
<!-- Post -->
                <div v-for="post in userPost" :key="post.id" class="user-post">
                    <div class="user-post_header">
                        <div class="user-post_header_user-info">
                            <div class="user-post_header_pic">
                                <img :src="post.user.imageUrl" alt="Photo de profil du créateur du post">
                            </div>
                            <div class="user-post_header_info">
                                <div class="user-post_header_info_name">
                                    <span>{{ post.user.firstname }} {{ post.user.lastname }}</span>
                                </div>
                                <div class="user-post_header_info_date">
                                    <span>Le {{ post.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + post.createdAt.slice(11,16) }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="post.userId == userId" @click="deletePost(post.id)" class="user-post_header_delete">
                            <i class="far fa-trash-alt"></i>
                        </div>                        
                    </div>
                    <div class="user-post_body">
                        <div class="user-post_body_pic">
                            <img :src="post.image" alt="Image du post">
                            <div class="user-post_body_pic_action">
                                <!-- <div @click="likePost(post.id)" class="user-post_body_pic_action_like">
                                    <i class="far fa-heart" id="like-btn"></i>
                                </div> -->
                                <div @click="getComments(post.id)" class="user-post_body_pic_action_comment">
                                    <i class="far fa-comment" id="new-comment"></i>
                                    <span id="comment">Voir les commentaires</span>
                                </div>
                            </div>
                        </div>
                        <div class="user-post_body_legend">
                            <p>{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import ProfilModal from '../components/ProfilModal.vue'
import PostModal from '../components/PostModal.vue'

import axios from 'axios';



export default {
    name: 'HomePage',
    components: {ProfilModal, PostModal},
    data() {
        return {
            userInfo: {},
            userPost: [],
            postUser: [],
            userId: localStorage.getItem('id')
        }
    },
    mounted() {
        let id = localStorage.getItem('id')
        axios.get('http://localhost:3000/api/user/' + id)
            .then(response => {
                this.userInfo = response.data;
                this.$store.state.isUserConnected = true
                               
            })
            .catch(error => {
                console.log(error)
             });
        axios.get('http://localhost:3000/api/post')
            .then(res => {
                this.userPost = res.data;
                console.log(this.userPost)
            })
            .catch(error => {
                console.log(error)
             });
    },
    methods: {
        showModalProfil() {
            this.$store.commit('SHOW_MODAL_PROFIL');
        },
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },
        getComments(postId) {
            localStorage.setItem('postId', postId)
            this.$router.push({path: '/post/comments'})
        },
        disconnect() {
            localStorage.clear();
            this.$router.push({path: '/login'});
        },
        deletePost(id) {
            const token = localStorage.getItem('token');
            if(confirm('Êtes-vous sûr(e) de vouloir supprimer ce post ?'))
            axios.delete('http://localhost:3000/api/post/delete/' + id, {
                data: {
                    userId: localStorage.getItem('id')
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
        /* likePost(id) {
            const userId = localStorage.getItem('id');
            axios.post('http://localhost:3000/api/like/' + id, {userId})
            .then(res => console.log(res))
            .catch(error => console.log(error))
        } */
    }
}

</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";
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
    /* width: 400px; */
    padding: 15px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    position: relative;
    /* background-color: #0000001c; */
    border-radius: 15px;
    @include mobile{
        width: 330px;
        padding: 15px 0;
    }
    @include touch-pad{
        width: 530px;
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
            height: 90px;
            border-radius: 50%;
            overflow: hidden;
            @include mobile{
                align-self: center;
                margin: 40px;
                width: 150px;
                height: 150px;
            }
            @include touch-pad{
                align-self: center;
                margin: 30px;
                width: 150px;
                height: 150px;
            }
                & img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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
}
.user-msg{
        width: 700px;
        position: relative;
        margin: 50px 0;
        margin-left: 60px;
        background-color: #202020;
        border-radius: 25px;
        box-shadow: 11px 9px 21px #030202;
        overflow: hidden;
        position: relative;
        & button{
            @include button;
            position: absolute;
            top: 25%;
            right: 20px;
        }
        @include mobile{
            width: 350px;
            margin: 20px 0;
            border-radius: 15px;
            margin-left: 0;
        }
        @include touch-pad{
            width: 650px;
            margin: 30px 0;
        }
        & input{
            width: calc(100% - 180px);
            height: 50px;
            padding-left: 30px;
            padding-right: 150px;
            background-color: #202020;
            border: none;
            border-radius: 25px;
            color: #fff;
            font-family: $font;
            @include mobile{
                width: calc(100% - 115px);
                padding-left: 15px;
                padding-right: 100px;
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
    width: 840px;
    background-color: #202020;
    border-radius: 20px;
    margin: 30px 0;
    box-shadow: 11px 9px 21px #030202;
    padding: 0 15px;
    margin-left: 60px;
    @include mobile{
        width: calc(100% - 60px);
        margin-left: 0;
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
        &_user-info{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &_delete{
            cursor: pointer;
            &:hover{
                color: darken(#fff, 15%);
            }
        }
        &_pic{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin: 15px;
            & img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &_info{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            &_name{
                display: flex;
                font-weight: bold;
                color: $primary-color;
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
        &_pic{
            overflow: hidden;
            margin: 0 15px;
            height: 568px;
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
                padding: 0 10px;
                position: absolute;
                bottom: -1px;
                background-color: #00000066;
                backdrop-filter: blur(80px);
                width: calc(100% - 10px);
                height: 50px;
                & i{
                    text-decoration: none;
                    color: $primary-color;
                    font-size: 1.2em;
                    margin: 0 10px;
                    cursor: pointer;
                }
                & span{
                    font-size: 14px;
                    margin-right: 15px;
                }
                &_comment{
                    display: flex;
                    align-items: center;
                    color: $primary-color;
                }
            }
        }
        }
        &_legend{
            color: $primary-color;
            font-size: 18px;
            @include mobile{
                font-size: 16px;
            }
        }
    }

#comment{
    cursor: pointer;
}
</style>