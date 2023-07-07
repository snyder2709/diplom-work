<template>
  <header ref="header">
    <div class="header-wrapper">
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
        <template v-else>
          <BadgeUser >
          </BadgeUser>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import HeaderLink from '@/components/HeaderLink.vue';
import BadgeUser from '../componentUI/BadgeUser.vue';
import { useStore } from 'vuex';
import { computed,  onMounted, ref, onBeforeUnmount, watchEffect, onBeforeMount } from 'vue';
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
    commit('popupState/hideIsUserMenu'); 
    commit('search/upDateResultQuery', null);  
  }

  prevScrollPos = currentScrollPos;
};
dispatch('auth/fetchUser')


onMounted(() => {
  document.addEventListener('scroll', handleScroll)
 
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
  z-index: 5;
  width: 100vw;
  height: 60px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.801) 60%, transparent);
  transition: transform .4s ease-in-out;
  .header-wrapper{
    width: 100%;
    display: inherit;
    margin: 7px 1vw;
    justify-content: space-between;
    
  }
  .logo {
    width: 20%;
  }

  .auth-badge {
    display: flex;
    width: 20%;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  .login {
    background-color: rgba(0, 128, 0, 0.63);
    padding: 6px 12px;
  }
}</style>