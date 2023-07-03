<template>
  <header ref="header">
    <div class="logo">
      <!-- game-site -->
    </div>
    <HeaderLink />
    <div class="error" v-show="error">

    </div>
    <nav class="auth-badge">
      <div v-if="!isAuth">
        <button class="link login" @click="handlePopup">Войти</button>
      </div>
      <template v-if="isAuth">
        <BadgeUser :id="getUser.steamID" :img="getUser.avatar.large" :nickName="getUser.nickname">
        </BadgeUser>
      </template>
    </nav>
  </header>
</template>

<script setup>
import HeaderLink from '@/components/HeaderLink.vue';
import { useStore } from 'vuex';
import { computed,  onMounted, ref, onBeforeUnmount, watchEffect } from 'vue';
const { getters, dispatch, commit } = useStore();
const isAuth = computed(() => getters['auth/getUser']);
const header = ref(null);

let prevScrollPos = window.pageYOffset;



const handlePopup = () => {
  commit('popupState/toggleIsAuthPopup');
} 

const handleScroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    header.value.style.transform = 'translateY(0)';
  } else {
    header.value.style.transform = `translateY(-${window.innerHeight * 0.5}px)`;
  }

  prevScrollPos = currentScrollPos;
};
onMounted(async () => {
  document.addEventListener('scroll', handleScroll)
  await dispatch('auth/fetchUser')
})
onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  width: 100vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.801) 60%, transparent);
  transition: transform .4s ease-in-out;

  .logo {
    width: 20%;
  }

  .auth-badge {
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
}</style>