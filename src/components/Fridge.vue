<template>
  <div id="Fridge">
    
    <div class="fridge" :class="isOpen"   ref="fridge">

      <div class="fridge__addBtn" @click="handleAddBtn">
        <svg
          t="1588051026411"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2190"
          width="48"
          height="48"
          data-spm-anchor-id="a313x.7781069.0.i7"
        >
          <path
            d="M916.115386 467.228307 557.971519 467.228307 557.971519 109.085464c0-24.714891-20.056801-44.771693-44.770669-44.771693-24.715915 0-44.772716 20.056801-44.772716 44.771693l0 358.142843L110.285291 467.228307c-24.715915 0-44.771693 20.056801-44.771693 44.771693s20.056801 44.772716 44.771693 44.772716l358.142843 0 0 358.143866c0 24.761963 20.056801 44.770669 44.772716 44.770669 24.713868 0 44.770669-20.008706 44.770669-44.770669L557.971519 556.772716l358.143866 0c24.762987 0 44.771693-20.057825 44.771693-44.772716S940.878372 467.228307 916.115386 467.228307L916.115386 467.228307zM916.115386 467.228307"
            p-id="2191"
          />
        </svg>
      </div>

      <div class="fresher drawer" @click="enterList('fresher__open open','fresher')">
        <div class="doorHandle"></div>
      </div>

      <div class="changer drawer" @click="enterList('changer__open open','changer')">
        <div class="doorHandle"></div>
      </div>

      <div class="freezer drawer" @click="enterList('freezer__open open','freezer')">
        <div class="doorHandle"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {


      isOpen:"",
      isOpenHistory:""
    };
  },
  methods: {
 

    enterList(name,position) {
      this.isOpen = name
      this.isOpenHistory = name
      this.$route.params.position == position ? console.log("refresh"):this.$router.push(`/foods/${position}`)
    },

    leaveList() {
      this.isList = false;
    },
    handleAddBtn() {
      this.$aStore.ClickAddBtn.play();
      this.$aStore.ClickAddBtn.finished.then(() => {
        this.$router.push("/category").then(() => {
          this.$aStore.setAddBtnBase();
        });
      });
    }
  },
  mounted() {
    var FridgePage = this.$anime({
      targets: ".fridge",

      duration: 2200
    });
    this.$aStore.setClickAddBtn();
  },
  watch: {
       '$route.name'(e){
         console.log(e)
          e == "Foods"? this.isOpen = this.isOpenHistory || "fresher__open open":this.isOpen = "";
    }
  },
};
</script>


<style lang="scss">
//------------size
$n: 1;
$fridge_width: 360px * $n;
$fridge_fresher_height: (228px / 742px) * 100%;
$fridge_changer_height: (127px / 742px) * 100%;
$fridge_freezer_height:(381px / 742px) * 100%;



//------color
$door_color: linear-gradient(-60deg, #efeeed, #fbfaf8);
$fridge_bottom_shadow_color: #d7d3d0;
$fridge_inside_color: linear-gradient(
  90deg,
  rgba(#00fcff, 0%),
  #00fcff 10%,
  white
);
$fridge_doorHandle_color: linear-gradient(
  0deg,
  rgba(
    $color: #87929f,
    $alpha: 0.7
  ),
  rgba(
    $color: #b8c7dc,
    $alpha: 0.7
  )
);
$isOpened_color: linear-gradient(-60deg, #efeeed, #eeebe7);
//----------shadow 1外底边 阴影    2顶部  内阴影    3底部  内阴影
$fridge_shadow: 3px 10px 10px
    rgba(
      $color: #d7d3d0,
      $alpha: 0.7
    ),
  4px 3px 2px white inset;



//transform
$door_transition: all 0.75s linear;
$open: rotateY(20deg);
$isList:perspective(0px)  translateX( 100px)  ;

//------------------>
.fridge {
  position: relative;
  width: $fridge_width;
  border-radius: 20px 20px 30px 30px;
  box-shadow: $fridge_shadow;
  background-color: white;
  // background-image: $fridge_inside_color;

    transform-style: preserve-3d;
  transition: all 0.75s ease-in-out;
  transform-origin: right;
 height: 742px;
  perspective-origin: left;
  perspective: 1000px;

  @include cursorP;

  &::before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  border-radius: 20px 20px 30px 30px;
  box-shadow: $fridge_shadow;

     background-image: $fridge_inside_color;
  }


  .fresher,
  .changer,
  .freezer {
    position: relative;
    transform-origin: right;
    transition: $door_transition;

  }
  &__addBtn {
    position: absolute;
    z-index: 10;
    width: 200px;
    height: 200px;
    left: calc(100%);
    bottom: 16%;

    background-color: #d2513b;
    transform-origin: center;
    clip-path: circle(100px at 0 50%);

    svg {
      position: absolute;
      z-index: 11;
      fill: white;
      left: 13px;
      top: calc(50% - 24px);
    }
  }
  .doorHandle {
    width: 5px;
    height: 42px;
    position: absolute;

    left: 20px;
    border-radius: 10px;
    background-image: $fridge_doorHandle_color;
    box-shadow: $fridge_doorHandle_shadow;
  }
  .fresher {
    width: $fridge_width;
    height: $fridge_fresher_height;
    box-sizing: border-box;
    border-radius: 20px 20px 10px 10px;
    box-shadow: $fresher_shadow;
    background-image: $door_color;
    .doorHandle {
      bottom: 20px;
    }
  }
  .changer {
    margin: 3px 0;
    width: $fridge_width;
    height: $fridge_changer_height;
    box-sizing: border-box;

    border-radius: 15px;
    box-shadow: $changer_shadow;
    background-image: $door_color;
    .doorHandle {
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .freezer {
    width: $fridge_width;
    height: $fridge_freezer_height;
    box-sizing: border-box;
    border-radius: 10px 10px 30px 30px;
    box-shadow: $freezer_shadow;
    background-image: $door_color;

    .doorHandle {
      top: 20px;
    }
  }
}

.open{
  transform: $isList;
}


.fresher__open{
   div:nth-child(2){

     background-image: $isOpened_color;
      transform: $open;
   }
}
.changer__open{
   div:nth-child(3){
   
     background-image: $isOpened_color;
      transform: $open;
   }
}
.freezer__open{
   div:nth-child(4){

     background-image: $isOpened_color;
      transform: $open;
   }
}

</style>


