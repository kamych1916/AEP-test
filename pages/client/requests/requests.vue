<template>
    <div class="wrap__objects__container w-100 p-3">
        <div class="panel-group ">
            <div class="panel panel-default">
                <div class="panel-heading p-2 bg-dark w-100 text-light" v-b-toggle.collapse-2 @click="first_accor_is_open=!first_accor_is_open">
                    <b-row class="d-flex justify-content-between px-3">
                        <h4 class="panel-title">
                            заявки какого объекта вы хотите увидеть ? 
                        </h4>
                        <h4 class="panel-title">
                            <font-awesome-icon v-if="first_accor_is_open" :icon="['fas', 'arrow-up']"/>
                            <font-awesome-icon v-else :icon="['fas', 'arrow-down']"/>
                        </h4>
                    </b-row>
                </div>
                <b-collapse id="collapse-2" class="panel-collapse">
                    <div class="panel-body p-1">
                        <b-row cols="6" class="wrap__streets__container">
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col>
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col> 
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col>
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col>
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col> 
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col>
                            <b-col class="py-2">
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col>
                            <b-col class="py-2"> 
                                <div style="width: 200px; height: 70px" class="bg-light d-flex justify-content-center align-items-center">
                                    Column
                                </div>
                            </b-col> 
                        </b-row>
                    </div>
                </b-collapse>
            </div>
        </div>
        
        <div class="py-2 w-100 d-flex justify-content-between">
            <p>Все заявки</p>
            <b-button @click="$router.push('/client/create-request')" size="sm" style="background-color: #FFC221; border: 0px; color: black">Новая заявка</b-button>
        </div>
        <b-table thead-class="bg-dark text-light" striped :fields="fields" :items="items" responsive>
            <template #cell(status)>
                <b-button disabled size="sm" variant="success">Активно</b-button>
            </template>
        </b-table>
                    

    </div>
</template>

<script>
export default {
  data () {
    return {
        first_accor_is_open: false,
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
                key: 'executor',
                label: 'Объект',
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
                date: '30.06.2020 (13:20)',
                number: '000003',
                executor: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А',
                short_description: 'Клининг',
                desription: 'Описание'
            }
        ],

    }
  },
    
}
</script>

<style scoped>
.wrap__objects__container, .panel-title{
  font-size: calc(8px + 6 * (100vw / 1366));
}
@media (max-width: 1035px) {
    .wrap__streets__container{
      width: 100%;
      justify-content: start;
      flex-direction: column;
      padding-bottom: 100px !important;
    }
}
</style>