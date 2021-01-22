<template>
  <div>
    <div class="card mx-auto shadow-sm mt-5">
      <div class="card-header">
        Управление
      </div>
      <div class="card-body">
        <b-form-select class="mb-3"
                       v-model="selected"
                       :options="options"
                       @change="onChange"
        />
        <div class="col-xl-12 col-sm-1 d-flex justify-content-between flex-wrap"
             v-if="isAdmin"
        >
          <b-button
              class="pl-4 pr-4 mb-2"
              variant="primary"
              @click="openModal('modal-add')"
          >
            Добавить
          </b-button>
        </div>
      </div>
    </div>
    <template v-if="isAdmin">
      <b-modal
          id="modal-add"
          ref="modal1"
          title="Добавить блок"
          @show="resetModalAdd"
          @hidden="resetModalAdd"
          @ok="handleOkAdd"
      >
        <form ref="formAdd">
          <b-form-group>
            <div v-if="isValid" class="text-danger">Заполните все поля</div>
            <b-form-select
                class="mb-3"
                v-model="formAdd.type"
                :options="optionsAddProduct"
            />
            <b-form-input class="mb-2"
                          v-model="formAdd.number"
                          id="input-type"
                          placeholder="Номер блока"
                          invalid-feedback="Name is required"
                          required
            />
            <b-form-datepicker
                id="datePickerAddArrival_date"
                v-model="formAdd.arrival_date"
                class="mb-2"
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.length"
                id="input-length"
                placeholder="Длина"
                invalid-feedback="Name is required"
                required
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.width"
                id="input-width"
                placeholder="Ширина"
                invalid-feedback="Name is required"
                required
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.height"
                id="input-height"
                placeholder="Высота"
                invalid-feedback="Name is required"
                required
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.v_prov"
                id="input-v-prov"
                placeholder="Входящий объем"
                invalid-feedback="Name is required"
                required
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.volume"
                placeholder="Объем"
                required
            />
            <b-form-input
                class="mb-2"
                v-model="formAdd.v_base"
                placeholder="Объем для базы"
                required
            />
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
  props: {},
  data() {
    return {
      selected: null,
      options: [
        {value: null, text: 'Выбрать нужный фильтр...'},
        {value: {isShipped: null}, text: 'Показать все позиции'},
        {value: {isShipped: false, type: 'All'}, text: 'Показать все из наличия'},
        {value: {isShipped: true}, text: 'Показать все списанное'},
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
      isValid: false,
      formAdd: {
        type: '',
        number: '',
        "arrival_date": '',
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
      isAdmin: state => state.auth.currentUser.isAdmin,
      selectedProduct: state => state.product.selectedProduct
    })
  },
  methods: {
    openModal(params) {
      this.$bvModal.show(params)
      if (params === 'modal-edit') {
        this.$store.dispatch(actionTypes.editProduct, this.currentElement).then(response => {
          this.formEdit = {
            type: response.data.type,
            number: response.data.number,
            "arrival_date": response.data.arrival_date,
            length: response.data.length,
            width: response.data.width,
            height: response.data.height,
            "v_prov": response.data.v_prov,
            volume: response.data.volume,
            "v_base": response.data.v_base,
            "shipping_date": response.data.shipping_date,
            transport: response.data.transport,
            driver: response.data.driver,
            client: response.data.client,
          }
        });
        document.querySelector('.row-active').classList.remove('row-active');
      }
    },
    onChange() {
      this.$emit('onSelect', this.selected)
    },
    // ADD MODAL METHODS
    checkFormValidityAdd() {
      const valid = this.$refs.formAdd.checkValidity()
      this.isValid = !valid
      return valid
    },
    resetModalAdd() {
      this.formAdd.type = ''
      this.formAdd.number = ''
      this.formAdd.arrival_date = ''
      this.formAdd.length = ''
      this.formAdd.width = ''
      this.formAdd.height = ''
      this.formAdd.v_prov = ''
      this.formAdd.volume = ''
      this.formAdd.v_base = ''
      this.isValid = false;
    },
    handleOkAdd(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmitAdd()
    },
    handleSubmitAdd() {
      if (!this.checkFormValidityAdd()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add')
      })
      this.addProduct(this.formAdd)
    },
    addProduct(data) {
      this.$store.dispatch(actionTypes.addProduct, data)
    },
  }
}
</script>
