<template>
    <div class="wrap__request__container w-100 p-3"> 
        <div class="py-2 w-100 d-flex justify-content-between wrap__request_header_element">
            <p>ВСЕ ЗАЯВКИ</p>
            <b-row class="d-flex justify-content-between pr-3">
                <div class="px-3">
                    <b-form-input
                        v-model="filter__requests"
                        type="search"
                        id="filterInput"
                        placeholder="поиск по таблице.."
                    ></b-form-input>
                </div>
                <b-button @click="$router.push('/client/requests/create-request')" size="sm" class="btn_warning px-3">Новая заявка</b-button>
            </b-row>
        </div>
        <b-table :filter="filter__requests" thead-class=" wrap__requests__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="filtered" responsive>
            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                <input v-model="filters[field.key]" :placeholder="field.label">
                </td>
            </template>
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
        filter__requests: null,
        tableVariant: 'light',
        filters: {
            date_creating: '',
            name: '',
            status: '',
            object_address: '',
            problem: ''
        },
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
    computed: {
        filtered () {
            const filtered = this.items.filter(item => {
                return Object.keys(this.filters).every(key =>
                    String(item[key]).includes(this.filters[key]))
            })
            return filtered.length > 0 ? filtered : [{
                id: '',
                issuedBy: '',
                issuedTo: ''
            }]
        }
    },
  methods: {
    getRequests(){
        Api.getInstance().requests.getRequests('client').then((response) => {
                this.items = response.data.RequestsStore.reverse()
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
.wrap__request__container .form-control {
    height: calc(1.9em + 0.75rem + 2px);
}

@media (max-width: 1035px) {
    .wrap__request_header_element{
        flex-direction: column;
    }
    .wrap__streets__container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      
    }
}
</style>