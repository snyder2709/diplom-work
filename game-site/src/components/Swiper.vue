<template>
    <div class="thumbSlider">
        <div class="innerThumb">
            <div class="swiperMain">
                <swiper-container v-show="!laptop"  class="innerSwiperMain" thumbs-swiper=".myThumbs" lazy="true">
                    <swiper-slide class="swiper-item-main" v-for="screenshot in screenshots" :key="screenshot.id">
                            <img v-show="loadedContent.includes(screenshot.id)" :src="screenshot.path_full" @error="e => e.target.src = screenshot.path_thumbnail" alt="#" loading="lazy" >
                            <img class="content-placeholder" v-if="!loadedContent.includes(screenshot.id)" :src="blackPlaceholder" alt="#" >
                    </swiper-slide>
                    <swiper-slide class="swiper-item" v-for="movie in movies" :key="movie.id">
                        <video >
                            <source :src="movie.webm.max">
                        </video>
                    </swiper-slide>
                </swiper-container>
            </div>
            <div class="swiperThumb">
                <swiper-container class="myThumbs" :direction="'vertical'" grabCursor="true" lazy="true" slides-per-view="4"
                    :space-between="2" :scrollbar="{ draggable: true }">
                    <swiper-slide class="swiper-item" v-for="screenshot in screenshots" :key="screenshot.id">
                            <img v-show="loadedContent.includes(screenshot.id)" :src="screenshot.path_thumbnail" alt="#" @load="onContentLoad(screenshot.id)"  >
                            <img class="content-placeholder" v-if="!loadedContent.includes(screenshot.id)" :src="blackPlaceholder" alt="#" >
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
import { computed, reactive, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css/navigation';
import blackPlaceholder from '@/assets/img/black-placeholder.jpg'

register();

const next = ref(null);
const prev = ref(null);
const loadedContent = ref([]);

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
@import '@/assets/components-style/headBanner.scss';
@import '@/assets/mixin.breakpoints.scss';



.thumbSlider {
    display: flex;
    width: 50%;

    @include xxl-breakpoint {
        width: 45%;
    }

    @include lg-breakpoint {
        width: 70%
    }
}

.innerThumb {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    .swiper-item-main{
        border-radius: 8px;
        background-color: black;
    }

    .img{
        background-color: black;
    }

    .swiperMain {
        img {
            display: block;
            object-fit: cover;

        }

        video {
            width: 120px;
        }

        img {
            @include xxl-breakpoint {
                width: auto;
            }

            @include xl-breakpoint {
                max-width: 751px;
            }

            @include lg-breakpoint {
                max-width: 700px;
            }

            @include md-breakpoint {
                max-width: 610px;
            }

            @include sm-breakpoint {
                max-width: 451px;
            }
        }
    }

    .swiperThumb {
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;

        .swiper-vertical {
            display: flex;
            height: 440px;

            .swiper-item {
                border-radius: 8px;
                overflow: hidden;

                img {
                    object-fit: cover;
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