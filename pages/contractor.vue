<template>
    <b-container>
        <b-row class="contant-wrapper">
            <b-col class="contacts-wrapper mt-4">
                <div class="header">
                    <p class="header-text m-3">КОНТАКТЫ</p>
                </div>
                <b-row>
                    <b-col class="contacts-text-col mt-3 ml-3" cols="3">
                        <p>Название организации</p>
                        <p>Юридический адрес</p>
                        <p>Фактический адрес</p>
                        <p>Банк получателя</p>
                        <p>БИК</p>
                        <p>Рассчетный счет</p>
                        <p>Кор.счет</p>
                        <p>ОГРНИП</p>
                        <p>ИНН</p>
                    </b-col>
                    <b-col class="contacts-text-col mt-3">
                        <p>Название организации</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                        <p class="grey-text">Все бухгалтерские документы и отчетности отправлять на этот адрес</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="contacts-text-col mt-3 ml-3" cols="3">
                        <p>Контур</p>
                        <p>Другой бухгалтерский кабинет</p>
                    </b-col>
                    <b-col class="contacts-text-col">
                        <p>Тексттексттекст</p>
                        <p>Тексттексттекст</p>
                    </b-col>
                </b-row>
                <b-button squared class="button ml-3 mb-3">Скачать в PDF</b-button>
            </b-col>

            <b-col class="mt-4 ml-2">
                <b-row>
                    <b-col class="personal-data-wrapper">
                        <div class="header">
                            <p class="header-text m-3">ЛИЧНЫЕ ДАННЫЕ</p>
                        </div>
                        <b-row>
                            <b-col class="personal-data-text-col m-3" cols="4">
                                <p>Генеральный директор</p>
                                <p>Главный бухгалтер</p>
                                <p>Другой сотрудник</p>
                                <p>Телефон</p>
                                <p>E-mail</p>
                            </b-col>
                            <b-col class="personal-data-text-col mt-3">
                                <p>Тексттексттекст</p>
                                <p>Тексттексттекст</p>
                                <p>Тексттексттекст</p>
                                <p>Тексттексттекст</p>
                                <p>Тексттексттекст</p>
                            </b-col>  
                        </b-row>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col class="services-wrapper mt-3">
                        <div class="header">
                            <p class="header-text m-3">СПИСОК УСЛУГ</p>
                        </div>
                        <ol class="services-text mt-3">
                            <li class="mb-1">Техническое управление и диспетчеризация зданий и сооружений</li>
                            <li class="mb-1">Техническое обслуживание инженерных систем</li>
                            <li class="mb-1">Клининговое обслуживание</li>
                            <li class="mb-1">Специализированные услуги клининга </li>
                            <li class="mb-1">Санитарная и антибактериальная обработка</li>
                        </ol>                
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>

/*блок контакты*/
 .contacts-wrapper, .personal-data-wrapper, .services-wrapper {
    border: 1px solid #EEEEEE;
    padding: 0px;
    background-color:#FFFFFF;
 }

 .header {
     border-bottom: 1px solid #EEEEEE;
     font-size: 15px;
 }

.header-text {
    margin: 0;
}

.contacts-text-col, .personal-data-text-col, .services-text{
     font-size: calc(11px + 3 * (100vw / 1366));
 }

 .button {
    background-color: #FFC221;
    border: 0px;
    color: black;
 }

 .grey-text {
    color: rgba(0, 0, 0, 0.5);
 }

 @media (max-width: 767px){
     .contant-wrapper {
         display: flex;
         flex-direction: column;
     }

     .contacts-wrapper {
         margin-left: 0px;
     }
 }

</style>