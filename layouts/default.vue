<template>
  <div>
    <!-- <div v-if="role"> -->
      <Header />
      <b-row style="width: 100%; padding-top: 70px;" class="mx-0" >
        <Nuxt />
      </b-row>
    <!-- </div>  -->
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
}

body {
  background-color: #f8f8f8;
}

.login-group {
    padding: 45px !important;
}

.table.b-table > thead > tr > [aria-sort="none"], .table.b-table > tfoot > tr > [aria-sort="none"]{
  background-image: url('~assets/arrows.png');
}
.table.b-table > thead > tr > [aria-sort="ascending"], .table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url('~assets/arrows_up.png');
}
.table.b-table > thead > tr > [aria-sort="descending"], .table.b-table > tfoot > tr > [aria-sort="descending"]{
  background-image: url('~assets/arrows_down.png');
}
</style>
