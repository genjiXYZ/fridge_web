<template>
  <div id="Edit">
    <div class="edit__wraper" v-if="visible" @click.self="dialogVisible">
      <div class="edit__box">
        <div class="edit__box__left">
          <div class="edit__box__left-icon">
            <img :src="row.icon || row.categoryID.icon" alt />
          </div>
          <p class="edit__box__left-name">
            <el-autocomplete
              class="inline-input"
              v-model="row.name"
              :fetch-suggestions="querySearch"
              placeholder="name"
              @select="handleSelect"
            ></el-autocomplete>
          </p>
        </div>

        <div class="edit__box__right">
          <label>
            <span>Num</span>
            <p>
              <el-input-number v-model="row.num" :min="0" label="num"></el-input-number>
            </p>
          </label>
          <label>
            <span>Buy time</span>
            <p>
              <el-date-picker v-model="row.buyDate" type="date" placeholder="date"></el-date-picker>
            </p>
          </label>
          <label>
            <span>EXP</span>
            <p>
              <el-select v-model="row.freshTime" placeholder>
                <el-option v-for="item in freshTimeOption" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </p>
          </label>

          <label>
            <span>Position</span>
            <p>
              <el-radio-group v-model="row.position" fill="#d2513b">
                <el-radio-button label="fresher"></el-radio-button>
                <el-radio-button label="changer"></el-radio-button>
                <el-radio-button label="freezer"></el-radio-button>
              </el-radio-group>
            </p>
          </label>

          <div class="neumorphism-buttom" v-if="row.num >0" @click="putFoods">save</div>
          <div class="neumorphism-buttom" v-else @click="delFoods">del</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["row", "visible"],
  data() {
    return {
      freshTimeOption: [
        "1 month",
        "2months",
        "3 months",
        "6 months",
        "9 months",
        "12 months",
        "24 months"
      ]
    };
  },

  methods: {
    dialogVisible() {
      this.$emit("update:visible", false);
    },

    async putFoods() {
      const res = await this.$store.dispatch("putFoods", {
        id: this.row._id,
        model: this.row
      });
      this.refreshFoods(res)
    },

    async delFoods() {
      const res = await this.$store.dispatch("delFoods", { id: this.row._id });
      this.refreshFoods(res);
      
    },

    refreshFoods(res){
        this.$parent.fetchFoods_local()
    },


    querySearch() {},
    handleSelect() {}
  }
};
</script>

<style lang="scss" scoped>
.edit__wraper {
  font-size: 22px;
  color: $theme__red;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  @include flex_R_C_C;
  backdrop-filter: blur(5px);
}

.edit__box {
  width: 750px;
  height: 380px;

  border-radius: 30px;
  background-color: $theme__white;

  box-sizing: border-box;
  padding: 32px;
  @include flex_R_SB_C;
  box-shadow: 2px 2px 2px #d7d3d0, 4px 4px 1px white inset,
    0px -3px 4px #dadada inset;

  &__left {
    height: 100%;
    width: 240px;

    @include flex_C_SB_C;
    box-sizing: border-box;

    &-icon {
      width: 240px;
      height: 240px;
      background-color: #f3f2f0;

      box-shadow: 5px 5px 3px #d8d7d6, -5px -5px 3px #ffffff;

      box-sizing: border-box;

      border-radius: 30px;
      @include flex_R_C_C;
      img {
        display: flex;
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
    }
    &-name {
      width: 240px;

      border-radius: 10px;

      //  box-shadow:  5px 5px 9px #dddcda,
      //          -5px -5px 9px #ffffff;
      box-sizing: border-box;
    }
  }
  &__right {
    position: relative;
    height: 100%;
    width: 384px;

    & > label {
      display: block;
      width: 100%;
      height: 60px;
      @include flex_R_SB_C;

      & > span {
        display: inline-block;
        width: 110px;
        text-align: center;
      }
      & > p {
        width: 280px;
      }
    }
  }
}

.neumorphism-buttom {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 114px;
  height: 36px;
  background-color: $theme__red;
  border-radius: 10px;
  font-size: 22px;
  line-height: 36px;
  color: $theme__white;
  cursor: pointer;
}
</style>