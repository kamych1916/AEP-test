<template>
    <b-row class="wrap__contractor_container py-2 px-0 mx-0 ">
        <b-col class="ml-md-auto p-3 wrap__contractor_container__contacts__block">
            <b-card header="Контакты" class="wrap__contractor_container__contacts__block__card">
                <b-row>
                    <b-col cols="4">Навание организации</b-col>
                    <b-col>Навание организации</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Юридический адрес</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Фактический адрес</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Банк получателя</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">БИК</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Рассчетный счет</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Кор.счет</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ОГРНИП</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">ИНН</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4"></b-col>
                    <b-col class="wrap__contractor_container__contacts__block__card__grey__text">Все бухгалтерские документы и отчетности отправлять на этот адрес</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Контур</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой бухгалтерский документ</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-button class="wrap__contractor_container__contacts__block__card__button mt-3">Скачать в PDF</b-button>
            </b-card>
        </b-col>

        <b-col class="ml-md-auto p-3">
            <b-card header="Личные данные" class="wrap__contractor_container__personaldata__card mb-3">
                <b-row>
                    <b-col cols="4">Генеральный директор</b-col>
                    <b-col>Название организации</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Главный бухгалтер</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Другой сотрудник</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">Телефон</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col cols="4">E-mail</b-col>
                    <b-col>Тексттексттекст</b-col>
                </b-row>
            </b-card>

            <b-card header="Список услуг" class="wrap__contractor_container__services__card">
                <b-row>
                    <b-col>1. Техническое управление и диспетчеризация зданий и сооружений</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>2. Техническое обслуживание инженерных систем</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>3. Клининговое обслуживание</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>4. Специализированные услуги клининга</b-col>
                </b-row>
                <b-row class="pt-3">
                    <b-col>5. Санитарная и антибактериальная обработка</b-col>
                </b-row>    
            </b-card>
        </b-col>
    </b-row>
</template>

<style scoped>
.wrap__contractor_container{
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
    .wrap__contractor_container {
        display: flex;
        justify-content: start;
        flex-direction: column;
        padding-bottom: 100px !important;
    }
}

</style>