<template>
    <div class="wrap__request__container w-100 p-3">
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Все заявки</p>
            <b-button @click="$router.push('/admin/requests/create-request')" size="sm" style="background-color: #FFC221; border: 0px; color: black; font-size: calc(8px + 6 * (100vw / 1366));">Новая заявка</b-button>
        </div>
        <b-table thead-class=" wrap__requests__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="items" responsive>
            <template #cell(status)>
                <b-button disabled size="sm" variant="success">Активно</b-button>
            </template>
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
                    key: 'date',
                    label: 'Дата создания заявки',
                    sortable: true
                },

                {
                    key: 'number',
                    label: 'Номер заявки',
                    sortable: true
                },

                {
                    key: 'status',
                    label: 'Статус',
                    sortable: true
                },

                {
                    key: 'client',
                    label: 'Клиент',
                    sortable: true
                },

                {
                    key: 'short_description',
                    label: 'Краткое описание',
                    sortable: true
                },

                {
                    key: 'desription',
                    label: 'Описание'
                }
            ],

            items: [
                {
                    id: 1,
                    date: '30.06.2020 (13:20)',
                    number: '000003',
                    client: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А',
                    short_description: 'Клининг',
                    desription: 'Описание'
                }
            ],

        }
    }
}
</script>

<style>
.wrap__request__container {
  font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__requests__container__table__head {
    background-color: #2F343E !important;
    color: white;
}

</style>