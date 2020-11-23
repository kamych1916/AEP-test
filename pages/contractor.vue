<template>
    <b-row class="wrap__contractor__container py-2 px-0 mx-0 ">
        <b-col class="ml-md-auto p-3 wrap__contractor_container__contacts__block">
            <b-card header="Контакты" class="wrap__contractor_container__contacts__block__card">
                <b-row>
                    <b-col cols="4">Название организации</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.name_organization" required :readonly="client_input_rdnl" class="form-control" type="text"/>
                        </div>
                        <p v-else>{{contractor.name_organization}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Юридический адрес</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.legal_address" required :readonly="client_input_rdnl" class="form-control" type="text"/>
                        </div>
                        <p v-else>{{contractor.legal_address}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Фактический адрес</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.actual_address" required :readonly="client_input_rdnl" class="form-control" type="text"/>
                        </div>
                        <p v-else>{{contractor.actual_address}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Банк получателя</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.payees_bank" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.payees_bank}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">БИК</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.BIK" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.BIK}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Рассчетный счет</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.checking_account" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.checking_account}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Кор.счет</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.cor_account" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.cor_account}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ОГРНИП</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.OGRNIP" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.OGRNIP}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ИНН</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.INN" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.INN}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4"></b-col>
                    <b-col class="wrap__contractor_container__contacts__block__card__grey__text">Все бухгалтерские документы и отчетности отправлять на этот адрес</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Контур</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.circuit" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.circuit}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой бухгалтерский документ</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.another_document" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.another_document}}</p>
                    </b-col>
                </b-row>
                <label v-if="upload_btn_title" for="load" class="btn wrap__contractor_container__contacts__block__card__button mt-4 mr-1">загрузить в pdf</label>
                <input id="load" accept=".pdf" ref="file" @change="handleFileUpload()" type="file" name="photo" style="display: none;">
                <a v-if="download_btn_title" :href="contractor.contractor_file_url" download class="btn wrap__contractor_container__contacts__block__card__button mt-3 mr-1">Скачать в pdf</a>
                <b-button v-if="role=='admin'" @click="edit_btn_event()" class="mt-3" style="background-color: #0C2947; border:none; font-size: calc(8px + 6 * (100vw / 1366));">{{edit_btn_title}}</b-button>
            </b-card>
        </b-col>

        <b-col class="ml-md-auto p-3">
            <b-card header="Личные данные" class="wrap__contractor_container__personaldata__card mb-3">
                <b-row>
                    <b-col cols="4">Генеральный директор</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.CEO" required :readonly="client_input_rdnl" class="form-control" placeholder="Название организации" type="text"/>
                        </div>
                        <p v-else>{{contractor.CEO}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Главный бухгалтер</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.chief_accountant" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.chief_accountant}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой сотрудник</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.another_employee" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.another_employee}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Телефон</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.phone_number" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.phone_number}}</p>
                    </b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">E-mail</b-col>
                    <b-col>
                        <div v-if="role == 'admin'">
                            <input v-if="contractor" v-model="contractor.email" required :readonly="client_input_rdnl" class="form-control"  type="text"/>
                        </div>
                        <p v-else>{{contractor.email}}</p>
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
import Api from "~/utils/api";
export default {
    data: () => ({
        client_input_rdnl: true,
        edit_btn_title: "Редактировать",
        download_btn_title: true,
        upload_btn_title: false,
        contractor: [],
        role: null,
    }),
    mounted(){
        this.role = localStorage.getItem('role') 
        this.getContractorData()  
    },
    methods: {
        getContractorData(){
            Api.getInstance().contractor.getContractorData(localStorage.getItem('role'))
                .then((response) => {
                    this.contractor = response.data.ContractorData;
                    console.log(this.contractor)
                })
                .catch((error) => {
                    console.log(error)
                    this.$bvToast.toast("У вас нет доступа к данной странице", {
                        title: `Системная ошибка`,
                        variant: "danger",
                        solid: true,
                    });
                    localStorage.removeItem("strjwt");
                    localStorage.removeItem("role");
                    localStorage.removeItem("idecur");
                    setTimeout(() => { this.$router.push("/account/login");}, 1000);
                });
        },
        changeContractorData(){
            Api.getInstance().contractor.changeContractorData(localStorage.getItem('role'), this.contractor)
                .then((response) => {
                    console.log(response)
                    this.$bvToast.toast("Документ успешно сохранён!", {
                        title: `Сообщение:`,
                        variant: "success",
                        solid: true,
                    }),
                    setTimeout(()=>{window.location.reload(true)}, 1000)
                })
                .catch((error) => {
                    console.log('changeContractorData-> ', error)
                    this.$bvToast.toast("Системная ошибка", {
                        title: `Предупреждение!`,
                        variant: "danger",
                        solid: true,
                    });
                    // localStorage.removeItem("strjwt");
                    // localStorage.removeItem("role");
                    // localStorage.removeItem("idecur");
                    // setTimeout(() => { this.$router.push("/account/login");}, 1000);
                });
        },
        edit_btn_event(){
            if(this.edit_btn_title == "Редактировать"){
                this.download_btn_title = false
                this.upload_btn_title = true
                this.edit_btn_title = "Сохранить";
                this.client_input_rdnl = false;
            }else{
                this.changeContractorData()
                this.edit_btn_title = "Редактировать";
                this.client_input_rdnl = true;
            }
        },
        send_file(){
            let formatData = new FormData();
            formatData.append('file', this.file) 

            Api.getInstance().requests.uploadFile(formatData, '').then((response) => {
                // this.request.files.push(response.data.newImagesReq)
                // this.images.push(response.data.newImagesReq)
                this.contractor.contractor_file_url = response.data.newFilesReq
                console.log(this.contractor.contractor_file_url)
                this.$bvToast.toast("Файл успешно добавлен!", {
                    title: `Сообщение:`,
                    variant: "success",
                    solid: true,
                })
            })
            .catch((error, res) => {
                if(error.response.data.status == 402){
                    this.$bvToast.toast(error.response.data.message, {
                        title: `Ошибка!`,
                        variant: "danger",
                        solid: true,
                    });
                }else{
                    this.$bvToast.toast("Файл не был загружен!", {
                            title: `Ошибка аутентификации`,
                        variant: "danger",
                        solid: true,
                    });
                }
                // setTimeout(()=>{this.$router.push('/')}, 1500)
            });
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            this.send_file()
        },
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
        justify-content: flex-start;
        flex-direction: column;
        padding-bottom: 100px !important;
    }

    .popover {
        max-width: 70vw !important;
    }
}

</style>