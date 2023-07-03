<template>
    <section>
        <div class="app-wrapper">
            <!-- <div ref="overlay" class="overlay" v-if="isLoad">
            </div> -->
            <div  class="background-raw ">
                <img class="img-background-raw game-banner-raw" :src="steamApp.background_raw"
                    @error="(e) => e.target.src = steamApp.background">
            </div>
            <div class=" game-detailed-banner ">
                <CardBanner :steamApp="steamApp" />
                <Swiper :screenshots="steamApp.screenshots" :movies="steamApp.movies" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { onBeforeMount, computed, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Swiper from '@/components/Swiper.vue';
import CardBanner from '@/components/card/CardBanner.vue';
const overlay = ref(null);
const { getters,commit } = useStore()
const route = useRoute()

const steamApp = computed(() => getters.getDataApp)



</script>

<style lang="scss" scoped>
@import '@/assets/components-style/banner.scss';
@import '@/assets/variable.scss';

.app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .game-banner-raw {
        filter: saturate(30%) blur(2px);
    }
}

.game-detailed-banner {
    width: 100%;
    height: 100%;
    display: flex;
}

.img-background-raw {
    position: absolute;
    z-index: -1;
}
</style>