<template>
  <div class="card mx-auto shadow-sm mt-5">
    <div class="card-header">
      Таблица
    </div>
    <div class="card-body">
      <table class="table table-bordered table-sm">
        <thead>
        <tr>
          <th scope="col">Месторождение</th>
          <template v-if="screenWidth">
            <th scope="col">Номер блока</th>
            <th scope="col">Длина</th>
            <th scope="col">Ширина</th>
            <th scope="col">Высота</th>
          </template>
          <th scope="col">Объем</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" :class="item.isShipped ? 'table-danger' : ''"
            v-for="(item, index) in serializeData"
            :id="index"
            :key="index"
            @click="choiceProduct"
            @dblclick="viewProductInfo"
            @touchstart="doubleTap"
            :data-id="item._id">
          <td>{{item.type}}</td>
          <template v-if="screenWidth">
            <td>{{item.number}}</td>
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
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/product";

export default {
  name: 'WhTable',
  props: {
    serializeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      screenWidth: window.innerWidth > 700,
      startTap: 0
    }
  },
  computed: {
    ...mapState({
      isAdmin: state => state.auth.currentUser.isAdmin
    })
  },
  methods: {
    choiceProduct(e) {
      const productID = e.target.closest('tr').dataset.id
      e.target.closest('tr').classList.toggle('row-active')
      if (e.target.closest('tr').classList.contains('row-active')) {
        this.$store.dispatch(actionTypes.currentElement, {id: productID});
      } else {
        this.$store.dispatch(actionTypes.currentElement, null)
      }
      setTimeout(() => {
        this.$root.$emit('bv::hide::popover')
      }, 5000)
    },
    doubleTap() {
      const endTap = Date.now()
      const difference = endTap - this.startTap;
      if (difference < 500) {
        this.startEvent()
      }
      this.startTap = endTap
      console.log('Double')
    },
    updateWidth() {
      this.screenWidth = window.innerWidth > 700;
    },
    startEvent() {
      console.log('Double tap')
      this.$router.push({name: 'productInfo'});

    },
    viewProductInfo() {
      this.$router.push({name: 'productInfo'});
    }
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
  },
}
</script>

<style>
.row-active {
  background-color: #409eff !important;
  transition: all 0.3s linear;
}
</style>
