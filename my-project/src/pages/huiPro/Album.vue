<template>
  <div>
     <img class="logo-large" src="../../assets/images/vessel.png">
     <Icon name="common_person" />
    <!-- Icon 组件渲染后是一个 SVG 元素，可通过 CSS 调整颜色、大小等样式 -->
    <Icon name="common_person" style="color: #fa3239; font-size: 24px;" />
    <!-- 当使用树资源、树状态图标时，可传入数组进行叠加展示 -->
    <Icon :name="['tree_main_center', 'tree_state_alarm']" />
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">左端对齐</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" />
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">居中对齐</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" alwaysCenter />
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    for (let index = 0; index < 30; index++) {
      this.data.push({
        title: 'title',
        url: '/public/images/vessel.png',
        key: index
      })
    }
  }
}
</script>
