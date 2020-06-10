<template>
  <div>
    <ul>
      <li v-for="(item)  in $store.state.Categorys " :key="item.category" @click="select(item)">
        <img :src="item.icon" alt />
        <span>{{item.category}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {

  methods: {
    select(item) {
      this.$router.push(`/add/${item.category}`);
     

      this.$store.commit("categorySelected", item);
    },
    fetchCategorys() {
      this.$store.dispatch("fetchCategorys");
    }
  },


  created() {
    this.fetchCategorys()
  }

};

</script>

<style lang="scss" scoped>

ul {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 30px;
  background: #f3f2f0;
  box-sizing: border-box;
  box-shadow: 6px 6px 13px #cfcecc, -6px -6px 13px #ffffff;
  padding: 40px 48px;

  li {
    //   border: 1px solid black;
    user-select: none;
    cursor: pointer;

    img {
      width: 160px;
      height: 160px;
      display: block;
      object-fit: contain;
    }
  }
}
</style>