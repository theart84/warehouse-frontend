<template>
  <div class="container">
    <div class="col-md-6">
      <div class="card mx-auto shadow-sm mt-5">
        <div class="card-header">
          Статистика
        </div>
        <div class="card-body">
          <h5 class="card-title">Общие данные</h5>
          <form ref="formEdit">
            <b-form-group>
              <div class="text-danger">Заполните все поля</div>
              <b-form-select class="mb-3" v-model="form['type']" :options="optionsAddProduct"/>
              <b-form-input class="mb-2" v-model="form.number" id="input-type" placeholder="Номер блока"
                            invalid-feedback="Name is required" required/>
              <small>Дата прихода<span v-if="form.arrival_date"></span></small>
              <b-form-datepicker id="datePickerEditArrival_date" v-model="form.arrival_date" class="mb-2"/>
              <b-form-input class="mb-2" v-model="form.length" id="input-length" placeholder="Длина"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2" v-model="form.width" id="input-width" placeholder="Ширина"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2" v-model="form.height" id="input-height" placeholder="Высота"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2" v-model="form.v_prov" id="input-v-prov" placeholder="Входящий объем"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2"
                            v-model="form.volume"
                            placeholder="Объем"
                            required/>
              <b-form-input class="mb-2"
                            v-model="form.v_base"
                            placeholder="Объем для базы"
                            required></b-form-input>
              <small>Дата отгрузки<span v-if="form.shipping_date"></span></small>
              <b-form-datepicker id="datePickerEditShipping_date" v-model="form.shipping_date" class="mb-2"/>
              <b-form-input class="mb-2" v-model="form.transport" placeholder="Транспорт"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2" v-model="form.driver" placeholder="Водитель"
                            invalid-feedback="Name is required" required/>
              <b-form-input class="mb-2" v-model="form.client" placeholder="Клиент"
                            invalid-feedback="Name is required" required/>
            </b-form-group>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhProductInfo',
  data() {
    return {
      selected: null,
      form: {
        type: null,
        number: '',
        "arrival_date": '',
        length: '',
        width: '',
        height: '',
        "v_prov": '',
        volume: '',
        "v_base": '',
        "shipping_date": '',
        transport: '',
        driver: '',
        client: '',
      },
      optionsAddProduct: [
        {value: null, text: 'Месторождение'},
        {value: 'Ж1', text: 'Желтау-1'},
        {value: 'Ж2', text: 'Желтау-2'},
        {value: 'Ж3', text: 'Желтау-3'},
        {value: 'Ж5', text: 'Желтау-5'},
        {value: 'Ж7', text: 'Желтау-7'},
        {value: 'Ж9', text: 'Желтау-9'},
        {value: 'Ж11', text: 'Желтау-11'},
        {value: 'ЖН', text: 'Желтау-Надежда'},
        {value: 'КТ', text: 'Куртинский темный'},
        {value: 'КСВ', text: 'Куртинский светлый'},
        {value: 'Капал Аросан', text: 'Капал Аросан'},
        {value: 'Сары-Тас', text: 'Сары-Тас'},
      ],
    }
  }
}
</script>
