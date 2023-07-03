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
h3{
  font-size: 2.2vmin;
  overflow: hidden;
  margin: 1vw  0vw 2vw 4vw;
  color: rgba(255, 255, 255, 0.589);
}
</style>