<template>
    <div class="wrap__objects__container p-3">
        <div class="panel-group theme-panel">
            <div class="panel panel-default ">
                <div class="d-flex ">     
                    <div class="panel-heading w-100 p-3 mr-2 text-light"  @click="f_accor_is_open=!f_accor_is_open, s_accor_is_open=false">
                        <b-row class="d-flex justify-content-between px-3">
                            <h4 class="panel-title" style="margin: 0;">
                                Создание объекта
                            </h4>
                            <h4 class="panel-title" style="margin: 0;">
                                <font-awesome-icon v-if="f_accor_is_open" :icon="['fas', 'arrow-down']"/>
                                <font-awesome-icon v-else :icon="['fas', 'arrow-up']"/>
                            </h4>
                        </b-row>
                    </div>
                    <div class="panel-heading w-100 p-3 text-light" v-if="role == 'admin'" @click="s_accor_is_open=!s_accor_is_open, f_accor_is_open=false">
                        <b-row class="d-flex justify-content-between px-3">
                            <h4 class="panel-title" style="margin: 0;">
                                Поиск объекта
                            </h4>
                            <h4 class="panel-title" style="margin: 0;">
                                <font-awesome-icon v-if="s_accor_is_open" :icon="['fas', 'arrow-down']"/>
                                <font-awesome-icon v-else :icon="['fas', 'arrow-up']"/>
                            </h4>
                        </b-row>
                    </div>
                </div>
                <b-collapse id="collapse-1" class="panel-collapse p-3" v-model="f_accor_is_open">
                    <div class="panel-body">
                        <b-form @submit.prevent="createObject()">
                            <b-row>
                                <b-col sm="6">
                                    <b-row class="pb-3" v-if="role == 'admin'">
                                        <b-col cols="4">Клиент</b-col>
                                        <b-col>
                                            <div>
                                                <b-form-select
                                                    v-model="object.client"
                                                    :options="options"
                                                    required
                                                ></b-form-select>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row >
                                        <b-col cols="4">Город</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <input
                                                v-model="object.city"
                                                id="input-1"
                                                required
                                                type="text"
                                                class="form-control"
                                                name="city"
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
                                                name="address"
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
                                                name="quadrature"
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
                                                name="count_floors"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row class=" time_wrap">
                                        <b-col cols="4">Время работы</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-row class="ml-0 px-0">
                                                    <div class="pb-0">
                                                        <b-input-group>
                                                            <b-input-group-prepend>
                                                                <span class="input-group-text">С</span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="object.time_from" required type="time"></b-form-input>
                                                        </b-input-group>
                                                    </div>
                                                    <div class="pl-3">
                                                        <b-input-group>
                                                            <b-input-group-prepend>
                                                                <span class="input-group-text">До</span>
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="object.time_to" required type="time"></b-form-input>
                                                        </b-input-group>
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
                                                name="fullname_responsible"
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
                                                name="phone_number_responsible"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                                                        <b-row>
                                        <b-col cols="4">E-mail сотрудника</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                v-model="object.email_employee"
                                                required
                                                type="email"
                                                name="email_employee"
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
                                                name="password"
                                                autocomplete="off"
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
                                                name="password_confirm"
                                                autocomplete="off"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>

                            </b-row>
                            <b-button type="submit" :disabled="create_btn" class="save_button mt-3">Создать</b-button>
                        </b-form>
                    </div>
                </b-collapse>
                <b-collapse id="collapse-2" class="panel-collapse p-3" v-model="s_accor_is_open">
                    <div class="panel-body d-flex justify-content-center">
                        <div>
                            <p class="">Поиск объекта по всем таблицам</p>
                            <b-row>
                                <div>
                                    <b-form-input
                                        @input="search_objects_input($event)"
                                        v-model="admin_filter_input"
                                        type="search"
                                        id="filterInput"
                                        placeholder="поиск объекта.."
                                    ></b-form-input>
                                </div>
                                <b-button class="px-4 save_button" style="text-transform: lowercase" @click="search_objects_btn()">поиск</b-button>
                            </b-row>
                        </div>
                    </div>
                </b-collapse>
            </div>
        </div>
        <div v-if="role != 'admin'">
            <div class="py-2 w-100 d-flex justify-content-between wrap__request_header_element">
                <p class="wrap__objects__container__header">ВСЕ ОБЪЕКТЫ</p>
                <div>
                    <b-form-input
                        v-model="filter__objects"
                        type="search"
                        id="filterInput"
                        placeholder="поиск по таблице.."
                    ></b-form-input>
                </div>
            </div>
            <b-table  thead-class="wrap__objects__container__table__head" empty-text="Таблица пуста" show-empty :filter="filter__objects" striped :fields="fields" :items="filtered" :table-variant="tableVariant" responsive @row-selected="onRowSelected($event)" selectable>
                <template #empty="scope">
                    <div  class="d-flex justify-content-center w-100">
                        <h6>{{ scope.emptyText }}</h6>
                    </div>
                </template>
                <template slot="top-row" slot-scope="{ fields }">
                    <td v-for="field in fields" :key="field.key">
                    <input v-model="filters[field.key]" :placeholder="field.label">
                    </td>
                </template>
            </b-table>
        </div>
        <div v-else>
            <div v-if="search_admin">
                <div class="py-2 w-100 d-flex justify-content-between wrap__request_header_element">
                    <p class="wrap__objects__container__header">ВСЕ ОБЪЕКТЫ</p>
                </div>
                <b-table thead-class="wrap__objects__container__table__head" empty-text="Таблица пуста" show-empty :filter="admin_filter_table" striped :fields="fields_admin" :items="admin_filtered" :table-variant="tableVariant" responsive @row-selected="onRowSelected($event)" selectable>
                    <template #empty="scope">
                        <div  class="d-flex justify-content-center w-100">
                            <h6>{{ scope.emptyText }}</h6>
                        </div>
                    </template>
                </b-table>
            </div>
            <div v-else v-for="(item, idx) in admin_items" :key="idx">
                <div class="py-2 w-100 d-flex justify-content-between wrap__request_header_element">
                    <p>Компания: <strong>{{item[0].company_name}}</strong></p>
                </div>
                <b-table hover thead-class="wrap__objects__container__table__head" empty-text="Таблица пуста" show-empty striped :fields="fields_admin" :items="item" :table-variant="tableVariant" responsive @row-selected="onRowSelected($event)" selectable>
                    <template #empty="scope">
                        <div  class="d-flex justify-content-center w-100">
                            <h6>{{ scope.emptyText }}</h6>
                        </div>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "~/utils/api";
