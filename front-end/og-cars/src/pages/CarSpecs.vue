<template>
  <div class="q-pa-md cmp-car-form">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="make"
        label="Car name *"
        hint="Car manufacturer"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="model"
        label="Car model *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type model',
          (val) => (val > 0 && val < 100) || 'Please type a real model',
        ]"
      />

      <q-input
        filled
        v-model="type"
        label="Car type *"
        hint="Sedan, Hatchback..."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="fuel"
        label="Fuel type *"
        hint="Gasoline, Diesel..."
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please add fuel type',
          (val) => (val > 0 && val < 100) || 'Please type a real fuel',
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { CarData } from '../components/models';
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import Axios from 'axios';

export default defineComponent({
  name: 'CarSpecs',
  setup() {
    const route = useRoute();
    const params = computed(() => route.params);
    const paramsString = params.value.car_id.toString();
    const getCarURL = 'http://localhost:8081/api/cars/getCar/' + paramsString;
    const $q = useQuasar();
    let make = ref('');
    let model = ref('');
    let type = ref('');
    let fuel = ref('');
    let accept = ref(false);
    let carResults;
    onMounted(async () => {
      carResults = (await Axios.get(getCarURL, { withCredentials: false }))
        .data as CarData;
      console.log(carResults.make, 'data');
      make.value = carResults.make;
      model.value = carResults.model;
      type.value = carResults.type;
      fuel.value = carResults.fuel;
    });

    return {
      onMounted,
      carResults,
      model,
      make,
      type,
      fuel,
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },
      onReset() {
        make.value = '';
        model.value = '';
        type.value = '';
        fuel.value = '';
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.cmp-car-form {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
