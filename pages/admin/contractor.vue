<template>
    <b-row class="wrap__contractor__container py-2 px-0 mx-0 ">
        <b-col class="ml-md-auto p-3 wrap__contractor_container__contacts__block">
            <b-card header="Контакты" class="wrap__contractor_container__contacts__block__card">
                <b-row>
                    <b-col cols="4">Название организации</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Название организации" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Юридический адрес</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Фактический адрес</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Банк получателя</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">БИК</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Рассчетный счет</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Кор.счет</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ОГРНИП</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ИНН</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4"></b-col>
                    <b-col class="wrap__contractor_container__contacts__block__card__grey__text">Все бухгалтерские документы и отчетности отправлять на этот адрес</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Контур</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой бухгалтерский документ</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-button class="wrap__contractor_container__contacts__block__card__button mt-3 mr-1">Сохранить в PDF</b-button>
                <b-button @click="edit_btn_event()" class="mt-3" style="background-color: #0C2947; border:none; font-size: calc(8px + 6 * (100vw / 1366));">{{edit_btn_title}}</b-button>
            </b-card>
        </b-col>

        <b-col class="ml-md-auto p-3">
            <b-card header="Личные данные" class="wrap__contractor_container__personaldata__card mb-3">
                <b-row>
                    <b-col cols="4">Генеральный директор</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Название организации" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Главный бухгалтер</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой сотрудник</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Телефон</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">E-mail</b-col>
                    <b-col>
                        <div>
                            <input required :readonly="client_input_rdnl" class="form-control" placeholder="Тексттексттекст" type="text"/>
                        </div>
                    </b-col>
                </b-row>
            </b-card>

            <b-card header="Список услуг" class="wrap__contractor_container__services__card">
                <b-row>
                    <b-col>
                        <span>1. Техническое управление и диспетчеризация зданий и сооружений</span>
                        <font-awesome-icon icon="question-circle" id="service__1" class="ml-2"/>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>
                        <span>2. Техническое обслуживание инженерных систем</span>
                        <font-awesome-icon icon="question-circle" id="service__2" class="ml-2"/>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>
                        <span>3. Клининговое обслуживание</span>
                        <font-awesome-icon icon="question-circle" id="service__3" class="ml-2"/>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>
                        <span>4. Специализированные услуги клининга</span>
                        <font-awesome-icon icon="question-circle" id="service__4" class="ml-2"/>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>
                        <span>5. Санитарная и антибактериальная обработка</span>
                        <font-awesome-icon icon="question-circle" id="service__5" class="ml-2"/>
                    </b-col>
                </b-row>    
            </b-card>

            <b-popover target="service__1" triggers="hover" placement="top">
                <p>- Представление интересов заказчика в городских службах и взаимодействие 
                    с арендодателями и контролирующими органами</p>
                <p>- Управление подрядными организациями</p>
                <p>- Контроль использования ресурсов (вода, электроэнергия, газ)</p>
                <p>- Анализ состояния инженерных систем</p>
                <p>- Подготовка отчетов о проделанной работе</p>
                <p>- Ведение технической, исполнительной, нормативно-эксплуатационной документации</p>
                <p>- Контроль соблюдения эксплуатационных норм</p>
            </b-popover>

            <b-popover target="service__2" triggers="hover" placement="top">
                <p>- Плановое техническое обслуживание инженерных систем (ППР, регламентные работы)</p>
                <p>- Сервисное обслуживание (мелкий ремонт, устранение неисправностей)</p>
                <p>- Локализация и устранение аварийных ситуаций</p>
                <p>- Ремонтно-строительные и отделочные работы</p>
                <p>- Капитальный ремонт и модернизация инженерного оборудования</p>
            </b-popover>

            <b-popover target="service__3" triggers="hover" placement="top">
                <p>- Ежедневная комплексная и поддерживающая уборка помещений</p>
                <p>- Уборка прилегающей территории</p>
                <p>- Генеральная и послестроительная уборка помещений</p>
                <p>- Вывоз мусора и утилизация опасных отходов</p>
            </b-popover>

            <b-popover target="service__4" triggers="hover" placement="top">
                <p>- Химчистка ковров и мягкой мебели</p>
                <p>- Шлифовка, полировка каменных полов</p>
                <p>- Кристаллизация поверхности каменных напольных покрытий</p>
                <p>- Глубокая очистка твердых напольных покрытий</p>
            </b-popover>

            <b-popover target="service__5" triggers="hover" placement="top">
                <p>- Аэрозольная дезинфекция помещений методом «холодный туман»</p>
                <p>- УФ-обработка (кварцевание) помещений</p>
                <p>- Озонирование помещений</p>
                <p>- Дезинсекция и дератизация помещений</p>
                <p>- Дезодорация и антибактериальная обработка</p>
            </b-popover>   
        </b-col>
    </b-row>
</template>

<script>
export default {
    data: () => ({
        client_input_rdnl: true,
        edit_btn_title: "Редактировать",
    }),

    methods: {
        edit_btn_event(){
            let saveButton = document.querySelector(".wrap__contractor_container__contacts__block__card__button");
            if(this.edit_btn_title == "Редактировать"){
                this.edit_btn_title = "Сохранить";
                this.client_input_rdnl = false;
                saveButton.style.display = "none";
            }else{
                this.edit_btn_title = "Редактировать";
                this.client_input_rdnl = true;
                saveButton.style.display = "inline";
            }
        }
    }
}
</script>

<style scoped>
.popover {
    max-width: 500px !important;
    font-size: calc(8px + 6 * (100vw / 1366));
}
.wrap__contractor__container{
  width: 100%;
}

.wrap__contractor_container__contacts__block__card, .wrap__contractor_container__personaldata__card, .wrap__contractor_container__services__card {
    font-size: calc(8px + 6 * (100vw / 1366));
}

.card-header{
  text-transform: uppercase;
}

 .wrap__contractor_container__contacts__block__card__grey__text {
    color: rgba(0, 0, 0, 0.5);
 }

 .wrap__contractor_container__contacts__block__card__button {
     background-color: #FFC221; 
     color:black; border: 0px; 
     font-size: calc(8px + 6 * (100vw / 1366));
 }


@media (max-width: 1035px) {
    .wrap__contractor__container {
        display: flex;
        justify-content: start;
        flex-direction: column;
        padding-bottom: 100px !important;
    }

    .popover {
        max-width: 70vw !important;
    }
}

</style>