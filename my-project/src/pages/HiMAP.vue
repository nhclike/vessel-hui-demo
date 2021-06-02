<template>
   <div style="height:100%">
      <hi-map-container :config="mapConfig" @loaded="mapLoaded" @change="mapChanged"></hi-map-container>
   </div>
</template>

<script>
   export default {
     data(){
       return {
         api: null,
         mapConfig:{ // 地图初始化配置
          zoom: 15,
          center : {
            longitude:120.15913,
            latitude:30.27993
          }
         }
       };
     },
     methods: {
      mapLoaded(api){ // 地图加载完成处理函数
        // 在此处调用地图api执行操作
        this.api=api;
        this.api.setCenter({zoom:18})
      },
      mapChanged(api){ // 底图类型切换处理函数
        // 在此处调用地图api执行操作
        this.api=api;
      }
    }
   }
</script>