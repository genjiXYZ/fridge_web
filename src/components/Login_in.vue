<template>
  <div class="in" ref="in" @click.self="notOnFocus">
    <!-- pos abs -->
    <div class="in__backToHome" @click="$router.push('/home')">
      <svg
        class="loginToHome"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2478"
        width="64"
        height="64"
      >
        <path
          d="M64.271816 746.039337 511.185448 247.433392 959.727161 746.039337 928.793638 776.566608 511.185448 312.150346 95.206362 776.566608Z"
          p-id="2479"
          fill="#d2513b"
        />
      </svg>
    </div>

    <div class="in__turn" @click="change">
      <svg
        t="1588923500946"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="14718"
        width="32"
        height="32"
      >
        <path
          d="M416 352c-38.4 0-64 25.6-64 64v192c0 38.4 25.6 64 64 64h192c38.4 0 64-25.6 64-64v-192c0-38.4-25.6-64-64-64h-192z m192 256h-192v-192h192v192zM928 704h-192c-19.2 0-32 12.8-32 32s12.8 32 32 32h140.8c-83.2 121.6-224 192-364.8 192s-275.2-64-358.4-179.2c-12.8-12.8-32-19.2-44.8-6.4-12.8 12.8-19.2 32-6.4 44.8C198.4 947.2 352 1024 512 1024c147.2 0 288-64 384-172.8v76.8c0 19.2 12.8 32 32 32s32-12.8 32-32v-192c0-19.2-12.8-32-32-32zM320 288c0-19.2-12.8-32-32-32H147.2C230.4 134.4 364.8 64 512 64c140.8 0 275.2 70.4 358.4 179.2 12.8 12.8 32 19.2 44.8 6.4 12.8-12.8 19.2-32 6.4-44.8C825.6 76.8 672 0 512 0 364.8 0 224 64 128 172.8V96C128 76.8 115.2 64 96 64s-32 12.8-32 32v192c0 19.2 12.8 32 32 32h192c19.2 0 32-12.8 32-32z"
          p-id="14719"
          fill="#d2513b"
        />
      </svg>
      <span>Sign up</span>
    </div>

    <!-- def -->
    <div class="in__logo"></div>
    <div class="in__title">Welcome to my fridge</div>

    <form class="in__inputBox">
      <label>
             <svg class="icon-gray" aria-hidden="true">
            <use xlink:href="#icon-zhuce" />
          </svg>

        <input
          @focus="onFocus"
          v-model.lazy="user.username"
          placeholder="username"
          type="username"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='username'"
          autocomplete="on"
        />
      </label>
      <label>
        <svg class="icon-gray" aria-hidden="true">
            <use xlink:href="#icon-mima2" />
          </svg>

        <input
          @focus="onFocus"
          v-model="user.password"
          placeholder="password"
          type="password"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='password'"
          autocomplete="on"
        />
      </label>

      <button @click.prevent="Login">log in</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    // msg() {
    //   return this.model.username.length > 3 ? " ok" : "error";
    // }
  },

  methods: {
    async Login() {
      if (this.user.username == "" || this.user.password == "") {
        return this.$notify({
          message: "check out your form",
          type: "warning"
        });
      }
      const res = await this.$http.post("/login", this.user);
      localStorage.token = res.data.token;
      localStorage.username = res.data.username;
      localStorage.avatar = res.data.avatar;
      localStorage.nickname = res.data.nickname;


      this.$store.commit({type:"setUser",key:"token",value:res.data.token})
      this.$store.commit({type:"setUser",key:"username",value:res.data.username})
      this.$store.commit({type:"setUser",key:"avatar",value:res.data.avatar})
      this.$store.commit({type:"setUser",key:"nickname",value:res.data.nickname})

      this.$router.push("/home");
      
      console.log(res)
    },

    //   setAnime() {
    //     this.$anime({
    //       targets: ".in",
    //       opacity: ["0", "1"],
    //       easing: "linear",
    //       duration: 250,

    //       loop: "true"
    //     });
    //   },
    onFocus() {
      this.$parent.onFocus();
    },
    notOnFocus() {
      this.$parent.disableBall();
    },
    change() {
      this.$parent.isIn = !this.$parent.isIn;
    }
    // },
    // mounted() {
    //   this.setAnime();
  }
};
</script>


<style lang="scss" scoped>
.in {
  @include in-up;



}

@include login-active{
 label:first-child{
   margin-bottom: 48px;
 }
};
  

</style>