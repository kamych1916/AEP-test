<template>
  <div v-if="request" class="wrap__create_req__container w-100 p3">
      <b-row class="py-2 px-3 mx-0 w-100 d-flex justify-content-between">
            <p>{{request.object_address}}</p>
            <div>
                <b-button class="bg-dark mr-2 mb-3" @click="$router.push('/requests/requests')"  style="border: 0px;">Вернуться к списку объектов</b-button>
                <b-button @click="$router.push('/requests/create-request')" class="btn_warning mb-3">Новая заявка</b-button>

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
                                <div v-if="role=='admin'">
                                    <b-form-select
                                    v-if="request"
                                    v-model="request.status"
                                    :options="status_options"
                                    required
                                    :disabled="req_inputs"
                                    ></b-form-select>
                                </div>
                                <div v-else>
                                    <b-button v-if="request.status == 1" size="sm" variant="success">Активно</b-button>
                                    <b-button v-if="request.status == 2" size="sm" variant="danger">Заморожено</b-button>
                                    <b-button v-if="request.status == 3" size="sm" class="btn_warning">На согласовании</b-button>
                                </div>
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
                            <b-col cols="4">Желаемая дата выполнения услуги</b-col>
                            <b-col>
                                <div>
                                    <b-form-input v-if="request" :readonly="req_inputs" required v-model="request.date" type="date"></b-form-input>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3 time_wrap"> 
                            <b-col cols="4">Желаемое время выполнения услуги</b-col>
                            <b-col>
                                <b-form-group>
                                    <b-row class="ml-0 px-0">
                                        <div class="pb-3">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text">С</span>
                                                </b-input-group-prepend>
                                                <b-form-input v-if="request" v-model="request.time_from" :readonly="req_inputs" required type="time"></b-form-input>
                                            </b-input-group>
                                        </div>
                                        <div class="pl-3">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text">До</span>
                                                </b-input-group-prepend>
                                                <b-form-input v-if="request" v-model="request.time_to" :readonly="req_inputs" required type="time"></b-form-input>
                                            </b-input-group>
                                        </div>
                                    </b-row>
                                </b-form-group>
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
                                    <input :readonly="req_inputs" v-if="request" v-model="request.fullname_responsible" required name="fullname" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input :readonly="req_inputs" v-if="request" v-model="request.phone_number_responsible" required name="telephone" type="text" class="form-control"/>
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
                            <b-button :disabled="disable_btn" class="m-3 bg-dark" type="submit">{{req_btn_title}}</b-button>
                            <u v-if="undo" style="cursor: pointer" @click="undo = false, req_inputs = true, req_btn_title = 'Редактировать'">Отменить</u>
                        </div>
                        <!-- <b-button class="m-3 bg-danger" @click="DeleteModal=true">Удалить</b-button> -->
                        <b-button v-if="role == 'admin'" class="m-3 bg-danger" @click="deleteRequest()">Удалить</b-button>
                    </b-row>
                    
                    <b-modal size="lg" v-model="EditModal" centered style="text-align: center;">
                        <template v-slot:modal-header>
                            <p></p>
                        </template>
                        <div class="wrap__objects__element__container__modal__text text-center">
                            <p>Заявка номер {{request.name}} на согласовании</p>
                            <u style="cursor: pointer;" @click="$router.push('/requests/requests')">Вернуться к списку заявок</u><br><br>
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
                            <u style="cursor: pointer;" @click="$router.push('/requests/requests')">Вернуться к списку заявок</u><br><br>
                            <u style="cursor: pointer;" @click="DeleteModal=false">Редактировать заявку</u>
                        </div>
                        <template v-slot:modal-footer>
                            <p></p>
                        </template>
                    </b-modal>
                </b-row>
                </b-form>
            </b-card>
            <div class="d-flex w-100">
                <b-row class="wrap__card_photos px-0 mx-0 justify-content-around">
                    <b-col class="w-100 mx-0 px-0 pr-4">
                        <b-card header="Добавить фото/видео" class="my-4 ">
                            <b-row class="pl-3">
                                <label for="load" v-if="!disable_btn" class="text-light py-2 px-3 bg-dark">+ Добавить фото</label>
                                <label for="load" v-else class="text-light py-2 px-3 bg-dark" style="opacity: 0.65;">+ Добавить фото</label>
                                <input id="load" accept="image/*,video/*" :disabled="disable_btn" ref="file" @change="handleFileUpload()" type="file" name="photo" style="display: none;">
                            </b-row>
                            <!-- <video src="https://r3---sn-vgqsknez.googlevideo.com/videoplayback?expire=1604871005&ei=_Q6oX-zcKK6B_9EP0MyBqAQ&ip=144.168.219.133&id=o-AHJnugY3fCWs3bMDECh6b_tXG2A2DuKu_KGj4X9sd6W0&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=1341865&ratebypass=yes&dur=41.517&lmt=1551257830709175&fvip=3&c=WEB&txp=2211222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJ5AKoOPYVntLkFhLgK2CcEqhAK5s9gxhw4_actR8AO8AiEAqE5TzBaCotzqFGoW1R5E04PDSBaTtQrrmDzlAeZ1Dng%3D&redirect_counter=1&cm2rm=sn-ab5ee7s&req_id=5c1a3436c12aa3ee&cms_redirect=yes&mh=eN&mip=5.18.189.226&mm=34&mn=sn-vgqsknez&ms=ltu&mt=1604849295&mv=D&mvi=3&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAMWIw8qM9W7NbxUCvBxXOlRKr9_LJdtjVEYZfGuEnvsAAiEAqFV8dgDno3IJmKTzU5lLcO4UDcGWtc81el6YRLbiFRg%3D"></video> -->
                            <b-overlay :show="show_overlay" rounded="sm">
                                <b-row  cols="3">
                                    <b-col v-for="(file, i) in files" :key="i">
                                        <div class="imgs_object pb-4">
                                                <a v-if="file.file_type == 'image'" :href="file.file_url" download class="pt-2">
                                                    <img :src="file.file_url"  width="100%" height="200">
                                                </a>
                                                <a v-else :href="file.file_url" download class="pt-2">
                                                    <div style="width:100%; height: 200px" class="d-flex justify-content-center align-items-center">
                                                        <img src="~assets/icons8-video-file-96.png" alt="">
                                                    </div>
                                                </a>
                                                <span @click="deleteFile(i)" class="delete_imgs">
                                                    удалить
                                                </span>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-overlay>
                        </b-card>
                    </b-col>
                    <b-col v-if="role == 'admin'" class="w-100 mx-0 px-0">
                        <b-card header="Добавить Заметку" class="my-4">
                            <b-form @submit.prevent="changeRequestInfo()">
                                
                                <textarea class="w-100" v-if="request" v-model="request.note" name="note" rows="8"></textarea>
                                <b-button class="mt-2 bg-dark" type="submit">Добавить</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col v-else class="w-100 mx-0 px-0" style="visibility: hidden">
                        <b-card header="Добавить Заметку" class="my-4">
                            <textarea class="w-100" v-model="request.note" name="note" rows="8"></textarea>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
      </b-row>
  </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  created () {
  },
  data () {
    return {
        disable_btn: false,
        req_btn_title: 'Редактировать',
        req_inputs: true,
        undo: false,
        EditModal: false,
        DeleteModal: false,
        request: null,

        show_overlay: false,
        
        file: null,
        role: null,

        files: [],
        options: [],

        status_options : [
            { value: 1, text: 'Активно' },
            { value: 2, text: 'Заморожено' },
            { value: 3, text: 'На согласовании' },
        ]
    }
  },
  mounted(){
      this.role = localStorage.getItem('role')
      this.getDataRequests();
  },
  methods: {
    getDataRequests(){
      Api.getInstance()
        .requests.getDataRequest(localStorage.getItem('role'), this.$route.params.id)
        .then((response) => {
            this.request = response.data.RequestStore;
            if(localStorage.getItem('role') != "admin"){
                if(this.request.status == 2){
                    this.disable_btn = true
                }
                if(this.request.status == 1){
                    this.disable_btn = true
                }
            }
            this.files = response.data.RequestStore.files;
            this.options = response.data.AddressStore;
        })
        .catch((error) => {
            console.log('getDataRequests-> ', error)
            this.$bvToast.toast("Системная ошибка", {
                title: `Предупреждение!`,
                variant: "danger",
                solid: true,
            });
        //   localStorage.removeItem("strjwt");
        //   localStorage.removeItem("role");
        //   localStorage.removeItem("idecur");
        //   setTimeout(() => {
        //     this.$router.push("/account/login");
        //   }, 1000);
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
              setTimeout(()=>{this.$router.push('/requests/requests')}, 1000)
          })
    },
    change_btn_event() { 
      if(this.req_btn_title == "Редактировать"){
        this.req_btn_title = "Сохранить";
        this.req_inputs = false;
        this.undo = true
      }else{
        setTimeout(()=>{this.EditModal = true;}, 1500);
        this.req_btn_title = "Редактировать";
        this.req_inputs = true
      }
    },

    handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.send_image()
    },
    send_image(){
        let formatData = new FormData();
        formatData.append('file', this.file);
        this.show_overlay = true;
        Api.getInstance().requests.uploadFile(formatData, this.request.id).then((response) => {
            // let file_type = this.file.type;
            // let file_link = response.data.newFilesReq;
            // file_type = file_type.split('/');
            // file_type = file_type[0];
            // this.files.push({file_link, file_type});
            this.files = response.data.newFilesReq
            console.log(response.data.newFilesReq)
            this.show_overlay = false;
            this.$bvToast.toast("Файл успешно добавлен к заявке!", {
                title: `Сообщение:`,
                variant: "success",
                solid: true,
            })
        })
        .catch((error) => {
            console.log(error)
            if(error.response.data.status == 402){
                this.$bvToast.toast(error.response.data.message, {
                    title: `Ошибка!`,
                    variant: "danger",
                    solid: true,
                });
            }else{
                this.$bvToast.toast("Файл не был загружен!", {
                        title: `Ошибка аутентификации`,
                    variant: "danger",
                    solid: true,
                });
            }
        });
    },
    deleteFile(idImage){
        Api.getInstance().requests.deleteFile(idImage, this.request.id).then((response) => {
            this.$bvToast.toast("Файл был успешно удален от заявки!", {
                title: `Сообщение:`,
                variant: "success",
                solid: true,
            })    
            this.files = response.data.newFilesRequest
        })
        .catch((error) => {
            console.log(error)
            this.$bvToast.toast("Удаление прошло безуспешно.", {
                    title: `Ошибка аутентификации`,
                variant: "danger",
                solid: true,
            });
            // setTimeout(()=>{this.$router.push('/')}, 1500)
        });
    }


    // onFileChange(e) {
    //     let files = e.target.files || e.dataTransfer.files;
    //     if (!files.length)
    //         return;
    //     this.createImage(files[0]);
    //     console.log(this.images)
    // },
    // createImage(file) {
    //     let reader = new FileReader();
    //     let vm = this;
    //     reader.onload = (e) => {
    //         vm.images.push(e.target.result)
    //     };
        
    //     reader.readAsDataURL(file);
    // },
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
    width: 100%;
}
.wrap__create_req__container .btn_warning{
    background-color: #FFC221; border: 0px; color: black !important
}
.wrap__create_req__container .imgs_object{
    position: relative;
}
.wrap__create_req__container .input-group-text{
    padding: 0 10px 0 10px !important
}
.wrap__create_req__container .input-group-text {
    /* font-size: 1rem; */
    border-radius: 0 !important;
}
.wrap__create_req__container .imgs_object .delete_imgs{
    position: absolute;
    bottom: -10px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    color: red;
    cursor: pointer;
}
.wrap__create_req__container .input-group-text{
    padding: 0 10px 0 10px !important
}
@media (max-width: 1035px) {
    .col-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .wrap__card_photos{
        width: 100%;
        flex-direction: column;
    }
    .wrap__card_photos .pr-4{
        padding-right: 0 !important;
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
    .wrap_timepicker{
        flex-direction: column;
    }
    .wrap_timepicker .pb-3{
        padding-bottom: 1rem !important;
    } 
    .wrap_timepicker .pl-3{
        padding-left: 0 !important;
    }
    .wrap_timepicker .pr-3{
        padding-right: 1rem !important;
    } 
    .wrap__create_req__container .form-control {
        letter-spacing: 0px;
    }
    .input-group-text {
        font-size: inherit !important;
    }
    .wrap__create_req__container .time_wrap .pl-3{
        padding-left: 0 !important;
    }
    .wrap__create_req__container .time_wrap .pb-3{
        padding-bottom: 30px !important;
    }
}
</style>