<template>
    <div class="page">
        <h2>About Game</h2>
        <div  class="detailed-description"  v-html="steamApp.detailed_description" :style="{ height: detailedHeight }">
        </div>
        <div class="btn-read-more" @click="getReadMore"><span>read more...</span></div>
    </div>
</template>

<script setup>
import { onMounted,computed ,ref} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

let detailedHeight = ref("300px")
const store = useStore()
const route = useRoute()
const steamApp = computed(() => store.getters.getDataApp)
const getReadMore = () => { detailedHeight.value = (detailedHeight.value === "300px") ? "max-content" : "300px" }
</script>

<style lang="scss" scoped>

.detailed-description{
 width: max-content;
 text-align: center;
 height:300px;
 overflow:hidden;
 border: 1px solid;
}
.btn-read-more{
   display: block;
   width: 100%;
   cursor: pointer;
   border: 1px solid;
}
h2{
   text-align: start;

}
</style>