<template v-if="currentUser">
  <div>
    <wh-error v-if="validationErrors" />
    <wh-loading class="spinner-position" v-if="isLoading"/>
      <div class="container">
        <template v-if="data">
          <wh-control @onSelect="selectedData" />
          <wh-table :serializeData="serializeData" />
        </template>
      </div>
  </div>
</template>

<script>
import WhTable from '@/components/Table';
import WhControl from "@/components/Control";
import WhLoading from '@/components/Loading'
import {actionTypes, getterTypes} from "@/store/modules/product";
import {mapState, mapGetters} from 'vuex';
import {normalizeName, normalizeDate, normalizeNumber} from '@/helpers/normalizeData'
import WhError from "@/components/Error";


export default {
  name: 'WhContent',
  components: {
    WhError,
    WhTable,
    WhControl,
    WhLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.product.isLoading,
      data: state => state.product.data,
      currentUser: state => state.auth.currentUser,
      validationErrors: state => state.product.validationErrors
    }),
    ...mapGetters({
      filterData: getterTypes.filterData
    }),
    serializeData() {
      return this.filterData.map(item => {
        return {
          ...item,
          type: normalizeName(item.type),
          "arrival_date": normalizeDate(item.arrival_date),
          length: normalizeNumber(item.length),
          width: normalizeNumber(item.width),
          height: normalizeNumber(item.height),
          volume: normalizeNumber(item.volume),
          "v_base": normalizeNumber(item.v_base),
          "v_prov": normalizeNumber(item.v_prov),
          "shipping_date": normalizeDate(item.shipping_date)
        }
      })
    }
  },

  methods: {
    selectedData(value) {
      if (value === null) {
        value = {}
      }
      this.$store.dispatch(actionTypes.filterData, value)
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getProducts)
    this.$store.dispatch(actionTypes.filterData, {isShipped: false, type: 'All'})
  }
}
</script>

<style scoped>
.spinner-position {
  position: absolute;
  top: calc(50% - 25px);
  left: 45%;
  z-index: 999;
}
</style>
