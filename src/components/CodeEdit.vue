<template>
  <div class="container">
    <!-- 左边：代码编辑器 -->
    <div class="editor-section">
      <div class="editor-header">
        {{title}}
      </div>
      <editor ref="editor" v-model="content" @init="editorInit" lang="html" theme="chrome" width="500" height="300"
      :options="aceConfig.options"></editor>
    </div>
    
    <!-- 右边：组件展示 -->
    <div class="player-section">
      <div style="margin: auto;">
        <XgplayerFlvPlayer></XgplayerFlvPlayer>
      </div>
      
    </div>
  </div>
</template>

<script>
import XgplayerFlvPlayer from './XgplayerFlvPlayer.vue'
import editor from 'vue2-ace-editor'

// https://blog.csdn.net/weixin_45313093/article/details/130645205

// 编辑器选项
const options = {
  tabSize: 4, // tab默认大小
  showPrintMargin: false, // 去除编辑器里的竖线
  fontSize: 15, // 字体大小
  highlightActiveLine: true, // 高亮配置
  enableBasicAutocompletion: true, //启用基本自动完成
  enableSnippets: true, // 启用代码段
  enableLiveAutocompletion: true, // 启用实时自动完成
}

export default {
  name: 'CodeEdit',
  components: {
    editor,
    XgplayerFlvPlayer
},
  data(){
    return{
      title: '编译器demo',
      aceConfig: { 
        options, 
      },
      content: `
<template>
  <div id="vs"></div>
</template>


import Player1 from 'xgplayer';

export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
  },
  mounted() {
    const player = new Player1({
      id: 'vs',
      url: this.videoUrl || 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    });
    console.log(player);
  }
};

<style>
/* 可能还有一些样式代码，如果该组件有的话 */
</style>
`
    }
  },
  methods:{
    editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/less')
            require('brace/theme/chrome')
            require('brace/snippets/javascript') //snippet
        }
  },
  created(){
  }
}
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.editor-section {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #e0e0e0;
}

.player-section {
  flex: 1;
  padding: 10px;
  text-align: center;
  display: flex;
}

.editor-header {
  font-size: 20px;
  color: #000;
  margin-bottom: 10px;
}
</style>
<style>
.ace_editor{
  height: 600px !important;
  width: 69% !important;
}
</style>
