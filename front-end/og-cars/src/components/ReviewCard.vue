<template>
  <div class="q-pa-md row items-start q-gutter-md cmp-review">
    <q-card bordered class="cmp-review__card">
      <q-card-section v-if="this.currentUser" class="cmp-review__card-section">
        <q-btn
          size="sm"
          round
          color="primary"
          icon="edit"
          @click="passDataToParent"
        />
        <q-btn size="sm" round color="red-8" icon="delete_forever" />
      </q-card-section>
      <q-card-section class="q-pt-md">
        {{ review.data.message }}
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-rating size="18px" v-model="stars" :max="5" color="primary" />
        <span class="text-caption text-grey q-ml-sm">{{
          review.data.rating
        }}</span>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Events } from 'vue';
import { Review } from './models';
export default defineComponent({
  name: 'ReviewCard',
  props: ['review'],
  emits: ['passDataToParent'],
  setup(props, { emit }) {
    let currentUser = ref(
      localStorage.getItem('uid') == props.review.data.userId
    );
    const passDataToParent = function () {
      emit('passDataToParent', {
        userId: props.review.data.userId,
        message: props.review.data.message,
        rating: props.review.data.rating,
      });
    };
    return {
      review: ref(props.review as Review),
      stars: ref(props.review.data.rating),
      currentUser,
      passDataToParent,
    };
  },
});
</script>
<style lang="scss" scoped>
.cmp-review {
  width: 100%;
  &__card {
    width: 100%;
  }
  &__card .cmp-review__card-section:first-child {
    display: flex;
    justify-content: space-between;
  }
}
</style>
