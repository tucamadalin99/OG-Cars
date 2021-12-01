<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <car-card
      v-if="carResponse.length > 0"
      :make="carResponse[0].data.type"
      :model="model"
    >
    </car-card>
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
    let make = 'kia hardcoded';
    let model = 'model hardcoded';
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
    return { carResponse, make, model, onMounted };
  },
});
</script>
