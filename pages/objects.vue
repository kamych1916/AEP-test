<template>
    <div class="wrap__objects__container mx-3 my-3">
        <div class="panel-group theme-panel">
            <div class="panel panel-default">
                <div class="panel-heading w-100 bg-dark text-light" v-b-toggle.collapse-2 @click="first_accor_is_open=!first_accor_is_open">
                    <b-row class="d-flex justify-content-between px-3">
                        <h4 class="panel-title">
                            Simple Form - Gray
                        </h4>
                        <h4 class="panel-title">
                            <font-awesome-icon v-if="first_accor_is_open" :icon="['fas', 'arrow-down']"/>
                            <font-awesome-icon v-else :icon="['fas', 'arrow-up']"/>
                        </h4>
                    </b-row>
                </div>
                <b-collapse id="collapse-2" class="panel-collapse">
                    <div class="panel-body">
                        <b-form class="form-theme form-grey">
                            <b-row>
                                <b-col sm="6">
                                <b-form-group label="First name" label-for="input-1">
                                    <b-form-input
                                    id="input-1"
                                    type="text"
                                    name="firstName"
                                    ></b-form-input>
                                </b-form-group>
                                </b-col>
                                <b-col sm="6">
                                <b-form-group label="Last name" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    type="text"
                                    name="lastName"
                                    ></b-form-input>
                                </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                <b-form-group label="Message" label-for="input-3">
                                    <b-form-textarea
                                    class="form-text-area"
                                    ></b-form-textarea>
                                </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                <b-button
                                    type="submit"
                                    class="btn btn-theme form-submit"
                                    >Submit</b-button
                                >
                                </b-col>
                            </b-row>
                        </b-form>
                    </div>
                </b-collapse>
            </div>
        </div>
        <p class="wrap__objects__container__header">Все объекты</p>
        <b-table thead-class="wrap__objects__container__table__head" :fields="fields" :items="items" :table-variant="tableVariant"></b-table>
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
                    city: 'Набережные Челны',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '30 кв.м.',
                    floors: '1',
                    last_name: 'Панкратов-Черный',
                    phone: '+7 (999) 666 7373',
                    email: 'e-mail@aepgroup'
                },

                {
                    city: 'Санкт-Петербург',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                    area: '15 кв.м.',
                    floors: '9',
                    last_name: 'Панкратов-Белый',
                    phone: '+7 (915) 666 7373',
                    email: 'e-mail@aepgroup'
                }
            ],

            tableVariant: 'light'
        }
    }
}
</script>

<style>
 .wrap__objects__container {
     width: 100%;
 }

 .wrap__objects__container__table__head {
    background-color: #2F343E;
    color: white;
 }

 .wrap__objects__container__header {
     text-transform: uppercase;
 }

</style>