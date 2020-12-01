<template>
  <div class="wrap__create_req__container w-100 p3">
      <b-row class="py-2 px-3 mx-0 w-100 d-flex justify-content-between">
        <div></div>
        <b-button class="bg-dark mb-2" @click="$router.push('/requests/requests')">Вернуться к списку объектов</b-button>
      </b-row>
      <b-row  class="w-100 px-3 mx-0 pb-5">
            <b-alert v-if="showAlert" class="w-100" v-model="showAlert" variant="danger">
                У вас не зафиксировано ни одного объекта. Пожалуйста, перед созданием заявки - создайте объект.
            </b-alert>
            <b-card v-else header="Новая заявка" class="w-100">
                <b-form @submit.prevent="createRequest()">
                <b-row class="wrap__create_req__card">
                    <b-col cols="6" class="my-2">
                        <b-row class="pb-3" v-if="role == 'admin'">
                            <b-col cols="4">Клиент</b-col>
                            <b-col>
                                <div>
                                    <b-form-select
                                        v-model="request.client"
                                        :options="client_options"
                                        required
                                        @change="getClientData($event)"
                                    ></b-form-select>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4">Объект</b-col>
                            <b-col>
                                <div>
                                    <b-form-select
                                        v-model="request.object"
                                        :options="options"
                                        required
                                        @change="getDataObject($event)"
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
                            <b-col cols="4">Желаемая дата выполнения услуги</b-col>
                            <b-col>
                                <div>
                                    <b-form-input required v-model="request.date" type="date"></b-form-input>
                                </div>
                            </b-col>
                        </b-row>

                        <b-row class="pt-3 time_wrap"> 
                            <b-col cols="4">Желаемое время выполнения услуги</b-col>
                            <b-col>
                                <b-form-group>
                                    <b-row class="ml-0 px-0">
                                        <div class="pb-3 ">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text">С</span>
                                                </b-input-group-prepend>
                                                <b-form-input v-model="request.time_from" required type="time"></b-form-input>
                                            </b-input-group>
                                        </div>
                                        <div class="pl-3">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text">До</span>
                                                </b-input-group-prepend>
                                                <b-form-input v-model="request.time_to" required type="time"></b-form-input>
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
                                <input readonly  v-model="request.city" name="city" type="text"  class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                            <div>
                                <input readonly  v-model="request.address" name="adress" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Размер помещения</b-col>
                            <b-col>
                            <div>
                                <input readonly  v-model="request.quadrature" name="size" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col>
                                <div>
                                    <input readonly  v-model="request.count_floors" name="count" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">ФИО сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input readonly  v-model="request.fullname_responsible" name="fullname" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input readonly  v-model="request.phone_number_responsible" name="telephone" type="text" class="form-control"/>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail сотрудника</b-col>
                            <b-col>
                                <div>
                                    <input readonly  v-model="request.email_employee" name="fullname" type="email" class="form-control"/>
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
                            <u style="cursor: pointer;" @click="$router.push('/requests/requests')">Вернуться к списку заявок</u><br><br>
                        </div>
                        <template v-slot:modal-footer>
                            <p></p>
                        </template>
                    </b-modal>
                </b-row>
                </b-form>
            </b-card>
            <div class="d-flex w-100">
                <b-row class="w-100 wrap__card_photos px-0 mx-0 justify-content-around">
                    <b-col class="w-100 mx-0 px-0 pr-4">
                        <b-card header="Добавить фото/видео" class="my-4 ">
                            <b-row class="pl-3">
                                <label for="load" class="text-light py-2 px-3 bg-dark">+ Добавить фото</label>
                                <input id="load" accept="image/*,video/*" ref="file" @change="handleFileUpload()" type="file" name="photo" style="display: none;">
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
                    <b-col v-if="role == 'admin'" class="w-100 mx-0 px-0" >
                        <b-card header="Добавить Заметку" class="my-4">
                            <b-form @submit.prevent="changeRequestInfo()">
                                <textarea class="w-100" v-model="request.note" name="note" rows="8"></textarea>
                                <b-button class="mt-2 bg-dark" type="submit">Добавить</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col v-else class="w-100 mx-0 px-0 none_admin">
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
  data () {
    return {
        show_overlay: false,
        showAlert: false,
        modalShow: false,
        role: null,
        files: [],
        time_from_flag: null,   
        time_to_flag: null,
        client_options: [],
        options: [],
        request: {
            object: null,
            problem: null,
            promblem_more: null,
            who_made: null,
            date: null,
            time_from: null,
            time_to: null,
            city: null,
            address: null,
            quadrature: null,
            count_floors: null,
            fullname_responsible: null,
            phone_number_responsible: null,
            email_employee: null,
            note: null,
            files: null,
        }
    }
  },
  mounted(){
      this.role = localStorage.getItem('role');
      this.getRqstObjtsAndSrvs();
      this.getCLientsForCreateRequest()
  },
  methods: {
    getCLientsForCreateRequest(){
        Api.getInstance().requests.getCLientsForCreateRequest(localStorage.getItem('role')).then((response) => {
            this.client_options = response.data.ClientsStore;
        }).catch((err)=>{
            console.log(err)
        })
    },
    getClientData(event){
        Api.getInstance().requests.getClientData(localStorage.getItem('role'), event).then((response) => {
            this.options = response.data.ObjectsStore;
        }).catch((err)=>{
            console.log(err)
        })
    },
    getDataObject(event) {
      Api.getInstance()
        .objects.getDataObject(localStorage.getItem('role'), event)
        .then((response) => {
            this.request = response.data.ObjectStore;
            this.request.object = event;
            this.request.who_made = this.request.fullname_responsible
        })
        .catch((error) => {
            console.log('getDataObject -> ', error)
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
    createRequest(){
        if(this.request.time_from == null & this.request.time_from == '' ){ 
            this.time_from_flag = false
        }else{
            if(this.request.time_to == null & this.request.time_to == ''){
                this.time_to_flag = false
            }else{
                let storeStr = this.request.who_made.trim().split(" ").length;
                if(storeStr >= 2){
                    if(storeStr > 3){
                        this.$bvToast.toast("В поле Кто составил, вводите только - Имя, Фамилия и Отчество", {
                            title: `Ошибка валидации`,
                            variant: "danger",
                            solid: true,
                        });
                    }else{
                        delete this.request.requests
                        Api.getInstance().requests.createDataRequest(this.request).then((response) => {
                            setTimeout(()=>{this.modalShow = true; }, 1500);
                            this.time_from_flag = null;
                            this.time_to_flag = null;
                            this.$bvToast.toast("Заявка успешно создана!", {
                                title: `Сообщение:`,
                                variant: "success",
                                solid: true,
                            })
                        }).catch((error)=>{
                            console.log(error)
                        })
                    }
                }else{
                    this.$bvToast.toast("В поле Кто составил, обязательны - Имя и Фамилия", {
                        title: `Ошибка валидации`,
                        variant: "danger",
                        solid: true,
                    });
                }
            }
        }

    },
    getRqstObjtsAndSrvs(){
        Api.getInstance().requests.getRqstObjtsAndSrvs(localStorage.getItem('role')).then((response) => {
            this.options = response.data.AddressStore;
            if(this.options == 0){
                this.showAlert = true
            }
            if(localStorage.getItem('role') == 'executor'){
                this.request = response.data.ObjectStore;
                delete this.request.requests
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    send_image(){
        let formatData = new FormData();
        formatData.append('file', this.file);
        this.show_overlay = true;
        Api.getInstance().requests.uploadFile(formatData, '').then((response) => {
            // this.request.files.push(response.data.newImagesReq)
            // let file_type = this.file.type;
            // let file_link = response.data.newFilesReq;
            // file_type = file_type.split('/');
            // file_type = file_type[0];
            // this.files.push({file_link, file_type});
            let files_for_request = [];
            files_for_request.push(response.data.newFilesReq)
            this.request.files = files_for_request;
            this.files.push(response.data.newFilesReq[0])
            
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
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.send_image()
    },
    deleteFile(idFile){
        for(let idx in this.files){
            if(idx == idFile){
                this.files.splice(idx, 1)
            }
        }
    }
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
.wrap__card_photos .none_admin{
    visibility: hidden  ;
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
.wrap__create_req__container .input-group-text {
    /* font-size: 1rem; */
    border-radius: 0 !important;
}
.wrap__create_req__container .time_wrap .pb-3{
    padding-bottom: 0 !important;
}
@media (max-width: 1035px) {
    .col-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .wrap__card_photos{
        width: 100%;
    }
    .wrap__card_photos .pr-4{
        padding-right: 0 !important;
    }
    .wrap__card_photos .none_admin{
        display: none;
    }
    
    .wrap__create_req__card{
      width: 100%;
      justify-content: start;
      flex-direction: column;
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