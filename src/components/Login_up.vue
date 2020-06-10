<template>
  <div class="up" ref="up" @click.self="notOnFocus">
    <!-- pos abs -->
    <p class="up__backToHome" @click="$router.push('/home')">
      <svg class="icon-default" aria-hidden="true">
        <use xlink:href="#icon-bianzu" />
      </svg>
    </p>
    <p class="up__turn" @click="change">
      <svg class="icon-default" aria-hidden="true">
        <use xlink:href="#icon-xuanzhuan" />
      </svg>
      <span>Log in</span>
    </p>

    <!-- def -->

    <p class="up__logo"></p>
    <p class="up__title">Please to sign up</p>
    <form class="up__inputBox" autocomplete="off">
      <!-- ---------------------------------------------------------------------------------- 1-->

      <label>
        <svg class="icon-gray" aria-hidden="true">
          <use xlink:href="#icon-zhuce" />
        </svg>
        <!-- onblur="this.placeholder='New Username'" -->
        <input
          @focus="onFocus"
          v-model.lazy="user.username"
          placeholder="New Username"
          type="username"
          name="newUsername"
          onfocus="this.placeholder=''"
          @change="validate('username')"
          onblur="this.placeholder='New Username'"
          autocomplete="off"
        />

        <svg
          v-if="validation.username.svg =='validating' "
          class="icon-default validating"
          aria-hidden="true"
        >
          <use xlink:href="#icon-loading" />
        </svg>

        <svg
          v-else-if="validation.username.svg == 'right'"
          class="icon-default"
          aria-hidden="true"
        >
          <use xlink:href="#icon-duihao" />
        </svg>

        <svg
          v-else-if="validation.username.svg == 'wrong'"
          class="icon-default"
          aria-hidden="true"
        >
          <use xlink:href="#icon-cuohao" />
        </svg>
      </label>
      <p class="validateMsg">
        <span v-show="validation.username.msg "></span>
        {{validation.username.msg}}
      </p>

      <!-- ---------------------------------------------------------------------------------- 2-->
      <label>
        <svg class="icon-gray" aria-hidden="true">
          <use xlink:href="#icon-mima2" />
        </svg>

        <input
          @focus="onFocus"
          v-model.lazy="user.password"
          placeholder="New Password"
          name="newPassword"
          type="password"
          @change="validate('password')"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='New Password'"
          autocomplete="new-password"
        />

        <svg v-if="validation.password.svg == 'right'" class="icon-default" aria-hidden="true">
          <use xlink:href="#icon-duihao" />
        </svg>

        <svg
          v-else-if="validation.password.svg == 'wrong'"
          class="icon-default"
          aria-hidden="true"
        >
          <use xlink:href="#icon-cuohao" />
        </svg>
      </label>
      <p class="validateMsg">
        <span v-show="validation.password.msg "></span>
        {{validation.password.msg}}
      </p>
      <!-- ---------------------------------------------------------------------------------- 3-->

      <label>
        <svg class="icon-gray" aria-hidden="true">
          <use xlink:href="#icon-mima2" />
        </svg>

        <input
          @focus="onFocus"
          v-model.lazy="user.confirmPassword"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='Confirm Password'"
          autocomplete="confirm-password"
          @change="validate('confirmPassword')"
        />

        <svg
          v-if="validation.confirmPassword.svg == 'right'"
          class="icon-default"
          aria-hidden="true"
        >
          <use xlink:href="#icon-duihao" />
        </svg>

        <svg
          v-else-if="validation.confirmPassword.svg == 'wrong'"
          class="icon-default"
          aria-hidden="true"
        >
          <use xlink:href="#icon-cuohao" />
        </svg>
      </label>
      <p class="validateMsg">
        <span v-show="validation.confirmPassword.msg "></span>
        {{validation.confirmPassword.msg}}
      </p>
      <button @click.prevent="regist">sign up</button>
    </form>
  </div>
</template>


<script>
export default {
  components: {
    // ValidationProvider
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: ""
      },

    

      resMsg: "",

      validation: {
        username: {
          svg: false,
          msg: ""
        },
        password: {
          svg: false,
          msg: ""
        },
        confirmPassword: {
          svg: false,
          msg: ""
        }
      },
      msgUsername: ""
    };
  },
  computed: {},
  methods: {
    async regist() {
      let formValues = Object.values(this.user);
      let msgs = [
        this.validation.username.msg,
        this.validation.password.msg,
        this.validation.confirmPassword.msg
      ];
      // console.log(msgs)

     let allvalidate =  msgs.every(msg => {
        return (msg == "");
      });

      // console.log(allvalidate)

      if (formValues.includes("")|| !allvalidate) {
        return this.$notify({
          message: " checkout your info please ",
          type: "warning"
        });
      }
      const res = await this.$http.post("/registGuest", this.user);
      console.log(res);
    },
    onFocus() {
      this.$parent.onFocus();
    },
    notOnFocus() {
      this.$parent.disableBall();
    },
    change() {
      this.$parent.isIn = !this.$parent.isIn;
    },
    validate(name) {
      switch (name) {
        case "username":
          this.validateUsername();
          break;

        case "password":
          if (/^([A-Za-z0-9@._]){5,18}$/.test(this.user.password)) {
            this.validation.password.msg = "";
            this.validation.password.svg = "right";
          } else {
            this.validation.password.msg = "must be 5-18 char,includes @ _ . ";
            this.validation.password.svg = "wrong";
          }
          break;

        case "confirmPassword":
          if (this.user.confirmPassword == "") {
            this.validation.confirmPassword.msg =
              "please re-enter your password";
            this.validation.confirmPassword.svg = "wrong";
          } else if (this.user.password !== this.user.confirmPassword) {
            this.validation.confirmPassword.msg =
              "comfirm password is  is wrong";
            this.validation.confirmPassword.svg = "wrong";
          } else {
            this.validation.confirmPassword.msg = "";
            this.validation.confirmPassword.svg = "right";
          }
          break;
      }
    },
    async validateUsername() {
      if (/^([A-Za-z0-9@._]){5,18}$/.test(this.user.username)) {
        this.validation.username.svg = "validating";
        let { res, err } = await this.$store.dispatch("validateUsername", {
          username: this.user.username
        });
        setTimeout(() => {
          if (res) {
            this.validation.username.msg = "";
            this.validation.username.svg = "right";
          } else {
            this.validation.username.msg = err.response.data.message;
            this.validation.username.svg = "wrong";
          }
        }, 1000);
      } else {
        this.validation.username.msg = "must be 5-18 char,includes @ _ ";
        this.validation.username.svg = "wrong";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.up {
  @include in-up;
}

@include login-active {
  label {
    margin-top: 16px;
  }
}

.validating {
  animation: loading 1.25s ease-out infinite;
}

@keyframes loading {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>