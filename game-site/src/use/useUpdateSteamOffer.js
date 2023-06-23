import { ref, onMounted } from 'vue';

export default function useSteamOffer() {
  const offerEndDate = ref(null);

  const updateOffer = () => {
    const today = new Date();
    const offerDurationDays = 7;
    const offerEndTimeHours = 22;

    // Установка времени окончания на два часа ночи
    const offerEndDateValue = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4, offerEndTimeHours);

    if (!offerEndDate.value || today >= offerEndDate.value) {
      // Добавление длительности предложения к дате окончания
      offerEndDateValue.setDate(offerEndDateValue.getDate() + offerDurationDays);
      const day = offerEndDateValue.getDate();
      const month = offerEndDateValue.toLocaleDateString('ru-RU', { month: 'long' });
      const year = offerEndDateValue.getFullYear();
      const hours = offerEndDateValue.getHours().toString().padStart(2, '0');
      const minutes = offerEndDateValue.getMinutes().toString().padStart(2, '0');
      
      offerEndDate.value = `${day} ${month} ${year} ${hours}:${minutes}`;
    }
  };

  onMounted(() => {
    updateOffer();
  });

  return {
    offerEndDate,
    updateOffer,
  };
}
