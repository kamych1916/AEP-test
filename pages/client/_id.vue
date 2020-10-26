<template>
        <b-row class="wrap__objects__element__container py-2 px-0 mx-0 ">
            <b-col class="ml-md-auto p-3">
                <div class="wrap__objects__element__container__header">
                    <p>Карточка объекта</p>
                    <div>
                        <nuxt-link to="/client/objects"><b-button style="background-color:#E5E5E5; color:black;">Вернуться к списку объектов</b-button></nuxt-link>
                        <b-button style="background-color: #FFC221; border: 1px #FFC221 solid; color:black">Новая заявка</b-button>
                    </div>
                </div>
                <b-card header="Название">
                    <b-row>
                        <b-col cols="6">
                            <b-row>
                                <b-col cols="4">Город</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Адрес</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Квадратура</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Количество этажей</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Время работы</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">ФИО ответственного</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Телефон ответственного</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">E-mail ответственного</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>

                        <b-col cols="6">
                            <b-row>
                                <b-col cols="4">Придумайте логин</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Придумайте пароль</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="pt-3">
                                <b-col cols="4">Подтвердите пароль</b-col>
                                <b-col>
                                    <div>
                                        <input required :readonly="client_input_rdnl" class="form-control" type="text"/>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <div class="wrap__objects__element__container__buttons mt-2">
                        <b-button style="background-color: #0C2947; border:none;">Редактировать</b-button>
                        <b-button v-b-modal.deleteRequest style="background-color: #E84242; border:none;">Удалить</b-button>
                    </div>

                    <b-modal id="deleteRequest" size="lg" centered style="text-align: center;">
                        <template v-slot:modal-header>
                            <p></p>
                        </template>
                        <div class="wrap__objects__element__container__modal__text">
                            <p>Вы действительно хотите удалить этот объект?</p>
                            <div style="display: flex; justify-content: center;">
                                <p class="mr-2" style="color: #E84242; cursor: pointer;">Удалить</p>
                                <p style="color: #00D1A1; cursor: pointer;" @click="$bvModal.hide('deleteRequest')">Отмена</p>
                            </div>
                        </div>
                        <template v-slot:modal-footer>
                            <p></p>
                        </template>
                    </b-modal>
                </b-card>
            </b-col>
        </b-row>
</template>

<script>
export default {
    data: () => ({
        client_input_rdnl: true
    }),
}
</script>

<style>
.wrap__objects__element__container, .wrap__objects__element__container__buttons, .wrap__objects__element__container__header  {
    width: 100%;
}

.wrap__objects__element__container__buttons, .wrap__objects__element__container__header {
    display: flex;
    justify-content: space-between;
}

.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

.wrap__objects__element__container__modal__text {
    text-align: center;
}

</style>