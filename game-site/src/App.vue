<template>
  <div class="container">
    <transition name="fade">
      <AuthPopup v-if="isAuthPopup">
      </AuthPopup>
    </transition>
    <HeaderTop />
    <transition name="fade">
      <UserMenuPopup v-if="isUserMenuPopup" />
    </transition>
    <transition name="fade">
      <SearchResPopup v-if="isQueryList" />
    </transition>
      <RouterView />
      <Footer></Footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import HeaderTop from '@/components/HeaderTop.vue';
import Footer from './components/Footer.vue';
import AuthPopup from './components/AuthPopup.vue';
import UserMenuPopup from './components/UserMenuPopup.vue';
import SearchResPopup from './componentUI/SearchResPopup.vue';
import { useStore } from 'vuex';

const {getters,commit,dispatch} =  useStore();
const isAuthPopup = computed(()=>getters['popupState/isAuthPopup']);
const isUserMenuPopup = computed(()=>getters['popupState/isUserMenu']);
const isQueryList = computed(() => getters['search/getResultQuery']);


</script>

<style scoped lang="scss">
@import '@/assets/components-style/transition-class.scss';
</style>
