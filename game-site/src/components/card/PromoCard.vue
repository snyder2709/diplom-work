<template>
    <div class="block-card">
        <img :src="imgSrc" alt="">
        <div class="promo-description">
            <!-- <offerDate/> -->
        </div>
    </div>
</template>

<script setup>
// import offerDate from '@/components/componentUI/offerDate.vue'
const { title, img  } = defineProps({
        title: {
            type: String,
        },
        imgSrc: {
            type: String,
        }
})
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.block-card {
    flex: 1 1 auto;
    @include center-align-row;

    img: {
       width: 100%;
        max-width: 400px;
        height: auto;
    }
}</style>