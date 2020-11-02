<template>
  <b-row class="wrap__objects__element__container px-2 mx-0">
    <b-col class="ml-md-auto">
      <div class="wrap__objects__element__container__header mb-2">
        <p>Карточка объекта</p>
        <div>
          <nuxt-link to="/client/objects/objects"
            ><b-button
              size="lg"
              style="font-size: calc(8px + 6 * (100vw / 1366))"
              class="bg-dark mr-2"
              >Вернуться к списку объектов</b-button
            ></nuxt-link
          >
          <b-button
            @click="$router.push('/client/requests/create-request')"
            size="lg"
            class="wrap__objects__element__container__header__button"
            style="
              background-color: #ffc221;
              border: 1px #ffc221 solid;
              color: black;
              font-size: calc(8px + 6 * (100vw / 1366));
            "
            >Новая заявка</b-button
          >
        </div>
      </div>
      <b-card header="Название">
        <b-form @submit.prevent="change_btn_event(), changeObjectInfo(object_btn_change_title)">
        <b-row class="wrap__objects__element__container__main__row">
          <b-col>
            <b-row class="pt-3">
              <b-col cols="4">Город</b-col>
              <b-col>
                <div>
                  <input
                    v-model="object.city"
                    required
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Адрес</b-col>
              <b-col>
                <div>
                  <input
                    v-model="object.address"
                    required
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Квадратура</b-col>
              <b-col>
                <div>
                  <input
                    v-model="object.quadrature"
                    required
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Количество этажей</b-col>
              <b-col>
                <div>
                  <input
                    v-model="object.count_floors"
                    required
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Время работы</b-col>
              <b-col>
                <b-form-group>
                  <b-row class="ml-0 px-0">
                    <div>
                      <b-form-timepicker
                        v-model="object.time_from"
                        :readonly="object_input_rdnl"
                        v-if="object"
                        locale="ru"
                        placeholder="c"
                      ></b-form-timepicker>
                    </div>
                    <div class="pl-3">
                      <b-form-timepicker
                        v-model="object.time_to"
                        :readonly="object_input_rdnl"
                        v-if="object"
                        locale="ru"
                        placeholder="до"
                      ></b-form-timepicker>
                    </div>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">ФИО ответственного</b-col>
              <b-col>
                <div>
                  <input
                    required
                    v-model="object.fullname_responsible"
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Телефон ответственного</b-col>
              <b-col>
                <div>
                  <input
                    required
                    v-model="object.phone_number_responsible"
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">E-mail ответственного</b-col>
              <b-col>
                <div>
                  <input
                    required
                    v-model="object.email_employee"
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>
          </b-col>

          <b-col>
            <b-row class="pt-3">
              <b-col cols="4">Придумайте логин</b-col>
              <b-col>
                <div>
                  <input
                    required
                    v-model="object.login"
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Придумайте пароль</b-col>
              <b-col>
                <div>
                  <input
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="4">Подтвердите пароль</b-col>
              <b-col>
                <div>
                  <input
                    :readonly="object_input_rdnl"
                    v-if="object"
                    class="form-control"
                    type="text"
                  />
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="wrap__objects__element__container__buttons mt-3">
          <b-button type="submit" style="background-color: #0c2947; border: none">{{object_btn_change_title}}</b-button>
          <b-button
            v-b-modal.deleteRequest
            style="background-color: #e84242; border: none"
            >Удалить</b-button>
        </div>
        </b-form>

        <b-modal
          id="deleteRequest"
          size="lg"
          centered
          style="text-align: center"
        >
          <template v-slot:modal-header>
            <p></p>
          </template>
          <div class="wrap__objects__element__container__modal__text">
            <p>Вы действительно хотите удалить этот объект?</p>
            <div style="display: flex; justify-content: center">
              <p @click="deleteObject()" class="mr-2" style="color: #e84242; cursor: pointer">
                Удалить
              </p>
              <p
                style="color: #00d1a1; cursor: pointer"
                @click="$bvModal.hide('deleteRequest')"
              >
                Отмена
              </p>
            </div>
          </div>
          <template v-slot:modal-footer>
            <p></p>
          </template>
        </b-modal>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Api from "~/utils/api";
export default {
  data: () => ({
    object_input_rdnl: true,
    object_btn_change_title: "Редактировать",
    object: null,
  }),
  mounted() {
    this.getDataObject();
  },
  methods: {
    getDataObject() {
      Api.getInstance()
        .objects.getDataObject("client", this.$route.params.id)
        .then((response) => {
          this.object = response.data.ObjectStore;
        })
        .catch((error) => {
          this.$bvToast.toast("У вас нет доступа к данной странице", {
            title: `Системная ошибка`,
            variant: "danger",
            solid: true,
          });
          localStorage.removeItem("strjwt");
          localStorage.removeItem("role");
          localStorage.removeItem("idecur");
          setTimeout(() => {
            this.$router.push("/account/login");
          }, 1000);
        });
    },
    changeObjectInfo(btn_title){
      if(btn_title != "Сохранить"){
        Api.getInstance()
          .objects.changeObjectData(this.object).then((response) => {
              this.$bvToast.toast("Данные успешно изменены!", {
                  title: `Сообщение:`,
                  variant: "success",
                  solid: true,
              })
              setTimeout(()=>{window.location.reload(true)}, 1000)
          })
      }
    },
    deleteObject(){
        Api.getInstance()
          .objects.deleteObject(this.object.id).then((response) => {
              this.$bvToast.toast("Объект успешно удалён!", {
                  title: `Сообщение:`,
                  variant: "success",
                  solid: true,
              })
              setTimeout(()=>{this.$router.push('/client/objects/objects')}, 1000)
          })
    },
    change_btn_event(){
      if(this.object_btn_change_title == "Редактировать"){
        this.object_btn_change_title = "Сохранить";
        this.object_input_rdnl = false
      }else{
        this.object_btn_change_title = "Редактировать";
        this.object_input_rdnl = true
      }
    }
  },
};
</script>

<style>

.wrap__objects__element__container,
.wrap__objects__element__container__buttons,
.wrap__objects__element__container__header {
  width: 100%;
  font-size: calc(8px + 6 * (100vw / 1366));
}

/* НУЖНО ИЗМЕНИТЬ НА СТРОКИ */
.wrap__objects__element__container__buttons,
.wrap__objects__element__container__header {
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}

.wrap__objects__element__container__modal__text {
  text-align: center;
}

@media (max-width: 1035px) {
  .wrap__objects__element__container__main__row {
    display: flex;
    flex-direction: column;
  }

  .wrap__objects__element__container__header {
    flex-direction: column;
  }
}

@media (max-width: 451px) {
  .wrap__objects__element__container__header__button {
    margin-top: 5px;
  }
}
</style>