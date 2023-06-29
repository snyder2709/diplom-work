<template>

  <div  class="container">
    <HeaderTop />
      <section>
        <MainBanner/>
      </section>
     <main  class="wrapper" >
      <RouterView />
    </main>
  </div>
  
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderTop from '@/components/HeaderTop.vue';
import MainBanner from '@/components/MainBanner.vue';
</script>

<style scoped lang="scss">
@import './assets/components-style/headBanner.scss';

main{
  transition: margin-top 0.3s ease;
}

</style>
