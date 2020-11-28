<template>
<div class="w-100">

    <b-row v-if="UserData" class="wrap__client_container py-2 px-0 mx-0 ">
      <b-col class=" ml-md-auto p-3 wrap__client_container__avatar_block ">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div v-if="UserData" :style="'background-color:' + UserData.avatar_color" class="wrap__client_container__avatar d-flex justify-content-center align-items-center">
              <h2 class="mt-2">{{avatar_initials}}</h2>
            </div>
          </div>
          <h4 v-if="UserData">{{UserData.company_name}}</h4>
          <h6 v-if="UserData">{{UserData.position}}</h6>
          <h6 v-if="UserData">{{UserData.username}}</h6>
        </b-card>
      </b-col>

      <b-col class="ml-md-auto p-3">
        <b-card header="ДАННЫЕ ПРОФИЛЯ">
          <b-form @submit.prevent="client_btn_event(), changeUserInfo(client_btn_title)">
            <b-row>
              <b-col cols="4">ФИО</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.username" name="username" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Телефон</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.phone_number" name="phone_number" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Email</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.email" name="email" type="email" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Сайт компании</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.company_site" name="company_site" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Должность</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.position" name="position" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Название компании</b-col>
              <b-col>
                <div>
                  <input v-if="UserData" required :readonly="client_input_rdnl" v-model="UserData.company_name" name="company_name" type="text" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-button type="submit" class="mt-3" style="background-color: #0C2947">{{client_btn_title}}</b-button>
          </b-form>
        </b-card>
      </b-col>


      <b-col class=" ml-md-auto p-3">
        <b-card header="Изменить пароль">
          <b-form @submit.prevent="password_btn_event(), changeUserPass(password_btn_title)">
            <b-row>
              <b-col cols="4">Текущий пароль</b-col>
              <b-col>
                <div>
                  <input autocomplete="off" required :readonly="password_input_rdnl" v-model="cur_password" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Новый пароль</b-col>
              <b-col >
                <div>
                  <input autocomplete="off" required :readonly="password_input_rdnl" v-model="new_password_1" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Повторите новый пароль</b-col>
              <b-col >
                <div class="form-group">
                  <input autocomplete="off" required :readonly="password_input_rdnl" v-model="new_password_2" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-button type="submit" class="mt-3" style="background-color: #0C2947">{{password_btn_title}}</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>









    <b-row v-if="ObjectData" class="wrap__executor_container py-2 pt-0 mx-0 pb-5">
      <b-col cols="3" class=" ml-md-auto p-3 wrap__client_container__avatar_block ">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div v-if="ObjectData" :style="'background-color:' + ObjectData.avatar_color" class="wrap__client_container__avatar d-flex justify-content-center align-items-center">
              <h2 class="mt-2">{{avatar_initials}}</h2>
            </div>
          </div>
          <h4 v-if="ObjectData">ОБЪЕКТ</h4>
          <h6 v-if="ObjectData">{{ObjectData.position}}</h6>
          <h6 v-if="ObjectData">{{ObjectData.fullname_responsible}}</h6>
        </b-card>
      </b-col>

      <b-col class="ml-md-auto p-3">
        <b-card header="ДАННЫЕ ПРОФИЛЯ" class="pb-3">
            <b-form @submit.prevent="client_btn_event(), changeObjectInfo(client_btn_title)">
                <b-row class="wrap__executor_container pb-0">
                    <b-col class="pt-3">
                        <b-row>
                            <b-col cols="4">ФИО ответственного</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.fullname_responsible" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Должность</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.position" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон ответственного</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.phone_number_responsible" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.email_employee" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Город</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.city" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="pt-3">
                        <b-row>
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.address" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col >
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.count_floors" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Квадратура</b-col>
                            <b-col >
                                <input required :readonly="client_input_rdnl" v-if="ObjectData" v-model="ObjectData.quadrature" name="text" type="text" class="form-control"/>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Время работы</b-col>
                            <b-col >
                              <b-row class="ml-0 my-0 py-0 px-0 wrap_timepicker">
                                <div class="my-0 pb-3 pr-3">
                                  <b-form-timepicker
                                    :readonly="client_input_rdnl"
                                    v-model="ObjectData.time_from"
                                    v-if="ObjectData"
                                    locale="ru"
                                    placeholder="c"
                                  ></b-form-timepicker>
                                </div>
                                <div class="my-0 py-0 pr-3 pl-3">
                                  <b-form-timepicker
                                    :readonly="client_input_rdnl"
                                    v-model="ObjectData.time_to"
                                    v-if="ObjectData"
                                    locale="ru"
                                    placeholder="до"
                                  ></b-form-timepicker>
                                </div>
                              </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-button type="submit" class="mt-3" style="background-color: #0C2947">{{client_btn_title}}</b-button>
            </b-form>
        </b-card>
      </b-col>

    </b-row>


    
</div>
    
</template> 

<script >
import Api from "~/utils/api";

