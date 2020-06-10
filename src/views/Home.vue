<template>
  <div class="home">

    <div class="container">
        <LogoHome class="home__logo" />
    </div>

  
  </div>
</template>

<script>
// @ is an alias to /src
import LogoHome from "../components/Logo_home"
export default {
  name: 'Home',
  components: {
  LogoHome
  }
}
</script>
<style lang="scss" scoped>


.home{
  width: 100vw;
  height:calc(100vh - 120px) ;
  .container{
    position: relative;
  }
  &__logo{
   position: absolute;
   left: 0;
top: 120px;
   
  }
}
</style>