<template>
    <div class=" wrapper wrapper-not-found">
        <div ref="overlay" class="overlay">
        </div>
        <div class="title-not-found">
            <h2>Page Not Found</h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useAnimatedCubes from '@/use/useAnimatedCubes.js';
const overlay = ref(null);
const { startAnim } = useAnimatedCubes(overlay);
</script>

<style lang="scss" scoped>

.wrapper-not-found{
    position: relative;
    width: 100vw;
    height: 80vh;
}
.title-not-found{
    position: absolute;
    top: 38vh;
    z-index: 10;
}
</style>