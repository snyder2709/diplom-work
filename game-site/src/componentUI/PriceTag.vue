<template>
    <div  class="price-wrapper glasses-block">
        <span v-if ="priceOverview?.discount_percent || discounted" class="discount-percent">
            {{ priceOverview?.discount_percent || discountPercent}}%
        </span>
        <div  class="price glasses-block">
            <div v-if ="priceOverview?.discount_percent || discounted" class="initial-price">
                <span class="old-price">
                    {{ priceOverview?.initial_formatted || numberFormat(originalPrice)}} 
                </span>
            </div>
            <span>{{priceOverview?.final_formatted ||  numberFormat(finalPrice) }} </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const { priceOverview,discounted,discountPercent,originalPrice,finalPrice} = defineProps(
    {
        priceOverview: { type: Object},
        discounted: { type: Boolean },
        discountPercent: { type: Number },
        originalPrice: { type: Number },
        finalPrice: { type: Number }
    }
)
const numberFormat = (price) => {
    let shortedPrice = price/100;
   const formattedPrice = new Intl.NumberFormat('kk-KZ',{style:'currency',currency:"KZT",minimumFractionDigits: 0,}).format(shortedPrice)
  return formattedPrice;
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin.layout.scss';


.discount-percent {
    background-color: black;
    padding: 0px 4px;
    border-radius:  4px 0px 0px 4px;
    top: 12%;
    right: 2.5%;
    font-size: 0.9vw;
}
.price-wrapper{
    display: flex;
    padding: 0.2vw;
}
.price {
    @include center-align-row;
    padding: 0px 2px;
    gap: 7px;
    border-radius:  0px 4px 4px 0px;
    text-shadow: 1px 1px 9px rgba(0, 0, 0, .6666666667);
    background-color: rgb(2 2 2 / 53%);
    width: max-content;
    font-weight: 300;
    font-size: 1.3vmin;

    .old-price {
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            border-top: 2px solid red;
            transform: rotate(-10deg);
        }

    }
}
</style>