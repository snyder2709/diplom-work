<template>
    <RouterLink class="block-card link" :to="`app/${id}`">
        <div class="gold-background-card" :style="{ backgroundImage: `url(${goldBackgroung})` }">  
        </div>
        <div class="app-img" :style="{ backgroundImage: `url(${img})` }"></div>
        <div v-if="finalPrice" class="sub-card">
            
            <div class="des-card">
                <PriceTag 
                :discounted="discounted" 
                :discountPercent="discountPercent" 
                :originalPrice="originalPrice"  
                :finalPrice="finalPrice" 
                />
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import PriceTag from '@/componentUI/PriceTag.vue';
import goldBackgroung from '@/assets/img/gold-card-background.jpg'
defineProps({
    name:            { type: String, },
    img:             { type: String, },
    id:              { type: Number },
    priceOverview:   { type: Object },
    discounted:      { type: Boolean },
    discountPercent: { type: Number },
    originalPrice:   { type: Number },
    finalPrice:      { type: Number }

})
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';
@import '@/assets/variable.scss';

.block-card {
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    align-items: end;
    justify-items: center;
    border-radius: 8px;
    cursor: pointer;
 

    .gold-background-card {
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-y: bottom;
        z-index: -1;
        filter: brightness(40%) blur(8px);

    }


    .sub-card {
        display: flex;
        width: 98%;
        // height: 100%;
        background-color: rgba(255, 255, 255, 0.068);
        backdrop-filter: blur(3px);
        border-radius: 7px;
        padding: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.13);

      

        .des-card {
            width: 50%;
        }
    }

    .app-img {
        display: flex;
        align-items: end;
        justify-content: center;
        width: 100%;
        background-color: transparent;
        background-size: contain;
        background-repeat: no-repeat;
    }
}

.grid-5fr {
    .app-img {
        height: 8vw;
    }
}

.grid-3fr {
    .app-img {
        height: 13vw;
    }
}

.grid-2fr {
    .app-img {
        height: 20vw;
    }
}
</style>