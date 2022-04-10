<template>
    <main>
        <div class="home-page">
            <div class="user-banner">
                <div class="user-banner_body">
                    <div class="user-banner_body_img-profil">
                        <img :src="userInfo.imageUrl" alt="photo de profil utilisateur">
                    </div>
                    <div class="user-banner_body_name">
                        <span v-if="name">{{ userInfo.firstname }} {{ userInfo.lastname }} </span>
                        <span v-else>{{ pseudo }} BLAUD </span>
                    </div>
                    <div class="user-banner_body_action">
                        <div class="user-banner_body_action_edit-profil" @click="showModalProfil = !showModalProfil">
                            <i class="fas fa-user-cog"></i>
                        </div>
                    </div>
                </div>                
            </div>
<!-- Edit Profil Modal -->
            <aside v-if="showModalProfil" class="profil-modal">
                <div class="profil-modal_edit">
                    <div class="profil-modal_edit_title">
                        <h2>Modifier le profil</h2>
                        <i class="fas fa-times" @click="showModalProfil = !showModalProfil"></i>
                    </div>
                    <form id="form" enctype="multipart/form-data">
                        <div class="profil-modal_edit_pic">
                            <div class="profil-modal_edit_pic_info">
                                <h3>Photo de profil</h3>
                                <ModidyBtn @click.prevent="getFile()"/>
                                <input @change="imgUploaded()" type="file" name="avatar" id="user-avatar" style="display:none">
                            </div>
                            <div class="profil-modal_edit_pic_container">
                                <img :src="userInfo.imageUrl" id="user-img">
                            </div>    
                        </div>
                        <BaseButton value="Envoyer" @click.prevent="getUserAvatar()"/>
                    </form>
                </div>
            </aside>
<!-- Main Page -->
            <section>
                <div class="user-msg">
                    <input v-model="message" type="text" name="message" id="" placeholder="Quoi de neuf aujourd'hui ?">
                    <button type="submit" @click="showModalPost = !showModalPost"><i class="fas fa-link"></i> Poster !</button>
                </div>
<!-- Edit Post Modal -->
                <aside v-if="showModalPost" class="post-modal">
                    <div class="post-modal_edit">
                        <i class="fas fa-times" @click="showModalPost = !showModalPost"></i>
                        <h2>Créer une publication</h2>
                        <span>Votre message</span>
                        <textarea v-model="message" name="" id="" cols="60" rows="10"></textarea>
                        <span>Joindre une image</span>
                        <div class="post-modal_edit_join">
                            <button class="post-modal_edit_join_btn" @click="getFile()">Parcourir</button>
                            <input type="file" name="image" id="join-img" style="display:none">
                            <div class="post-modal_edit_join_img-preview">
                                <img src="../assets/smith_gifle.jpg" alt="">
                            </div>
                        </div>
                        <BaseButton value="Poster !" />
                    </div>
                </aside>
<!-- Post -->
                <div v-for="post in userPost" :key="post" class="user-post">
                    <div class="user-post_header">
                        <div class="user-post_header_pic">
                            <img :src="post.userProfilImg" alt="Photo de profil du créateur du post">
                        </div>
                        <div class="user-post_header_info">
                            <div class="user-post_header_info_name">
                                <span>{{ post.userFullname }}</span>
                            </div>
                            <div class="user-post_header_info_date">
                                <span>28 mars 2022</span>
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
                                <i class="far fa-comment" id="new-comment" @click="showModal = !showModal"></i>
                                <span id="comment" @click="show = !show">2</span>
                                </div>
                            </div>
                        </div>
                        <div class="user-post_body_legend">
                            <p>" {{ post.legend }} "</p>
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
                    <aside v-if="showModal" id="comment-modal" class="modal">
                        <div class="write-comment">
                            <div class="write-comment_user-pic">
                                <img src="../assets/moi.png" alt="">
                            </div>
                            <div class="write-comment_send">
                                <input type="text" placeholder="Ajoutez un commentaire ...">
                                <i class="fas fa-paper-plane" @click="showModal = !showModal"></i>
                            </div>
                            
                            </div>
                    </aside>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import ModidyBtn from '../components/ModifyButton.vue';
