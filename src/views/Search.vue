<template v-if="currentUser">
  <div class="indent-top">
    <wh-error v-if="validationErrors" />
    <wh-loading class="spinner-position" v-if="isLoading"/>
      <div class="container">
        <template v-if="data">
          <wh-table v-if="data.quantityResult" :serializeData="serializeData" />
          <div v-else class="card mx-auto shadow-sm mt-5 mb-5">
            <div class="card-header">
              Таблица
            </div>
            <div class="card-body text-center">
              <h4>Ничего не найдено</h4>
              <button class="btn btn-primary" @click="goToInfo">Назад</button>
            </div>
          </div>
        </template>

      </div>
  </div>
</template>

<script>
import WhTable from '@/components/Table';
import WhLoading from '@/components/Loading';
import { mapState } from 'vuex';
import { normalizeName, normalizeDate, normalizeNumber } from '@/helpers/normalizeData';
import WhError from '@/components/Error';

export default {
  name: 'WhSearch',
  components: {
    WhError,
    WhTable,
    WhLoading,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.product.isLoading,
      data: (state) => state.product.searchResult,
      currentUser: (state) => state.auth.currentUser,
      validationErrors: (state) => state.product.validationErrors,
    }),
    serializeData() {
      return this.data.data.map((item) => ({
        ...item,
        type: normalizeName(item.type),
        arrival_date: normalizeDate(item.arrival_date),
        length: normalizeNumber(item.length),
        width: normalizeNumber(item.width),
        height: normalizeNumber(item.height),
        volume: normalizeNumber(item.volume),
        v_base: normalizeNumber(item.v_base),
        v_prov: normalizeNumber(item.v_prov),
        shipping_date: normalizeDate(item.shipping_date),
      }));
    },
  },
  methods: {
    goToInfo() {
      this.$router.push({ name: 'information' });
    },
  },
};
</script>

<style scoped>
.spinner-position {
  position: absolute;
  top: calc(50% - 25px);
  left: 45%;
  z-index: 999;
}
</style>
