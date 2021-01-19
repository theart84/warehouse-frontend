<template>
  <div>
    <div class="card mx-auto shadow-sm mt-5">
      <div class="card-header">
        Статистика
      </div>
      <div class="card-body">
        <h5 class="card-title">Общие данные</h5>
        <p>Общий объем блоков - <span>{{totalVolume}}м&sup3;</span></p>
        <p>Общее количество блоков - <span>{{totalCount}}шт.</span></p>
      </div>
      <div class="row d-flex justify-content-between col-md-6 col-lg-12">
        <div class="card-body ">
          <h5 class="card-title">Объем</h5>
          <ul>
            <li v-for="(item, index) in productByCategories" :key="index">{{item.name}}: {{item.volume}}м&sup3;</li>
          </ul>
        </div>
        <div class="card-body ">
          <h5 class="card-title">Количество</h5>
          <ul>
            <li v-for="(item, index) in productByCategories" :key="index">{{item.name}}: {{item.quantity}}шт.;</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhStatistics',
  props: {
    totalVolume: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    },
    productByCategories: {
      type: Object
    }
  }
}
</script>
