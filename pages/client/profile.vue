<template>
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
        <b-card header="Данные пользователя">
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
                  <input  required :readonly="password_input_rdnl" v-model="cur_password" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Новый пароль</b-col>
              <b-col >
                <div class="form-group">
                  <input  required :readonly="password_input_rdnl" v-model="new_password_1" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-row class="pt-3">
              <b-col cols="4">Повторите новый пароль</b-col>
              <b-col >
                <div class="form-group">
                  <input  required :readonly="password_input_rdnl" v-model="new_password_2" name="password" type="password" class="form-control"/>
                </div>
              </b-col>
            </b-row>
            <b-button type="submit" class="mt-3" style="background-color: #0C2947">{{password_btn_title}}</b-button>
          </b-form>
        </b-card>
      </b-col>

    </b-row>
    
    
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
    
    UserData: null,

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
    this.getClientInfo()
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
                    setTimeout(()=>{window.location.reload(true)}, 1000)
                })
            }
          }
        }
      }
    },
    changeUserInfo(btn_title){
      if(btn_title != "Сохранить"){
        Api.getInstance()
          .client.sendNewUserData(this.UserData)
          .then((response) => {
              this.$bvToast.toast("Данные успешно изменены!", {
                  title: `Сообщение:`,
                  variant: "success",
                  solid: true,
              })
              setTimeout(()=>{window.location.reload(true)}, 1000)
          })
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
              return array[1].charAt(0).toUpperCase() + array[2].charAt(0).toUpperCase();
          }
        }
        return false;
    }, 
    getClientInfo() {
      Api.getInstance().client.getClientInfo('client').then((response) => {
          this.UserData = response.data.UserStore
          this.avatar_initials = this.getInitials(this.UserData.username, " ")
          this.password = response.data.UserStore.password
        })
        .catch((error) => {
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

