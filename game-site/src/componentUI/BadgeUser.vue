<template>
    <RouterLink :to="id" class="user-href">
        <div class=" user-link">
            <span>{{nickName}}</span>
            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-down" />
            <div class="user-menu">
                <ul>
                    <li class="link">Мой профиль</li>
                    <li class="link">Выйти</li>
                </ul>
            </div>
        </div>
        <div  class="img" :style="{backgroundImage:`url(${img})`}"></div>
    </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    props: {
        img: {
            type: String,
        },
        nickName: {
            type: String,
        },
        id: {
            type: String,
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/variable.scss';
.user-href {
    display: flex;
    margin: 0 1vw;
    padding: 0 2vw;
    .user-link{
        position: relative;
        display: flex;
        align-items: center;
        gap: 5%;
        font-weight: 100;
        .icon{
            font-size: 0.7em;
            color: white;
        }
        .user-menu{
            color: white;
            top: 90%;
            font-size: 0.7em;
            position: absolute;
            background-color: #7763002b;
            box-shadow: $shadow-gold-glass-inset, 0px 0px 10px -5px #776400;
            li{
                font-size: inherit;
                font-weight: inherit;
            }
        }
    }
    span{
        color: white;
    }

    .img {
        width: 5vw;
        height: 6vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 10%;
        
    }
}
</style>