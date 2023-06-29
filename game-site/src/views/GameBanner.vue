<template>
    <div class="app-wrapper">
        <div ref="overlay" class="overlay" v-if="isLoad">
        </div>
        <div v-if="!isLoad" class="background-raw ">
            <img class="img-background-raw game-banner-raw" :src="steamApp.background_raw"
                @error="(e) => e.target.src = steamApp.background">

          <h2 class="title-app">{{steamApp.name}}</h2>
            <div class=" game-detailed-banner ">
                <CardBanner :steamApp="steamApp" />
                <Swiper :screenshots="steamApp.screenshots" :movies="steamApp.movies" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useAnimatedCubes from '@/use/useAnimatedCubes.js';
import Swiper from '@/components/Swiper.vue';
import CardBanner from '@/components/card/CardBanner.vue';
const overlay = ref(null);
// const { isComplite } = useAnimatedCubes(overlay)
const store = useStore()
let isLoad = ref(true)
const route = useRoute()
const steamApp = computed(() => store.getters.getDataApp)

onBeforeMount(async () => {
    if (route.params.id) {
        await store.dispatch('getAppId', route.params.id);
        isLoad.value = false
    }
})

</script>

<style lang="scss" scoped>
@import '@/assets/components-style/headBanner.scss';
@import '@/assets/main.scss';

.app-wrapper {
    width: 100%;
    height: 100%;
    .title-app{
        width: 100%;
        font: $font-regular;
        font-size: 1.2rem;
        margin-top: 2vh;
        margin-left: 1vw;
    }
    .game-banner-raw {
        filter: saturate(30%) blur(2px);
    }
}

.game-detailed-banner {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 30px;
    gap: 50px;
    align-items: center;
}

.img-background-raw {
    position: absolute;
    z-index: -1;
}
</style>