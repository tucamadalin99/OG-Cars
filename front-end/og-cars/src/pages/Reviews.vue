<template>
  <q-page class="cmp-reviews col items-center justify-center">
    <div class="cmp-reviews__add">
      <h5 v-if="!isEditing" class="text-h5 text-weight-bold">
        Add your review
      </h5>
      <h5 v-if="isEditing" class="text-h5 text-weight-bold">
        Edit your review
      </h5>
      <div class="q-pa-md cmp-reviews__add-field">
        <q-input v-model="reviewMessage" filled type="textarea" />
        <q-rating
          class="q-mt-sm"
          size="24px"
          v-model="stars"
          :max="5"
          color="primary"
        />
      </div>
      <div class="q-pl-md q-pr-md q-mb-md cmp-reviews__add-actions">
        <q-btn
          round
          color="primary"
          icon="send"
          type="submit"
          @click="onSubmit"
        />
        <q-btn round color="red-8" icon="delete_forever" />
      </div>
    </div>
    <q-separator inset />
    <h5 class="text-h5 text-weight-bold">All Reviews</h5>
    <div class="cmp-reviews__actions flex flex-center q-mt-lg">
      <!-- <q-btn rounded color="primary" icon-right="mail" label="Add Review" /> -->
      <q-select
        class="cmp-reviews__actions-type"
        rounded
        outlined
        v-model="selectedType"
        :options="typeOptions"
        label="Review Types"
      />
      <q-select
        class="cmp-reviews__actions-type"
        rounded
        outlined
        v-model="selectedSort"
        :options="sortOptions"
        label="Sort Reviews"
      />
    </div>
    <div class="cmp-reviews__grid">
      <review-card
        @passDataToParent="getDataFromChild($event)"
        v-for="review in reviewsResponse"
        :key="review.id"
        :review="review"
      ></review-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref, computed, onMounted } from 'vue';
import Axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Utils from '../components/utils';
import ReviewCard from '../components/ReviewCard.vue';
import { Review, ReviewData } from '../components/models';

export default {
  name: 'Reviews',
  components: { ReviewCard },
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const route = useRoute();
    const params = computed(() => route.params);
    const paramsString = params.value.car_id.toString();
    let reviewMessage = ref('');
    let stars = ref(0);
    let reviewsResponse = ref([] as Review[]);
    let localReviewId = 0;
    let isEditing = ref(false);

    onMounted(async () => {
      reviewsResponse.value = (
        await Axios.get(Utils.URLs.review.getAll(paramsString), {
          withCredentials: false,
        })
      ).data as Review[];
    });

    return {
      typeOptions: ['All Reviews', 'My Reviews'],
      sortOptions: ['Default', 'Ascending Score', 'Descending Score'],
      selectedType: ref('All Reviews'),
      selectedSort: ref('Default'),
      reviewMessage,
      reviewsResponse,
      stars,
      isEditing,

      onSubmit() {
        if (reviewMessage.value.length > 6 && stars.value > 0) {
          const uid = localStorage.getItem('uid');
          console.log(uid);
          if (uid) {
            if (isEditing) {
              Axios.put(
                Utils.URLs.user.editReview(paramsString),
                { message: reviewMessage.value, rating: stars.value },
                { withCredentials: true }
              )
                .then(() => {
                  $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Success!',
                  });
                })
                .catch((err) => {
                  $q.notify({
                    color: 'red-8',
                    textColor: 'white',
                    icon: 'error',
                    message: err.response?.data.message,
                  });
                });
            } else {
              Axios.post(
                Utils.URLs.user.addReview(paramsString),
                { message: reviewMessage.value, rating: stars.value },
                { withCredentials: true }
              )
                .then((response: AxiosResponse) => {
                  reviewsResponse.value.push({
                    id: ++localReviewId + '',
                    data: {
                      userId: uid,
                      message: reviewMessage.value,
                      rating: stars.value,
                    },
                  });
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
            }
          }
        } else {
          $q.notify({
            color: 'red-8',
            textColor: 'white',
            icon: 'error',
            message:
              'Your review should have at least 6 characters and 1 star rating',
          });
        }
      },

      onReset() {},

      getDataFromChild(data: ReviewData) {
        isEditing.value = true;
        reviewMessage.value = data.message;
        stars.value = data.rating;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
h5 {
  text-align: center;
}
.cmp-reviews {
  &__actions {
    margin: 24px 0;
    gap: 24px;

    & > .q-btn {
      height: 56px;
    }
  }
  &__actions-type {
    width: 200px;
  }
  &__add {
    display: flex;
    flex-direction: column;
    align-items: center;
    // box-shadow: 0px 0px 18px 1px #d4d4d4;
    &-field {
      width: 50%;
      @media (max-width: 1023px) {
        width: 100%;
      }
    }
    &-actions {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      gap: 24px;
      @media (max-width: 1023px) {
        width: 100%;
      }
    }
  }
}
</style>