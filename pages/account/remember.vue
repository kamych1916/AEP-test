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
                            <form id="login-form-2" action="#">
                                <h3 class="text-center no-margin-top">Забыли пароль?</h3>
                                <p class="mar-bot-20 text-center">
                                Введите свой E-mail адрес, на него придет ссылка для восстановления
                                пароля.
                                </p>
                                <div class="main-login-form text-left">
                                <div class="login-group">
                                    <div class="form-group">
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="lg_email"
                                        name="email"
                                        v-model="email"
                                        placeholder="email"
                                    />
                                    </div>
                                </div>
                                <button
                                    @click="resetPass()"
                                    type="button"
                                    class="login-button"
                                >
                                   <font-awesome-icon :icon="['fas', 'chevron-right']"/>
                                </button>
                                </div>
                                <div class="etc-login-form text-center text-main">
                                <p class="mar-top-15 no-margin-bottom">
                                    <nuxt-link to="login"><b>Назад</b></nuxt-link>
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
            email: null,           
        }
    },
    mounted(){

    },
    methods: {
        resetPass(code){
            Api.getInstance()
                .auth.remember(this.email)
                .then((response) => {
                    this.$bvToast.toast("Мы послали письмо вам на почту, пожалуйста перейдите по ссылке, которая указана в письме.", {
                        title: `Сообщение:`,
                        variant: "success",
                        solid: true,
                    })
                })
                .catch((error) => {
                    this.$bvToast.toast("Неверная почта пользователя или данной почты не существует", {
                        title: `Ошибка восстановления пароля`,
                        variant: "danger",
                        solid: true,
                    });
                });
        }, 
    },
};
</script>
