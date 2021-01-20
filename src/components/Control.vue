<template>
  <div>
    <div class="card mx-auto shadow-sm mt-5">
      <div class="card-header">
        Управление
      </div>
      <div class="card-body">
        <b-form-select class="mb-3" v-model="selected" :options="options" @change="onChange"></b-form-select>
        <div class="col-xl-12 col-sm-1 d-flex justify-content-between flex-wrap">
          <b-button class="pl-4 pr-4 mb-2" variant="primary" v-b-modal.modal-prevent-closing>Добавить</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary">Удалить</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary">Списать</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary">Изменить</b-button>
        </div>
      </div>
    </div>
    <template v-if="isAdmin">
      <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Добавить блок"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
      >
        <form ref="form" >
          <b-form-group>
            <b-form-select class="mb-3" v-model="form.type" :options="optionsAddProduct"></b-form-select>
            <b-form-input class="mb-2" v-model="form.number" id="input-type" placeholder="Номер блока" invalid-feedback="Name is required" required />
            <b-form-datepicker id="example-datepicker" v-model="form.arrival_date" class="mb-2" />
            <b-form-input class="mb-2" v-model="form.length" id="input-length" placeholder="Длина" invalid-feedback="Name is required" required />
            <b-form-input class="mb-2" v-model="form.width" id="input-width" placeholder="Ширина" invalid-feedback="Name is required" required />
            <b-form-input class="mb-2" v-model="form.height" id="input-height" placeholder="Высота" invalid-feedback="Name is required" required />
            <b-form-input class="mb-2" v-model="form.v_prov" id="input-v-prov" placeholder="Входящий объем" invalid-feedback="Name is required" required />
            <b-form-input class="mb-2"
                          v-model="form.volume"
                          :state="volumeState"
                          id="input-volume"
                          placeholder="Объем"
                          invalid-feedback="Volume is required"
                          required />
            <b-form-input class="mb-2"
                          :state="v_baseState"
                          v-model="form.v_base"
                          id="input-v-base"
                          placeholder="Объем для базы"
                          invalid-feedback="v_baseState is required"
                          required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </template>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "@/store/modules/product";

export default {
  name: 'WhControl',
  props: {

  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Выбрать нужный фильтр...' },
        { value: {isShipped: null}, text: 'Показать все позиции' },
        { value: {isShipped: false, type: 'All'}, text: 'Показать все из наличия' },
        { value: {isShipped: true}, text: 'Показать все списанное' },
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
      ],
      optionsAddProduct: [
        { value: null, text: 'Месторождение' },
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
      ],
      v_baseState: null,
      volumeState: null,
      form: {
        type: '',
        number: '',
        arrival_date: '',
        length: '',
        width: '',
        height: '',
        "v_prov": '',
        volume: '',
        "v_base": '',
      }
    }
  },
  computed: {
    ...mapState({
      isAdmin: state => state.auth.currentUser.isAdmin
    })
  },
  methods: {
    onChange() {
      this.$emit('onSelect', this.selected)
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.v_baseState = valid
      return valid
    },
    resetModal() {
      this.v_baseState = ''
      this.v_baseState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
      this.addProduct(this.form)
    },
    addProduct(data) {
      this.$store.dispatch(actionTypes.addProduct, data)
    }
  }
}
</script>
