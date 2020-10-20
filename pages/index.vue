<template>

    <div class="wrap__client_container py-4 px-4">

      <div class="wrap__client_container__avatar_block">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div class="wrap__client_container__avatar d-flex justify-content-center align-items-center ">
              <label for="load">Загрузить</label>
              <input id="load" @change="onFileChange" type="file" name="photo" style="display: none;">
              <font-awesome-icon style="width: 35px; height: 35px " :icon="['fas', 'camera']"/>
              <img :src="image" alt="">
            </div>
          </div>
          <h4>Компания</h4>
          <h6>Должность</h6>
          <h8>Фио</h8>
        </b-card>
      </div>
      <div class="wrap__client_container__client_block">
        <b-card header="Данные пользователя">
          <b-row>
            <b-col cols="4">ФИО</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Телефон</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Email</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Сайт компании</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Должность</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Название компании</b-col>
            <b-col>
              <div>
                <input required :readonly="client_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-button @click="client_btn_event()" class="mt-3" style="background-color: #0C2947">{{client_btn_title}}</b-button>
        </b-card>
      </div>
      <div class="wrap__client_container__password_block">
        <b-card header="Изменить пароль">
          <b-row>
            <b-col cols="4">Текущий пароль</b-col>
            <b-col>
              <div>
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Новый пароль</b-col>
            <b-col >
              <div class="form-group">
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-row class="pt-3">
            <b-col cols="4">Повторите новый пароль</b-col>
            <b-col >
              <div class="form-group">
                <input required :readonly="password_input_rdnl" v-model="password" name="password" type="password" class="form-control" id="lg_password"/>
              </div>
            </b-col>
          </b-row>
          <b-button @click="password_btn_event()" class="mt-3" style="background-color: #0C2947">{{password_btn_title}}</b-button>
        </b-card>
      </div>
      </div>
    
          <!-- <b-alert show>Роль пользователя - <strong>{{role}}</strong></b-alert> -->
    
</template> 

<script>
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
  }
}
</script>

<style>
.wrap__client_container{
  overflow-y:scroll !important;
  width: 85%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.wrap__client_container .card-header{
  background-color: unset;
  text-transform: uppercase;
}

.wrap__client_container__avatar_block .wrap__client_container__avatar_input{
  position: absolute;
}
.wrap__client_container__avatar_block{
  width: 15%;
}
.wrap__client_container__client_block{
  width: 45%;
}
.wrap__client_container__password_block{
  width: 35%;
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


@media (max-width: 768px) {
    .wrap__client_container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
    }
    .wrap__client_container__avatar_block{
      padding-bottom: 30px;
      width: 100%;
    }
    .wrap__client_container__client_block{
      padding-bottom: 30px;
      width: 100%;
    }
    .wrap__client_container__password_block{
      width: 100%;
    }
}
</style>

