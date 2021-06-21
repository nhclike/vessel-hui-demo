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
      <Train
      :trainDirection="trainDirection"
      :trainListData="trainListData"
      :needActiveTrainIndex="needActiveTrainIndex"
       @emitCurActiveTrainIndex="emitCurActiveTrainIndex"
       @emitAddTrainBox="emitAddTrainBox"
       @emitDeleteTrainBox="emitDeleteTrainBox"
       ref="trainBox">
       </Train>

    </div>
     <el-dialog title="选择火车类型" :visible.sync="trainTypeDialogVisible" :area="[480,300]">
      请选择火车类型
      <el-radio-group v-model="trainType">
        <el-radio label="NX70">平车</el-radio>
        <el-radio label="P70">棚车</el-radio>
        <el-radio label="C70">敞车</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureAddTrainBox">确 定</el-button>
        <el-button @click="trainTypeDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
      needActiveTrainIndex: 0,
      trainType: 'NX70',
      trainTypeDialogVisible: false,
      isTrainPrev: false// 是否向前追加火车车厢

    }
  },
  components: {
    Train
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
      box: []
    },
    {
      type: 'P70',
      name: '第3节棚车',
      box: []
    },
    {
      type: 'C70',
      name: '第4节敞车',
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
      type: 'C70',
      name: '第5节敞车',
      box: [
        {
          name: '第3集装箱'
        },
        {
          name: ''
        }
      ]
    },
    {
      type: 'P70',
      name: '第6节棚车',
      box: []
    },
    {
      type: 'NX70',
      name: '第7节平车',
      box: [
        {
          name: '第4集装箱'
        },
        {
          name: ''
        }
      ]
    }]
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
    },
    emitAddTrainBox (isPrev) {
      this.trainTypeDialogVisible = true
      this.isTrainPrev = isPrev
    },
    emitDeleteTrainBox (index) {
      this.trainListData.splice(index, 1)
    },
    sureAddTrainBox () {
      if (this.isTrainPrev) {
        const addIndex = this.curActiveTrainIndex
        this.trainListData.splice(addIndex, 0, {
          type: this.trainType,
          name: ''
        })
      } else {
        const addIndex1 = this.curActiveTrainIndex + 1
        this.trainListData.splice(addIndex1, 0, {
          type: this.trainType,
          name: ''
        })
      }
      this.trainTypeDialogVisible = false
    }
  }

}
</script>

<style>

</style>
