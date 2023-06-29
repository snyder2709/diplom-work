<template>
  <header>
    <div class="logo">
      game-site
    </div>
    <HeaderLink/>
    <transition name="fade">
    <AuthPopup v-if="isPopup">
        <closeButtonVue text="CLOSE" @click="isPopup = !isPopup"/>
    </AuthPopup>
  </transition>
    <div class="error" v-show="error">

    </div>
    <nav class="auth-badge">
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
import AuthPopup from './AuthPopup.vue';
import closeButtonVue from '@/componentUI/closeButton.vue';
import HeaderLink from '@/components/HeaderLink.vue';
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
@import '@/assets/main.scss';
@import '@/assets/components-style/transition-class.scss';
header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 4;
  width: 100vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.765) 35%, transparent);
  .logo{
    width: 20%;
  }
  .auth-badge{
    display: flex;
    width: 20%;
    flex-wrap: nowrap;
    padding: 10px 20px;
    justify-content: flex-end;
  }
  .login {
    background-color: rgba(0, 128, 0, 0.63);
    padding: 6px 12px;
  }
}
</style>