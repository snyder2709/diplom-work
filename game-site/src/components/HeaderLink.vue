<template>
  <nav class="nav-link">
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
  { title: "Предложение", class: "link", link: "/" },
])

const handleInputEvent = (state) => {
  inputState.value = state
} 


</script>

<style lang="scss" scoped>
@import '../assets/main.scss';
@import '@/assets/components-style/transition-class.scss';

.nav-link {
  @include center-align-row;
  position: relative;
  width: 60%;
  gap: 20px;
  .link{
    @include center-align-row;
  }

}
</style>