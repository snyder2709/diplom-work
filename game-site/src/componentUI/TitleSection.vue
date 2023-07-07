<template>
    <h3>
        {{title}}
    </h3>
    
</template>

<script setup>
    const {title}  = defineProps({
        title: { type:String,requare:true }
    })
</script>

<style lang="scss" scoped>
@import '@/assets/mixin.layout.scss';
h3{
 @include font-paragraph;
}
</style>