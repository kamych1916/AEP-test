<template>
    <div class="wrap__objects__container mx-3 my-3">
        <b-collapse>
            
        </b-collapse>
        <p class="wrap__objects__container__header">Все объекты</p>
        <b-table thead-class="wrap__objects__container__table__head" :fields="fields" :items="items" :table-variant="tableVariant"></b-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
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