<template>
  <div  class="container">
    <transition name="fade">
      <AuthPopup v-if="isAuthPopup">
      </AuthPopup>
    </transition>
    <HeaderTop />
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
import { useStore } from 'vuex';

const {getters,commit,dispatch} =  useStore();
const isAuthPopup = computed(()=>getters['popupState/isAuthPopup']);


</script>

<style scoped lang="scss">
</style>
