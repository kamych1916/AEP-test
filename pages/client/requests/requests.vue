<template>
    <div class="wrap__request__container w-100 p-3"> 
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Все заявки</p>
            <b-button @click="$router.push('/client/requests/create-request')" size="sm" class="btn_warning">Новая заявка</b-button>
        </div>
        <b-table thead-class=" wrap__requests__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="items" responsive>
            <template #cell(status)="row">
                <b-button v-if="row.item.status == 1" size="sm" variant="success">Активно</b-button>
                <b-button v-if="row.item.status == 2" size="sm" variant="danger">Заморожено</b-button>
                <b-button v-if="row.item.status == 3" size="sm" class="btn_warning">На согласовании</b-button>
            </template>
        </b-table> 

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
        tableVariant: 'light',
        fields: [
            {
                key: 'date_creating',
                label: 'Дата создания заявки',
                sortable: true
            },

            {
                key: 'name',
                label: 'Номер заявки',
                sortable: true
            },

            {
                key: 'status',
                label: 'Статус',
                sortable: true
            },

            {
                key: 'object_address',
                label: 'Объект',
                sortable: true
            },

            {
                key: 'problem',
                label: 'Краткое описание'
            }
        ],

        items: [],

    }
  },
  mounted(){
      this.getRequests()
  },
  methods: {
    getRequests(){
        Api.getInstance().requests.getRequests('client').then((response) => {
                this.items = response.data.RequestsStore
                console.log(this.items)
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
        this.$router.push("/client/requests/" + picked[0].id)
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
.wrap__request__container .btn_warning{
    background-color: #FFC221; border: 0px; color: black !important
}
@media (max-width: 1035px) {
    .wrap__streets__container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      
    }
}
</style>