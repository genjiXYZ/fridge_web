<template>
  <div id="Add">
    <div class="add container">
   
      
      <div class="add__category">
        <span class="add__category-title">{{title}}</span>
        <div class="add__category-box">
         
          <router-view     >  </router-view>
        </div>

        <div class="add__category-cart"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {

    };
  },
  methods: {
  },
  computed: {
    title(){
      return this.$route.params.category?this.$route.params.category:"category";
    }
  },
  watch: {
  },
  created(){
  }

 
};
</script>


<style lang="scss" scoped>
#Add {
  background-color: $theme__red;
}

.container {
  @include flex_C_C_C;
  height: 100%;
}
.add {
  &__selected {
    width: 96px;
    height: 96px;
    margin-bottom: 32px;
    // @include dashe;
    border-radius: 50%;
    box-shadow: inset 5px 5px 10px #ae4331, inset -5px -5px 10px #f65f45;

    img{ 
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border: none;
      outline: none;
    }
  }
  &__category {
    position: relative;
    width: 1174px;
    height: 720px;

    @include flex_R_C_C;
    // @include dashe;

    &-title {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      font-size: 36px;

      text-transform: capitalize;
      transform-origin: left top;

      transform: rotateZ(-90deg) translateX(-100%);
    }
    &-box {
      height: 100%;
      width: 1000px;
      border-radius: 30px;
      background-color: #f3f2f0;
      box-sizing: border-box;
      padding: 40px 48px;
      margin-left: 64px;
    


      // ul {
      //   width: 100%;
      //   height: 100%;
      //   margin: 0 auto;
      //   // border: 1px solid black;
      //   display: grid;
      //   grid-template-columns: repeat(4, 1fr);
      //   grid-template-rows: repeat(3, 1fr);
      //   justify-items: center;
      //   align-items: center;

      //   li {
      //     //   border: 1px solid black;
      //     user-select: none;
      //     cursor: pointer;

      //     img {
      //       width: 160px;
      //       height: 160px;
      //       display: block;
      //       object-fit: contain;
      //     }
      //   }
      // }
    }
    &-cart {
      /* Style for "矩形 6 拷贝 2" */
      width: 145px;
      height: 720px;

      border-radius: 30px;
      background-color: #f3f2f0;

      margin-left: 29px;
    }
  }
}
</style>