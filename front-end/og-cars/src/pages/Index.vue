<template>
  <q-page class="row items-center justify-evenly" v-if="carResponse.length > 0">
    <div class="cmp-car-grid">
      <car-card v-for="car in carResponse" :key="car.id" :car="car"> </car-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CarCard from '../components/CarCard.vue';
import Axios from 'axios';
import { Car } from '../components/models';
import Utils from '../components/utils';

export default defineComponent({
  name: 'PageIndex',
  components: { CarCard },
  setup() {
    let carResponse = ref([] as Car[]);
    let current = ref(1);
    onMounted(async () => {
      carResponse.value = (
        await Axios.get(Utils.URLs.car.getAll, { withCredentials: false })
      ).data as Car[];
    });
    return { carResponse, onMounted, current };
  },
});
</script>

<style lang="scss" scoped>
.cmp-car-grid {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
