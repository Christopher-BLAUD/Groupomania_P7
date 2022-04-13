<template>
    <aside class="post-modal">
                    <form id="post-form" enctype="multipart/form-data">
                        <div class="post-modal_edit">
                            <i class="fas fa-times" @click="showModalPost()"></i>
                            <h2>Créer une publication</h2>
                            <span>Votre message</span>
                                <textarea @change="showMessage()" v-model="message" name="" id="" cols="60" rows="10"></textarea>
                                <span>Joindre une image</span>
                                <div class="post-modal_edit_join">
                                    <button class="post-modal_edit_join_btn" @click.prevent="getPostFile()">Parcourir</button>
                                    <input @change="postAttachmentUploaded()" type="file" name="image" id="join-img" style="display:none">
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
            postAttachment: null,
            message: ""
        }
    },
    methods: {
        showMessage(){
            console.log(this.message);
        },
        showModalPost() {
            this.$store.commit('SHOW_MODAL_POST');
        },
        getPostFile() {
            document.querySelector('#join-img').click();
        },
        postAttachmentUploaded() {
            const inputFilePost = document.querySelector('#join-img');
            this.postAttachment = inputFilePost.files[0];
            console.log(this.postAttachment)
        },
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
            formDataPost.append('content', this.message);
            if(this.postAttachment !== null){
                axios.post('http://localhost:3000/api/post/create/' + userId, formDataPost, config)
                    .then((res) => {
                        console.log(res);
                        location.reload();
                    })
                    .catch((error) => console.log(error))
            }
            else {
                alert(`Votre post nécessite d'y ajouter une image !`)
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
        margin-top: 150px;
        width: 600px;
        height: 540px;
        background-color: $bg-modal;
        border-radius: 15px;
        overflow: hidden;
        transform-origin: center;
        animation: show-modal .5s ease-in-out both;
        @include mobile{
            width: 350px;
            height: 590px;
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
            margin: 30px;
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