<template>
    <div class="app-wrapper">
        <div ref="overlay" v-if="isLoad">
            <p>load</p>
        </div>
        <div v-if="!isLoad" class="background-raw ">
            <img class="img-background-raw game-banner-raw" 
            :src="steamApp.background_raw"
            @error="(e) => e.target.src = steamApp.background"
            >

            <div class=" game-detailed-banner ">
                <Swiper :screenshots="steamApp.screenshots" />
                <CardBanner :steamApp="steamApp" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Swiper from '@/components/Swiper.vue';
import CardBanner from '@/components/card/CardBanner.vue';

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

    .game-banner-raw {
        filter: saturate(30%) blur(2px);
    }
}
.game-detailed-banner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

}
.img-background-raw {
    position: absolute;
    z-index: -1;
}</style>