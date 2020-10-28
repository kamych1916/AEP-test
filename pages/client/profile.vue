<template>
    <b-row class="wrap__client_container py-2 px-0 mx-0 ">
      <b-col class=" ml-md-auto p-3 wrap__client_container__avatar_block ">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div style="" class="wrap__client_container__avatar d-flex justify-content-center align-items-center">
              <h2 class="mt-2">К.Р.</h2>
              <!-- <label v-b-modal.downloadPhoto>Загрузить</label> -->
              <!-- <font-awesome-icon style="width: 35px; height: 35px " :icon="['fas', 'camera']"/> -->
              <!-- <img :src="image" alt=""> -->

              <!-- <b-modal id="downloadPhoto" size="lg" centered>
                  <template v-slot:modal-header>
                    <p></p>
                  </template>
                  <div style="text-align: center;">
                    <p>Изменить логотип компании</p>
                    <label for="logo" style="color: #00D1A1; cursor: pointer;">Загрузить логотип</label>
                    <input id="logo"  @change="onFileChange" type="file" name="photo" style="display: none;">
                    <p style="color: #E84242; cursor: pointer;">Удалить логотип</p>
                    <p style="cursor: pointer;" @click="$bvModal.hide('downloadPhoto')">Отмена</p>
                  </div>
                  <template v-slot:modal-footer>
                    <p></p>
                  </template>
              </b-modal> -->
            </div>
          </div>
          <h4>Компания</h4>
          <h6>Должность</h6>
          <h6>Фио</h6>
        </b-card>
      </b-col>

      <b-col class="ml-md-auto p-3">
        <b-card header="Данные пользователя">
          <b-row>
            <b-col cols="4">ФИО</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Телефон</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Email</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Сайт компании</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Должность</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Название компании</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-button @click="client_btn_event()" class="mt-3" style="background-color: #0C2947">{{client_btn_title}}</b-button>
        </b-card>
      </b-col>


      <b-col class=" ml-md-auto p-3">
        <b-card header="Изменить пароль">
          <b-row>
            <b-col cols="4">Текущий пароль</b-col>
            <b-col>
              <div>
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Новый пароль</b-col>
            <b-col >
              <div class="form-group">
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Повторите новый пароль</b-col>
            <b-col >
              <div class="form-group">
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control"/>
              </div>
            </b-col>
          </b-row>
          <b-button @click="password_btn_event()" class="mt-3" style="background-color: #0C2947">{{password_btn_title}}</b-button>
          <button @click="AuthReq()">kek</button>
        </b-card>
      </b-col>


    </b-row>
    
          <!-- <b-alert show>Роль пользователя - <strong>{{role}}</strong></b-alert> -->
    
</template> 

<script >
import Api from "~/utils/api";

export default {
  data: () => ({
    role: null,
    password: null,

    password_btn_title: "Редактировать",
    client_btn_title: "Редактировать",

    password_input_rdnl: true,
    client_input_rdnl: true,

    image: null,
  }),

  mounted(){
    if(localStorage.getItem('strjwt')){
      this.role = localStorage.getItem('role')
    }else{
      this.$router.push('/account/login')
    }
  },
  methods: {
    initials(str) {
      return str.split(/\s+/).map((w,i) => i ? w.substring(0,1).toUpperCase() + '.' : w).join(' ');
    },
    password_btn_event(){
      if(this.password_btn_title == "Редактировать"){
        this.password_btn_title = "Сохранить";
        this.password_input_rdnl = false
      }else{
        this.password_btn_title = "Редактировать";
        this.password_input_rdnl = true
      }
    },
    client_btn_event(){
      if(this.client_btn_title == "Редактировать"){
        this.client_btn_title = "Сохранить";
        this.client_input_rdnl = false
      }else{
        this.client_btn_title = "Редактировать";
        this.client_input_rdnl = true
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
            vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    AuthReq() {
      Api.getInstance().auth.test().then((response) => {
          console.log('kek-> ', response)
        })
        .catch((error) => {
          this.$bvToast.toast("Неверное имя пользователя или пароль", {
            title: `Ошибка авторизации`,
            variant: "danger",
            solid: true,
          });
        });
    },
  }
}
</script>

<style scoped>
.wrap__client_container{
  width: 100%;
  font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__client_container .card-header{
  background-color: unset;
  text-transform: uppercase;
}

.wrap__client_container__avatar_block .wrap__client_container__avatar_input{
  position: absolute;
}


.wrap__client_container__avatar{
  width: 100px; 
  height: 100px; 
  border-radius: 100px; 
  border: 1px solid #ccc; 
  color: #ccc;
}
.wrap__client_container__avatar img {
  position: absolute;
  width: 100px; 
  height: 100px; 
  border-radius: 100px;
  z-index: 1;
}
.wrap__client_container__avatar label{
  display: none;
}
.wrap__client_container__avatar:hover label{
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 2;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
    border-top: none;
}


@media (max-width: 1035px) {
    .wrap__client_container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      padding-bottom: 100px !important;
    }
}
</style>