export default {
    data () {
        return {
            tableVariant: 'light',
            create_btn: false,
            items: [],
            filters: {
                city: '',
                address: '',
                quadrature: '',
                count_floors: '',
                fullname_responsible: '',
                phone_number_responsible: '',
                email_employee: ''
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
            options: [],

            f_accor_is_open: false,
            s_accor_is_open: false,
            filter__objects: null,
            first_accor_is_open: false,
            second_accor_is_open: false,
            role: null,

            object: {
                client: null,
                city: null,
                address: null,
                quadrature: null,
                count_floors: null,
                date: null, 
                time_from: null,
                time_to: null,
                fullname_responsible: null,
                phone_number_responsible: null, 
                email_employee: null,
                password: null,
                password_confirm: null,
                id: null
            },
            
            fields_admin: [
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
                    key: 'amount_requests',
                    label: 'Количество заявок',
                    sortable: true
                },

                {
                    key: 'last_name',
                    label: 'Фамилия сотрудника',
                    sortable: true
                },

                {
                    key: 'phone_number_responsible',
                    label: 'Телефон'
                },
            ],
            admin_items: [],

            search_admin: false,
            search_admin_items: [],
            admin_filter_input: null,
            admin_filter_table: null,

        }
    },
    mounted(){
        this.role = localStorage.getItem('role');
        this.getObjects();
        this.getCLientsForCreateObject();
    },
    computed: {
        filtered () {
            if(this.items.length > 0){
                const filtered = this.items.filter(item => {
                    return Object.keys(this.filters).every(key =>
                        String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase()))
                })
                return filtered.length > 0 ? filtered : [{
                    id: '',
                }]
            }
        },
        admin_filtered(){
            const filtered = this.search_admin_items.filter(item => {
                return Object.keys(this.filters).every(key =>
                    String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase()))
            })
            return filtered.length > 0 ? filtered : [{
                id: '',
            }]
        }
    },
    methods: {
        getCLientsForCreateObject(){
            Api.getInstance().objects.getCLientsForCreateObject(localStorage.getItem('role')).then((response) => {
                this.options = response.data.ClientsStore;
            }).catch((err)=>{
                console.log(err)
            })
        },
        createObject(){
            if(this.object.password == this.object.password_confirm){
                let storeStr = this.object.fullname_responsible.trim().split(" ").length;
                if(storeStr >= 2){
                    if(storeStr > 3){
                        this.$bvToast.toast("В поле ФИО, вводите только - Имя, Фамилия и Отчество", {
                            title: `Ошибка валидации`,
                            variant: "danger",
                            solid: true,
                        });
                    }else{
                        this.create_btn = true;
                        Api.getInstance().objects.createDataObject(this.object).then((response) => {
                            this.time_from_flag = null;
                            this.time_to_flag = null;
                            this.$bvToast.toast("Объект успешно добавлен!", {
                                title: `Сообщение:`,
                                variant: "success",
                                solid: true,
                            })
                            this.items.unshift(response.data.ObjectData);
                            this.f_accor_is_open = false;
                            this.create_btn = false;
                            this.object = {}
                            if(this.role="admin"){
                                setTimeout(()=>{window.location.reload(true)}, 1000)
                            }
                        }).catch((error)=>{
                            this.$bvToast.toast("Данный объект уже существует.", {
                                title: `Ошибка аутентификации`,
                                variant: "danger",
                                solid: true,
                            });
                        })
                    }
                }else{
                    this.$bvToast.toast("В поле ФИО, обязательны - Имя и Фамилия", {
                        title: `Ошибка валидации`,
                        variant: "danger",
                        solid: true,
                    });
                }
            }else{
                this.$bvToast.toast("Введенные вами пароли не совпадают.", {
                    title: `Ошибка аутентификации`,
                    variant: "danger",
                    solid: true,
                });
            }
        },
        getObjects() {
            Api.getInstance().objects.getObjects(localStorage.getItem('role')).then((response) => {
                    if(localStorage.getItem('role') == 'admin'){
                        this.admin_items = response.data.ObjectsStore.reverse()
                        for(let idx of this.admin_items){
                            for(let ido of idx){
                                ido.last_name = ido.fullname_responsible.split(" ")[0]
                            }
                        }
                    }else{
                        if(response.data.ObjectsStore.length > 0){
                            this.items = response.data.ObjectsStore.reverse()
                            console.log(this.items)
                        }
                    }
                })
                .catch((error) => {
                    console.log('getObjects-> ', error)
                    this.$bvToast.toast("Системная ошибка", {
                        title: `Предупреждение!`,
                        variant: "danger",
                        solid: true,
                    });
                    // localStorage.removeItem('strjwt');
                    // localStorage.removeItem('role');
                    // localStorage.removeItem('idecur');
                    // setTimeout(()=>{this.$router.push('/account/login')}, 1000)
                });
        },
        onRowSelected(picked) {
            this.$router.push("/objects/" + picked[0].id)
        },
        search_objects_btn(){
            this.search_admin_items = [];
            this.admin_filter_table = this.admin_filter_input;
            if(this.admin_filter_input){
                this.search_admin = true;
                for(let a_i of this.admin_items){
                    for(let a_i_items of a_i){
                        this.search_admin_items.push(a_i_items)
                    }
                }
            }

        },
        search_objects_input(str){
            if(str == ''){
                this.search_admin = false;
            }
        }
    }
}
</script>

<style>
.wrap__objects__container {
     width: 100%;
     font-size: calc(8px + 6 * (100vw / 1366));
}
.panel-title{
    font-size: calc(6px + 6 * (100vw / 1366));
}

 .wrap__objects__container__table__head, .wrap__objects__container .theme-panel .panel-heading , .wrap__objects__container .save_button {
    background-color: #2F343E;
    color: white;
 }

 .wrap__objects__container__header {
     text-transform: uppercase;
 }

.wrap__objects__container .input-group-text{
    padding: 0 10px 0 10px !important
}
.wrap__objects__container .custom-select {
    border-radius: 0 !important;
}
.wrap__objects__container .input-group-text {
    font-size: smaller !important;
    border-radius: 0 !important;
}
.wrap__objects__container .input-group-text{
    padding: 0 10px 0 10px !important
}
@media (max-width: 1035px) {
    .wrap__objects__container .input-group-text {
        font-size: inherit !important;
    }
    .wrap__objects__container .time_wrap .pl-3{
        padding-left: 0 !important;
    }
    .wrap__objects__container .time_wrap .pb-0{
        padding-bottom: 15px !important;
    }
}
</style>