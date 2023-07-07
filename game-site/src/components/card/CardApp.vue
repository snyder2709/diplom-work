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
        <div v-if="finalPrice === 0" class="free-tag ">
                    FREE
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
    discounted:      { type: Boolean },
    discountPercent: { type: Number },
    originalPrice:   { type: Number },
    finalPrice:      { type: Number },
})
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
@import '@/assets/variable.scss';
@import '@/assets/mixin.breakpoints.scss';


.free-tag {
    width: 100%;
    @include center-align-row;
    justify-content: end;
    padding: 0px 20px;
    gap: 7px;
    border-radius:  0px 4px 4px 0px;
    text-shadow: 1px 1px 9px rgba(0, 0, 0, .6666666667);
    background-color: rgb(2 2 2 / 53%);
    font-weight: 300;
    font-size: 1.3vmin;
}
.block-card {
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    align-items: end;
    justify-items: center;
    border-radius: 8px;
    cursor: pointer;
    @include md-breakpoint {
        align-items: start;
        }
 

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
        justify-content: end;
        width: 98%;
        background-color: rgba(255, 255, 255, 0.068);
        backdrop-filter: blur(3px);
        border-radius: 7px;
        padding: 0px 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.13);
    }

    .app-img {
        display: flex;
        align-items: end;
        justify-content: center;
        border-radius: inherit;
        width: 100%;
        height:100%;
        background-color: transparent;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 4px;
        @include md-breakpoint {
            width: 100%;
            background-size: cover;
            background-position: center;
            height: 13vh;
            
        }
    }
}

.grid-5fr {
    .app-img {
        height: 6vw;
    }
}

.grid-3fr {
    .app-img {
        height: 10vw;
    }
}

.grid-2fr {
    .app-img {
        height: 17vw;
    }
}
.new-releases {
    .block-card{
        width: 20%;
        padding: 12px;
        .app-img {
        height: 6vw;
    }
    }
}
</style>