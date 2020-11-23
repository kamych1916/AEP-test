<template>
  <div class="auth">
    <div class="page-content">
      <div class="container-fluid mar-top-100 mar-bot-100">
        <b-row class="d-flex justify-content-center">
            <div class="col-md-6 col-md-offset-3 ">
              <div class="tab-theme">
                <div class="tab-content text-center">
                    <div id="tab2" class="tab-panel">
                        <div class="row">
                        <div class="col-md-12">
                            <!-- Main Form -->
                            <div class="login-form-1">
                            <form v-if="hash" id="login-form-2" action="#">
                                <h3 class="text-center no-margin-top">Придумайте пароль</h3>
                                <p class="mar-bot-25 text-center">
                                Этот пароль будет использоваться для входа в учетную запись
                                </p>
                                <div class="main-login-form text-left">
                                <div class="login-group">
                                    <div class="form-group">
                                    <input
                                        autocomplete="off"
                                        name="password"
                                        type="password"
                                        class="form-control"
                                        id="lg_password"
                                        placeholder="Password"
                                        v-model="password"
                                        onfocus="this.removeAttribute('readonly');"
                                    />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    class="login-button"
                                    @click="resetPass()"
                                >
                                    <font-awesome-icon :icon="['fas', 'chevron-right']"/>
                                </button>
                                </div>
                            </form>
                            <form id="login-form-2" action="#" v-else>
                                <h3 class="text-center no-margin-top">Неверный хэш</h3>
                                <p class="mar-bot-25 text-center">
                                Возможно вы воспользовались устаревшей ссылкой или пароль был
                                восстановлен ранее.
                                </p>
                                <div class="etc-login-form text-center text-main">
                                <p class="mar-top-15 no-margin-bottom">
                                    <nuxt-link to="login" ><b>Войти</b></nuxt-link>
                                </p>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </b-row>
      </div>
    </div>
  </div> 
</template>
<script>
import Api from "~/utils/api";
export default {
    layout: 'account',
    data() {
        return {
            password: null,     
            hash: true      
        }
    },
    mounted(){
        if(this.$router.currentRoute.query['id']){
            this.hash = true
            this.getCode(this.$router.currentRoute.query['id'])
        }else{
            this.hash = false
        }
    },
    methods: {
        getCode(code){
            Api.getInstance()
                .auth.get_reset_code(code)
                .then((response) => {
                    this.$bvToast.toast("Пароль успешно изменён!", {
                        title: `Сообщение:`,
                        variant: "success",
                        solid: true,
                    })
                })
                .catch((error) => {
                    this.hash = false
                });
        }, 
        resetPass(){
            Api.getInstance()
                .auth.reset(this.password, this.$router.currentRoute.query['id'], this.$router.currentRoute.query['email'] )
                .then((response) => {
                    this.$bvToast.toast("Пароль успешно изменён!", {
                        title: `Сообщение:`,
                        variant: "success",
                        solid: true,
                    })
                    setTimeout(()=>{this.$router.push('/account/login')}, 1500)
                })
                .catch((error) => {
                    this.hash = false
                });
        }
    },
};
</script>
