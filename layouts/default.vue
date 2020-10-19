<template>
  <div>

    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted(){
    let jwt = localStorage.getItem('strjwt')
    if(!jwt){
      switch ($nuxt.$route.path) {
        case     '/account/reset':                    break;
        case     '/account/registration':             break;
        case     '/account/remember':                 break;
        default: this.$router.push('/account/login'); break;
      }
    }
  },
}
</script>

<style>
html, body{
  margin: 0;  
  font-family: "Museo Sans", sans-serif;
  overflow: hidden ;
}

.login-group {
    padding: 45px !important;
}
</style>
