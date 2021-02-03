<template v-if="currentUser">
  <div>
    <wh-error v-if="validationErrors" />
    <div class="indent-top">
      <wh-loading class="spinner-position" v-if="isLoading" />
      <div class="container">
        <template v-if="data">
          <wh-statistics
              :total-volume="totalVolume"
              :total-count="totalCount"
              :product-by-categories="productByCategories"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import WhStatistics from '@/components/Statistics';
import { mapState } from 'vuex';
import { normalizeName } from '@/helpers/normalizeData';
import { actionTypes } from '@/store/modules/product';
import WhLoading from '@/components/Loading';
import WhError from '@/components/Error';

export default {
  name: 'WhInformation',
  components: {
    WhError,
    WhLoading,
    WhStatistics,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.product.isLoading,
      data: (state) => state.product.data,
      currentUser: (state) => state.auth.currentUser,
      validationErrors: (state) => state.product.validationErrors,
    }),
    totalVolume() {
      return this.data.reduce((acc, product) => {
        if (!product.isShipped) {
          return +(acc + product.volume).toFixed(2);
        }
        return acc;
      }, 0);
    },
    totalCount() {
      return this.data.filter((item) => !item.isShipped).length;
    },
    productByCategories() {
      const newObject = {};
      const inStock = this.data.filter((item) => !item.isShipped);
      inStock.reduce((acc, product) => {
        if (!newObject[product.type]) {
          newObject[product.type] = [];
        }
        newObject[product.type].push(product.volume);
        acc.push(newObject);
        return acc;
      }, []);
      return Object.entries(newObject).reduce((acc, [key, value], index) => {
        acc[index] = {
          name: normalizeName(key),
          volume: +value.reduce((acc, prevValue) => acc + prevValue, 0).toFixed(2),
          quantity: value.length,
        };
        return acc;
      }, {});
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getProducts);
  },
};
</script>

<style scoped>
.spinner-position {
  position: absolute;
  top: 50%;
  left: 45%;
  z-index: 999;
}
</style>
