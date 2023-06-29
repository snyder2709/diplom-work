<template>
        <div class="card-app-banner  glasses-block">
                    <img :src="steamApp.header_image" alt="">
                    <div class="sub-header ">
                        <div class="sub-inner ">
                            <button class="button-gradient-hover" :disabled="!steamApp.is_free">
                                <span>add</span>
                            </button>
                            <PriceTag  v-show="!steamApp.is_free" :priceOverview ="steamApp.price_overview">

                            </PriceTag>
                            <!-- <div v-if="!steamApp.is_free" class="glasses-block">
                                <span v-if="steamApp.price_overview.discount_percent" class="discount-percent">{{ steamApp.price_overview.discount_percent }}%</span>
                                <div class="price glasses-block">
                                    <div v-if="steamApp.price_overview.discount_percent" class="initial-price">
                                        <span class="old-price">
                                            {{ steamApp.price_overview.initial_formatted }}
                                        </span>
                                    </div>
                                    <span>{{ steamApp.price_overview.final_formatted }}</span>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="capb-details">
                        <div class="capb-details-item">
                            <span class="capb-name-details">Developers:</span>
                            <span class="capb-des-details">
                                <span v-for="(developers,idx) in steamApp.developers"   :key="idx">{{developers}}<i v-if="steamApp.developers.length > 1">,</i></span>
                            </span>
                        </div>
                        <hr style="width: 100%;">
                        <div class="capb-details-item">
                            <span class="capb-name-details">Genres:</span>
                            <span class="capb-des-details">
                                <span  v-for="genres in steamApp.genres" :key="genres.id"  >{{genres.description}}<i v-if="steamApp.genres.length > 1">,</i> </span>
                            </span>
                        </div>
                        <hr style="width: 100%;">
                        <div class="capb-details-item">
                            <template v-if="!steamApp.release_date.coming_soon">
                                <span  class="capb-name-details">Release date:</span>
                                <span  class="capb-des-details">{{steamApp.release_date.date}}</span>
                            </template>
                            <template v-if="steamApp.release_date.coming_soon">
                                <span class="capb-name-details">Release date:</span>
                                <span class="capb-des-details">Coming soon...</span>
                            </template>
                        </div>
                    </div>
                </div>
</template>

<script setup>
import PriceTag from '@/componentUI/PriceTag.vue';
const {steamApp} = defineProps({
    steamApp:{
        type:Object
    }
})
</script>

<style lang="scss" scoped>
@import '@/assets/components-style/card_banner.scss';
@import '@/assets/main.scss';
</style>