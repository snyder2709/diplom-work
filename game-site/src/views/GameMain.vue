<template>
    <GameBanner />
    <main class="wrapper">
        <div class="page">
            <CardBanner :steamApp="steamApp" v-if="tablet || phone || laptop" />
            <div class="page-inset app-des">
                <TitleSection  title="About Game"/>
                <div class="line-title"></div>
                <div class="wrapper-det-des">
                    <div class="detailed-description" v-html="steamApp.detailed_description"
                        :style="{ height: detailedHeight, display: displayDes }">
                    </div>
                </div>
                <div class="link btn-read-more " @click="getReadMore"><span>read more...</span></div>

                <Requirements v-if="steamApp.platforms.windows" :requirements="steamApp.pc_requirements"  platform="Windows" />
                <Requirements v-if="steamApp.platforms.mac" :requirements="steamApp.mac_requirements" platform="Mac" />
                <Requirements v-if="steamApp.platforms.linux" :requirements="steamApp.mac_requirements" platform="Linux" />
            </div>
        </div>
    </main>
</template>

<script setup>
import Requirements from '@/components/game/Requirements.vue';
import GameBanner from '@/components/GameBanner.vue';
import TitleSection from '../componentUI/TitleSection.vue';
import CardBanner from '../components/card/CardBanner.vue';
import { useBreakpoints } from '@vueuse/core';
import { computed, onBeforeMount, onUnmounted, ref, } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const route = useRoute()
let detailedHeight = ref("300px");
let displayDes = ref("block");
const { getters, dispatch, commit } = useStore();
const steamApp = computed(() => getters.getDataApp);
const getReadMore = () => {
    if (detailedHeight.value === "300px") {
        displayDes.value = 'flex'
        detailedHeight.value = "max-content"
    } else {
        detailedHeight.value = "300px"
        displayDes.value = 'block'
    }
}

onBeforeMount(() => {
     dispatch('getAppId', route.params.id)

})
onUnmounted(() => {
    commit('resetApp')
})


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
@import '@/assets/variable.scss';
@import '@/assets/mixin.layout.scss';

.wrapper-det-des {
    width: 100%;
    height: auto;
    @include center-align-row;
}

.app-des {
    h2 {
        line-height: 2em;
        padding-left: 2em;
    }
    h3{
        font-size: 3.8vmin;
    }
}

.detailed-description {
    width: 100%;
    height: 300px;
    overflow: hidden;
    padding-bottom: 20px;

}

.btn-read-more {

    display: block;
    width: 100%;
    cursor: pointer;
    margin-bottom: 20px;
    padding: 0 0 0 10px;
    box-shadow: 0px -10px 10px 2px  black;
    background: linear-gradient(103deg, rgba(0, 0, 0, 1) 0%, rgba(9, 110, 9, 1) 57%, $primary-gold-color 100%);
}

h2 {
    text-align: start;
    font-size: 2.8vmin;

}

h1 {
    font-size: 2.8vmin;
}</style>