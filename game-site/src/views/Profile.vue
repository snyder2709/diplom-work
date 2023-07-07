<template>
    <div>

    </div>
</template>

<script setup>
import { useStore } from 'vuex';
const { dispatch,getters } = useStore() 
dispatch('getOwnedApp')
</script>

<style lang="scss" scoped>

</style>