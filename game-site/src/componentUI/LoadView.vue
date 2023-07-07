<template>
    <div class="load-wrapper">
        <div class="load-circle">
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '@/assets/variable.scss';
.load-wrapper {
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 20px;
}

.load-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: $primary-gold-color;
    animation: spin 1s linear infinite;
}
</style>