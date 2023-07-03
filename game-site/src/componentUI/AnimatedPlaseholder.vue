<template>
  <div class="place-grid">
    <div class="placeholder">
      
    </div>
  </div>
</template>
  
<script setup>
defineProps({
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  borderRadius: {
    type: String,
  },
});
</script>
  
<style lang="scss" scoped>
.place-grid{
  display: grid;
}
@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}

.placeholder {
  border-radius: v-bind(borderRadius);
  background-image: linear-gradient(to right,
      #d6d7d8 0%,
      #e2e3e4 10%,
      #d6d7d8 20%,
      #d6d7d8 100%);
  background-size: 460px 215px;
  object-fit: contain;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: bgAnimate 1.2s linear infinite;

}
.grid-5fr {
    .placeholder {
        height: 8vw;
    }
}

.grid-3fr {
    .placeholder{
        height: 13vw;
    }
}

.grid-2fr {
    .placeholder {
        height: 20vw;
    }
}
</style>