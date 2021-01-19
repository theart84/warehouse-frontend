<template>
  <div v-if="currentUser">
    <div class="container">
      <wh-statistics
        v-if="data"
        :total-volume="totalVolume"
        :total-count="totalCount"
        :product-by-categories="productByCategories"
      />
      <wh-table
        v-if="data"
        :in-stock-products="inStockProducts"
      />
    </div>
  </div>
</template>

<script>
import WhStatistics from '@/components/Statistics';
import WhTable from '@/components/Table'
import {actionTypes} from "@/store/modules/product";
import {mapState} from 'vuex';
import {normalizeName, normalizeNumber, normalizeDate} from '@/helpers/normalizeData'


export default {
  name: 'WhContent',
  components: {
    WhStatistics,
    WhTable
  },
  computed: {
    ...mapState({
      isLoading: state => state.product.isLoading,
      data: state => state.product.data,
      currentUser: state => state.auth.currentUser
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
      return this.data.filter(item => !item.isShipped).length
    },
    productByCategories() {
      const newObject = {}
      const inStock = this.data.filter(item => !item.isShipped)
      inStock.reduce((acc, product) => {
        if (!newObject[product.type]) {
          newObject[product.type] = [];
        }
        newObject[product.type].push(product.volume)
        acc.push(newObject);
        return acc;
      }, [])
      return Object.entries(newObject).reduce((acc, [key, value], index) => {
        acc[index] = {
          name: normalizeName(key),
          volume: +value.reduce((acc, prevValue) => acc + prevValue, 0).toFixed(2),
          quantity: value.length
        }
        return acc;
      }, {});
    },
    inStockProducts() {
      const newArray = this.data.filter(item => !item.isShipped)
      return newArray.map(item => {
        return {
          ...item,
          type: normalizeName(item.type),
          "arrival_date": normalizeDate(item.arrival_date),
          length: normalizeNumber(item.length),
          width: normalizeNumber(item.width),
          height: normalizeNumber(item.height),
          volume: normalizeNumber(item.volume),
          "shipping_date": normalizeDate(item.shipping_date)
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getProducts)
  }
}
</script>
