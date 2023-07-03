<template>
        <GameBanner/>
        <main class="wrapper">
            <div class="page">
                <div class="page-inset app-des">
                    <h2>About Game</h2>
                    <div class="wrapper-det-des">
                        <div  class="detailed-description"  v-html="steamApp.detailed_description" :style="{ height: detailedHeight,display:displayDes }">
                        </div>
                    </div>
                    <div class="btn-read-more" @click="getReadMore"><span>read more...</span></div>
                    
                    <Requirements v-if="steamApp.platforms.windows"  :requirements="steamApp.pc_requirements" />
                    <Requirements v-if="steamApp.platforms.mac"  :requirements="steamApp.mac_requirements" />
                    <Requirements v-if="steamApp.platforms.linux"  :requirements="steamApp.mac_requirements" />
                </div>
            </div>
        </main>
</template>

<script setup>
import Requirements from '@/components/game/Requirements.vue';
import GameBanner from '@/components/GameBanner.vue';
import { computed,onBeforeMount,onUnmounted,ref, } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const route = useRoute()

let detailedHeight = ref("300px");
let displayDes = ref("block");
const { getters , dispatch,commit} = useStore();
const steamApp = computed(() => getters.getDataApp);
const getReadMore = () => {
     if(detailedHeight.value === "300px"){
        displayDes.value = 'flex'
        detailedHeight.value =  "max-content" 
     }else{
        detailedHeight.value =  "300px" 
        displayDes.value = 'block'
     }
}

onBeforeMount( ()=>{
    dispatch('getAppId',route.params.id)
})
onUnmounted(()=>{
    commit('resetApp')
})
</script>

<style lang="scss" scoped>
@import '@/assets/variable.scss';
@import '@/assets/mixin.layout.scss';
.wrapper-det-des{
    width: 100%;
    height: auto;
    @include center-align-row;
}
.app-des{
    h2{
        line-height: 2em;
        padding-left: 2em;
    }
}
.detailed-description{
 width: 100%;
 height:300px;
 overflow:hidden;
}




.btn-read-more{
   display: block;
   width: 100%;
   cursor: pointer;
   border: 1px solid;
}
h2{
   text-align: start;
   font-size: 2.8vmin;

}
h1{
    font-size: 2.8vmin;
 }
</style>