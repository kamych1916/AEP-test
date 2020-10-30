<template>
    <div>
        <div class="wrap__sidebar_context py-5">
            <b-list-group>
                <nuxt-link to="/client/requests/requests">
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Заявки
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link to="/client/objects/objects" >
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Объекты
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link to="/client/contractor" >
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Единный подрядчик
                    </b-list-group-item>
                </nuxt-link>
            </b-list-group>
        </div>
    </div>
</template>

<style>
.wrap__sidebar_context{
    height: 40%;
    width: 100%;
}
.wrap__sidebar_context .list-group, .list-group-item{
    background-color: unset
}
.wrap__sidebar_context a{
    color: #aaa
}
.wrap__sidebar_context a:hover{
    color: #ccc
}
</style>