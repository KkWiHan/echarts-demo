<template>
  <div>
    <div style="width: 100px;font-size: 20px;height: 100px;" id="myList">
      {{title}}
    </div>
    <button @click="chuanZhi">修改12</button>
  </div>

</template>

<script>
import Vue from "vue";
export default {
  name: 'MySon',
  props:['title'],
  data(){
    return{
    }
  },
  methods:{
    chuanZhi(){
      this.$emit('title','hahahahah')
      // 插件注册添加的方法
      this.$ToggleSplash()
    }
  },
  created(){
  }
}
</script>


<style scoped>

</style>
