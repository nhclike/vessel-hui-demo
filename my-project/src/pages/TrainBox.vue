<template>
  <div>
    <div>
      <el-button type="primary" @click="toLeft">正向</el-button>
      <el-button type="primary" @click="toRight">反向</el-button>
      <span>当前激活第{{ curActiveTrainIndex+1}}车厢</span>
      <el-row>
        <el-col :span="12">
          <div>
            指定激活第
            <el-input v-model="needActiveTrainIndex" type="Number"/>
            车厢
          </div>
        </el-col>
      </el-row>

    </div>
    <div >
      <Train
      :trainDirection="trainDirection"
      :needActiveTrainIndex="Number(needActiveTrainIndex)"
       @emitCurActiveTrainIndex="emitCurActiveTrainIndex"
       @emitDeleteTrainBox="emitDeleteTrainBox"
       @emitAddTrainBox="emitAddTrainBox"
       @emitAddCarriage="emitAddCarriage"
       @emitDeleteCarriage="emitDeleteCarriage"
       ref="trainBox">
       </Train>

    </div>

  </div>
</template>

<script>

import Train from './Train.vue'

export default {
  data () {
    return {
      trainDirection: 0,
      trainListData: [],
      curActiveTrainIndex: 0,
      needActiveTrainIndex: -1

      
    }
  },
  components: {
    Train
  },
  computed: {

  },
  mounted () {
    // const data = {
    //   code: 0,
    //   data: {
    //     list: [
    //       {
    //         name: '车厢1',
    //         carriage: [
    //           {
    //             name: '集装箱1',
    //             status: 0// 0正常1异常
    //           },
    //           {
    //             name: '集装箱2',
    //             status: 1
    //           }
    //         ]
    //       },
    //       {
    //         name: '车厢2',
    //         carriage: [
    //           {
    //             name: '集装箱1',
    //             status: 0// 0正常1异常
    //           },
    //           {
    //             name: '集装箱2',
    //             status: 1
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }

  },
  methods: {
    toLeft () {
      this.trainDirection = 0
      this.curActiveTrainIndex = 0
      this.needActiveTrainIndex = -1// 此值必须重置为-1否则在第一个车厢前增加车厢会导致neeneedActiveTrainIndex=0如果初始值不为-1则无法触发监听
      this.$refs.trainBox.$refs.trainListBox.scrollLeft = 0
    },
    toRight () {
      this.trainDirection = 1
      this.curActiveTrainIndex = 0
      this.needActiveTrainIndex = -1
      this.$refs.trainBox.$refs.trainListBox.scrollLeft = this.$refs.trainBox.$refs.trainListBox.scrollWidth - this.$refs.trainBox.$refs.trainBody.clientWidth
    },
    emitCurActiveTrainIndex (activeIndex) {
      this.curActiveTrainIndex = activeIndex
      console.log('emitCurActiveTrainIndex', activeIndex)
    },
    emitAddTrainBox (trainListData) {
      this.trainListData = trainListData
    },
    emitDeleteTrainBox (trainListData) {
      this.trainListData = trainListData
    },
    emitAddCarriage (trainListData) {
      this.trainListData = trainListData
    },
    emitDeleteCarriage (trainListData) {
      this.trainListData = trainListData
    }

  }

}
</script>

<style>

</style>
