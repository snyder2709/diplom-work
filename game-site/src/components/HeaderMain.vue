<template>
  <header class="header-main">
    <nav>
      <div v-for="link in linkRoutes" :key="link.title">
        <RouterLink :to="link.link" :class="link.class">{{ link.title }}</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router'

const linkRoutes = reactive([
        { title: "Жанры", class: "link", link: "genre" },
        { title: "Новинки", class: "link", link: "new" },
        { title: "Предложение", class: "link", link: "/" },
        { title: "Новости", class: "link", link: "news" },
      ])


</script>

<style lang="scss" scoped>
@import '../assets/main.scss';

.header-main {
  position: relative;
  z-index: 5;
  overflow: hidden;
  width: 100vw;
  height: 10vh;
  margin: 20px 0 20px 0vh;
  background-color: transparent;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: row;
  padding: $header-padding;
}




  nav {
    display: flex;
    gap: 20px;
   
  }

</style>