<template>
     <div class="resultList" v-if="resultQuery">
            <ul v-for="item in resultQuery" :key="item.appid">
                <RouterLink class="link" :to="`/app/${item.appid.toString()}`" :key="item.appid">{{ item.name }}</RouterLink>
            </ul>
        </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const { getters,dispatch,commit } = useStore();
const resultQuery = computed(() => getters['search/getResultQuery']);

</script>

<style lang="scss" scoped>
  .resultList {
        position:absolute;
        top:50px;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.525);
        padding: 10px;
        color: white;
        font-size: .8em;
        font-weight: 100;
        background-color: rgba(0, 0, 0, 0.678);
        border-radius: 5px;
        box-shadow:  0px 0px 15px -5px #000000;
        cursor: pointer;
    }
</style>