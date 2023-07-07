<template>
        <div class=" user-link">
            <div class="user-menu">
                <ul>
                    <li class="link"><RouterLink to="/profile">Мой профиль</RouterLink></li>
                    <li class="link" @click="logOut">Выйти</li>
                </ul>
            </div>
        </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const { getters,dispatch,commit } = useStore();
const user = computed(() => getters['auth/getUser']);

function logOut() {
    dispatch('logout/logout');
    commit('auth/resetUser');
    commit('popupState/hideIsUserMenu');
}
</script>

<style lang="scss" scoped>
 @import '@/assets/variable.scss';
.user-link {
        position: absolute;
        top: 50px;
        right: 75px;
        z-index: 5;
        width: 120px;
        height: 80px;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 5%;
        
    }

    .user-menu {
        color: white;
        font-size: .8em;
        font-weight: 100;
        background-color: rgba(0, 0, 0, 0.678);
        border-radius: 5px;
        box-shadow:  0px 0px 15px -5px #000000;
        cursor: pointer;

        li {
            font-size: inherit;
            font-weight: inherit;
        }
    }
</style>