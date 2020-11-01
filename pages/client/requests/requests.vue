<template>
    <div class="wrap__request__container w-100 p-3"> 
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Все заявки</p>
            <b-button @click="$router.push('/client/requests/create-request')" size="sm" style="background-color: #FFC221; border: 0px; color: black">Новая заявка</b-button>
        </div>
        <b-table thead-class=" wrap__requests__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="items" responsive>
            <template #cell(status)>
                <b-button disabled size="sm" variant="success">Активно</b-button>
            </template>
        </b-table> 

    </div>
</template>

<script>
import Api from "~/utils/api";
export default {
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

        items: [
            {
                id: 1,
                date: '30.06.2020 (13:20)',
                number: '000003',
                executor: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А',
                short_description: 'Клининг',
                desription: 'Описание'
            }
        ],

    }
  },
  mounted(){
      this.getRequests()
  },
  methods: {
    getRequests(){
        Api.getInstance().requests.getRequests('client').then((response) => {
                this.items = response.data.RequestsStore
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
@media (max-width: 1035px) {
    .wrap__streets__container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      
    }
}
</style>