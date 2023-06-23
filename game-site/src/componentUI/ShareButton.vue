<template>
    <button :class="'button'+'-'+`${buttonStyle}`">
         {{message}}
    </button>
</template>

<script setup>
import { onMounted } from "vue"

defineProps({
    message:{
        type:String
    }, 
    buttonStyle:{
        type:String
    }
})
</script>

<style lang="scss" scoped>
@import '../assets/share-component.scss';
</style>