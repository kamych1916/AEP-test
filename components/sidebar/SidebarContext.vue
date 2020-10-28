<template>
    <div>
        <div class="wrap__sidebar_context px-3 py-4">
            <b-row class="px-3">
                <nuxt-link to="/client/requests/requests">
                    <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                     Заявки
                </nuxt-link>
            </b-row>
            <b-row class="mt-3 px-3">
                <nuxt-link to="/client/objects/objects" >
                    <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                    Объекты
                </nuxt-link>
            </b-row>
            <b-row class="mt-3 px-3">
                <nuxt-link to="/client/contractor" >
                    <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                     Единный подрядчик
                </nuxt-link>
            </b-row>
        </div>
    </div>
</template>

<style>
.wrap__sidebar_context{
    height: 40%;
    width: 100%;
}
.wrap__sidebar_context a{
    color: #aaa
}
.wrap__sidebar_context a:hover{
    color: #ccc
}
</style>