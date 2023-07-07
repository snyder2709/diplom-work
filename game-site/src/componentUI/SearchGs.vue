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
    </div>
</template>

<script setup>
import { computed, ref, watchEffect, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useDebounce } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';
import CloseButton from '@/componentUI/CloseButton.vue';

const router = useRouter();
const { getters, dispatch, commit} = useStore();
const searchTherm = ref('');
const debounced = useDebounce(searchTherm, 1500)
const route = useRoute()
const isInput = ref(false);

const search =  (dataQuery) => {
    dispatch('search/searchReq', dataQuery);
}

const emitInput = defineEmits(['emitInputState'])

const onOpenInput = () => {
    isInput.value = !isInput.value;
    emitInput('emitInputState', isInput.value) 
}
const onInputBlur = () => {
    isInput.value = false;
    emitInput('emitInputState', isInput.value)
}

watchEffect(() => {
    search(debounced.value)
});

router.beforeEach((to, from, next) => {
    commit('search/upDateResultQuery', null);   
    commit('popupState/hideIsUserMenu');
    if (to.fullPath.includes('undefined')) {
        console.log(to.fullPath)
        next({ name: 'NotFound' }); 
    }
    else {
        next();
    }
});




</script>

<style lang="scss" scoped>
@import '@/assets/variable.scss';
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
        top: 0px;
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

</style>