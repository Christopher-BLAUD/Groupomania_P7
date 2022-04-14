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
                    <div class="user-post_body">
                        <div class="user-post_body_pic">
                            <img :src="post.image" alt="Image du post">
                            <div class="user-post_body_pic_action">
                                <div class="user-post_body_pic_action_like">
                                    <i class="far fa-heart" id="like-btn" @click="likeIt()"></i>
                                    <span>{{ post.like }}</span>
                                </div>
                                <div class="user-post_body_pic_action_comment">
                                <i class="far fa-comment" id="new-comment" @click="showComments"></i>
                                <span id="comment"></span>
                                </div>
                            </div>
                        </div>
                        <div class="user-post_body_legend">
                            <p>{{ post.content }}</p>
                        </div>
                            <div class="user-post_body_comments" v-if="show">
                                <div v-for="comment in post.comments" :key="comment" class="user-post_body_comment-container">
                                    <div class="user-post_body_comment-container_user-pic">
                                        <img :src="comment.userPicture" alt="Photo de profil du créateur du commentaire">
                                    </div>
                                    <div class="user-post_body_comment-container_username">
                                        <span>{{ comment.userName }}</span>
                                        <p>{{ comment.message }}</p>
                                    </div>
                                </div>                               
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
let e = true;

export default {
    name: 'HomePage',
    components: {ProfilModal, PostModal},
    data() {
        return {
            show: false,
            userInfo: {},
            userPost: [],
            postUser: []
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
        likeIt() {
            const heart = document.querySelector('#like-btn');
            if(e){
                heart.classList.replace("far", "fas");
                e = false;
                this.like++
            }
            else{
                heart.classList.replace("fas", "far");
                e = true;
                this.like--
            }
        },
        showModalProfil() {
            this.$store.commit('SHOW_MODAL_PROFIL');
        },
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },
        showComments() {
            this.$router.push({path: '/post/comments'})
        },
        disconnect() {
            localStorage.clear();
            this.$router.push({path: '/login'});
        }
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
    @include large-screen{
        flex-direction: row;
        justify-content: space-between;
        padding-right: 100px;
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
    background-color: #0000001c;
    border-radius: 15px;
    @include mobile{
        width: 330px;
        padding: 15px 0;
    }
    @include touch-pad{
        width: 530px;
    }
    @include large-screen{
        justify-content: flex-start;
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
    width: 900px;
    background-color: #202020;
    border-radius: 20px;
    margin: 30px 0;
    box-shadow: 11px 9px 21px #030202;
    padding: 0 15px;
    @include mobile{
        width: calc(100% - 60px);
    }
    @include touch-pad{
        width: 80%;
    }
    &_header{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
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
            border-radius: 15px;
            position: relative;
            & img{
                @include img-size;
            }
            @include mobile{
                margin: 0;
            }
            &_action{
                display: flex;
                align-items: center;
                padding: 0 10px;
                position: absolute;
                bottom: 0;
                background-color: #00000066;
                backdrop-filter: blur(4px);
                width: 100%;
                height: 40px;
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
            }
        }
        &_comments{
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        &_comment-container{
            display: flex;
            align-items: center;
            @include mobile{
                margin: 20px 0;
            }
            &_user-pic{
                width: 60px;
                min-width: 30px;
                height: 60px;
                overflow: hidden;
                border-radius: 50%;
                margin: 15px;
                @include mobile{
                    align-self: center;
                    margin: 0;
                    margin-bottom: 0;
                    width: 30px;
                    height: 30px
                }
                & img{
                    @include img-size;
                }
            }
            & p{
                font-size: 15px;
                font-weight: lighter;
            }
            &_username{
            display: flex;
            align-items: center;
            & span{
                margin: 0 10px;
                color: $primary-color;
                @include mobile{
                    text-align: start;
                }
            };
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
}
#comment{
    cursor: pointer;
}
</style>