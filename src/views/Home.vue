<template>
    <main>
        <div class="home-page">
            <div class="user-banner">
                <div class="user-banner_img-profil">
                    <img src="../assets/moi.png" alt="photo de profil utilisateur">
                </div>
                <div class="user-banner_msg">
                    <input type="text" name="message" id="" placeholder="Quoi de neuf aujourd'hui ?">
                </div>
                <div class="user-banner_send-picture">
                    <a href=""><i class="fas fa-images"></i><span>Photo</span></a>
                </div>
            </div>
            <section>
                <div class="user-post">
                    <div class="user-post_header">
                        <div class="user-post_header_pic">
                            <img src="" alt="">
                        </div>
                        <div class="user-post_header_name">
                            <span></span>
                        </div>
                        <div class="user-post_header_date">
                            <span></span>
                        </div>
                    </div>
                    <div class="user-post_body">
                        <img src="" alt="">
                        <p></p>
                    </div>
                    <div class="user-post_footer">
                        <div class="user-post_footer_like-count">
                            <i class="fas fa-thumbs-up"></i>
                            <span></span>
                        </div>
                        <div class="user-post_footer_link">
                            <a href=""><i class="far fa-thumbs-up"></i> J'aime</a>
                            <a href=""><i class="far fa-comment"></i> Commenter</a>
                        </div>
                    </div>
                </div>
            </section>
            </div>
    </main>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped lang="scss">
@import "../sass/utils/variables";
main{
    display: flex;
    justify-content: center;
    position: relative;
}
.home-page{
    background-color: #000;
    width: 70%;
    min-height: 500px;
    border-radius: 10px;
    border: 2px solid #000;
    font-family: $font;
}
.user-banner{
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 2px solid #fff3;
    &_img-profil{
        position: absolute;
        left: 15px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden;
        & img{
            width: 100%;
            height: 100%;
        }
    }
    &_msg{
        width: 70%;
        & input{
            width: 100%;
            height: 2em;
            border-radius: 25px;
            padding-left: 15px;
            background-color: #000;
            border: 2px solid #fff3;
            color: #fff;
            font-family: $font;
            &::placeholder{
                color: #fff;
                
            }
        }
    }
    &_send-picture{
        position: absolute;
        right: 30px;
        & a{
            display: flex;
            flex-direction: column;
            color: $primary-color;
            font-size: 1.3em;
            text-decoration: none;
            &:hover{
                color: darken($primary-color, 25%);
            }
            & span{
                font-size: .6em;
                margin: 4px 0;
            }
        }
    }
}
</style>