<template>
    <aside class="post-modal">
                    <form id="post-form" enctype="multipart/form-data">
                        <div class="post-modal_edit">
                            <a href="#" @click.prevent="showModalPost()">
                                <i class="fas fa-times"></i>
                            </a>
                            <h2>Créer une publication</h2>
                            <span>Votre message</span>
                                <textarea v-model="$store.state.postMessage" name="" id="" cols="60" rows="10"></textarea>
                                <span>Joindre une image</span>
                                <div class="post-modal_edit_join">
                                    <button class="post-modal_edit_join_btn" @click.prevent="getPostFile()">Parcourir</button>
                                    <input @change="postAttachmentUploaded()" type="file" name="image" id="join-img" style="display:none">
                                    <span id="attachment-name"></span>
                                </div>
                                <BaseButton @click.prevent="sendPost()" value="Poster !" />
                        </div>
                    </form>
                </aside>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import axios from 'axios';

export default {
    name: 'PostModal',
    components: {
        BaseButton
    },
    data() {
        return {
            postAttachment: null
        }
    },
    methods: {
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },

        // Utilisé pour styliser le input file
        getPostFile() {
            document.querySelector('#join-img').click();
        },

        // Enregiste le média dans une variable
        postAttachmentUploaded() {
            const inputFilePost = document.querySelector('#join-img');
            const attachmentName = document.querySelector('#attachment-name')
            this.postAttachment = inputFilePost.files[0];
            attachmentName.innerHTML = this.postAttachment.name
        },

        // Envoi le post en vérifiant qu'il contient au minimum du texte
        sendPost() {
            const userId = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Authorization": "Bearer " + token 
                }
            }

            const formDataPost = new FormData();
            formDataPost.append('image', this.postAttachment);
            formDataPost.append('content', this.$store.state.postMessage);
            if(formDataPost.get('content') == "") {
                alert('Attention, votre message est vide !');
            }
            else {
                axios.post('http://localhost:3000/api/post/create/' + userId, formDataPost, config)
                    .then((res) => {
                        console.log(res);
                        location.reload();
                    })
                    .catch((error) => console.log(error))
            }
        }
    }
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

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
        width: 600px;
        height: 550px;
        background-color: $bg-modal;
        border-radius: 15px;
        overflow: hidden;
        transform-origin: center;
        animation: show-modal .5s ease-in-out both;
        @include mobile{
            width: 310px;
            height: 530px;
        }
        @include touch-pad{
            height: 580px;
        }
        & h2{
            margin: 30px 0;
        }
        & span{
            color: $primary-color;
            font-weight: bold;
            margin-top: 30px;
            @include mobile{
                margin-top: 15px;
            }
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
            min-height: 150px;
            margin: 10px;
            color: #fff;
            @include mobile{
                width: 280px;
            }
        }
        & a{ 
            align-self: start;
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            @include mobile{
                top: 10px;
                right: 14px;
            }
        }
        &_join{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 30px;
            @include mobile{
                flex-direction: column;
                margin: 10px;
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

#attachment-name{
    margin-top: 0;
    margin-left: 15px;
    color: #fff;
    @include mobile{
        margin-left: 0;
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