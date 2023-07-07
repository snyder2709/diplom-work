<template>
    <div class="user">
        <span>{{ user.nickname }}</span>
        <font-awesome-icon @click="toogleUserPopup" class="icon" icon="fa-solid fa-arrow-down" />
        <img :src="user.avatar.medium" class="img-user" alt="#">
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const { commit, getters } = useStore();
const user = computed(() => getters['auth/getUser']);


const toogleUserPopup = () => {
    commit('popupState/toggleIsUserMenu');
}
</script>

<style lang="scss" scoped>
@import '@/assets/variable.scss';

.user {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 15px;
    justify-content: flex-end;

    span {
        color: rgba(255, 255, 255, 0.699);
        font-size: 12px;
    }

    .icon {
        font-size: .9em;
        color: white;
    }
}

.img-user {
    width: 42px;
    height: 42px;
    object-fit: contain;
    border-radius: 50%;
    cursor: pointer;

}
</style>