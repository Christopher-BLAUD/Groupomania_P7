<template>
    <aside class="profil-modal">
                <div class="profil-modal_edit">
                    <div class="profil-modal_edit_title">
                        <h2>Modifier le profil</h2>
                        <a href="#" @click.prevent="showModalProfil">
                            <i class="fas fa-times" ></i>
                        </a>                                
                    </div>
                    <form id="form" enctype="multipart/form-data">
                        <div class="profil-modal_edit_pic">
                            <div class="profil-modal_edit_pic_info">
                                <h3>Photo de profil</h3>
                                <ModidyBtn @click.prevent="getFile()"/>
                                <input @change="imgUploaded()" type="file" name="avatar" id="user-avatar" style="display:none">
                            </div>
                                <span id="attachment-name"></span>
                        </div>
                        <BaseButton value="Envoyer" @click.prevent="getUserAvatar()"/>
                        <button class="delete-account" type="submit" @click.prevent="deleteAccount">Supprimer votre compte</button>
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
            avatar: null
        }
    },
    methods: {

        // Utilisé pour styliser le input file
        getFile() {
            document.querySelector('#user-avatar').click();
        },

        // Enregistre l'image dans une variable
        imgUploaded(){
            const inputFile = document.querySelector('#user-avatar');
            const attachmentName = document.querySelector('#attachment-name')
            this.avatar = inputFile.files[0];
            console.log(this.avatar)
            attachmentName.innerHTML = this.avatar.name
        },

        // Assigne une image au profil de l'utilisateur 
        getUserAvatar() {
            const userId = localStorage.getItem('id');
            const formDataUser = new FormData();
            const token = localStorage.getItem('token');
            formDataUser.append('image', this.avatar, this.avatar.name)
            const config = {
                headers: {
                    "Authorization": "Bearer " + token 
                }
            }
            axios.post('http://localhost:3000/api/user/images/' + userId, formDataUser, config)
            .then((res) => {
                console.log(res)
                location.reload();
            })
            .catch((error) => console.log(error))
        },
        showModalProfil() {
            this.$store.commit('SHOW_MODAL_PROFIL');
        },

        // Supprime le compte de l'utilisateur connecté
        deleteAccount() {
            const userId = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Authorization": "Bearer " + token 
                }
            }
            if(confirm('Cette action est irréversible. Êtes-vous sûr ?')){
                axios.delete('http://localhost:3000/api/user/delete-account/' + userId, config)
                .then(() => {
                        localStorage.clear();
                        this.$router.push({path: 'login'});
                })
                .catch(error => console.log(error))
            }
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
        width: 350px;
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
            width: 250px;
        }
        &_title{
            position: relative;
            & h2{
                color: $primary-color;
            }
            & a{
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
                & h3{
                    @include mobile{
                        font-size: 16px;
                    }
                }
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

form{
    display: flex;
    flex-direction: column;
    & .delete-account{
        background-color: #f61100;
        align-self: center;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        font-family: $font;
        border-radius: 10px;
        width: 200px;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 25px 0;
        transition: all .2s ease-in-out;
            &:hover{
              transform: scale(1.1);
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
</style>
