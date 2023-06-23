<template>
  <header>
    <AuthPopup v-if="isPopup">
      <button @click="isPopup = !isPopup">Закрыть</button>
    </AuthPopup>
    <div class="error" v-show="error">

    </div>
    <nav>
      <SearchGs />
      <div v-if="!isAuth">
        <button class="link login" @click="isPopup = !isPopup">Войти</button>
      </div>
      <template v-if="isAuth">
        <BadgeUser :id="getUser.steamID" :img="getUser.avatar.large" :nickName="getUser.nickname">
        </BadgeUser>
      </template>
    </nav>
  </header>
</template>

<script setup>
import SearchGs from '../componentUI/SearchGs.vue';
import AuthPopup from './AuthPopup.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
const { getters, dispatch } = useStore();
const isAuth = computed(() => getters['auth/getUser']);
const isPopup = ref(false);

onMounted(async () => {
  await dispatch('auth/fetchUser')
})

</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

header {
  position: fixed;
  z-index: 2;
  width: 100vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.438) 35%, transparent);

  nav {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px 20px;
    justify-content: space-between;
  }

  .login {
    background-color: rgba(0, 128, 0, 0.63);
    padding: 6px 12px;
  }
}
</style>