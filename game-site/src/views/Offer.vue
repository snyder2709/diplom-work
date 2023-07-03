
<template>
  <MainBanner/>
  <main class="wrapper">
    <div class="page">
      <div class="page-inset">
        <TitleSection title="TOP SELLING"/>
        <div  class="offer">
          <OfferSection v-if="load">
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
          <OfferSection v-if="!load">
          <template  v-for="slice in slices(array)" #[slice.slotName]>
            <AnimatedPlaseholder v-for="items in slice.items" />
          </template>
        </OfferSection>
        </div>
        <TitleSection title="IN THE SPOTLIGHT"/>
        <div class="offer">
            <OfferSection>
              <PromoCard></PromoCard>
            </OfferSection>
        </div>
        <TitleSection title="COMMING SOON"/>
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
              <template v-for="slice in getFeaturedCatItems.comingSoon">
            <CardApp
              v-for="comingSoon in slice.items"
              :key="comingSoon.id"
              :img="comingSoon.header_image"
              :name="comingSoon.name"
            />
          </template>
        </div>
  
      </div>
    </div>
</main>
</template>

<script setup>
import { onMounted , computed,ref } from 'vue';

import { useStore } from 'vuex';
import OfferSection from '@/components/OfferSection.vue';
import TitleSection from '@/componentUI/TitleSection.vue';
import CardApp from '@/components/card/CardApp.vue';
import PromoCard from '@/components/card/PromoCard.vue';
import AnimatedPlaseholder from '@/componentUI/AnimatedPlaseholder.vue';
import MainBanner from '@/components/MainBanner.vue';
import { register } from 'swiper/element/bundle';
import 'swiper/css/navigation';
register();

const store = useStore();
let load = ref(false);
const array = Array.from({ length: 10 }, (v, k) => k);


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
        width: 184px;

       
    }
</style>
