<template>
  <div>
    <div class="card mx-auto shadow-sm mt-5">
      <div class="card-header">
        Управление
      </div>
      <div class="card-body">

        <b-form-select v-model="selected" :options="options" @change="onChange"></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhControl',
  props: {

  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Сортировка' },
        { value: 'Ж1', text: 'Желтау-1' },
        { value: 'Ж2', text: 'Желтау-2' },
        { value: 'Ж3', text: 'Желтау-3' },
        { value: 'Ж5', text: 'Желтау-5' },
        { value: 'Ж7', text: 'Желтау-7' },
        { value: 'Ж9', text: 'Желтау-9' },
        { value: 'Ж11', text: 'Желтау-11' },
        { value: 'ЖН', text: 'Желтау-Надежда' },
        { value: 'КТ', text: 'Куртинский темный' },
        { value: 'КСВ', text: 'Куртинский светлый' },
        { value: 'Капал Аросан', text: 'Капал Аросан' },
        { value: 'Сары-Тас', text: 'Сары-Тас' },
      ]
    }
  },
  methods: {
    onChange() {
      this.$emit('onSelect', this.selected)
    }
  }
}
</script>
