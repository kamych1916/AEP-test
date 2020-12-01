<template>
    <div class="wrap__clients__container w-100 p-3">
        <div class="py-2 w-100 d-flex justify-content-between wrap__request_header_element">
            <p>ВСЕ КЛИЕНТЫ</p>
            <b-row class="d-flex justify-content-between pr-3">
                <div class="px-3">
                    <b-form-input
                        v-model="filter__clients"
                        type="search"
                        id="filterInput"
                        placeholder="поиск по таблице.."
                    ></b-form-input>
                </div>
                <b-button @click="$router.push('/clients/create-client')" size="sm" class="btn_warning px-2" style="background-color: #FFC221; border: 0px; color: black; font-size: calc(8px + 6 * (100vw / 1366));">Завести клиента</b-button>
            </b-row>
        </div>
        <b-table :filter="filter__clients" show-empty empty-text="Таблица пуста" thead-class=" wrap__clients__container__table__head" @row-selected="onRowSelected($event)" table-variant="light" selectable striped :fields="fields" :items="filtered" responsive>
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
</template>

<script>
import Api from "~/utils/api";
export default {
    data() {
        return {
            tableVariant: 'light',
            filter__clients: null,
            
            filters: {
                username: '',
                company_site: '',
                position: '',
                phone_number: '',
                email: '',
            },
            fields: [
                {
                    key: 'username',
                    label: 'ФИО',
                    sortable: true
                },
                {
                    key: 'company_site',
                    label: 'Сайт',
                    sortable: true
                },

                {
                    key: 'company_name',
                    label: 'Компания',
                    sortable: true
                },

                {
                    key: 'phone_number',
                    label: 'Телефон менеджера',
                },

                {
                    key: 'email',
                    label: 'E-mail',
                },
                
            ],

            items: [],

        }
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
        }
    },
    mounted(){
        this.getCLients()
    },
    methods: {
        getCLients(){
            Api.getInstance().client.getCLients(localStorage.getItem('role')).then((response) => {
                    this.items = response.data.ClientsStore.reverse()
                })
                .catch((error) => {
                    console.log('getCLients -> ', error)
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
            this.$router.push("/clients/" + picked[0].id)
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
.wrap__clients__container .form-control {
    height: calc(1.9em + 0.75rem + 2px);
}

@media (max-width: 1035px) {
    .wrap__request_header_element{
        flex-direction: column;
    }
}

</style>