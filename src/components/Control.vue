<template>
  <div>
    <div class="card mx-auto shadow-sm mt-5">
      <div class="card-header">
        Управление
      </div>
      <div class="card-body">
        <b-form-select class="mb-3" v-model="selected" :options="options" @change="onChange"></b-form-select>
        <div class="col-xl-12 col-sm-1 d-flex justify-content-between flex-wrap">
          <b-button class="pl-4 pr-4 mb-2" variant="primary" @click="openModal('modal-add')">Добавить</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary" @click="deleteProduct" :disabled="!currentElement">Удалить</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary" @click="openModal('modal-sold')" :disabled="!currentElement">Списать</b-button>
          <b-button class="pl-4 pr-4 mb-2" variant="primary" @click="openModal('modal-edit')" :disabled="!currentElement">Изменить</b-button>
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
            <b-form-select class="mb-3" v-model="formAdd.type" :options="optionsAddProduct"></b-form-select>
            <b-form-input class="mb-2" v-model="formAdd.number" id="input-type" placeholder="Номер блока"
                          invalid-feedback="Name is required" required/>
            <b-form-datepicker id="datePickerAddArrival_date" v-model="formAdd.arrival_date" class="mb-2"/>
            <b-form-input class="mb-2" v-model="formAdd.length" id="input-length" placeholder="Длина"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2" v-model="formAdd.width" id="input-width" placeholder="Ширина"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2" v-model="formAdd.height" id="input-height" placeholder="Высота"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2" v-model="formAdd.v_prov" id="input-v-prov" placeholder="Входящий объем"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2"
                          v-model="formAdd.volume"
                          placeholder="Объем"
                          required/>
            <b-form-input class="mb-2"
                          v-model="formAdd.v_base"
                          placeholder="Объем для базы"
                          required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <b-modal
          id="modal-sold"
          ref="modal2"
          title="Списать блок"
          @show="resetModalSold"
          @hidden="resetModalSold"
          @ok="handleOkSold"
      >
        <form ref="formSold">
          <b-form-group>
            <div v-if="isValid" class="text-danger">Заполните все поля</div>
            <b-form-datepicker id="datePickerSoldShipping_date" v-model="formSold.shipping_date" class="mb-2"/>
            <b-form-input class="mb-2" v-model="formSold.transport" placeholder="Транспорт"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2" v-model="formSold.driver" placeholder="Водитель"
                          invalid-feedback="Name is required" required/>
            <b-form-input class="mb-2" v-model="formSold.client" placeholder="Клиент"
                          invalid-feedback="Name is required" required/>
          </b-form-group>
        </form>
      </b-modal>
    </template>
    <b-modal
        id="modal-edit"
        ref="modal3"
        title="Добавить блок"

        @ok="handleOkEdit"
    >
      <form ref="formEdit">
        <b-form-group>
          <div v-if="isValid" class="text-danger">Заполните все поля</div>
          <b-form-select class="mb-3" v-model="formEdit.type" :options="optionsAddProduct"/>
          <b-form-input class="mb-2" v-model="formEdit.number" id="input-type" placeholder="Номер блока"
                        invalid-feedback="Name is required" required/>
          <small>Дата прихода<span v-if="formEdit.arrival_date"></span></small>
          <b-form-datepicker id="datePickerEditArrival_date" v-model="formEdit.arrival_date" class="mb-2"/>
          <b-form-input class="mb-2" v-model="formEdit.length" id="input-length" placeholder="Длина"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2" v-model="formEdit.width" id="input-width" placeholder="Ширина"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2" v-model="formEdit.height" id="input-height" placeholder="Высота"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2" v-model="formEdit.v_prov" id="input-v-prov" placeholder="Входящий объем"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2"
                        v-model="formEdit.volume"
                        placeholder="Объем"
                        required/>
          <b-form-input class="mb-2"
                        v-model="formEdit.v_base"
                        placeholder="Объем для базы"
                        required></b-form-input>
          <small>Дата отгрузки<span v-if="formEdit.shipping_date"></span></small>
          <b-form-datepicker id="datePickerEditShipping_date" v-model="formEdit.shipping_date" class="mb-2"/>
          <b-form-input class="mb-2" v-model="formEdit.transport" placeholder="Транспорт"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2" v-model="formEdit.driver" placeholder="Водитель"
                        invalid-feedback="Name is required" required/>
          <b-form-input class="mb-2" v-model="formEdit.client" placeholder="Клиент"
                        invalid-feedback="Name is required" required/>
        </b-form-group>
      </form>
    </b-modal>
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
      },
      formSold: {
        "shipping_date": '',
        transport: '',
        driver: '',
        client: '',
        isShipped: true
      },
      formEdit: {
        type: '',
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
    }
  },
  computed: {
    ...mapState({
      isAdmin: state => state.auth.currentUser.isAdmin,
      currentElement: state => state.product.currentElement
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
    // SOLD MODAL METHODS
    checkFormValiditySold() {
      const valid = this.$refs.formSold.checkValidity()
      this.isValid = !valid
      return valid
    },
    resetModalSold() {
      this.formSold.shipping_date = ''
      this.formSold.transport = ''
      this.formSold.driver = ''
      this.formSold.client = ''
      this.isValid = false;
    },
    handleOkSold(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmitSold()
    },
    handleSubmitSold() {
      if (!this.checkFormValiditySold()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit')
      })
      document.querySelector('.row-active').classList.remove('row-active')
      this.soldProduct({
        changedData: this.formSold,
        productId: this.currentElement
      })

    },
    // EDIT MODAL METHODS
    checkFormValidityEdit() {
      // const valid = this.$refs.modalEdit.checkValidity()
      // this.isValid = !valid
      return true
    },
    // resetModalEdit() {
    //   this.formSold.shipping_date = ''
    //   this.formSold.transport = ''
    //   this.formSold.driver = ''
    //   this.formSold.client = ''
    //   this.isValid = false;
    // },
    handleOkEdit(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmitEdit()
    },
    handleSubmitEdit() {
      if (!this.checkFormValidityEdit()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-sold')
      })
      // document.querySelector('.row-active').classList.remove('row-active')
      this.editProduct({
        changedData: this.formEdit,
        productId: this.currentElement
      })

    },
    addProduct(data) {
      this.$store.dispatch(actionTypes.addProduct, data)
    },
    soldProduct(data) {
      this.$store.dispatch(actionTypes.soldProduct, data)
    },
    deleteProduct() {
      this.$bvModal.msgBoxConfirm('Вы уверены?')
          .then((value) => {
            if (!value) {
              return;
            }
            this.$store.dispatch(actionTypes.deleteProduct, this.currentElement)
          })
          .catch(() => {
          });
    },
    editProduct(data) {
      this.$store.dispatch(actionTypes.soldProduct, data)
    }
  }
}
</script>
