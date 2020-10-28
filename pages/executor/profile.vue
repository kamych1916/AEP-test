<template>
    <b-row class="wrap__executor_container py-2 pt-0 mx-0 pb-5">
      <b-col cols="4" class="ml-md-auto p-3 wrap__executor_container__avatar_block ">
        <b-card class="text-center">
          <div class="w-100 d-flex justify-content-center pb-2">
            <div class="wrap__executor_container__avatar d-flex justify-content-center align-items-center ">
              <label v-b-modal.downloadPhoto>Загрузить</label>
              <font-awesome-icon style="width: 35px; height: 35px " :icon="['fas', 'camera']"/>
              <img :src="image" alt="">

              <b-modal id="downloadPhoto" size="lg" centered>
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
              </b-modal>
            </div>
          </div>
          <h4>Компания</h4>
          <h6>Должность</h6>
          <h6>Фио</h6>
        </b-card>
      </b-col>

      <b-col class="ml-md-auto p-3">
        <b-card header="Данные пользователя" class="pb-3">
            <b-form @submit.prevent="SaveDataExecutor()">
                <b-row class="wrap__executor_container pb-0">
                    <b-col class="pt-3">
                        <b-row>
                            <b-col cols="4">ФИО отвественного</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Должность</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Телефон отвественного</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">E-mail</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Город</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col class="pt-3">
                        <b-row>
                            <b-col cols="4">Адрес</b-col>
                            <b-col>
                            <div>
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Количество этажей</b-col>
                            <b-col >
                            <div class="form-group">
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Квадратура</b-col>
                            <b-col >
                            <div class="form-group">
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row class="pt-3">
                            <b-col cols="4">Время работы</b-col>
                            <b-col >
                            <div class="form-group">
                                <input required  v-model="text" name="text" type="text" class="form-control"/>
                            </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-button class="mt-3" type="submit" style="background-color: #0C2947">Сохранить</b-button>
            </b-form>
        </b-card>
      </b-col>

    </b-row>
    
          <!-- <b-alert show>Роль пользователя - <strong>{{role}}</strong></b-alert> -->
    
</template> 

<script>
import Api from "~/utils/api";

export default {
  data: () => ({
    role: null,
    image: null,
    text: null,
  }),

  mounted(){
    if(localStorage.getItem('strjwt')){
      this.role = localStorage.getItem('role')
    }else{
      this.$router.push('/account/login')
    }
  },
  methods: {
    SaveDataExecutor(){

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
.wrap__executor_container{
  width: 100%;
  font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__executor_container .card-header{
  background-color: unset;
  text-transform: uppercase;
}

.wrap__executor_container__avatar_block .wrap__executor_container__avatar_input{
  position: absolute;
}


.wrap__executor_container__avatar{
  width: 100px; 
  height: 100px; 
  border-radius: 100px; 
  border: 1px solid #ccc; 
  color: #ccc;
}
.wrap__executor_container__avatar img {
  position: absolute;
  width: 100px; 
  height: 100px; 
  border-radius: 100px;
  z-index: 1;
}
.wrap__executor_container__avatar label{
  display: none;
}
.wrap__executor_container__avatar:hover label{
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
    .wrap__executor_container .col-4 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .wrap__executor_container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      padding-bottom: 50px;
    }
}
</style>

