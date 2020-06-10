import Vue from 'vue'
import Vuex from 'vuex'

import http from "../http"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      avatar: window.localStorage.avatar,
      username: window.localStorage.username,
      token: window.localStorage.token
    },
    Categorys: [],
    FoodList: [],
    GroupMembers: [],
    selectedMemeberID: undefined,
    selectedCategory: {}

  },
  mutations: {
    logOut(state) {
      let arr = Object.keys(state.User)
      for (let i = 0; i < arr.length; i++) {
        state.User[arr[i]] = undefined
      }
    },

    categorySelected(state, obj) {
      state.selectedCategory = obj
    },
    setUser(state, payload) {
      console.log(state.User[payload.key])
      state.User[payload.key] = payload.value
    },
    setData(state, payload) {
      state[payload.key] = payload.value
    },
    setSelectedMemeberID(state, payload) {
      let index = payload.index
      index !== undefined ? state.selectedMemeberID = state.GroupMembers[index].id : state.selectedMemeberID = undefined
    },
    putFoods(state, payload) {

    }



  },






  actions: {
    //get------------------------------------->
    //获取 食物的分类 
    async fetchCategorys({
      commit
    }) {
      let res = await http.get('http://localhost:3000/admin/api/rest/categorys')
      commit("setData", {
        key: "Categorys",
        value: res.data
      })
    },


    //获取小组成员 
    async fetchMembers({
      commit
    }) {
      let res = await http.get(`/groupMembers`);
      commit('setData', {
        key: "GroupMembers",
        value: res.data
      })
    },

    //获取所有人食物列表 
    async fetchFoods({
      commit,
      state
    }, payload) {
      let res = await http.get(`/rest/foods/position/${payload.position}/${state.selectedMemeberID !== undefined?state.selectedMemeberID:""}`);
      commit('setData', {
        key: "FoodList",
        value: res.data
      })


    },


    //post------------------------------------->
    //添加食物

    async addFoods({
      commit,
      state
    }, payload) {
      let res = await http.post("/rest/foods", payload.model);
      return res
    },



    //put------------------------------------->
    //修改食物

    async putFoods({
      commit,
      state,
      actions
    }, payload) {
      let res = await http.put(`/rest/foods/${payload.id}`, payload.model)
      return res
    },


    //delete------------------------------------->
    //删除食物
    async delFoods({
      commit,
      state
    }, payload) {
      let res = await http.delete(`/rest/foods/${payload.id}`)

    },
    async validateUsername({
      commit,
      state
    },payload){
      console.log("woshi payload")
      console.log(payload)

      let res
      let err
      try{  res = await http.post(`/testUsername`,payload)}
      catch(error){err = error}
      return {res,err}
       
    },


  },



    




  modules: {}
})