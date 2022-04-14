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
                                <i class="far fa-comment" id="new-comment" @click="getComments(post.id)"></i>
                                <span id="comment"></span>
                                </div>
                            </div>
                        </div>
                        <div class="user-post_body_legend">
                            <p>{{ post.content }}</p>
                        </div>
                        <div class="user-post_body_add-comment">
                                <input v-model="comment" type="text" name="comment" placeholder="Ajoutez un commentaire ...">
                                <button type="submit" @click="sendComment(post.id)">Publier</button>
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
            comment: "",
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
        sendComment(postId) {
            const userId = localStorage.getItem('id');
            let comment = this.comment;
            axios.post('http://localhost:3000/api/comment/create', {userId, postId, comment})
                .then(res => console.log(res))
                .catch(error => console.log(error))
            console.log(userId)
            console.log(postId)
            console.log(this.comment)
        },
        showModalProfil() {
            this.$store.commit('SHOW_MODAL_PROFIL');
        },
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },
        getComments(postId) {
            const userId = localStorage.getItem('id');
            this.$store.state.commentUserId = userId
            this.$store.state.commentPostId = postId
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
        &_add-comment{
            display: flex;
            position: relative;
            justify-content: center;
            margin: 30px 0;
            & input{
                width: 500px;
                height: 35px;
                padding-left: 15px;
                margin: 0 30px;
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
                right: 200px;
                border: none;
                background-color: transparent;
                font-weight: bold;
                font-family: $font;
                color: $primary-color;
                cursor: pointer;
                @include mobile{
                    right: 28px;
                }
            }
        }
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