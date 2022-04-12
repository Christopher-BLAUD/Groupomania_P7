<template>
    <aside class="profil-modal">
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
                        </div>
                        <BaseButton value="Envoyer" @click.prevent="getUserAvatar()"/>
                    </form>
                </div>
            </aside>
</template>

<script>
import ModidyBtn from '../components/ModifyButton.vue';
import BaseButton from '../components/BaseButton.vue';
import axios from 'axios';

export default {
    name: 'ProfilModal',
    components: {
        ModidyBtn,
        BaseButton
    },
    datat() {
        return {
            avatar: null,
            showModalProfil: false
        }
    },
    methods: {
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
            const formDataUser = new FormData();
            formDataUser.append('image', this.avatar, this.avatar.name)
            axios.post('http://localhost:3000/api/user/images/' + id, formDataUser)
            .then((res) => {
                console.log(res)
                location.reload();
            })
            .catch((error) => console.log(error))
        }
    }
}
</script>

<style lang="scss">
@import "../sass/utils/variables";
@import "../sass/utils/mixins";

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
@keyframes show-modal{
    from{
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
}
</style>
