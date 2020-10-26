<template>
    <div class="wrap__objects__container w-100 mx-3 my-3">
        <div class="panel-group ">
            <div class="panel panel-default">
                <div class="panel-heading w-100 p-1 d-flex justify-content-between" v-b-toggle.collapse-2 @click="first_accor_is_open=!first_accor_is_open">
                    <b-row class=" px-3">
                            <h4 class="panel-title">
                                заявки какого объекта вы хотите увидеть ? 
                            </h4>
                            <h4 class="panel-title pl-3">
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
        
        <div class=" w-100 d-flex justify-content-between">
            <p class="wrap__objects__container__header">Все объекты</p>
            <b-button>Новая заявка</b-button>
        </div>
        <b-table thead-class="bg-secondary text-light" :fields="fields" :items="items" :table-variant="tableVariant" responsive>
            <template #cell(status)>
                <b-button size="sm" variant="success">Активно</b-button>
            </template>
        </b-table>
                    

    </div>
</template>

<script>
export default {
  data () {
    return {
        first_accor_is_open: false,
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
                date: 'Набережные Челны',
                number: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                executor: '1',
                short_description: 'Панкратов-Черный',
                desription: '+7 (999) 666 7373'
            },

            {
                city: 'Санкт-Петербург',
                address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                area: '15 кв.м.',
                floors: '9',
                last_name: 'Панкратов-Белый',
                phone: '+7 (915) 666 7373',
                email: 'e-mail@aepgroup'
            },

            {
                city: 'Набережные Челны',
                address: 'ул. Маршала Блюхера, д. 13, стр. 30, лит. А ',
                area: '30 кв.м.',
                floors: '1',
                last_name: 'Панкратов-Черный',
                phone: '+7 (999) 666 7373',
                email: 'e-mail@aepgroup'
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