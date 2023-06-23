<template>
  <div>
    <p>Заканчивается: {{ offerEndDate }}</p>
  </div>
</template>

<script setup>
import useUpdateSteamOffer from '@/use/useUpdateSteamOffer.js';

const { offerEndDate, updateOffer } = useUpdateSteamOffer();

</script>
