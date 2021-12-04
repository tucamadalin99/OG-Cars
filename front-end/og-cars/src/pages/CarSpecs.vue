<template>
  <div class="q-pa-md cmp-specs">
    <q-form @submit="onSubmit" @reset="onReset" class="q-pa-lg cmp-specs__form">
      <q-input
        filled
        :disable="!this.isLoggedIn"
        v-model="make"
        label="Car name *"
        hint="Car manufacturer"
        lazy-rules
        class="q-mb-md"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        class="q-mb-md"
        :disable="!this.isLoggedIn"
        v-model="model"
        label="Car model *"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type model']"
      />

      <q-input
        filled
        class="q-mb-md"
        :disable="!this.isLoggedIn"
        v-model="type"
        label="Car type *"
        hint="Sedan, Hatchback..."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        class="q-mb-md"
        :disable="!this.isLoggedIn"
        v-model="fuel"
        label="Fuel type *"
        hint="Gasoline, Diesel..."
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please add fuel type',
        ]"
      />

      <div class="cmp-specs__form-buttons">
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          :disable="!this.isLoggedIn"
        />
        <q-btn
          :disable="!this.isLoggedIn"
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <div
        v-if="!this.isLoggedIn"
        class="cmp-specs__form-message q-mt-md flex flex-center"
      >
        Not authenticated
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { CarData } from '../components/models';
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import Axios, { AxiosResponse, AxiosError } from 'axios';
import Utils from '../components/utils';

export default defineComponent({
  name: 'CarSpecs',
  setup() {
    const route = useRoute();
    const params = computed(() => route.params);
    const paramsString = params.value.car_id.toString();
    const $q = useQuasar();
    let make = ref('');
    let model = ref('');
    let type = ref('');
    let fuel = ref('');
    let isLoggedIn = Utils.getExpiringLocalStorage('jwt-auth') ? true : false;

    let carResults;
    onMounted(async () => {
      carResults = (
        await Axios.get(Utils.URLs.car.getCar(paramsString), {
          withCredentials: false,
        })
      ).data as CarData;
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
      isLoggedIn,
      onSubmit() {
        const editCarBody: CarData = {
          make: make.value,
          model: model.value,
          type: type.value,
          fuel: fuel.value,
        };
        const token = Utils.getExpiringLocalStorage('jwt-auth');
        Utils.setDefaultHeader(token);
        void Axios.put(Utils.URLs.car.editCar(paramsString), editCarBody, {
          withCredentials: true,
        })
          .then((response: AxiosResponse) => {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: response.data.message,
            });
          })
          .catch((err: AxiosError) => {
            $q.notify({
              color: 'red-8',
              textColor: 'white',
              icon: 'error',
              message: err.response?.data.message,
            });
          });
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
.cmp-specs {
  display: flex;
  justify-content: center;
  align-content: center;

  &__form {
    width: 80%;
    @media (min-width: 1368px) {
      width: 25%;
      padding: 24px;
      margin-top: 18px;
      box-shadow: 0px 0px 18px 1px #d4d4d4;
      border-radius: 6px;
    }
    &-buttons {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
