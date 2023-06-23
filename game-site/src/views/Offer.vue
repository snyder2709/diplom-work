<script setup>
import { onMounted , computed,ref } from 'vue';

import { useStore } from 'vuex';
import OfferSection from '../components/OfferSection.vue';
import CardOffer from '../components/card/CardOffer.vue';
import PromoCard from '../components/card/PromoCard.vue';
import AnimatedPlaseholder from '../componentUI/AnimatedPlaseholder.vue';

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

<template>
  <div class="page">
    <h2>ТОП ПРОДАЖ</h2>
    <div  class="offer">
      <OfferSection v-if="load">
      <template   v-for="slice in slices(getFeaturedCatItems.topSellers)" #[slice.slotName]>
        <CardOffer
          v-for="topSeller in slice.items"
          :key="topSeller.id"
          :img="topSeller.header_image"
          :name="topSeller.name"
          :id="topSeller.id"
        />
      </template>
      </OfferSection>
      <OfferSection v-if="!load">
      <template  v-for="slice in slices(array)" #[slice.slotName]>
        <AnimatedPlaseholder v-for="items in slice.items"  height="40vh" width="48vw"  />
      </template>
    </OfferSection>
    </div>
    <h2>В ЦЕНТРЕ ВНИМАНИЯ</h2>
    <div class="offer">
        <OfferSection>
          <PromoCard></PromoCard>
        </OfferSection>
    </div>
    <h2>СКОРО В ПРОДАЖЕ</h2>
    <div class="offer">
        <OfferSection>
          <template v-for="slice in slices(getFeaturedCatItems.comingSoon)" #[slice.slotName]>
        <CardOffer
          v-for="comingSoon in slice.items"
          :key="comingSoon.id"
          :img="comingSoon.header_image"
          :name="comingSoon.name"
        />
      </template>
        </OfferSection>>
    </div>
    
  </div>
</template>
<style lang="scss" scoped >
@import '../assets/main.scss';
h2{
  font-size: 2.5vmin;
  overflow: hidden;
  margin: 1vw  0vw 2vw 4vw;
  color: rgba(255, 255, 255, 0.589);
}
</style>
