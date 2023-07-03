<template>
    <div class="thumbSlider">
        <div class="innerThumb">
            <div class="swiperMain">
                <swiper-container
                effect='fade' 
                
                 class="innerSwiperMain" 
                 thumbs-swiper=".myThumbs"
                lazy="true" 
                >
                    <swiper-slide    class="swiper-item-main" v-for="screenshot in screenshots" :key="screenshot.id">
                            <div class="img-ms" :style="{backgroundImage:`url(${screenshot.path_full})`}"></div>
                            <div class="img-ms-placeholder" :style="{backgroundImage:`url(${screenshot.path_full})`}"></div>
                            <!-- <img class="content-placeholder" v-if="!loadedContent.includes(screenshot.id)" :src="blackPlaceholder" alt="#" > -->
                    </swiper-slide>
                    <swiper-slide class="swiper-item" v-for="movie in movies" :key="movie.id">
                        <video >
                            <source :src="movie.webm.max">
                        </video>
                    </swiper-slide>
                </swiper-container>
            </div>
            <div class="swiperThumb">
                <swiper-container ref="slider" class="myThumbs" direction="horizontal" grabCursor="true" lazy="true" slides-per-view="7"
                    :space-between="5" navigation="true" rewind="true" :scrollbar="{ draggable: true,trackSize:'20px' }">
                    <swiper-slide class="swiper-item" v-for="screenshot in screenshots" :key="screenshot.id">
                            <img :src="screenshot.path_thumbnail" alt="#"  >
                            <!-- <img class="content-placeholder" v-if="!loadedContent.includes(screenshot.id)" :src="blackPlaceholder" alt="#" > -->
                    </swiper-slide>
                    <swiper-slide class="swiper-item" v-for="movie in movies" :key="movie.id">
                        <video>
                            <source :src="movie.webm.max" v-once>
                        </video>
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {  ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css/navigation';
import 'swiper/scss/effect-fade';
import blackPlaceholder from '@/assets/img/black-placeholder.jpg'

register();

const next = ref(null);
const prev = ref(null);
const loadedContent = ref([]);
const slider = ref(null);

const { screenshots, movies } = defineProps({
    screenshots: {
        type: Array
    },
    movies: {
        type: Array
    }
})

const onContentLoad = (contentId) => {
    if (!loadedContent.value.includes(contentId)) {
        loadedContent.value.push(contentId);
    }
}



const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})
const laptop = breakpoints.between('laptop', 'desktop')

</script>
<style lang="scss">
@import '@/assets/components-style/banner.scss';
@import '@/assets/mixin.breakpoints.scss';



.thumbSlider {
    
    display: flex;
    width: 75vw;
    height: 100%;
    background: black;
}

.swiper-scrollbar-horizontal {
    height: 20px;
}

.innerThumb {
    display: flex;
    flex-direction: column;
    
   .innerSwiperMain{
    width: 100vw;
   }
    .swiper-item-main{
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: end;
        .img-ms{
            width: 100%;
            height: 60vh;
            background-size: contain;
            background-repeat: no-repeat;
            background-position-x: 29%;
            box-shadow: 0px -10px 10px 10px black;
            
        }
        .img-ms-placeholder{
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 60vh;
            background-size: cover;
            background-repeat: no-repeat;
            filter: blur(10px) brightness(90%);
        }
    }

    .swiperMain {
        width: 100%;
        height: 85%;
        video {
            width: 120px;
        }

        // img {
        //     @include xxl-breakpoint {
        //         width: auto;
        //     }

        //     @include xl-breakpoint {
        //         max-width: 751px;
        //     }

        //     @include lg-breakpoint {
        //         max-width: 700px;
        //     }

        //     @include md-breakpoint {
        //         max-width: 610px;
        //     }

        //     @include sm-breakpoint {
        //         max-width: 451px;
        //     }
        // }
    }

    .swiperThumb {
        margin-left: 60px;
        width: 100%;
        height: 25%;
        .swiper-horizontal {
            display: flex;
            width: 100vw;
            // height: 440px;

            .swiper-item {
                width: 100%;
                    height: 100%;
                // border-radius: 8px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    // height: 12vw;
                    object-fit: contain;
                }

                video {
                    width: 120px;
                }


            }
        }


        .swiper-slide-thumb-active {
            box-sizing: border-box;
            border: 3px solid green;
        }
    }
}</style>