<template>
  <div id="Login" @click.self="notOnFocus">
    <div class="login container" @click.self="notOnFocus">
      <transition name="fade" mode="out-in">
        <In v-if="!isIn" ref="child" key="login" />
        <Up v-else ref="child" key="signup" />
      </transition>

      <!-- anime svg -->
    </div>
    <!-- pos abs  circle  -->
    <div class="login__top-circle-gray disable"></div>
    <div class="login__left-circle-gray disable"></div>
    <div class="login__left-circle-red disable"></div>
    <div class="login__right-circle-gray disable"></div>
    <div class="login__right-circle-red disable"></div>

    <div class="login__svg">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1920 500"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g id="页面-1" stroke="#282c34" stroke-width="1" fill-rule="evenodd">
          <g id="Apple-TV">
            <!-- <path id="login__path" d="M0.5,0.5 L0.5,214.823821 C54.2005208,295.725393 150.00651,295.725393 287.917969,214.823821 C494.785156,93.4714627 368.101563,213.626528 529.007813,249.001468 C689.914063,284.376408 814.070313,-20.7688083 899.582031,128.464871 C985.09375,277.69855 1035.57422,256.969366 1184.80859,256.969366 C1334.04297,256.969366 1356.30859,107.551245 1423.44531,122.775623 C1490.58203,138 1524.71484,310.50184 1664.05859,256.969366 C1756.95443,221.281051 1842.26823,221.281051 1920,256.969366 L1920,0.5 L0.5,0.5 Z"></path> -->
            <path
              id="login__path"
              d="M1,1 L1,1.77935935 C54.7005208,2.07354688 150.50651,2.07354688 288.417969,1.77935935 C495.285156,1.33807805 368.601563,1.77500556 529.507813,1.9036417 C690.414063,2.03227785 814.570313,0.922658879 900.082031,1.4653268 C985.59375,2.00799473 1036.07422,1.93261588 1185.30859,1.93261588 C1334.54297,1.93261588 1356.80859,1.38927726 1423.94531,1.44463863 C1491.08203,1.5 1525.21484,2.12727942 1664.55859,1.93261588 C1757.45443,1.80284018 1842.76823,1.80284018 1920.5,1.93261588 L1920.5,1 L1,1 Z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>




<script>
import In from "../components/Login_in";
import Up from "../components/Login_up";

export default {
  components: {
    In,
    Up
  },

  data() {
    return {
      isIn: false
    };
  },

  methods: {
    onFocus() {
      this.$refs.child.$el.classList.add("login-active");

      this.showBall();
    },
    notOnFocus() {
      this.$refs.child.$el.classList.remove("login-active");

      this.disableBall();
    },
    showBall() {
      let ball = document.querySelectorAll(".disable");
      ball.forEach(i => {
        i.classList.add("showball");
        i.classList.remove("disable");
      });
    },
    disableBall() {
      let ball = document.querySelectorAll(".showball");

      ball.forEach(i => {
        i.classList.add("disable");
        i.classList.remove("showball");
      });
    }
  },
  
  mounted() {
    this.$aStore.setEnterLogin();
  }
};
</script>



<style lang="scss" scoped>
#Login {
  width: 100vw;
  min-width: 750px;
  height: 100vh;
  position: absolute;
  z-index: 110;
  bottom: 100%;
  left: 0;
  background-color: $theme__darkGray;
 

  .login {
    width: 100%;
    height: 100%;
    @include flex_R_C_C;
    transform-style: preserve-3d;
  }
  .container {
    padding: 0 48px;
  }

  .login__right-circle-red,
  .login__left-circle-gray,
  .login__left-circle-red,
  .login__top-circle-gray,
  .login__right-circle-gray {
    transition: all 0.75s ease-in-out;
    border-radius: 50%;
    pointer-events: none;
  }
  .login__right-circle-gray {
    position: absolute;
    right: 101px;
    bottom: 287px;
    width: 107px;
    height: 107px;

    background-image: radial-gradient(
      circle at 10% 0%,
      #575e6b 0%,
      rgba($color: #515764, $alpha: 0.85) 20%,
      rgba($color: #30343c, $alpha: 0) 80%
    );
  }
  .login__right-circle-red {
    position: absolute;
    right: -51px;
    bottom: 45px;
    width: 275px;
    height: 275px;
    // background-image: linear-gradient(135deg,#575E6B , #515764,#30343C);

    background-image: radial-gradient(
      circle at 0% 0%,
      #b04939 0%,
      rgba($color: #b04939, $alpha: 1) 20%,
      rgba($color: #282c34, $alpha: 1) 80%
    );
  }

  .login__left-circle-gray {
    position: absolute;
    left: -127px;
    top: 234px;
    width: 320px;
    height: 320px;

    background-image: radial-gradient(
      circle at 10% 0%,
      #575e6b 0%,
      rgba($color: #4e5561, $alpha: 0.6) 20%,
      rgba($color: #30343c, $alpha: 0) 60%
    );
  }
  .login__left-circle-red {
    position: absolute;
    left: 75px;
    top: 365px;
    width: 134px;
    height: 134px;
    background-image: radial-gradient(
      circle at 0% 0%,
      #b04939 0%,
      rgba($color: #b04939, $alpha: 1) 20%,
      rgba($color: #282c34, $alpha: 1) 80%
    );
  }
  .login__top-circle-gray {
    position: absolute;
    left: 84px;
    bottom: calc(100% - 350px);
    width: 700px;
    height: 700px;
    background-image: radial-gradient(
      circle at 10% 0%,
      #575e6b 0%,
      rgba($color: #4b505c, $alpha: 0.69) 5%,
      rgba($color: #30343c, $alpha: 0) 70%
    );
  }

  .showball {
    opacity: 1;
  }

  .disable {
    opacity: 0;
  }
}

.login__svg {
  position: absolute;
  z-index: 1;
  top: 99%;
  left: -1px;
  width: calc(100vw + 1px);
  pointer-events: none;

  svg {
    width: 100vw;
    height: 500px;
    fill: $theme__darkGray;
    pointer-events: none;
  }
}
</style>