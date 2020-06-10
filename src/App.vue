<template>
  <div id="app">
    <!-- pos abs -100vh -->
    <transition @enter="loginEnter" @leave="loginLeave" mode="out-in">
      <router-view name="Login"></router-view>
    </transition>

    <Nav />
    <div class="container">
      <Fridge v-show="isFridge" ref="Frideg" />
    </div>

    <router-view class="view" />
  </div>
</template>


<script>
import Nav from "./components/Nav";
import Login from "./views/Login";
import Fridge from "./components/Fridge";

export default {
  components: {
    Nav,
    Login,
    Fridge
  },
  data() {
    return {};
  },
  computed: {
    isFridge() {
      console.log("app.vue push " + this.$route.name);

      return ["Home", "Foods"].includes(this.$route.name) ? true : false;
    }
  },
  watch: {
    $route(to, from) {
      console.log(`从${from.name}跳转而来,         要去${to.name}`);

      console.log(from);
      console.log(to);
    }
  },
  methods: {
    //  routter animation
    loginEnter(el, done) {
      console.log(el);
      this.$aStore.EnterLogin.restart();
      this.$aStore.EnterLogin.finished.then(() => {
        console.log("login in 动画完成");
        done();
      });
    },
    loginLeave(el, done) {
      console.log(el);
      this.$aStore.EnterLogin.reverse();
      this.$aStore.EnterLogin.play();
      this.$aStore.EnterLogin.finished.then(() => {
        console.log("login out  动画完成");
        done();
      });
    }
  },
  mounted() {}
};
</script>



<style lang="scss">
#app {
  &:active {
    cursor: url("./assets/cursor_active.png"), auto;
  }
  cursor: url("./assets/cursor-default.png"), auto;
  text-align: center;
  background-color: $theme__white;

  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .container {
    position: relative;
  }

  #Fridge {
    width: 460px;
    position: absolute;
    right: 0;
    top: calc((100vh - 120px) / 2 - 371px);
    z-index: 100;
  }

  .view {
    width: 100vw;
    height: calc(100vh - 120px);
  }
}
</style>
