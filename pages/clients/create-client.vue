<template>
    <b-row class="wrap__client_container py-2 px-0 mx-0 ">
      <b-col class=" ml-md-auto p-3 wrap__client_container__avatar_block ">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div class="wrap__client_container__avatar d-flex justify-content-center align-items-center">
              <h2 class="mt-2">{{ClientInitials}}</h2>
            </div>
          </div>
          <h4>{{client.company_name}}</h4>
          <h6>{{client.position}}</h6>
          <h6>{{client.username}}</h6>
        </b-card>
      </b-col>
<!-- AuthReq() -->
      <b-col class="ml-md-auto p-3">
        <b-card header="Данные пользователя">
          <b-form @submit.prevent="createNewClient()">
            <b-row>
              <b-col cols="4">ФИО</b-col>
              <b-col>
                <div>
                  <input @change="getInitials(client.username, ' ')" required v-if="client" v-model="client.username" name="username" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Телефон</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.phone_number" name="phone_number" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Email</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.email" name="email" type="email" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Сайт компании</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.company_site" name="company_site" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Должность</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.position" name="position" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Название компании</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.company_name" name="company_name" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Придумайте пароль</b-col>
              <b-col>
                <div>
                  <input required v-if="client" v-model="client.password" name="password" type="text" autocomplete="off" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-button type="submit" class="mt-3" style="background-color: #0C2947">Создать</b-button>
          </b-form>
        </b-card>
      </b-col>


      <b-col class=" ml-md-auto p-3">
        <b-card header="Заметки от АЕП">
          <textarea v-model="client.note" rows="8" style="width: 100%;"></textarea>
        </b-card>
      </b-col>


    </b-row>
    
          
    
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

    ClientInitials: null,
    
    client: {
      username: null,
      phone_number: null,
      email: null,
      company_site: null,
      position: null,
      company_name: null,
      password: null,
      note: null,
    },

  }),

  mounted(){},
  methods: {
    createNewClient(){
      Api.getInstance().client.createNewClient(this.client).then((response) => {
          this.$bvToast.toast("Клиент успешно создан!", {
              title: `Сообщение:`,
              variant: "success",
              solid: true,
          });
          setTimeout(()=>{this.$router.push('/clients/clients')}, 1500)
        })
        .catch((error) => {
          console.log('createNewClient-> ', error)
          this.$bvToast.toast("Неверное имя пользователя или пароль", {
            title: `Ошибка авторизации`,
            variant: "danger",
            solid: true,
          });
        });
    },
    getInitials( name, delimeter ) {
        if( name ) {
          let array = name.split( delimeter );
          switch ( array.length ) {
            case 1:
              this.ClientInitials = array[0].charAt(0).toUpperCase();
              break;
            default:
              this.ClientInitials = array[0].charAt(0).toUpperCase() + array[1].charAt(0).toUpperCase();
              break;
          }
        }
        return false;
    },
    AuthReq() {
      Api.getInstance().auth.test().then((response) => {
          // console.log('AuthReq-> ', response)
        })
        .catch((error) => {
          console.log('AuthReq-> ', error)
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