import BaseButton from '../components/BaseButton.vue';
import axios from 'axios';
let e = true;

export default {
    name: 'HomePage',
    components: {ModidyBtn, BaseButton},
    data() {
        return {
            show: false,
            showModal: false,
            showModalProfil: false,
            showModalPost: false,
            userInfo: {},
            userPost: {},
            avatar: null,
            nom: '',
            pseudo: '',
            name: true,
            message: ""
        }
    },
    mounted() {
        let id = localStorage.getItem('id')
        axios.get('http://localhost:3000/api/user/' + id)
            .then(response => {
                this.userInfo = response.data;
                
            })
            .catch(error => {
                console.log(error)
             });
        axios.get('http://localhost:3000/api/post')
            .then(res => {
                this.userPost = res.data;
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
        changeName() {
            this.name = false;
        },
        getFile() {
            document.querySelector('#user-avatar').click();
        },
        imgUploaded(){
            const inputFile = document.querySelector('#user-avatar')
            this.avatar = inputFile.files[0];
            console.log(this.avatar);
        },
        getUserAvatar() {
            const id = localStorage.getItem('id');
            const formData = new FormData();
            formData.append('image', this.avatar, this.avatar.name)
            axios.post('http://localhost:3000/api/user/images/' + id, formData)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
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
    @include touch-pad{
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
        width: 470px;
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

// Modals

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

.profil-modal{
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(4px);
    &_edit{
        min-width: 350px;
        position: absolute;
        top: 100px;
        left: 40%;
        background-color: $bg-modal;
        border-radius: 15px;
        padding: 20px;
        transform-origin: center;
        animation: show-modal .5s ease-in-out both;
        @include mobile{
            left: 20px;
            min-width: 300px;
        }
        &_title{
            position: relative;
            & h2{
                color: $primary-color;
            }
            & i{
                position: absolute;
                top: -19px;
                right: 5px;
                cursor: pointer;
            }
        }
        &_pic{
            display: flex;
            flex-direction: column;
            &_info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 15px 0;
            }
            &_container{
                display: flex;
                align-self: center;
                width: 100px;
                height: 100px;
                overflow: hidden;
                border-radius: 50%;
                & img{
                    @include img-size;
                }
            }
        }
        &_name{
            &_info{
                @extend .profil-modal_edit_pic_info
            }
            &_input{
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin: 15px 0;
                & label{
                    color: $primary-color;
                }
                & input{
                    border-radius: 15px;
                    padding: 7px;
                    padding-left: 10px;
                }
            }
        }
    }
}
.post-modal{
    display: flex;
    justify-content: center;
    backdrop-filter: blur(14px);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 1000;
    &_edit{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 150px;
        width: 600px;
        height: 650px;
        background-color: $bg-modal;
        border-radius: 15px;
        overflow: hidden;
        transform-origin: center;
        animation: show-modal .5s ease-in-out both;
        @include mobile{
            width: 350px;
            height: 800px;
        }
        & h2{
            margin: 30px 0;
        }
        & span{
            color: $primary-color;
            font-weight: bold;
            margin-top: 30px;
        }
        & p{
            height: 100px;
            padding: 20px;
            word-break: break-all;
            overflow-y: auto;
        }
        & textarea{
            background-color: #202020;
            border: none;
            resize: none;
            margin: 10px;
            color: #fff;
            font-family: $font;
            @include mobile{
                width: 340px;
            }
        }
        & i{
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
        }
        &_join{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 30px;
            @include mobile{
                flex-direction: column;
            }
            &_img-preview{
                margin: 0 40px;
                width: 230px;
                height: 150px;
                overflow: hidden;
                @include mobile{
                    width: 260px;
                    height: 230px;
                }
                & img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain
                }
            }
            &_btn{
                @include button;
                @include mobile{
                    margin-top: 10px;
                    margin-bottom: 30px;
                }
            }
        }
    }
}
// Animation 
@keyframes show-modal{
    from{
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
}
</style>