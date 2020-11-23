<template>
    <div>
        <div class="wrap__sidebar_context">
            <b-list-group>
                <nuxt-link  :to="role.profile">
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Мой профиль
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link  :to="role.requests">
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Заявки
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link v-if="role.clients" :to="role.clients">
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Клиенты
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link v-if="role.objects" :to="role.objects" >
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Объекты
                    </b-list-group-item>
                </nuxt-link>
                <nuxt-link  :to="role.contractor" >
                    <b-list-group-item>
                        <font-awesome-icon :icon="['fas', 'briefcase']"/>&nbsp;&nbsp;
                        Единый подрядчик
                    </b-list-group-item>
                </nuxt-link>
            </b-list-group>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        role: {
            profile: '',
            requests: '',
            clients: '', 
            objects: '',
            contractor: ''
        }
    }
  },
  mounted(){
    switch(localStorage.getItem('role')) {
        case 'client':
            this.role = {
                profile: '/',
                requests: '/requests/requests',
                objects: '/objects/objects',
                contractor: '/contractor'
            }
            break
        case 'executor':
            this.role = {
                profile: '/',
                requests: '/requests/requests',
                contractor: '/contractor'
            }
            break
        case 'admin':
            this.role = {
                profile: '/',
                requests: '/requests/requests',
                clients: '/clients/clients', 
                objects: '/objects/objects',
                contractor: '/contractor'
            }
            break
        default:
            break
        }
    }

}
</script>

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
