<template>
    <div class="wrap__clients__container w-100 p-3">
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Все клиенты</p>
            <b-button @click="$router.push('/admin/clients/create-client')" size="sm" style="background-color: #FFC221; border: 0px; color: black; font-size: calc(8px + 6 * (100vw / 1366));">Завести клиента</b-button>
        </div>
        <b-table thead-class=" wrap__clients__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="items" responsive>
        </b-table> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableVariant: 'light',
            fields: [
                {
                    key: 'name',
                    label: 'Название',
                    sortable: true
                },

                {
                    key: 'address',
                    label: 'Адрес',
                    sortable: true
                },

                {
                    key: 'site',
                    label: 'Сайт',
                    sortable: true
                },

                {
                    key: 'manager',
                    label: 'Старший менеджер',
                    sortable: true
                },

                {
                    key: 'phone',
                    label: 'Телефон менеджера',
                },

                {
                    key: 'email',
                    label: 'E-mail',
                },
                
            ],

            items: [
                {
                    id: 1,
                    name: 'Клиент',
                    address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А',
                    site: 'www',
                    manager: 'Панкратов-Черный',
                    phone: '+7 999 775 77 77',
                    email: 'e-mail'
                }
            ],

        }
    },

    methods: {
        onRowSelected(picked) {
        this.$router.push("/admin/clients/" + picked[0].id)
    }
    }
}
</script>

<style>
.wrap__clients__container {
  font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__clients__container__table__head {
    background-color: #2F343E !important;
    color: white;
}

</style>