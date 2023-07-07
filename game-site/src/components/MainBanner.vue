
<template>
    <section>
        <swiper-container
        effect='fade' 
        ref="swiper"
        :autoplay="autoplayOptions"
        navigation="true"
        loop="true">
            <swiper-slide  class="slide" v-for="(game, index ) of bannerData" :key="index">
                <router-link class="head-link" :to="`/app/${game.steam_appid}`">
                    <div class="background-raw">
                        <img :src="game.background_raw" @error="(e) => e.target.src = game.background">
                    </div>
                    <div class="info-wrapper">
                        <div class="info">
                            <h2>
                                {{ game.name }}
                            </h2>
                            <p>
                                {{ game.short_description }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </swiper-slide>
        </swiper-container>
    </section>
</template>
  
<script setup>
import { register } from 'swiper/element/bundle';
import 'swiper/css/navigation';
import { onMounted, ref, computed, watchEffect,onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import 'swiper/scss/effect-fade';

register();
const route = useRoute();
const store = useStore();
const bannerData = computed(() => store.getters.getDataBanner);
console.log(route.path)
const  autoplayOptions = {
        delay: 5000,
        disableOnInteraction: true, 
    }

const swiper = ref(null);

const pauseAutoplay = () => {
    console.log('pause')
    swiper.value.swiper.autoplay.stop();
};

const resumeAutoplay = () => {
    console.log('resume')
    swiper.value.swiper.autoplay.start();
};


const handleScroll = () => {
  const bannerRect = swiper.value.getBoundingClientRect();
  if (bannerRect.top < 0) {
    const opacity = 0.9 - Math.abs(bannerRect.top) / bannerRect.height;
    swiper.value.style.filter = `brightness(${opacity})`;
  } else {
    swiper.value.style.filter = 'brightness(1)';
  }
};


onMounted( async ()=>{
    await store.dispatch('getTopGameForBanner')
    swiper.value.addEventListener('mouseenter',pauseAutoplay);
    swiper.value.addEventListener('mouseleave',resumeAutoplay);
    document.addEventListener('scroll', handleScroll);
    console.log(swiper.value.swiper)
})
onBeforeUnmount(()=>{
    swiper.value.removeEventListener('mouseenter',pauseAutoplay);
    swiper.value.removeEventListener('mouseleave',resumeAutoplay);
    document.removeEventListener('scroll', handleScroll);
})

</script>
  
<style lang="scss" scoped>
@import '@/assets/components-style/banner.scss';


</style>
  