export default {
  data: () => ({
    role: null,
    avatar_initials: null, 

    password: null,
    cur_password: null,
    new_password_1: null,
    new_password_2: null,
    
    text:null,

    UserData: null,
    ObjectData: null,

    password_btn_title: "Редактировать",
    client_btn_title: "Редактировать",

    password_input_rdnl: true,
    client_input_rdnl: true,
  }),

  mounted(){
    if(localStorage.getItem('strjwt')){
      this.role = localStorage.getItem('role')
    }else{
      this.$router.push('/account/login')
    }
    this.getClientInfo();
  },
  methods: {
    changeUserPass(btn_title){
      if(btn_title != "Сохранить"){
        if(this.cur_password != this.password){
          this.$bvToast.toast("Текущий пароль неверен.", {
            title: `Ошибка аутентификации`,
            variant: "danger",
            solid: true,
          });
        }else{
          if(this.new_password_1 != this.new_password_2){
            this.$bvToast.toast("Новый пароль не сопвпадает, введите паравильно пароли.", {
              title: `Ошибка аутентификации`,
              variant: "danger",
              solid: true,
            });
          }else{
            if(this.new_password_1 & this.new_password_2 == this.password){
              this.$bvToast.toast("Новый пароль идентичен старому паролю.", {
                title: `Ошибка аутентификации`,
                variant: "danger",
                solid: true,
              });
            }else{
              Api.getInstance()
                .auth.reset(this.new_password_1, this.UserData.id, this.UserData.email )
                .then((response) => {
                  this.$bvToast.toast("Пароль успешно изменён!", {
                      title: `Сообщение:`,
                      variant: "success",
                      solid: true,
                  })
                  // setTimeout(()=>{window.location.reload(true)}, 1000)
                }).catch((error)=>{
                  console.log('changeUserPass -> ', error)
                })
            }
          }
        }
      }
    },
    changeUserInfo(btn_title){
      if(btn_title != "Сохранить"){
        let storeStr = this.UserData.username.trim().split(" ").length;
        if(storeStr >= 2){
          if(storeStr > 3){
            this.$bvToast.toast("В поле ФИО, вводите только - Имя, Фамилия и Отчество", {
              title: `Ошибка валидации`,
              variant: "danger",
              solid: true,
            });
          }else{
            Api.getInstance().client.sendNewUserData(this.UserData).then((response) => {
                  this.$bvToast.toast("Данные успешно изменены!", {
                      title: `Сообщение:`,
                      variant: "success",
                      solid: true,
                  })
                  // setTimeout(()=>{window.location.reload(true)}, 1500)
            }).catch((error)=>{
                console.log('changeUserInfo -> ', error)
            })
          }
        }else{
          this.$bvToast.toast("В поле ФИО, обязательны - Имя и Фамилия", {
              title: `Ошибка валидации`,
              variant: "danger",
              solid: true,
          });
        }
      }
    },
    changeObjectInfo(btn_title){
      if(btn_title != "Сохранить"){
        let storeStr = this.fullname_responsible.trim().split(" ").length;
        if(storeStr >= 2){
          if(storeStr > 3){
            this.$bvToast.toast("В поле ФИО ответственного, вводите только - Имя, Фамилия и Отчество", {
              title: `Ошибка валидации`,
              variant: "danger",
              solid: true,
            });
          }else{
              Api.getInstance().objects.changeObjectData(this.ObjectData).then((response) => {
                this.$bvToast.toast("Данные успешно изменены!", {
                    title: `Сообщение:`,
                    variant: "success",
                    solid: true,
                })
                // setTimeout(()=>{window.location.reload(true)}, 1500)
              }).catch((error)=>{
                console.log('changeObjectInfo -> ', error)
              })
          }
        }else{
          this.$bvToast.toast("В поле ФИО ответственного, обязательны - Имя и Фамилия", {
              title: `Ошибка валидации`,
              variant: "danger",
              solid: true,
          });
        }
      }
    },
    getInitials( name, delimeter ) {
        if( name ) {
          let array = name.split( delimeter );
          switch ( array.length ) {
            case 1:
              return array[0].charAt(0).toUpperCase();
              break;
            default:
              return array[0].charAt(0).toUpperCase() + array[1].charAt(0).toUpperCase();
          }
        }
        return false;
    }, 
    getClientInfo() {
      Api.getInstance().client.getClientInfo(localStorage.getItem('role')).then((response) => {
          if(localStorage.getItem('role') == 'executor'){
            this.ObjectData = response.data.ObjectStore;
            this.avatar_initials = this.getInitials(this.ObjectData.fullname_responsible, " ");
          }else{
            this.UserData = response.data.UserStore;
            this.avatar_initials = this.getInitials(this.UserData.username, " ");
            this.password = response.data.UserStore.password;
          }
        })
        .catch((error) => {
          console.log('getClientInfo -> ', error)
          this.$bvToast.toast("У вас нет доступа к данной странице", {
            title: `Системная ошибка`,
            variant: "danger",
            solid: true,
          });
          localStorage.removeItem('strjwt');
          localStorage.removeItem('role');
          localStorage.removeItem('idecur');
          setTimeout(()=>{this.$router.push('/account/login')}, 1000)
        });
    },
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
  }
}
</script>

<style scoped>
.wrap__client_container, .wrap__executor_container{
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
.wrap_timepicker .pb-3{
  padding-bottom: 0 !important;
} 

.wrap_timepicker .pr-3{
  padding-right: 0 !important;
} 

@media (max-width: 1035px) {
    .wrap__client_container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      padding-bottom: 100px !important;
    }
    .wrap__executor_container {
      flex-direction: column !important;
    }
    .wrap__executor_container .col-3 {
        flex: 0 0 100%;
        max-width: 100%;
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
}
</style>

