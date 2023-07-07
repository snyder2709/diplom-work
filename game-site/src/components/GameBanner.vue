<template>
    <section>
        <div class="app-wrapper">
            <div class="background-raw ">
                <img class="img-background-raw game-banner-raw" :src="steamApp.background_raw"
                    @error="(e) => e.target.src = steamApp.background">
            </div>
            <div class=" game-detailed-banner ">
                <CardBanner :steamApp="steamApp" v-if="!tablet && !laptop && !phone"  />
                <Swiper :screenshots="steamApp.screenshots" :movies="steamApp.movies" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useBreakpoints } from '@vueuse/core';
import Swiper from '@/components/Swiper.vue';
import CardBanner from '@/components/card/CardBanner.vue';
const { getters } = useStore()
const steamApp = computed(() => getters.getDataApp)

const breakpoints = useBreakpoints({
    phone: 320,
    tablet: 568,
    laptop: 1024,
    desktop: 1280,
})
const laptop = breakpoints.between('laptop', 'desktop')
const tablet = breakpoints.between('tablet', 'laptop')
const phone = breakpoints.between('phone', 'tablet')
</script>

<style lang="scss" scoped>
@import '@/assets/components-style/banner.scss';
@import '@/assets/variable.scss';
@import '@/assets/mixin.breakpoints.scss';

.app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .game-banner-raw {
        filter: saturate(30%) blur(2px);
    }
}

.game-detailed-banner {
    width: 100%;
    height: 100%;
    display: flex;
    // @include sm-breakpoint {
    //     display: flex;
    //     flex-direction: column;
    // }
}

.img-background-raw {
    position: absolute;
    z-index: -1;
}
</style>