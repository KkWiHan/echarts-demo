<template>
  <div style="color: red" v-show="isShow">
    <p>{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  name: "SplashTest",
  props:['title'],
  data: function () {
    return {
      message: "组件启动中...",
      isShow: true
    };
  },
  mounted() {

  }
};
</script>
