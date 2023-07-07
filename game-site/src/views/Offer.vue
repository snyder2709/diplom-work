
<template>
  <MainBanner/>
  <main class="wrapper">
    <div class="page">
      <LoadView v-if="!load" />
      <div class="page-inset" v-else>
        <TitleSection title="TOP SELLING"/>
        <div class="line-title"></div>
        <div  class="offer">
          <OfferSection >
          <template   v-for="slice in slices(getFeaturedCatItems.topSellers)" #[slice.slotName]>
            <CardApp
              v-for="topSeller in slice.items"
              :key="topSeller.id"
              :img="topSeller.header_image"
              :name="topSeller.name"
              :id="topSeller.id"
              :discounted="topSeller.discounted"
              :discountPercent="topSeller.discount_percent"
              :originalPrice="topSeller.original_price"
              :finalPrice="topSeller.final_price"
            />
          </template>
          </OfferSection>
        </div>
        <TitleSection title="NEW RELEASES"/>
        <div class="line-title"></div>
        <div class="offer">
          <div v-if="!tablet && !phone" class="new-releases">
            <CardApp
            v-for="newReleases in getFeaturedCatItems.newReleases"
              :key="newReleases.id"
              :img="newReleases.header_image"
              :name="newReleases.name"
              :id="newReleases.id"
              :discounted="newReleases.discounted"
              :discountPercent="newReleases.discount_percent"
              :originalPrice="newReleases.original_price"
              :finalPrice="newReleases.final_price"
            />
          </div>
             <swiper-container 
              v-else
              class="myThumbs"  
              grabCursor="true" lazy="true" 
              slides-per-view="2"
              :space-between="4" 
              :scrollbar="{ draggable: true }"
              navigation="true"
              >
              <swiper-slide class="swiper-item" v-for="newReleases in getFeaturedCatItems.newReleases" :key="newReleases.id">
                    <CardApp
                    :key="newReleases.id"
                    :img="newReleases.header_image"
                    :name="newReleases.name"
                    :id="newReleases.id"
                    :discounted="newReleases.discounted"
                    :discountPercent="newReleases.discount_percent"
                    :originalPrice="newReleases.original_price"
                    :finalPrice="newReleases.final_price" />
              </swiper-slide>
          </swiper-container>
        </div>
        <TitleSection title="COMMING SOON"/>
        <div class="line-title"></div>
        <div class="offer">
             <swiper-container 
             class="myThumbs"  
             grabCursor="true" lazy="true" 
             slides-per-view="3"
             :space-between="4" 
             :scrollbar="{ draggable: true }"
             navigation="true"
             >
              <swiper-slide class="swiper-item" v-for="steamOffer in  getFeaturedCatItems.comingSoon " :key="steamOffer.id">
                    <CardApp :img="steamOffer.large_capsule_image"/>
              </swiper-slide>
              </swiper-container>
        </div>
      </div>
    </div>
</main>
</template>

<script setup>
import { onMounted , computed,ref } from 'vue';

import { useStore } from 'vuex';
import { useBreakpoints} from '@vueuse/core';
import OfferSection from '@/components/OfferSection.vue';
import LoadView from '../componentUI/LoadView.vue';
import TitleSection from '@/componentUI/TitleSection.vue';
import CardApp from '@/components/card/CardApp.vue';
import MainBanner from '@/components/MainBanner.vue';
import { register } from 'swiper/element/bundle';
import 'swiper/css/navigation';
register();

const store = useStore();
let load = ref(false);
const array = Array.from({ length: 10 }, (v, k) => k);

const breakpoints = useBreakpoints({
    phone: 320,
    tablet: 568,
    laptop: 1024,
    desktop: 1280,
})
const laptop = breakpoints.between('laptop', 'desktop')
const tablet = breakpoints.between('tablet', 'laptop')
const phone = breakpoints.between('phone', 'tablet')


const slices = (array) => {
  const sliceSizes = [2, 3, 5];
  let startIndex = 0;

  if (!array) {
    return [];
  }

  return sliceSizes.map((size) => {
    const slice = {
      slotName: `${size}fr`,
      items: array.slice(startIndex, startIndex + size),
    };
    startIndex += size;
    return slice;
  });
};
const getFeaturedCatItems = computed(() => store.getters.getFeaturedCatItems);

onMounted(async () => {
  await store.dispatch('getFeaturedCat');
  load.value = true
  
});
</script>
<style lang="scss" scoped >
@import '@/assets/mixin.breakpoints.scss';
@import '@/assets/components-style/offer_section.scss';
.myThumbs{
  height:170px; 
  @include xl-breakpoint {
    height:14vw; 
  }

          .app-img{
            background-size: contain;
          }
} 
.swiper-item{
        border-radius: 8px;
        background-color: black;
 }
 .new-releases{
  display: flex;
  flex-wrap: wrap;
  width: 100%;

 }
</style>
