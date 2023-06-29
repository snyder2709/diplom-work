<template>
    <div class="search">
        
        <div class="search-input">
            <Transition name="slide">
                <input ref="target" type="text" name="search" id="search" v-model="searchTherm" @blur="onInputBlur"  v-if="isInput" placeholder="search">
            </Transition>
        </div>
        <font-awesome-icon icon="fa-magnifying-glass" class="icon" @click="openInput" currentColor="green"/>
       

        <div class="resultList" v-if="resultQuery && isInput">
            <ul v-for="item in resultQuery" :key="item.appid">
                <RouterLink :to="`/app/${item.appid.toString()}`"  :key="item.appid" >{{ item.name }}</RouterLink>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref , watchEffect} from 'vue';
import { useStore } from 'vuex';
import { useDebounce } from '@vueuse/core';
import { useRouter,useRoute } from 'vue-router';


const router = useRouter();

const store = useStore();
const searchTherm = ref('');
const resultQuery = computed(()=> store.getters['search/getResultQuery'])
const debounced = useDebounce(searchTherm, 1500)
const isInput = ref(false);
const route = useRoute()


const search =  async (dataQuery) => {
    await store.dispatch('search/searchReq',dataQuery);
}


watchEffect(()=>{
    search(debounced.value)
});

router.beforeEach((to, from, next) => {
  store.commit('search/upDateResultQuery', null);
  isInput.value = false;
  console.log("я перешел")
  if(from.fullPath.includes('app')){
    if(route.params.id != to.params.id) next()
    else next()
  }
  else{
    next();
  }
  
  
});


const openInput = () =>  {
    isInput.value = !isInput.value;
}
const onInputBlur = () => {
    isInput.value = false;
}

</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
.search {
    display: flex;
    position: relative;
    .search-input{
        min-width: 200px;
        input{
            box-shadow: $shadow-gold-glass-inset;
            background: $light-background-color;
            color: white;
            font:$font-regular;
            background: transparent;
            border: none;
            padding: 0 10px;
        }
    }

    .icon {
        color: gold;
        transition: all ease-in .2s;
       padding: 10px 20px;

        &:hover {
            color: white;
            cursor: pointer;
            transform: scale(1.1);
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
    width: 0%;
}

.slide-enter-to {
    width: 100%;
}

.slide-enter-active {
    transition: all 0.3s ease-in;
}

// .slide-leave-from {
//     width: 100%;
//     transition: all ease-in .2s;
// }
</style>