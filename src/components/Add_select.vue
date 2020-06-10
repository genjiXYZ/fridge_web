<template>
  <div class="select">
    <p class="select__icon">
      <img :src="$store.state.selectedCategory.icon" alt />
    </p>

    <!-- <ul>
      <li v-for="(value ,key) in $store.state.selectedCategory" :key="key">{{key}} ------ {{value}}</li>
    </ul> -->

    <div class="select__grid">

<el-row class="demo-autocomplete"  style="width:100%">
      <el-col >
        <el-autocomplete
          class="inline-input"
          v-model="name"
          :fetch-suggestions="querySearch"
          placeholder="name"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>

    <el-input-number v-model="num" :min="1" label="num" style="width:100%"></el-input-number>

   <!-- date -->
    <el-date-picker v-model="buyDate" type="date" placeholder="date"></el-date-picker>
  <!-- freshTime -->
    <el-select v-model="freshTime" placeholder="freshTime">
      <el-option v-for="item in freshTimeOption" :key="item" :label="item" :value="item"></el-option>
    </el-select>
 <el-radio-group v-model="position" fill="#d2513b"  class="select__position">
      <el-radio-button label="fresher"></el-radio-button>
      <el-radio-button label="changer"></el-radio-button>
      <el-radio-button label="freezer"></el-radio-button>
    </el-radio-group>


    <el-button class="select__submit" @click="submit">添加</el-button>

    </div>


  </div>
</template>


<script>
export default {
  props: ["category"],

  data() {
    return {
      //data
      position: "",
      buyDate: new Date(),
      freshTime: "",
      name: "",
      num: "",
      //option
      restaurants: [],
      freshTimeOption: [
        "1 month",
        "3 months",
        "6 months",
        "12 months",
        "24 months"
      ]
    };
  },
  computed: {
    model() {
      return {
        categoryID: this.$store.state.selectedCategory._id,
        num: this.num,
        name: this.name,
        position: this.position,
        buyDate: this.buyDate,
        freshTime: this.freshTime
      };
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "苹果" }, { value: "梨" }, { value: "西瓜" }];
    },
    handleSelect(item) {
      console.log(item);
    },

    isCompletive() {
      for (var key in this.model) {
        if (!this.model[key]) {
          return false;
        }
      }
      return true;
    },

    async submit() {
      if (this.isCompletive()) {
        console.log("提交");
        // let res = await this.$http.post("/rest/foods", this.model);
        let res = await this.$store.dispatch("addFoods", { model: this.model });
        res.status == 200 && this.$router.push("/add");
      } else {
        this.$notify.error("请填写完整");
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  height: 100%;

  border-radius: 30px;

  box-shadow: inset 5px 5px 7px #dbdad8, inset -5px -5px 7px #ffffff;

  @include flex_C_C_C;


  &__icon{
    img{
      width: 150px;
      height: 150px;
      object-fit: contain;
    }
    width: 240px;
    height: 240px;
    border-radius: 32px;
  
    @include flex_C_C_C;
    margin-bottom: 56px;
    box-shadow: 5px 5px 3px #d8d7d6, -5px -5px 3px #ffffff;
  }


  &__grid{
   display: grid;
width: 80%;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr 1fr;

   justify-items: center;
grid-gap: 20px;

  }


  &__position{
    grid-column: 1 / span 2;
  }


  &__submit{
    grid-column: 2 / span 1;
    justify-self: right;
    width: 100px;

  }
}
</style>