<template>
  <div class="card mx-auto shadow-sm mt-5 mb-5">
    <div class="card-header">
      Таблица
    </div>
    <div class="card-body">
      <table class="table table-hover table-bordered table-sm unselectable">
        <thead class="text-center">
        <tr>
          <th scope="col" @click="sortParams='type'">{{screenWidth ? 'Месторождение' : 'М-е' }}</th>
          <th scope="col" @click="sortParams='number'">Номер</th>
          <template v-if="screenWidth">

            <th scope="col" @click="sortParams='length'">Длина</th>
            <th scope="col" @click="sortParams='width'">Ширина</th>
            <th scope="col" @click="sortParams='height'">Высота</th>
          </template>
          <th scope="col" @click="sortParams='volume'">Объем</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center cursor-pointer" :class="item.isShipped ? 'table-danger' : ''"
            v-for="(item, index) in sortData"
            :id="index"
            :key="index"
            @click="choiceProduct"
            @dblclick="viewProductInfo"
            @touchstart="doubleTap"
            :data-id="item._id">
          <td>{{item.type}}</td>
          <td>{{item.number}}</td>
          <template v-if="screenWidth">

            <td>{{item.length}}</td>
            <td>{{item.width}}</td>
            <td>{{item.height}}</td>
          </template>
          <td>{{item.volume}}</td>
          <b-popover :target="String(index)"
                     triggers="click"
                     placement="top"
                     delay="200"
          >
            <template #title> Информация</template>
            <ul class="list-unstyled">
              <li>М/е: {{item.type}}</li>
              <li>Приход: {{item.arrival_date}}</li>
              <li>Номер: {{item.number}}</li>
              <li>Длина: {{item.length}}</li>
              <li>Ширина: {{item.width}}</li>
              <li>Высота: {{item.height}}</li>
              <li v-if="isAdmin">Входящий объем: {{item.v_prov}}</li>
              <li>Объем: {{item.volume}}</li>
              <li v-if="isAdmin">Объем база: {{item.v_base}}</li>
              <li v-if="item.shipping_date">Отгружен: {{item.shipping_date}}</li>
              <li v-if="item.transport">Транспорт: {{item.transport}}</li>
              <li v-if="item.driver">Водитель: {{item.driver}}</li>
              <li v-if="item.client">Клиент: {{item.client}}</li>

            </ul>
          </b-popover>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/product';

export default {
  name: 'WhTable',
  props: {
    serializeData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sortParams: '',
      screenWidth: window.innerWidth > 700,
      startTap: 0,
    };
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.auth.currentUser.isAdmin,
    }),
    sortData() {
      if (!this.sortParams) {
        return this.serializeData;
      }
      return this.serializeData
        .slice()
        .sort((prev, next) => (prev[this.sortParams] < next[this.sortParams] ? -1 : 1));
    },
  },
  methods: {
    choiceProduct(e) {
      this.$root.$emit('bv::hide::popover');
      e.target.closest('tr').classList.add('row-active');
      setTimeout(() => {
        try {
          document.querySelector('.row-active').classList.remove('row-active');
        } catch {
          return;
        }
      }, 400);
      setTimeout(() => {
        e.target.closest('tr').classList.add('row-active2');
      }, 400);
      setTimeout(() => {
        try {
          document.querySelector('.row-active2').classList.remove('row-active2');
        } catch {
          return;
        }
      }, 800);
    },
    doubleTap() {
      const endTap = Date.now();
      const difference = endTap - this.startTap;
      if (difference < 500) {
        this.startEvent();
      }
      this.startTap = endTap;
    },
    updateWidth() {
      this.screenWidth = window.innerWidth > 700;
    },
    startEvent(e) {
      const productID = e.target.closest('tr').dataset.id;
      this.$store.dispatch(actionTypes.selectedProduct, { id: productID })
        .then(() => this.$router.push({ name: 'productInfo' }));
    },
    viewProductInfo(e) {
      const productID = e.target.closest('tr').dataset.id;
      this.$store.dispatch(actionTypes.selectedProduct, { id: productID })
        .then(() => this.$router.push({ name: 'productInfo' }));
    },
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
  },
};
</script>

<style>
.row-active {
  background-color: #409eff !important;
  transition: all 0.3s linear;
}
.row-active2 {
  background-color: #ececec !important;
  transition: all 0.3s linear;
}

</style>

<style scoped>
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
}
.cursor-pointer {
  cursor: pointer;
}
</style>
