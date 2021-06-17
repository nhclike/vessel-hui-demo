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
    <div v-if="trainListData.length>0">
      <Train :trainDirection="trainDirection" :trainListData="trainListData" :needActiveTrainIndex="Number(needActiveTrainIndex-1)" @emitCurActiveTrainIndex="emitCurActiveTrainIndex" ref="trainBox"></Train>

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
      needActiveTrainIndex: 1
    }
  },
  components: {
    Train
  },
  methods: {
    toLeft () {
      this.trainDirection = 0
      this.curActiveTrainIndex = 0
      this.$refs.trainBox.$refs.trainListBox.scrollLeft = 0
    },
    toRight () {
      this.trainDirection = 1
      this.curActiveTrainIndex = 0

      this.$refs.trainBox.$refs.trainListBox.scrollLeft = this.$refs.trainBox.$refs.trainListBox.scrollWidth
    },
    emitCurActiveTrainIndex (activeIndex) {
      this.curActiveTrainIndex = activeIndex
      console.log('emitCurActiveTrainIndex', activeIndex)
    }
  },
  mounted () {
    this.trainListData = [{
      type: 'NX70',
      name: '第1节平车',
      box: [
        {
          name: '第1集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'P70',
      name: '第2节棚车',
      box: [
        {
          name: '第2集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'P70',
      name: '第3节棚车',
      box: [
        {
          name: '第3集装箱'
        },
        {
          name: '第4集装箱'
        }
      ]
    },
    {
      type: 'C70',
      name: '第4节敞车',
      box: [
        {
          name: '第5集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'C70',
      name: '第5节敞车',
      box: [
        {
          name: '第6集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'P70',
      name: '第6节棚车',
      box: [
        {
          name: '第7集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'NX70',
      name: '第7节平车',
      box: [
        {
          name: '第8集装箱'
        },
        {
          name: ''
        }
      ]
    }]
  }
}
</script>

<style>

</style>
