<template>
  <div class="wrap__create_req__container w-100 p3">
      <b-row class="py-2 px-3 mx-0 w-100 d-flex justify-content-between">
        <div></div>
        <b-button class="bg-dark" @click="$router.push('/client/requests/requests')">Вернуться к списку объектов</b-button>
      </b-row>
      <b-row class="w-100 px-3 mx-0">
            <b-card header="Новая заявка" class="w-100">
                <b-form @submit.prevent="createObject()">
                <b-row class="wrap__create_req__card">
                    <b-col cols="6" class="my-2">
                        <b-row>
                            <b-col cols="4">Объект</b-col>
                            <b-col>
                                <div>
                                    <b-form-select
                                        v-model="request.object"
                                        :options="options"
                                        required
                                    ></b-form-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Проблема</b-col>
                            <b-col>
                                <div>
                                    <input required v-model="request.problem" name="problem" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <!-- <b-row class="pt-3">
                            <b-col cols="4">Выберите услугу</b-col>
                            <b-col>
                                <div>
                                    <b-form-select></b-form-select>
                                </div>
                            </b-col>
                        </b-row> -->
                        <b-row class="pt-3">
                            <b-col cols="4">Детальное описание ситуации</b-col>
                            <b-col>
                                <div>
                                        <b-form-textarea
                                        v-model="request.promblem_more"
                                        id="textarea"
                                        rows="3"
                                        max-rows="6"
                                        required
                                        ></b-form-textarea>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Кто составил</b-col>
                            <b-col>
                            <div>
                                <input required v-model="request.who_made" name="whois" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Желаемое время выполнения услуги</b-col>
                            <b-col>
                                <b-row class="ml-0 px-0">
                                    <div>
                                        <b-form-timepicker v-model="request.time_from" :state="time_from_flag" placeholder="c"></b-form-timepicker>
                                    </div>
                                    <div class="pl-3">
                                        <b-form-timepicker v-model="request.time_to" :state="time_to_flag" placeholder="до"></b-form-timepicker>
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
                                <input required v-model="request.city" name="city" type="text"  class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                            <div>
                                <input required v-model="request.address" name="adress" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Размер помещения</b-col>
                            <b-col>
                            <div>
                                <input required v-model="request.quadrature" name="size" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col>
                                <div>
                                    <input required v-model="request.count_floors" name="count" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">ФИО сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required v-model="request.fullname_employee" name="fullname" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required v-model="request.phone_number_employee" name="telephone" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required v-model="request.email_employee" name="fullname" type="email" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-button class="m-3 bg-dark" type="submit">Создать заявку</b-button>
                    <b-modal size="lg" v-model="modalShow" centered style="text-align: center;">
                        <template v-slot:modal-header>
                            <p></p>
                        </template>
                        <div class="wrap__objects__element__container__modal__text text-center">
                            <!-- <p>Заявка номер 3-XX-X0-000 на согласовании</p> -->
                            <p>Заявка на согласовании</p>
                            <u style="cursor: pointer;" @click="$router.push('/client/requests/requests')">Вернуться к списку заявок</u><br><br>
                            <u style="cursor: pointer;" @click="modalShow=false">Редактировать заявку</u>
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
        modalShow: false,
        images: [],
        time_from_flag: null,
        time_to_flag: null,
        options: [],
        request: {
            object: null,
            problem: null,
            promblem_more: null,
            who_made: null,
            time_from: null,
            time_to: null,
            city: null,
            address: null,
            quadrature: null,
            count_floors: null,
            fullname_employee: null,
            phone_number_employee: null,
            email_employee: null,
        }
    }
  },
  mounted(){
      this.getRqstObjtsAndSrvs()
  },
  methods: {
    createObject(){
        if(this.request.time_from == null ){
            this.time_from_flag = false
        }else{
            if(this.request.time_to == null ){
                this.time_to_flag = false
            }else{
                Api.getInstance().requests.createDataRequest(this.request).then((response) => {
                    this.modalShow = true 
                    this.time_from_flag = null;
                    this.time_to_flag = null;
                    this.$bvToast.toast("Объект успешно добавлен!", {
                        title: `Сообщение:`,
                        variant: "success",
                        solid: true,
                    })
                })
            }
        }

    },
    getRqstObjtsAndSrvs(){
        Api.getInstance().requests.getRqstObjtsAndSrvs('client').then((response) => {
            this.options = response.data.AddressStore
        })
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
    border-radius: 0;
}
.wrap__card_photos{
    width: 50%;
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
}
</style>