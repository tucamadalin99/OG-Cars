<template>
  <div class="q-pa-md row items-start q-gutter-md cmp-car">
    <q-card class="cmp-car__element">
      <q-card-section>
        <div class="text-h6 q-mb-xs">
          {{ car.data.make }} {{ car.data.model }}
        </div>
        <div class="row no-wrap items-center">
          <q-rating
            readonly
            size="18px"
            v-model="stars"
            :max="5"
            color="primary"
          />
          <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
        </div>
      </q-card-section>
      <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

      <q-list>
        <q-item clickable @click="handleEdit">
          <q-item-section avatar>
            <q-icon color="primary" name="edit_note" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Specs</q-item-label>
            <q-item-label caption>View/Update car data</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="handleReview">
          <q-item-section avatar>
            <q-icon color="orange" name="reviews" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Reviews</q-item-label>
            <q-item-label caption>Read & Write reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="delete_forever" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Delete</q-item-label>
            <q-item-label caption>Delete car from db</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script lang="ts">
// import {
//   defineComponent,
//   PropType,
//   computed,
//   ref,
//   toRef,
//   Ref,
// } from 'vue';
//import { Car, Review } from './models';
import { ref, defineComponent } from 'vue';
import { Car } from './models';
export default defineComponent({
  name: 'CarCard',
  props: ['car'],
  setup(props) {
    return {
      carObj: ref(props.car as Car),
      stars: ref(4),
    };
  },
  methods: {
    handleEdit() {
      void this.$router.push(`/specs/${this.carObj.id}`);
    },
    handleReview() {
      void this.$router.push(`/reviews/${this.carObj.id}`);
    },
  },
});

// function useClickCount() {
//   const clickCount = ref(0);
//   function increment() {
//     clickCount.value += 1
//     return clickCount.value;
//   }

//   return { clickCount, increment };
// }

// function useDisplayTodo(todos: Ref<Todo[]>) {
//   const todoCount = computed(() => todos.value.length);
//   return { todoCount };
// }

// export default defineComponent({
//   name: 'CompositionComponent',
//   props: {
//     title: {
//       type: String,
//       required: true
//     },
//     todos: {
//       type: Array as PropType<Todo[]>,
//       default: () => []
//     },
//     meta: {
//       type: Object as PropType<Meta>,
//       required: true
//     },
//     active: {
//       type: Boolean
//     }
//   },
//   setup(props) {
//     return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')) };
//   },
// });
</script>
<style lang="scss" scoped>
.cmp-car {
  width: 30%;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
