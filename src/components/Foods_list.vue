
<template>
  <div class="table">
    <div class="table__main">
      <span class="table__name">{{position}}</span>

      <ul class="table__select" @click="switchMember($event)" :class="switchMemberFlag">
        <li >all</li>

        <li
          v-for="(groupMember,index) in  GroupMembers"
          :key="groupMember.nickname"
          :data-index="index"
        >{{groupMember.nickname}}</li>
      </ul>

      <!-- //////// -->
      <div class="table__main__box">
        <el-table
          :data="FoodList"
        ref="table"
          style="width: 100%"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :header-row-style="headerStyle"
          :default-sort="{prop: 'date' }"
          max-height="600"
          :row-class-name="tableRowClassName"
          @row-click="handleList"
        >

          <el-table-column prop="categoryID.icon" label="category" sortable>
            <template slot-scope="scope">
              <img class="list__icon" :src="scope.row.categoryID.icon" alt />
            </template>
          </el-table-column>

          <el-table-column prop="name" label="name" sortable></el-table-column>
          <el-table-column prop="num" label="num" sortable></el-table-column>
          <el-table-column prop="buyDate" label="expired" sortable :formatter="formatter"></el-table-column>
          <el-table-column prop="freshTime" label="fresh" sortable></el-table-column>
          <el-table-column
            v-if="!switchMemberFlag"
            prop="usernameID.nickname"
            label="owner"
            sortable
          ></el-table-column>
       
  
          
        </el-table>
      </div>

     
    </div>

    <Edit :row="editInfo" :visible.sync="visible" />
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

import Edit from '../components/Edit'
export default {
  props: ["position"],
  data() {
    return {
    
      switchMemberFlag: false,
      visible: false,
      editInfo:"",
      cellStyle: {
        textAlign: "center",
        fontSize: "20px",
        height: "36px",
        padding: 0
      },
      rowStyle: {
        height: "80px",
     
      },
      headerStyle: {
        textAlign: "center",
        fontSize: "20px",
        height: "80px"
      },
      tableData: [
        {
          icon: "http://pic.genji.xyz/images/2020/05/10/fruit.png",
          name: "苹果",
          num: "12",
          date: "2016-05-01",
          tip: "1234ok"
        },
        {
          icon: "http://pic.genji.xyz/images/2020/05/10/fish.png",

          name: "er",
          num: "22",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: "http://pic.genji.xyz/images/2020/05/10/can.png",
          name: "banana",
          num: "1",
          date: "2016-05-03",
          tip: "1234ok"
        },
        {
          icon: "http://pic.genji.xyz/images/2020/05/10/meat.png",
          name: "banana",
          num: "10",
          date: "2016-05-04",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "15",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/fruit.png"),
          name: "banana",
          num: "10",
          date: "2016-05-01",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "香蕉",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        },
        {
          icon: require("../assets/logo.png"),
          name: "banana",
          num: "10",
          date: "2016-05-02",
          tip: "1234ok"
        }
      ]
    };
  },
  components:{
    Edit
  },

  computed: {
    ...mapState(["FoodList", "GroupMembers"])
  },

  methods: {
    ...mapActions(["fetchFoods", "fetchMembers"]),

    switchMember(e) {
      let index = e.target.dataset.index;
      index == undefined
        ? (this.switchMemberFlag = false)
        : (this.switchMemberFlag = `switchMember${index}`);

      console.log(index);
      //
      this.$store.commit("setSelectedMemeberID", { index: index });
      //
      this.fetchFoods({ position: this.position });
    },

    formatter(row, column) {
      return this.$dayjs(row.buyDate).format("YYYY-MM-DD");
    },
    handleList(row,column,event,) {
      console.log("点击");
     this.editInfo = row
     this.visible = true
    },


      handleDelete(index, row) {
        console.log("index")
        console.log(index, row);
        this.$refs.table.tableData.splice(index,1)
      },
    //将index  存入row.中
      tableRowClassName({row,rowIndex}){
        row.index = rowIndex
      },

      fetchFoods_local(){
          this.fetchFoods({ position: this.position });
      }


  },

  watch: {
    position(e) {
      // this.fetchFoods({ position: e });
      this.fetchFoods_local()
    }
  },

  created() {
    // this.fetchFoods({ position: this.position });
    this.fetchFoods_local()
    this.fetchMembers();
  },
  
  mounted() {

    
    setTimeout(() => {
    console.log(this.$refs)
      
    }, 10000);
  },
  updated() {
    
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 960px;

  &__main {
    position: relative;

    /* Style for "圆角矩形 1069" */
    box-sizing: border-box;
    width: 960px;
    height: 720px;
    box-shadow: 0 2px 5px #7f8183, inset 0 2px 5px #ffffff;
    border-radius: 30px;
    border: 2px solid rgba(243, 242, 240, 0.22);
    background-color: #f3f2f0;
    padding-top: 20px;

    &__box {
      // border: 1px solid black;
      padding: 20px;
      margin: 0 auto;
      width: 900px;
    }
    .list__icon {
      width: 48px;
      height: 48px;
      /* Style for "椭圆 1063" */

      box-shadow: 0 2px 5px #7f8183, inset 0 2px 5px #ffffff;
      border: 2px solid rgba(243, 242, 240, 0.68);
      background-color: #f3f2f0;
      border-radius: 50%;
    }
  }

  &__name {
    position: absolute;
    right: calc(100% + 15px);
    top: 0;
    transform-origin: right bottom;
    transform: rotateZ(-90deg);
    font-size: 36px;
    color: #282c35;
    text-transform: capitalize;
  }

  &__select {
    position: absolute;
    right: 100%;
    bottom: 10%;
    list-style: none;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   

    li {
     
      width: 32px;
      height: 56px;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 12px;
      list-style: none;
      border-radius: 10px 0px 0px 10px;
      background-color: #d7d8da;
      user-select: none;
      @include cursorP;;
       transition: width 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);

    }
    li:nth-child(1) {
      background-color: $theme__red;
      color: $theme__white;
      width: 64px;
    }
  }
}

.llytest {
  border: 1px solid black;
  
}

@for $i from 1 through 4 {
  .switchMember#{$i - 1 } {

    li:nth-child(1){
      width: 32px;
    }
    li:nth-child(#{$i + 1}) {
      background-color: $theme__darkGray;
      color: $theme__white;
      width: 64px;
	    transition: width 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
      animation: selectMember 0.25s ease-in-out  1  forwards;
    }
  }
}




</style>


// http://pic.genji.xyz/images/2020/05/10/vegetable.png
// http://pic.genji.xyz/images/2020/05/10/snacks.png
// http://pic.genji.xyz/images/2020/05/10/season.png
// http://pic.genji.xyz/images/2020/05/10/rice.png
// http://pic.genji.xyz/images/2020/05/10/other.png
// http://pic.genji.xyz/images/2020/05/10/meat.png
// http://pic.genji.xyz/images/2020/05/10/leftover.png
// http://pic.genji.xyz/images/2020/05/10/fruit.png
// http://pic.genji.xyz/images/2020/05/10/fish.png
// http://pic.genji.xyz/images/2020/05/10/drink.png
// http://pic.genji.xyz/images/2020/05/10/egg.png
// http://pic.genji.xyz/images/2020/05/10/can.png