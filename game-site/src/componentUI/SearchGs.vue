<template>
    <div class="search">
        <font-awesome-icon icon="fa-magnifying-glass" class="icon" @click="openInput" />
        <Transition name="slide">
            <input type="text" name="search" id="search" v-model="searchTherm" @blur="onInputBlur" v-if="isInput">
        </Transition>

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
// console.log(router)
const store = useStore();
const searchTherm = ref('');
const resultQuery = computed(()=> store.getters['search/getResultQuery'])
const debounced = useDebounce(searchTherm, 1500)
const isInput = ref(false);
const route = useRoute()
// console.log(route.params.id)

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
.search {
    display: flex;
    position: relative;

    .icon {
        color: gold;
        transition: all ease-in .2s;

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