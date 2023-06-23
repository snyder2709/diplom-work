<template>
    <RouterLink class="block-card" :to="`app/${id}`">
        <img :src="img" alt="">
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
defineProps({
        name: {
            type: String,
        },
        img: {
            type: String,
        },
        id:{
            type:Number,
        }

})
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';
.block-card{
    display: grid;
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>