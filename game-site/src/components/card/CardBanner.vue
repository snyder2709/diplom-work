<template>
        <div class="header-image  glasses-block">
                    <img :src="steamApp.header_image" alt="">
                    <div class="sub-header ">
                        <div class="sub-inner ">
                            <button :disabled="!steamApp.is_free">
                                <span>add</span>
                            </button>
                            <div v-if="!steamApp.is_free" class="glasses-block">
                                <span v-if="steamApp.price_overview.discount_percent" class="discount-percent">{{ steamApp.price_overview.discount_percent }}%</span>
                                <div class="price glasses-block">
                                    <div v-if="steamApp.price_overview.discount_percent" class="initial-price">
                                        <span class="old-price">
                                            {{ steamApp.price_overview.initial_formatted }}
                                        </span>
                                    </div>
                                    <span>{{ steamApp.price_overview.final_formatted }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script setup>
const {steamApp} = defineProps({
    steamApp:{
        type:Object
    }
})
</script>

<style lang="scss" scoped>
@import '@/assets/components-style/card_banner.scss';
</style>