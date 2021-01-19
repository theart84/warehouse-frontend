<template>
  <div class="card mx-auto shadow-sm mt-5">
    <div class="card-header">
      Таблица
    </div>
    <div class="card-body">
      <table class="table table-hover table-bordered table-sm table-responsive-lg">
        <thead>
        <tr>
          <th scope="col">Месторождение</th>
          <th scope="col">Номер блока</th>
          <th scope="col">Длина</th>
          <th scope="col">Ширина</th>
          <th scope="col">Высота</th>
          <th scope="col">Объем</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center"
            v-for="(item, index) in inStockProducts"
            :id="index"
            :key="index"
            @click="hidePopover"
            @dblclick="getInfo"
            :data-id="item._id">
          <td>{{item.type}}</td>
          <td>{{item.number}}</td>
          <td>{{item.length}}</td>
          <td>{{item.width}}</td>
          <td>{{item.height}}</td>
          <td>{{item.volume}}</td>
          <b-popover :target="String(index)"
                     triggers="click"
                     placement="top"
                     delay="{ show: 1, hide: 5 } "
          >
            <template #title> Информация</template>
            <ul class="list-unstyled">
              <li>М/е: {{item.type}}</li>
              <li>Приход: {{item.arrival_date}}</li>
              <li>Номер: {{item.number}}</li>
              <li>Длина:{{item.length}}</li>
              <li>Ширина: {{item.width}}</li>
              <li>Высота: {{item.height}}</li>
              <li>Объем: {{item.volume}}</li>
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
export default {
  name: 'WhTable',
  props: {
    inStockProducts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hidePopover() {
      setTimeout(() => {
        this.$root.$emit('bv::hide::popover')
      }, 5000)
    },
    getInfo() {
      console.log("It's worked")
    }
  }
}
</script>
