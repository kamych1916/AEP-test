<template>
  <div class="wrap__create_req__container w-100 p3">
      <b-row class="py-2 px-3 mx-0 w-100 d-flex justify-content-between">
        <div></div>
        <b-button class="bg-dark" @click="$router.push('/client/requests/requests')">Вернуться к списку объектов</b-button>
      </b-row>
      <b-row class="w-100 px-3 mx-0">
            <b-card header="Новая заявка" class="w-100">
                <b-form @submit.prevent="CreateReq()">
                <b-row class="wrap__create_req__card">
                    <b-col cols="6" class="my-2">
                        <b-row>
                            <b-col cols="4">Объект</b-col>
                            <b-col>
                                <div>
                                        <b-form-select
                                        v-model="selected"
                                        :options="options"
                                        value-field="item"
                                        text-field="name"
                                        required
                                        disabled-field="notEnabled"
                                        ></b-form-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Проблема</b-col>
                            <b-col>
                                <div>
                                    <input required name="problem" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Выберите услугу</b-col>
                            <b-col>
                                <div>
                                        <b-form-select
                                        v-model="selected"
                                        :options="options"
                                        value-field="item"
                                        text-field="name"
                                        required
                                        disabled-field="notEnabled"
                                        ></b-form-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Детальное описание ситуации</b-col>
                            <b-col>
                                <div>
                                        <b-form-textarea
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
                                <input required name="whois" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Желаемое время выполнения услуги</b-col>
                            <b-col>
                                <b-row class="ml-0 px-0">
                                    <div>
                                        <b-form-timepicker placeholder="c"></b-form-timepicker>
                                    </div>
                                    <div class="pl-3">
                                        <b-form-timepicker placeholder="до"></b-form-timepicker>
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
                                <input required name="city" type="text"  class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                            <div>
                                <input required name="adress" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Размер помещения</b-col>
                            <b-col>
                            <div>
                                <input required name="size" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col>
                                <div>
                                    <input required name="count" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">ФИО сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required name="fullname" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required name="telephone" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input required name="fullname" type="email" class="form-control"/>
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
                            <p>Заявка номер 3-XX-X0-000 на согласовании</p>
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
        selected: 'A',
        options: [
          { item: 'A', name: 'Option A' },
          { item: 'B', name: 'Option B' },
          { item: 'D', name: 'Option C', notEnabled: true },
          { item: { d: 1 }, name: 'Option D' }
        ]
    }
  },
  methods: {
    CreateReq () { 
      this.modalShow = true 
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