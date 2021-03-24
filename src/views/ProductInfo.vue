<template>
  <div>
    <wh-error v-if="validationErrors"/>
    <div v-if="currentUser">
      <div class="indent-top">
        <wh-loading class="spinner-position" v-if="isLoading"/>
        <div v-if="product">
          <div class="container">
            <div class="col-md-7 mx-auto">
              <div class="card mx-auto shadow-sm mt-5 mb-5">
                <div class="card-header">
                  Блок гранитный {{form.type}}, №{{ form.number }}
                </div>
                <div class="card-body">
                  <form ref="formEdit"
                        @submit.prevent="onSubmit"
                  >
                    <small>
                      Месторождение
                    </small>
                    <b-form-select class="mb-3"
                                   v-model="form['type']"
                                   :options="optionsAddProduct"
                                   :disabled="editButtonIsActive"
                    />
                    <small>
                      Номер блока
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.number"
                                  id="input-type"
                                  placeholder="Номер блока"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Дата прихода
                    </small>
                    <b-form-datepicker class="mb-2"
                                       id="datePickerEditArrival_date"
                                       v-model="form.arrival_date"
                                       :disabled="editButtonIsActive"
                    />
                    <small>
                      Длина
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.length"
                                  id="input-length"
                                  placeholder="Длина"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Ширина
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.width"
                                  id="input-width"
                                  placeholder="Ширина"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Высота
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.height"
                                  id="input-height"
                                  placeholder="Высота"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Входящий объем
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.v_prov"
                                  id="input-v-prov"
                                  placeholder="Входящий объем"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Объем
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.volume"
                                  placeholder="Объем"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Объем по базе
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.v_base"
                                  placeholder="Объем для базы"
                                  required
                                  :disabled="editButtonIsActive"
                    />
                    <small>
                      Дата отгрузки
                    </small>
                    <b-form-datepicker id="datePickerEditShipping_date"
                                       v-model="form.shipping_date"
                                       class="mb-2"
                                       :disabled="soldButtonIsActive"
                                       required
                    />
                    <small v-if="product.transport">
                      Транспорт
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.transport"
                                  placeholder="Транспорт"
                                  required
                                  :disabled="soldButtonIsActive"
                    />
                    <small v-if="product.driver">
                      Водитель
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.driver"
                                  placeholder="Водитель"
                                  required
                                  :disabled="soldButtonIsActive"
                    />
                    <small v-if="product.client">
                      Контрагент
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.client"
                                  placeholder="Клиент"
                                  required
                                  :disabled="soldButtonIsActive"
                    />
                    <small v-if="product.description">
                      Описание
                    </small>
                    <b-form-input class="mb-2"
                                  v-model="form.description"
                                  placeholder="Описание"
                                  :disabled="soldButtonIsActive"
                    />
                    <div v-if="formButtons" class="row mt-4 mb-3">
                      <div class="col text-center">
                        <b-button
                            class="btn btn-info"
                            type="reset"
                            @click="cancel"
                        >
                          Отменить
                        </b-button>
                      </div>
                      <div class="col text-center">
                        <b-button
                            class="btn btn-info"
                            type="submit"
                        >
                          Отправить
                        </b-button>
                      </div>
                    </div>
                  </form>
                  <template v-if="isAdmin">
                    <div class="container justify-content-around">
                      <div class="row mt-3">
                        <div class="col-xl-4 col-xs-12 mt-4">
                          <button
                              class="btn btn-info btn-block"
                              @click="onSoldProduct"
                          >
                            Списать
                          </button>
                        </div>
                        <div class="col-xl-4 col-xs-12 mt-4">
                          <button
                              class="btn btn-info btn-block"
                              @click="onDelete"
                          >
                            Удалить
                          </button>
                        </div>
                        <div class="col-xl-4 col-xs-12 mt-4 mb-3">
                          <button
                              class="btn btn-info btn-block"
                              @click="edit"
                          >
                            Редактировать
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhLoading from '@/components/Loading';
import { normalizeNumber } from '@/helpers/normalizeData';
import { actionTypes } from '@/store/modules/product';
import WhError from '@/components/Error';

export default {
  name: 'WhProductInfo',
  components: {
    WhError,
    WhLoading,
  },
  data() {
    return {
      editButtonIsActive: true,
      formButtons: false,
      soldButtonIsActive: true,
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
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.product.isLoading,
      currentUser: (state) => state.auth.currentUser,
      product: (state) => state.product.selectedProduct,
      isAdmin: (state) => state.auth.currentUser.isAdmin,
      validationErrors: (state) => state.product.validationErrors,
    }),
    form() {
      if (!this.product) {
        return {};
      }
      return {
        type: this.product.type,
        number: this.product.number,
        arrival_date: this.product.arrival_date,
        length: normalizeNumber(this.product.length),
        width: normalizeNumber(this.product.width),
        height: normalizeNumber(this.product.height),
        v_prov: normalizeNumber(this.product.v_prov),
        volume: normalizeNumber(this.product.volume),
        v_base: normalizeNumber(this.product.v_base),
        shipping_date: this.product.shipping_date,
        transport: this.product.transport,
        driver: this.product.driver,
        client: this.product.client,
        description: this.product.description,
      };
    },
  },
  methods: {
    onSoldProduct() {
      this.soldButtonIsActive = false;
      this.editButtonIsActive = true;
      this.formButtons = true;
    },
    cancel() {
      this.soldButtonIsActive = true;
      this.formButtons = false;
      this.editButtonIsActive = true;
      this.form.shipping_date = '';
      this.form.transport = '';
      this.form.driver = '';
      this.form.client = '';
      this.form.description = '';
    },
    edit() {
      if (this.product.isShipped) {
        this.soldButtonIsActive = false;
        this.editButtonIsActive = false;
        this.formButtons = true;
      } else {
        this.soldButtonIsActive = true;
        this.editButtonIsActive = false;
        this.formButtons = true;
      }
    },
    onSubmit() {
      if (!this.soldButtonIsActive && !this.product.isShipped) {
        this.soldProduct({
          changedData: {
            ...this.form,
            isShipped: true,
          },
          productId: this.product._id,
        });
      } else {
        this.soldProduct({
          changedData: this.form,
          productId: this.product._id,
        });
      }
    },
    onDelete() {
      const isConfirm = confirm('Вы действительно хотите удалить');
      if (isConfirm) {
        this.$store.dispatch(actionTypes.deleteProduct, this.product._id)
          .then(() => this.$router.push({ name: 'content' }));
      }
    },
    soldProduct(data) {
      this.$store.dispatch(actionTypes.soldProduct, data)
        .then(() => this.$router.push({ name: 'content' }));
    },
  },
};
</script>
