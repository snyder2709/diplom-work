<template>
    <div class="cab ">
        <div class="cab-inset">
            <div class="title-wrapper">
                <img :src="steamApp.capsule_image" alt="not found">
                <h2 class="title-app">{{ steamApp.name }}</h2>
            </div>
            <div class="sub-header ">
                <div class="capb-details">
                <div class="capb-details-item">
                    <span class="capb-name-details">Developers:</span>
                    <span class="capb-des-details">
                        <span v-for="(developers, idx) in steamApp.developers" :key="idx">{{ developers }}<i
                                v-if="steamApp.developers.length > 1">,</i></span>
                    </span>
                </div>

                <div class="capb-details-item">
                    <span class="capb-name-details">Genres:</span>
                    <span class="capb-des-details">
                        <span v-for="genres in steamApp.genres" :key="genres.id">{{ genres.description }}<i
                                v-if="steamApp.genres.length > 1">,</i> </span>
                    </span>
                </div>

                <div class="capb-details-item">
                    <template v-if="!steamApp.release_date.coming_soon">
                        <span class="capb-name-details">Release date:</span>
                        <span class="capb-des-details">{{ steamApp.release_date.date }}</span>
                    </template>
                    <template v-if="steamApp.release_date.coming_soon">
                        <span class="capb-name-details">Release date:</span>
                        <span class="capb-des-details">Coming soon...</span>
                    </template>
                </div>
            </div>
                <div class="sub-inner ">
                    <button class="button-gradient-hover" :disabled="!steamApp.is_free">
                        <span>add</span>
                    </button>
                    <PriceTag v-show="!steamApp.is_free" :priceOverview="steamApp.price_overview" />
                </div>
            </div>
           
        </div>
    </div>
</template>

<script setup>
import PriceTag from '@/componentUI/PriceTag.vue';
const { steamApp } = defineProps({
    steamApp: {
        type: Object
    }
})
</script>

<style lang="scss" scoped>
@import '@/assets/components-style/card_banner.scss';
@import '@/assets/main.scss';


</style>