
<template>
    <template v-if="isAppRoute">
        <GameBanner />
    </template>

    <template v-if="!isAppRoute">
        <swiper-container  navigation="true">
            <swiper-slide class="slide" v-for="(game, index ) of bannerData" :key="index">
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
    </template>

</template>
  
<script setup>
import { register } from 'swiper/element/bundle';
import 'swiper/css/navigation';
import GameBanner from '@/views/GameBanner.vue';
import { onMounted, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

register();
const route = useRoute();
const store = useStore();
const bannerData = computed(() => store.getters.getDataBanner);


const isAppRoute = ref(false)

watchEffect(() => {
    if (route.path.includes('app')) {
        isAppRoute.value = true
    }
    else {
        isAppRoute.value = false
    }
});

</script>
  
<style lang="scss" scoped>
@import '@/assets/main.scss';
@import '@/assets/components-style/headBanner.scss';

.head-link {
    display: flex;
    align-items: end;
    justify-content: end;
    width: 100%;
    height: 100%;
}
</style>
  