<template>

  <div  class="container">
    <HeaderTop />
      <section>
        <MainBanner/>
      </section>
     <main :style="{ marginTop }" class="wrapper" >
      <HeaderMain  />
      <RouterView  @mouseenter=" () => marginTop = '10vh'" @mouseleave="() => marginTop = '60vh'"/>
    </main>
  </div>
  
</template>

<script setup>

import { ref } from 'vue';
import { RouterView } from 'vue-router'
import HeaderMain from '@/components/HeaderMain.vue'
import HeaderTop from '@/components/HeaderTop.vue';
import MainBanner from '@/components/MainBanner.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';


const store  = useStore();
const marginTop = ref('60vh');

const handleScroll = () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 0) {
    marginTop.value = '10vh';
  } else {
    marginTop.value = '60vh';
  }
};

onMounted( async () => {
  window.addEventListener('scroll', handleScroll);
  await store.dispatch('getTopGameForBanner')
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped lang="scss">
@import './assets/components-style/headBanner.scss';

main{
  transition: margin-top 0.3s ease;
}

</style>
