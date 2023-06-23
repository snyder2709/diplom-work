<template>
    <div class="thumbSlider">
        <div class="innerThumb">
            <div class="swiperMain">
                <swiper-container class="innerSwiperMain" thumbs-swiper=".myThumbs" >
                        <swiper-slide class="swiper-item" v-for="screenshot in screenshots" :key="screenshot.id">
                            <img :src="screenshot.path_full" @error="e => e.target.src = screenshot.path_thumbnail" alt="#">
                        </swiper-slide>
                </swiper-container>
            </div>
                <swiper-container class=" glasses-block swiperThumb myThumbs"
                grabCursor="true"
                slides-per-view="6"
                :navigation="{
                    nextEl:next,
                    prevEl:prev
                }"
                >
                    <swiper-slide class="swiper-item" v-for="screenshot in screenshots" :key="screenshot.id">
                            <img :src="screenshot.path_thumbnail" alt="#">
                    </swiper-slide>
                </swiper-container>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { register } from 'swiper/element/bundle';
import 'swiper/css/navigation';

register();

const next = ref(null);
const prev = ref(null);

const {screenshots} = defineProps({
    screenshots:{
        type:Array
    }
})


</script>
<style lang="scss">
@import '@/assets/components-style/headBanner.scss';



.thumbSlider {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.innerThumb {
        height: 90%;
        
        .swiperMain{
            display: flex;
            justify-content: start;
            .innerSwiperMain{
                width: 80%;
            }
        }
        .swiperThumb{
            width: 80%;
            .swiper-slide-thumb-active{
                box-sizing: border-box;
                border: 3px solid green;
            }
        }
        .swiper-item {
            overflow: hidden;
            img{
                display: block;
                width:98%;
                margin: 0;
                object-fit: contain;
            }
        }
    }
</style>