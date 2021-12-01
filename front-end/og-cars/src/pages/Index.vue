<template>
  <q-page class="row items-center justify-evenly" v-if="carResponse.length > 0">
    <q-pagination v-model="current" :max="5" input />
    <div class="cmp-car-grid">
      <car-card v-for="car in carResponse" :key="car.id" :car="car"> </car-card>
    </div>
  </q-page>
</template>

<script lang="ts">
//import { Todo, Meta } from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';
import CarCard from '../components/CarCard.vue';
import Axios from 'axios';
import { Car } from '../components/models';

export default defineComponent({
  name: 'PageIndex',
  components: { CarCard },
  setup() {
    //const random = 'string';
    const allCarsURL = 'http://localhost:8081/api/cars/getAllCars';
    let carResponse = ref([] as Car[]);
    let current = ref(1);
    onMounted(async () => {
      carResponse.value = (
        await Axios.get(allCarsURL, { withCredentials: false })
      ).data as Car[];
      console.log(carResponse.value);
    });
    // const todos = ref<Todo[]>([
    //   {
    //     id: 1,
    //     content: 'ct1'
    //   },
    //   {
    //     id: 2,
    //     content: 'ct2'
    //   },
    //   {
    //     id: 3,
    //     content: 'ct3'
    //   },
    //   {
    //     id: 4,
    //     content: 'ct4'
    //   },
    //   {
    //     id: 5,
    //     content: 'ct5'
    //   }
    // ]);
    // const meta = ref<Meta>({
    //   totalCount: 1200
    // });
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
