<template>
    <div class="search">
        <font-awesome-icon icon="fa-magnifying-glass" class="icon" @click="isInput = !isInput" />
        <Transition name="slide">
            <input type="text" name="search" id="search" v-model="searchTherm" @input="search" v-show="showInput">
        </Transition>

        <div class="resultList" v-if="searchResults.length">
            <ul v-for="item in searchResults" :key="item._id">
                <RouterLink :to="item._source.id">{{ item._source.name }}</RouterLink>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchTherm = ref('');
const searchResults = ref([]);
const isInput = ref(false)
const search = async () => {
    const results = await fetch(`http://localhost:3000/gameApi/search?q=${searchTherm.value}`);
    const resultsJSON = await results.json();
    // обновляем список результатов поиска
    searchResults = resultsJSON;
    console.log(searchResults);
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
        position: absolute;
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
// }</style>