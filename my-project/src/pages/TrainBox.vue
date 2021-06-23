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
      :needActiveTrainIndex="Number(needActiveTrainIndex)"
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
// const trainType = {
//   NX70: '平车',
//   P70: '平车',
//   C70: '敞车'
// }
// 需求点
// 1蓬车无集装箱
// 集装箱类型
// 1上报的集装箱数据，根据集装箱type分为1异常--上报2正常  其中1异常编辑后变为正常2
// 2 -1有集装箱无车厢的异常
// 车厢类型
// 1上报的数据 1异常2正常
// 2 -1有集装箱无车厢的异常

// 集装箱添加逻辑
// 1根据添加按钮位置获得要操作的集装箱位置location
// 2判断location的集装箱个数<2----添加集装箱到location---location位置上的数据后移一次---结束操作
// 3location的集装箱个数===2
// 4添加的集装箱到location,location的位置依次后移----跨车厢时
// 4.1判断车厢是否为蓬车
// ---是---判断下个车厢循环4.1和4.2
// ---否---4.2
// 4.2判断车厢的集装箱个数循环2和3步骤
// 4.3判断车厢是否存在
// 4.3.1不存在则新增type为-1的车厢及放置集装箱时type也设置为-1
const TRAINBOXWIDTH = 280
export default {
  data () {
    return {
      trainDirection: 0,
      trainListData: [],
      curActiveTrainIndex: 0,
      needActiveTrainIndex: -1,
      trainType: 'NX70', // 新增加的火车车厢类型
      trainTypeDialogVisible: false, // 增加车厢选择类型弹框显示
      isTrainPrev: false// 是否向前追加火车车厢

    }
  },
  components: {
    Train
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

    this.trainListData = [{
      type: 'NX70',
      name: '第1节平车',
      isEdit: false,
      box: [
        {
          type: 2, // 集装箱type字段；0空位/占位集装箱；1上报的异常集装箱；2正常上报的集装箱
          name: '第1集装箱'
        }
      ]
    },
    {
      type: 'P70',
      name: '第2节棚车',
      isEdit: false,
      box: [null, null]
    },
    {
      type: 'P70',
      name: '第3节棚车',
      isEdit: false
    },
    {
      type: 'C70',
      name: '第4节敞车',
      isEdit: false,
      box: [
        {
          type: 2,
          name: '第2集装箱'
        },
        {
          type: 2,
          name: '第3集装箱'
        }
      ]
    },
    {
      type: 'C70',
      name: '第5节敞车',
      isEdit: false,
      box: [
        {
          type: 2,
          name: '第4集装箱'
        }
      ]
    },
    {
      type: 'P70',
      name: '第6节棚车',
      isEdit: false
    },
    {
      type: 'NX70',
      name: '第7节平车',
      isEdit: false,
      box: [
        {
          type: 2,
          name: '第5集装箱'
        }
      ]
    }]
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
    emitAddTrainBox (isPrev) {
      this.trainTypeDialogVisible = true
      this.isTrainPrev = isPrev
    },
    emitDeleteTrainBox (index) {
      this.trainListData.splice(index, 1)
      const _this = this
      if (this.trainDirection === 0) {
        this.$nextTick(() => {
          _this.needActiveTrainIndex = index
        })
      } else {
        this.$nextTick(() => {
          const sl = _this.$refs.trainBox.$refs.trainListBox.scrollWidth - _this.$refs.trainBox.$refs.trainBody.clientWidth - index * TRAINBOXWIDTH
          console.log(sl)
          _this.$refs.trainBox.$refs.trainListBox.scrollLeft = sl < 0 ? 1 : sl // 反向最后一个车厢删除，临界值处理
        })
      }
    },
    sureAddTrainBox () {
      const _this = this
      let trainItemData = {
        type: this.trainType,
        name: '',
        isEdit: false
      }
      if (this.trainType === 'P70') {
        trainItemData = Object.assign(trainItemData, {
          box: [null, null]
        })
      } else {
        trainItemData = Object.assign(trainItemData, {
          box: [
            {
              type: 0,
              name: ''
            },
            {
              type: 0,
              name: ''
            }
          ]
        })
      }
      if (this.isTrainPrev) { // 向前添加
        const addIndex = this.curActiveTrainIndex
        this.trainListData.splice(addIndex, 0, trainItemData)
        if (this.trainDirection === 1) { // 反向
          this.$nextTick(() => {
            _this.$refs.trainBox.$refs.trainListBox.scrollLeft = _this.$refs.trainBox.$refs.trainListBox.scrollWidth - _this.$refs.trainBox.$refs.trainBody.clientWidth - _this.curActiveTrainIndex * TRAINBOXWIDTH
          })
        }
      } else {
        const addIndex1 = this.curActiveTrainIndex + 1
        this.trainListData.splice(addIndex1, 0, trainItemData)
        if (this.trainDirection === 0) {
          this.$nextTick(() => {
            _this.needActiveTrainIndex = _this.curActiveTrainIndex + 1
          })
        } else {
          this.$nextTick(() => {
            // 增加偏差触发handleScroll事件从而进一步触发curActiveTrainIndex计算属性，进而触发矫正计算
            _this.$refs.trainBox.$refs.trainListBox.scrollLeft = _this.$refs.trainBox.$refs.trainListBox.scrollLeft + 1
          })
        }
      }
      this.trainTypeDialogVisible = false
    }
  }

}
</script>

<style>

</style>
