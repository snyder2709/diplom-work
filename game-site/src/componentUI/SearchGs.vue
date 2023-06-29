<template>
    <div class="search">

        <Transition name="slide">
            <div class="search-input" v-if="isInput">
                <input ref="target" type="text" name="search" id="search" v-model="searchTherm" @blur="onInputBlur"
                    placeholder="search">
                <CloseButton text="CLOSE" @click="onOpenInput"/>
            </div>
        </Transition>
        <font-awesome-icon  v-if="!isInput" icon="fa-magnifying-glass" class="icon" @click="onOpenInput" currentColor="green" />
        <div class="resultList" v-if="resultQuery && isInput">
            <ul v-for="item in resultQuery" :key="item.appid">
                <RouterLink :to="`/app/${item.appid.toString()}`" :key="item.appid">{{ item.name }}</RouterLink>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useDebounce } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';
import CloseButton from '@/componentUI/CloseButton.vue';

const router = useRouter();
const store = useStore();
const searchTherm = ref('');
const resultQuery = computed(() => store.getters['search/getResultQuery'])
const debounced = useDebounce(searchTherm, 1500)
const route = useRoute()
const isInput = ref(false);

const search = async (dataQuery) => {
    await store.dispatch('search/searchReq', dataQuery);
}

const emitInput = defineEmits(['emitInputState'])

const onOpenInput = () => {
    isInput.value = !isInput.value;
    emitInput('emitInputState', isInput.value)
    console.log(isInput.value)
    console.log('click open')
}
const onInputBlur = () => {
    console.log('blur')
    isInput.value = false;
    emitInput('emitInputState', isInput.value)
}

watchEffect(() => {
    search(debounced.value)
});

router.beforeEach((to, from, next) => {
    store.commit('search/upDateResultQuery', null);
    console.log("я перешел")
    if (from.fullPath.includes('app')) {
        if (route.params.id != to.params.id) next()
        else next()
    }
    else {
        next();
    }


});




</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';



.search {
    display: flex;
    .icon {
        color: gold;
        transition: all ease-in .2s;
        padding: 10px 10px;
        

        &:hover {
            color: white;
            cursor: pointer;
            // transform: scale(1.1);
            overflow: hidden;
        }
    }
    
    .search-input {
        width: 65%;
        display: flex;
        position: absolute;
        top: 10px;
        right: 0;
        left: 15%;
        border: 1px solid;
        border-radius: 8px;
        background-color: black;
        .outer{
            position: relative;
            top: 0;
            right: 0;
            height: 32px;
            display: flex;
            align-items: center ;
            
        }

        input {
            box-shadow: $shadow-gold-glass-inset;
            background: white;
            width: 90%;
            color: black;
            font: $font-regular;
            border: none;
            padding: 5px 10px;
            border-radius: 8px;
            font: $font-regular;
            &:focus{
                outline: none;
            }

        }

    }

   

    .resultList {
        z-index: 100;
        background-color: black;
        padding: 10px;
        top: 8vh;
        color: red;
    }
}

.slide-enter-from {
    opacity: 0;
}

.slide-enter-to {
    opacity: 1;

}

.slide-enter-active {
    transition: all 0.3s ease-in;
}

// .slide-leave-from {
//     width: 100%;
//     transition: all ease-in .2s;
// }
</style>