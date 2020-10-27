<template>
    <div class="wrap__objects__container p-3">
        <div class="panel-group theme-panel">
            <div class="panel panel-default">
                <div class="panel-heading w-100 text-light" v-b-toggle.collapse-2 @click="first_accor_is_open=!first_accor_is_open">
                    <b-row class="d-flex justify-content-between px-3">
                        <h4 class="panel-title">
                            Создание объекта
                        </h4>
                        <h4 class="panel-title">
                            <font-awesome-icon v-if="first_accor_is_open" :icon="['fas', 'arrow-down']"/>
                            <font-awesome-icon v-else :icon="['fas', 'arrow-up']"/>
                        </h4>
                    </b-row>
                </div>
                <b-collapse id="collapse-2" class="panel-collapse">
                    <div class="panel-body">
                        <b-form>
                            <b-row>
                                <b-col sm="6">
                                    <b-row>
                                        <b-col cols="4">Город</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <input
                                                id="input-1"
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
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Время работы</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">ФИО ответственного</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
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
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Придумайте пароль</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col cols="4">Подтвердите пароль</b-col>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                type="text"
                                                ></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-button class="save_button mt-3">Создать</b-button>
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
export default {
    data () {
        return {
            first_accor_is_open: false,
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
                    key: 'area',
                    label: 'Квадратура',
                    sortable: true
                },

                {
                    key: 'floors',
                    label: 'Этажность',
                    sortable: true
                },

                {
                    key: 'last_name',
                    label: 'Фамилия сотрудника',
                    sortable: true
                },

                {
                    key: 'phone',
                    label: 'Телефон'
                },

                {
                    key: 'email',
                    label: 'E-mail'
                }
            ],

            items: [
                {
                    id: 1,
                    city: 'Набережные Челны',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '30 кв.м.',
                    floors: '1',
                    last_name: 'Панкратов-Черный',
                    phone: '+7 (999) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    id: 2,
                    city: 'Санкт-Петербург',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '15 кв.м.',
                    floors: '9',
                    last_name: 'Панкратов-Белый',
                    phone: '+7 (915) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    id: 3,
                    city: 'Набережные Челны',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '30 кв.м.',
                    floors: '1',
                    last_name: 'Панкратов-Черный',
                    phone: '+7 (999) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    id: 4,
                    city: 'Санкт-Петербург',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '15 кв.м.',
                    floors: '9',
                    last_name: 'Панкратов-Белый',
                    phone: '+7 (915) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    id: 5,
                    city: 'Набережные Челны',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '30 кв.м.',
                    floors: '1',
                    last_name: 'Панкратов-Черный',
                    phone: '+7 (999) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    id: 6,
                    city: 'Санкт-Петербург',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '15 кв.м.',
                    floors: '9',
                    last_name: 'Панкратов-Белый',
                    phone: '+7 (915) 666 7373',
                    email: 'e-mail@aepgroup'
                },



            ],

            tableVariant: 'light'
        }
    },

    methods: {
        onRowSelected(picked) {
            this.$router.push("/client/objects/" + picked[0].id)
        }
    }
}
</script>

<style>
 .wrap__objects__container {
     width: 100%;
     font-size: calc(8px + 6 * (100vw / 1366));
 }

 .wrap__objects__container__table__head, .theme-panel .panel-heading , .save_button {
    background-color: #2F343E;
    color: white;
 }

 .wrap__objects__container__header {
     text-transform: uppercase;
 }
</style>