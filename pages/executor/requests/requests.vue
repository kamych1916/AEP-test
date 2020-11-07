<template>
    <div class="wrap__request__container w-100 p-3">  
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Ул. Маршала Жукова, 13</p>
            <b-button @click="$router.push('/executor/requests/create-request')" size="sm" style="background-color: #FFC221; border: 0px; color: black">Новая заявка</b-button>
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
  methods: {
    onRowSelected(picked) {
        this.$router.push("/executor/requests/" + picked[0].id)
    }
  },
  data () {
    return {
        first_accor_is_open: false,
        tableVariant: 'light',
        fields: [
            {
                key: 'date',
                label: 'Дата и время создания',
                sortable: true
            },

            {
                key: 'problem',
                label: 'Проблема',
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

        ],

        items: [
            {
                id: 1,
                date: '30.06.2020 (13:20)',
                number: '000003',
                problem: 'Поменять трубы'
            }
        ],

    }
  },
    
}
</script>

<style>
.wrap__request__container, .panel-heading{
  font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__requests__container__table__head, .wrap__request__container .theme-panel .panel-heading {
    background-color: #2F343E !important;
    color: white;
}
.wrap__request__container .theme-panel .panel{
    background-color: unset !important;
}
@media (max-width: 1035px) {
    .wrap__streets__container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      
    }
}
</style>