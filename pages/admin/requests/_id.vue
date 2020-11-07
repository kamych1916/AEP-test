<template>
  <div v-if="request" class="wrap__create_req__container w-100 p3">
      <b-row class="py-2 px-3 mx-0 w-100 d-flex justify-content-between">
            <p>{{request.object_address}}</p>
            <div>
                <b-button class="bg-dark mr-2" @click="$router.push('/admin/requests/requests')"  style="border: 0px;">Вернуться к списку объектов</b-button>
                <b-button @click="$router.push('/admin/requests/create-request')" class="btn_warning">Новая заявка</b-button>
            </div>
      </b-row>
      <b-row class="w-100 px-3 mx-0">
            <b-card v-if="request" :header="'Заявка '+ request.name" class="w-100">
                <b-form @submit.prevent="change_btn_event(), changeRequestInfo(req_btn_title)">
                <b-row class="wrap__create_req__card">
                    <b-col cols="6" class="my-2">
                        <b-row class="mb-3">
                            <b-col cols="4">Статус</b-col>
                            <b-col>
                                <b-button size="sm" class="btn_warning">На согласовании</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4">Объект</b-col>
                            <b-col>
                                <div>
                                    <b-form-select
                                    v-if="request"
                                    v-model="request.object"
                                    :options="options"
                                    required
                                    :disabled="req_inputs"
                                    ></b-form-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Проблема</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-model="request.problem" v-if="request" required name="problem" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <!-- <b-row class="pt-3">
                            <b-col cols="4">Выберите услугу</b-col>
                            <b-col>
                                <div>
                                        <b-form-select
                                        :disabled="req_inputs"
                                        ></b-form-select>
                                </div>
                            </b-col>
                        </b-row> -->
                        <b-row class="pt-3">
                            <b-col cols="4">Детальное описание ситуации</b-col>
                            <b-col>
                                <div>
                                        <b-form-textarea
                                        v-if="request"
                                        v-model="request.promblem_more"
                                        id="textarea"
                                        rows="3"
                                        max-rows="6"
                                        required
                                        :readonly="req_inputs"
                                        ></b-form-textarea>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Кто составил</b-col>
                            <b-col>
                            <div>
                                <input :readonly="req_inputs" v-if="request" v-model="request.who_made" required name="whois" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Желаемое время выполнения услуги</b-col>
                            <b-col>
                                <b-row class="ml-0 px-0">
                                    <div>
                                        <b-form-timepicker v-if="request" v-model="request.time_from" :readonly="req_inputs" placeholder="c"></b-form-timepicker>
                                    </div>
                                    <div class="pl-3">
                                        <b-form-timepicker v-if="request" v-model="request.time_to" :readonly="req_inputs" placeholder="до"></b-form-timepicker>
                                    </div>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="6" class="my-2">
                        <b-row>
                            <b-col cols="4">Город</b-col>
                            <b-col>
                            <div>
                                <input :readonly="req_inputs" v-if="request" v-model="request.city" required name="city" type="text"  class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                            <div>
                                <input :readonly="req_inputs" v-if="request" v-model="request.address" required name="adress" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Размер помещения</b-col>
                            <b-col>
                            <div>
                                <input :readonly="req_inputs" v-if="request" v-model="request.quadrature" required name="size" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-if="request" v-model="request.count_floors" required name="count" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">ФИО сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-if="request" v-model="request.fullname_employee" required name="fullname" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-if="request" v-model="request.phone_number_employee" required name="telephone" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-if="request" v-model="request.email_employee" required name="fullname" type="email" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-row class="d-flex justify-content-between w-100 m-0">
                        <div>
                            <b-button class="m-3 bg-dark" type="submit">{{req_btn_title}}</b-button>
                            <u v-if="undo" style="cursor: pointer" @click="undo = false, req_inputs = true, req_btn_title = 'Редактировать'">Отменить</u>
                        </div>
                        <!-- <b-button class="m-3 bg-danger" @click="DeleteModal=true">Удалить</b-button> -->
                        <b-button class="m-3 bg-danger" @click="deleteRequest()">Удалить</b-button>
                    </b-row>
                    
                    <b-modal size="lg" v-model="EditModal" centered style="text-align: center;">
                        <template v-slot:modal-header>
                            <p></p>
                        </template>
                        <div class="wrap__objects__element__container__modal__text text-center">
                            <p>Заявка номер {{request.name}} на согласовании</p>
                            <u style="cursor: pointer;" @click="$router.push('/client/requests/requests')">Вернуться к списку заявок</u><br><br>
                            <u style="cursor: pointer;" @click="EditModal=false">Редактировать заявку</u>
                        </div>
                        <template v-slot:modal-footer>
                            <p></p>
                        </template>
                    </b-modal>

                    <b-modal size="lg" v-model="DeleteModal" centered style="text-align: center;">
                        <template v-slot:modal-header>
                            <p></p>
                        </template>
                        <div class="wrap__objects__element__container__modal__text text-center">
                            <p Class="text-danger">Удаление заявки</p>
                            <p>Ваш запрос на рассмотрении</p>
                            <u style="cursor: pointer;" @click="$router.push('/client/requests/requests')">Вернуться к списку заявок</u><br><br>
                            <u style="cursor: pointer;" @click="DeleteModal=false">Редактировать заявку</u>
                        </div>
                        <template v-slot:modal-footer>
                            <p></p>
                        </template>
                    </b-modal>
                </b-row>
                </b-form>
            </b-card>
            <div class="wrap__card_photos">

            <b-card header="Добавить фото/видео" class="my-4 ">
                <b-row class="pl-3">
                    <label for="load" class="text-light py-2 px-3 bg-dark">+ Добавить фото</label>
                    <input id="load" @change="onFileChange" type="file" name="photo" style="display: none;">
                </b-row>
                    <b-row>
                        <img v-for="(image, i) in images" :key="i" :src="image" alt="" width="180" height="150" class="pl-3 pt-2">
                    </b-row>
            </b-card>
            </div>
      </b-row>
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  data () {
    return {
        req_btn_title: 'Редактировать',
        req_inputs: true,
        undo: false,
        EditModal: false,
        DeleteModal: false,

        request: null,

        images: [],
        options: []
    }
  },
  mounted(){
      this.getDataRequests();
  },
  methods: {
    getDataRequests(){
      Api.getInstance()
        .requests.getDataRequest("client", this.$route.params.id)
        .then((response) => {
          this.request = response.data.RequestStore;
          this.options = response.data.AddressStore;
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
    changeRequestInfo(btn_title){
        if(btn_title != "Сохранить"){
            Api.getInstance()
            .requests.changeRequestData(this.request).then((response) => {
                this.$bvToast.toast("Данные успешно изменены!", {
                    title: `Сообщение:`,
                    variant: "success",
                    solid: true,
                })
            }).catch((err)=>{
                this.$bvToast.toast("Данные не изменились.", {
                    title: `Системная ошибка`,
                    variant: "danger",
                    solid: true,
                });
            })
        }
    },
    deleteRequest(){
        Api.getInstance()
          .requests.deleteRequest(this.request.id).then((response) => {
              this.$bvToast.toast("Объект успешно удалён!", {
                  title: `Сообщение:`,
                  variant: "success",
                  solid: true,
              })
              setTimeout(()=>{this.$router.push('/client/requests/requests')}, 1000)
          })
    },
    change_btn_event() { 
      if(this.req_btn_title == "Редактировать"){
        this.req_btn_title = "Сохранить";
        this.req_inputs = false;
        this.undo = true
      }else{
        this.EditModal = true;
        this.req_btn_title = "Редактировать";
        this.req_inputs = true
      }
    },
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    },
    createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
            vm.images.push(e.target.result)
        };
        reader.readAsDataURL(file);
    },
  },


}
</script>

<style scoped>
.wrap__create_req__container{
  font-size: calc(8px + 6 * (100vw / 1366));
}

.wrap__create_req__container .custom-select{
    height: unset !important;
    font-size: calc(8px + 5 * (100vw / 1366));
}
.wrap__create_req__container .custom-select{
    border-radius: 0;
}
.wrap__card_photos{
    width: 50%;
}
.wrap__create_req__container .btn_warning{
    background-color: #FFC221; border: 0px; color: black !important
}
@media (max-width: 1035px) {
    .col-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .wrap__card_photos{
        width: 100%;
    }
    .wrap__create_req__card{
      width: 100%;
      justify-content: start;
      flex-direction: column;
    }
    .wrap__create_req__container .custom-select{
        font-size: calc(8px + 6 * (100vw / 1366));
    }
}
@media (max-width: 684px) {
    .wrap__create_req__container .custom-select{
        font-size: calc(11px + 6 * (100vw / 1366));
    }
}
</style>