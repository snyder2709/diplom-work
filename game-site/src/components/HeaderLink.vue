<template>
  <nav>
      <div v-if="!inputState" v-for="link in linkRoutes" :key="link.title">
        <RouterLink :to="link.link" :class="link.class">{{ link.title }}</RouterLink>
      </div>
    <SearchGs @emitInputState="handleInputEvent" />
  </nav>
</template>

<script setup>
import SearchGs from '@/componentUI/SearchGs.vue';
import { reactive,ref } from 'vue';
import { RouterLink } from 'vue-router'

const inputState = ref(false);
const linkRoutes = reactive([
  { title: "Жанры", class: "link", link: "genre" },
  { title: "Новинки", class: "link", link: "new" },
  { title: "Предложение", class: "link", link: "/" },
  { title: "Новости", class: "link", link: "news" },
])

const handleInputEvent = (state) => {
  inputState.value = state
} 


</script>

<style lang="scss" scoped>
@import '../assets/main.scss';
@import '@/assets/components-style/transition-class.scss';

nav {
  @include center-align-row;
  position: relative;
  width: 60%;
  gap: 20px;
  .link{
    @include center-align-row;
  }

}
</style>