<template>
    <div class="thumbSlider">
        <div class="innerThumb">
            <div class="swiperMain">
                <swiper-container effect='fade' direction="horizontal" class="innerSwiperMain" thumbs-swiper=".myThumbs"
                    lazy="true">
                    <swiper-slide class="swiper-item-main" v-for="screenshot in screenshots" :key="screenshot.id">
                        <div class="img-ms" :style="{ backgroundImage: `url(${screenshot.path_full})` }"></div>
                        <div class="img-ms-placeholder" :style="{ backgroundImage: `url(${screenshot.path_full})` }"></div>
                    </swiper-slide>

                </swiper-container>
            </div>
            <div class="swiperThumb">
                <swiper-container ref="slider" class="myThumbs" direction="horizontal" grabCursor="true" lazy="true"
                    slides-per-view="7" :space-between="5" navigation="true" rewind="true"
                    :scrollbar="{ draggable: true, trackSize: '20px' }">
                    <swiper-slide class="swiper-item" v-for="screenshot in screenshots" :key="screenshot.id">
                        <img :src="screenshot.path_thumbnail" alt="#">
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css/navigation';
import 'swiper/scss/effect-fade';

register();

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



const breakpoints = useBreakpoints({
    tablet: 640,
    laptop: 1024,
    desktop: 1280,
})
const laptop = breakpoints.between('laptop', 'desktop')
const tablet = breakpoints.between('tablet', 'laptop')

</script>
<style lang="scss">
@import '@/assets/components-style/banner.scss';
@import '@/assets/mixin.breakpoints.scss';

.thumbSlider {

    display: flex;
    width: 75vw;
    height: 100%;
    background: black;

    .swiper-wrapper {
        overflow: hidden;
    }

    @include lg-breakpoint {
        width: 100vw;
    }
}

// .swiper-scrollbar-horizontal {
//     height: 20px;
// }

.innerThumb {
    display: flex;
    flex-direction: column;

    .innerSwiperMain {
        width: 100vw;
        overflow: hidden;
    }

    .swiper-horizontal {
        overflow: hidden;
    }

    .swiper-item-main {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: end;
        overflow: hidden;

        .img-ms {
            width: 100%;
            height: 60vh;
            background-size: contain;
            background-repeat: no-repeat;
            background-position-x: 29%;
            box-shadow: 0px -10px 10px 10px black;
            overflow: hidden;

            @include lg-breakpoint {
                height: 50vh;
                background-position-x: 50%;
            }

        }

        .img-ms-placeholder {
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
    }


    .swiperThumb {
        margin-left: 60px;
        width: 100%;
        height: 25%;
        overflow: hidden;

        @include lg-breakpoint {
            margin-left: 10px;
        }

        .swiper-horizontal {
            display: flex;
            width: 100vw;

            .swiper-item {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                overflow: hidden;

                @include md-breakpoint {
                    min-width: 340px;

                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;

                    @include lg-breakpoint {
                        width: 100%;
                        height: 14vh;
                        object-fit: cover;
                    }
                }

            }
        }


        .swiper-slide-thumb-active {
            box-sizing: border-box;
            border: 3px solid green;
        }
    }
}</style>