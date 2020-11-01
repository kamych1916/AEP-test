<template>
    <div class="wrap__objects__container">
        <div class="panel-group theme-panel">
            <div class="panel panel-default">
                <div class="panel-heading w-100 text-light" v-b-toggle.collapse-2 @click="first_accor_is_open=!first_accor_is_open">
                    <b-row class="d-flex justify-content-between px-3">
                        <h4 class="panel-title" style="margin: 0;">
                            Создание объекта
                        </h4>
                        <h4 class="panel-title" style="margin: 0;">
                            <font-awesome-icon v-if="first_accor_is_open" :icon="['fas', 'arrow-down']"/>
                            <font-awesome-icon v-else :icon="['fas', 'arrow-up']"/>
                        </h4>
                    </b-row>
                </div>
                <b-collapse id="collapse-2" class="panel-collapse">
                    <div class="panel-body">
                        <b-form @submit.prevent="createObject()">
                            <b-row>
                                <b-col sm="6">
                                    <b-row>
                                        <b-col cols="4">Город</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <input
                                                v-model="object.city"
                                                id="input-1"
                                                required
                                                type="text"
                                                class="form-control"
                                                >
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Адрес</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.address"
                                                required
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Квадратура</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.quadrature"
                                                required
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Количество этажей</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.count_floors"
                                                required
                                                type="number"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Время работы</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-row class="ml-0 px-0">
                                                    <div>
                                                        <b-form-timepicker v-model="object.time_from" :state="time_from_flag" locale="ru"  placeholder="c"></b-form-timepicker>
                                                    </div>
                                                    <div class="pl-3">
                                                        <b-form-timepicker v-model="object.time_to" :state="time_to_flag" locale="ru" placeholder="до"></b-form-timepicker>
                                                    </div>
                                                </b-row>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">ФИО ответственного</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.fullname_responsible"
                                                required
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Телефон ответственного</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.phone_number_responsible"
                                                required
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>

                                <b-col>
                                    <b-row>
                                        <b-col cols="4">E-mail сотрудника</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.email_employee"
                                                required
                                                type="email"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Придумайте пароль</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.password"
                                                required
                                                type="password"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Подтвердите пароль</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.password_confirm"
                                                required
                                                type="password"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-button type="submit" class="save_button mt-3">Создать</b-button>
                        </b-form>
                    </div>
                </b-collapse>
            </div>
        </div>
        <p class="wrap__objects__container__header">Все объекты</p>
        <b-table thead-class="wrap__objects__container__table__head" striped :fields="fields" :items="items" :table-variant="tableVariant" responsive @row-selected="onRowSelected($event)" selectable></b-table>
    </div>
</template>

<script>
import Api from "~/utils/api";
export default {
  watch: {
  },
    data () {
        return {
            first_accor_is_open: false,
            time_from_flag: null,
            time_to_flag: null,

            object: {
                city: null,
                address: null,
                quadrature: null,
                count_floors: null,
                time_from: null,
                time_to: null,
                fullname_responsible: null,
                phone_number_responsible: null, 
                email_employee: null,
                password: null,
                password_confirm: null,
                id: null
            },
            
            fields: [
                {
                    key: 'city',
                    label: 'Город',
                    sortable: true
                },

                {
                    key: 'address',
                    label: 'Адрес',
                    sortable: true
                },

                {
                    key: 'quadrature',
                    label: 'Квадратура',
                    sortable: true
                },

                {
                    key: 'count_floors',
                    label: 'Этажность',
                    sortable: true
                },

                {
                    key: 'fullname_responsible',
                    label: 'Фамилия сотрудника',
                    sortable: true
                },

                {
                    key: 'phone_number_responsible',
                    label: 'Телефон'
                },

                {
                    key: 'email_employee',
                    label: 'E-mail'
                }
            ],

            items: [],

            
        }
    },

    mounted(){
        this.getObjects()
    },
    methods: {
        createObject(){
            if(this.object.time_from == null ){
                this.time_from_flag = false
            }else{
                if(this.object.time_to == null ){
                    this.time_to_flag = false
                }else{
                    if(this.object.password == this.object.password_confirm){
                        Api.getInstance().objects.sendNewObjectData(this.object).then((response) => {
                                this.time_from_flag = null;
                                this.time_to_flag = null;
                                this.$bvToast.toast("Объект успешно добавлен!", {
                                    title: `Сообщение:`,
                                    variant: "success",
                                    solid: true,
                                })
                            })
                            let last_item;
                            for(let key of this.items) {
                                last_item = key;
                            }
                            this.object.id = last_item.id
                            this.items.push(this.object)
                    }else{
                        this.$bvToast.toast("Введенные вами пароли не совпадают.", {
                            title: `Ошибка аутентификации`,
                            variant: "danger",
                            solid: true,
                        });
                    }
                }
            }

        },
        getObjects() {
            Api.getInstance().objects.getObjects('client').then((response) => {
                    this.items = response.data.ObjectsStore
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
        onRowSelected(picked) {
            this.$router.push("/client/objects/" + picked[0].id)
        }
    }
}
</script>

<style>
 .wrap__objects__container {
     padding: 22px;
     width: 100%;
     font-size: calc(8px + 6 * (100vw / 1366));
 }

 .wrap__objects__container__table__head, .wrap__objects__container .theme-panel .panel-heading , .wrap__objects__container .save_button {
    background-color: #2F343E;
    color: white;
 }

 .wrap__objects__container__header {
     text-transform: uppercase;
 }
</style>