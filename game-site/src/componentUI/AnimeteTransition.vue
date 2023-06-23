<template>
    <div ref="overlay" class="overlay">
        <slot></slot>
    </div>
</template>

<script setup>
import useAnimatedCubes from '@/use/useAnimatedCubes'
import { onMounted,ref } from 'vue'
const overlay = ref(null)
const { isComplite } = useAnimatedCubes(overlay)

</script>

<style lang="scss" scoped>
@import '@/assets/main.scss'
</style>