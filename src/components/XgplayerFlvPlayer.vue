<template>
      <div id="vs"></div>
  </template>
  
  <script>
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
    mounted(){
      const player = new Player1({
        id: 'vs',
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    })
    console.log(player);
    }
  };
  </script>