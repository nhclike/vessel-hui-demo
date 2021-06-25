<template>
  <div>

    <div class="train-box"  v-if="trainListData.length>0">
      <div class="train-top"
      :class="{
        'f-left':trainDirection===0,
        'f-right':trainDirection===1
      }"
      >
        <!-- <div class="train-top-box">

        </div> -->
      </div>
      <div class="train-body" ref="trainBody">
        <div class="train-list-box" ref="trainListBox" @scroll="handleScroll" >
          <ul class="train-list" ref="trainList"

           :class="{
            'flex-row':trainDirection===0,
            'flex-row-reverse':trainDirection===1
            }"
            >
            <li class="train-item-box"
            v-for="(item,index) in trainListData" :key="index"
            :class="{
              'C70':item.type==='C70',
              'NX70':item.type==='NX70',
              'P70':item.type==='P70'

            }" >
              <div class="train-item-wrapper"
              :class="{'curTop':index===curActiveTrainIndex}"
              @click.stop="fnclickTrainBox(index)" >
                <!-- 集装箱 -->
                <div class="carriage-box"  :class="{
                        'float-row':trainDirection===0,
                        'float-row-reverse':trainDirection===1
                      }" v-if="item.box">
                  <div class="carriage-item"
                    :class="{
                      'f-left':cItem.location==='left',
                      'f-right':cItem.location==='right'
                    }"
                    v-for="(cItem,cIndex) in item.box" :key="cIndex">
                    <div
                    class="carriage-item-wrapper"

                     >
                     <template v-if="cItem.name">
                      <div class="carriage-item-wrapper-content">
                        <p>集装箱编号</p>
                        <div>
                          <span v-if="index!=curActiveTrainIndex||!cItem.isEdit">{{cItem.name}}</span>
                          <input type="text"
                          v-focus="true"
                          v-if="index===curActiveTrainIndex&&cItem.isEdit"
                          @blur="fnInputBlur(cItem)"
                          v-model="cItem.name"
                          >
                        </div>
                      </div>
                      <div class="carriage-item-wrapper-opt" v-if="index===curActiveTrainIndex">
                        <i class="h-icon-edit" @click.stop="editCarriage(item,index,cItem,cIndex)"></i>
                        <i class="h-icon-delete" @click.stop="deleteCarriage(index,cIndex)"></i>
                      </div>
                     </template>
                     <template v-else>
                       <div class="empty-carriage-box">

                          <el-popover
                            :ref="'carriagePopover'+cIndex+'&'+index"
                            placement="right"
                            width="360"
                            v-model="cItem.visible">
                            <div>
                              <div>
                                <h3>添加集装箱</h3>
                              </div>
                              <el-form ref="carriageForm" label-position="top" :model="carriageForm" label-width="120px">
                                <el-form-item label="集装箱编号" required>
                                  <el-input v-model="carriageForm.carriageNum"></el-input>
                                </el-form-item>

                              </el-form>

                            </div>
                            <div style="text-align: right; margin: 0">
                              <el-button type="primary" @click="sureAddCarriageBox(cIndex,cItem)">确 定</el-button>
                              <el-button @click="cItem.visible = false;carriageForm.carriageNum=''">取 消</el-button>
                            </div>
                            <el-button slot="reference">+</el-button>
                          </el-popover>
                       </div>

                     </template>

                    </div>
                  </div>
                </div>
                <div class="train-item-content"
                :class="{
                  'isEditStatus':item.isEdit===true
                  }"
                 v-if="item.type">
                  <div class="train-item-save">
                    <el-button type="primary" v-if="item.isEdit" @click.stop="fnSaveEditTrainBoxData(item)">保存</el-button>
                  </div>
                  <div class="train-item-name" v-if="item.name">
                    <div>火车编号</div>
                    <div>
                      <span v-if="index!=curActiveTrainIndex||!item.isEdit">{{item.name}}</span>
                      <input v-focus="true"
                        v-if="index===curActiveTrainIndex&&item.isEdit"

                        type="text"
                        v-model="item.name">
                    </div>

                  </div>
                  <div class="train-item-info">
                    <ul>
                      <li>
                        <span>类型</span>
                        <span v-if="index!=curActiveTrainIndex||!item.isEdit">{{item.type}}</span>
                        <input
                          v-if="index===curActiveTrainIndex&&item.isEdit"

                          type="text"
                          v-model="item.type">
                      </li>
                      <li>
                        <span>自重</span>
                        <span v-if="index!=curActiveTrainIndex||!item.isEdit">{{item.selfWeight}}</span>
                        <input
                          v-if="index===curActiveTrainIndex&&item.isEdit"

                          type="text"
                          v-model="item.selfWeight">
                      </li>
                      <li>
                        <span>载重</span>
                        <span v-if="index!=curActiveTrainIndex||!item.isEdit">{{item.loadWeight}}</span>
                        <input
                          v-if="index===curActiveTrainIndex&&item.isEdit"

                          type="text"
                          v-model="item.loadWeight">
                      </li>
                    </ul>
                  </div>

                  <div class="train-item-opt" v-if="index===curActiveTrainIndex&&!item.isEdit">
                    <i class="h-icon-edit" @click.stop="editTrainBox(item,index)"></i>
                    <i class="h-icon-delete" @click.stop="deleteTrainBox(index)"></i>
                  </div>

                </div>
              </div>
            </li>
            <li class="last-block-box" :style="lastBlockBoxStyle">

            </li>
          </ul>
        </div>

        <div class="train-opt-box" ref="trainOptBox"
         :class="{
          'f-left':trainDirection===0,
          'f-right':trainDirection===1
        }">
        <div class="add-carriage-box" :class="{
          'add-flex-row':trainDirection===0,
          'add-flex-row-reverse':trainDirection===1
        }">
          <div class="add-carriage-item" >
            <div class="add-carriage-wrapper"
             :class="[isShowPrevAddCarriage?'show':'hide']"
              @click.stop="addCarriage(true,0)">
              <p>添加箱</p>

            </div>
          </div>
           <div class="add-carriage-item middle">
            <div class="add-carriage-wrapper "
            :class="[isShowPrevAddCarriage?'show':'hide']"
             @click.stop="addCarriage(true,1)">
             <p>箱</p>
            </div>

          </div>
          <div class="add-carriage-item">
            <div class="add-carriage-wrapper"
            :class="[isShowAddCarriage?'show':'hide']"
             @click.stop="addCarriage(false,0)">

             <p>添加箱</p>
            </div>

          </div>
        </div>
        <div class="add-train-box" :class="{
          'add-flex-row':trainDirection===0,
          'add-flex-row-reverse':trainDirection===1
        }">
          <div class="add-train-item" v-for="(item,index) in trainBoxPopover" :key="index">
            <el-popover
              :ref="'popover'+index"
              placement="right"
              width="360"
              v-model="item.visible">
              <div>
                <div>
                  <h3>添加火车</h3>
                </div>
                <el-form ref="trainForm" label-position="top" :model="trainForm" label-width="120px">
                  <el-form-item label="火车编号" required>
                    <el-input v-model="trainForm.trainNum"></el-input>
                  </el-form-item>
                  <el-form-item label="火车类型" required>
                    <el-radio-group v-model="trainForm.trainType">
                      <el-radio label="NX70">平车</el-radio>
                      <el-radio label="P70">棚车</el-radio>
                      <el-radio label="C70">敞车</el-radio>
                      <el-radio label="G70">罐车</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="载重" required>
                        <el-input v-model="trainForm.loadWeight"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="自重" required>
                        <el-input v-model="trainForm.selfWeight"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

              </div>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" @click="sureAddTrainBox(index,item)">确 定</el-button>
                <el-button @click="item.visible = false">取 消</el-button>
              </div>
              <el-button slot="reference">添加车</el-button>
            </el-popover>
          </div>
        </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { debounce } from '@/utils/utils'

// 整体交互设计
// 1通过改变scrollLeft动态计算当前激活车厢

// 需求点
// 1蓬车无集装箱
// 集装箱状态
// 1上报的集装箱数据，根据集装箱status分为1异常--上报2正常  其中1异常编辑后变为正常2

// 车厢状态
// 1上报的数据 1异常2正常

// 车厢类型
// const trainType = {
//   NX70: '平车',
//   P70: '蓬车',
//   C70: '敞车'，
//   G70:'罐车'
// }

// 多出来的集装箱下面没有车厢则车厢类型为'',也就是车厢类型为''的对应的集装箱数据是异常数据，此异常数据单独处理

// 集装箱添加逻辑
// 1根据添加按钮位置获得要操作的集装箱位置startLocation
// 2判断startLocation的集装箱个数<2----添加集装箱到startLocation---startLocation位置上的数据后移一次---结束操作
// 3location的集装箱个数===2
// 4添加的集装箱到startLocation,startLocation的位置依次后移----跨车厢时for
// 4.1判断车厢是否为蓬车
// ---是---进入下次循环
// ---否---4.2
// 4.2判断车厢的集装箱个数循环2和3步骤
// 4.3判断车厢是否存在
// 4.3.1不存在则新增type为空的新车厢，并且将上个车厢的最后一个集装箱数据添加进来
const TRAINBOXWIDTH = 428
export default {
  props: {
    trainDirection: {
      type: Number,
      default: 0// 0正向从右向左/1反向从左到右
    },
    // 需要激活的火车车厢
    needActiveTrainIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      lastBlockBoxStyle: {
        paddingLeft: '200px'
      },
      trainListData: [],
      scrollLeft: 0,
      isCanClick: true,
      trainBoxPopover: [// 增加车厢popover
        {
          visible: false
        },
        {
          visible: false
        }
      ],
      carriageForm: { // 增加集装箱的表单
        carriageNum: ''
      },
      trainForm: { // 增加车厢的表单
        trainType: 'NX70',
        trainNum: '',
        selfWeight: '',
        loadWeight: ''
      }, // 新增加的火车车厢类型
      newCarriageData: {
        status: 1, // 集装箱status字段；1上报的异常集装箱；2正常上报的集装箱
        name: '',
        visible: false,
        isEdit: false
      }

    }
  },
  computed: {
    curActiveTrainIndex () {
      let index = 0
      if (this.trainDirection === 0) {
        index = Math.floor((this.scrollLeft + TRAINBOXWIDTH / 2) / TRAINBOXWIDTH)
      } else {
        if (this.trainListData.length === 1) { // 反向从后向前删除最后一个边界处理
          index = 0
        } else {
          const abs = Math.abs(this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - this.scrollLeft + TRAINBOXWIDTH / 2)
          console.log('abs', abs)
          index = Math.floor(abs / TRAINBOXWIDTH)
        }
      }

      return index
    },
    rowScrollLeft () {
      return this.curActiveTrainIndex * TRAINBOXWIDTH
    },
    rowReverseScrollLeft () {
      return this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - this.curActiveTrainIndex * TRAINBOXWIDTH
    },
    isShowPrevAddCarriage () {
      return this.trainListData[this.curActiveTrainIndex].type !== 'P70'
    },
    isShowAddCarriage () {
      if (this.curActiveTrainIndex === this.trainListData.length - 1) { // 最后一个是否向后添加集装箱按钮处理
        return true
      } else {
        return this.trainListData[Number(this.curActiveTrainIndex) + 1].type !== 'P70'
      }
    }
  },
  watch: {
    scrollLeft (newVal, oldVal) {
      console.log('scrollLeft', newVal, oldVal)
      // 激活车厢改变，或者激活车厢未改变滚动改变都矫正位置
      // 矫正scrollLeft位置
      if (this.trainDirection === 0) {
        if (this.scrollLeft !== this.rowScrollLeft) {
          this.$refs.trainListBox.scrollLeft = this.rowScrollLeft
        }
      } else {
        if (this.scrollLeft !== this.rowReverseScrollLeft) {
          this.$refs.trainListBox.scrollLeft = this.rowReverseScrollLeft
        }
      }
    },
    curActiveTrainIndex (newVal, oldVal) {
      this.$emit('emitCurActiveTrainIndex', newVal)
    },
    needActiveTrainIndex (newVal, oldVal) {
      if (this.trainDirection === 0) {
        this.$refs.trainListBox.scrollLeft = newVal * TRAINBOXWIDTH
      } else {
        this.$refs.trainListBox.scrollLeft = this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - newVal * TRAINBOXWIDTH
      }
    }
  },
  mounted () {
    // console.log(this.$refs.trainOptBox, this.$refs.trainOptBox.clientWidth)

    this.trainListData = [{
      status: 2,
      type: 'NX70',
      name: '第1节平车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: [
        {
          status: 2,
          name: '第1集装箱',
          visible: false,
          isEdit: false
        }
      ]
    },
    {
      status: 2,
      type: 'P70',
      name: '第2节棚车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: []
    },
    {
      status: 2,
      type: 'P70',
      name: '第3节棚车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: []
    },
    {
      status: 2,
      type: 'C70',
      name: '第4节敞车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: [
        {
          status: 2,
          name: '第2集装箱',
          visible: false,
          isEdit: false
        },
        {
          status: 2,
          name: '第3集装箱',
          visible: false,
          isEdit: false
        }
      ]
    },
    {
      status: 2,
      type: 'C70',
      name: '第5节敞车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: [
        {
          status: 2,
          name: '第4集装箱',
          visible: false,
          isEdit: false
        },
        {
          status: 2,
          name: '第5集装箱',
          isEdit: false,
          visible: false
        }
      ]
    },
    {
      type: 'NX70',
      name: '第6节平车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: []
    },
    {
      type: 'NX70',
      name: '第7节平车',
      isEdit: false,
      selfWeight: '1t',
      loadWeight: '1t',
      box: [
        {
          status: 2,
          name: '第6集装箱',
          visible: false,
          isEdit: false
        }
      ]
    }]
    const _this = this
    this.$nextTick(() => {
      _this.lastBlockBoxStyle = {
        paddingLeft: _this.$refs.trainListBox.clientWidth - _this.$refs.trainOptBox.clientWidth + 'px'
      }
    })
  },
  directives: {
    focus: {
    // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    handleScroll: debounce(function () {
      console.log('handleScroll', this.$refs.trainListBox.scrollLeft, this.$refs.trainListBox.scrollWidth)
      this.scrollLeft = this.$refs.trainListBox.scrollLeft
    }, 500),

    fnInputBlur (item) {
      // console.log(item)
      item.isEdit = false
    },
    // 编辑车厢
    editTrainBox (item, index) {
      console.log('editTrainBox', item)
      item.isEdit = true
    },
    // 保存车厢编辑数据
    fnSaveEditTrainBoxData (item) {
      // 此处添加接口保存编辑数据
      item.isEdit = false
    },
    // 选中那个车厢激活那个车厢
    fnclickTrainBox (index) {
      if (this.trainDirection === 0) {
        this.$refs.trainListBox.scrollLeft = index * TRAINBOXWIDTH
      } else {
        this.$refs.trainListBox.scrollLeft = this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - index * TRAINBOXWIDTH
      }
    },
    sureAddCarriageBox (cIndex, cItem) {
      // 此处增加接口增加集装箱
      cItem.name = this.carriageForm.carriageNum
      this.carriageForm.carriageNum = ''
      cItem.visible = false
    },
    sureAddTrainBox (index, item) {
      // 表单验证并且传给后台
      // 增加接口新增车厢
      const _this = this
      const trainItemData = {
        status: 2,
        type: this.trainForm.trainType,
        name: this.trainForm.trainNum,
        isEdit: false,
        selfWeight: this.trainForm.selfWeight,
        loadWeight: this.trainForm.loadWeight,
        box: []
      }

      if (index === 0) { // 第一个添加车厢按钮
        const addIndex = this.curActiveTrainIndex
        this.trainListData.splice(addIndex, 0, trainItemData)
        if (this.trainDirection === 1) { // 反向
          this.$nextTick(() => {
            _this.$refs.trainListBox.scrollLeft = _this.rowReverseScrollLeft
          })
        }
      } else { // 第二个添加车厢按钮
        const addIndex1 = this.curActiveTrainIndex + 1
        this.trainListData.splice(addIndex1, 0, trainItemData)
        if (this.trainDirection === 0) {
          this.$nextTick(() => {
            _this.$refs.trainListBox.scrollLeft = addIndex1 * TRAINBOXWIDTH
          })
        } else {
          this.$nextTick(() => {
            // 增加偏差触发handleScroll事件从而进一步触发curActiveTrainIndex计算属性，进而触发矫正计算
            _this.$refs.trainListBox.scrollLeft = _this.$refs.trainListBox.scrollLeft + 1
          })
        }
      }
      this.trainForm = {
        trainType: 'NX70',
        trainNum: '',
        selfWeight: '',
        loadWeight: ''
      }
      item.visible = false
      this.$emit('emitAddTrainBox', this.trainListData)
    },
    // 删除车厢
    deleteTrainBox (index) {
      this.$confirm('此操作将永久删除该车厢, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.trainListData.splice(index, 1)
          const _this = this
          if (this.trainDirection === 0) {
            this.$nextTick(() => {
              _this.curActiveTrainIndex = index
            })
          } else {
            this.$nextTick(() => {
              const sl = _this.$refs.trainListBox.scrollWidth - _this.$refs.trainBody.clientWidth - index * TRAINBOXWIDTH
              console.log(sl)
              _this.$refs.trainListBox.scrollLeft = sl < 0 ? 1 : sl // 反向最后一个车厢删除，临界值处理
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('emitDeleteTrainBox', this.trainListData)
        },
        onCancel: () => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          })
        }
      })
    },
    // 增加集装箱
    addCarriage (isCur, index) {
      const _this = this
      if (this.isCanClick) {
        this.isCanClick = false
        setTimeout(function () {
          _this.fnAddCarriageOpt(isCur, index)
          _this.$emit('emitAddCarriage', _this.trainListData)
          _this.isCanClick = true
        }, 500)
      }
    },
    fnAddCarriageOpt (isCur, index) {
      console.log('增加集装箱', index)

      if (isCur) {
        // 第一个添加
        if (index === 0) {
          this.fnAddCarriage(this.curActiveTrainIndex)
        } else { // 第二个添加
          let adata = {}
          if (this.trainDirection === 0) {
            adata = Object.assign(Object.assign({
              location: 'right'
            }, this.newCarriageData))
          } else {
            adata = Object.assign(Object.assign({
              location: 'left'
            }, this.newCarriageData))
          }
          if (this.trainListData[this.curActiveTrainIndex].box.length === 0) {
            this.trainListData[this.curActiveTrainIndex].box = [adata]
            // 此处的this.newCarriageData必须深拷贝下，否则会导致编辑集装箱name会改变this.newCarriageData的值，因为指向一样
            // this.trainListData[this.curActiveTrainIndex].box = [Object.assign({}, this.newCarriageData)]
          } else if (this.trainListData[this.curActiveTrainIndex].box.length === 1) {
            // 点击中间添加集装箱，激活车厢只有一个集装箱场景有2种
            // 1当前集装箱是第一步点击中间添加集装箱按钮添加的集装箱（包含location特殊标识）
            // 2当前集装箱是上报上来的集装箱或者点击第一个添加集装箱按钮添加的集装箱（正常）
            if (this.trainListData[this.curActiveTrainIndex].box[0].location) {
              // 场景1中第二次点击中间添加按钮结果
              // 保持当前激活车厢集装箱length仍然为1
              delete this.trainListData[this.curActiveTrainIndex].box[0].location
              const lldata = this.trainListData[this.curActiveTrainIndex].box[0]
              this.trainListData[this.curActiveTrainIndex].box = [adata]
              const nnext = this.curActiveTrainIndex + 1
              this.nextAdd(nnext, lldata)
            } else {
              this.trainListData[this.curActiveTrainIndex].box = [this.trainListData[this.curActiveTrainIndex].box[0], Object.assign({}, this.newCarriageData)]
            }
          } else {
            const ldata = this.trainListData[this.curActiveTrainIndex].box[1]
            this.trainListData[this.curActiveTrainIndex].box = [this.trainListData[this.curActiveTrainIndex].box[0], Object.assign({}, this.newCarriageData)]
            // 思路
            // 中间添加和最后一个添加区别仅在于
            // 中间添加按钮的后一个集装箱处理和最后一个添加，添加的是空数据而此时的模拟最后一个添加添加的是前一个车厢的最后一个数据
            const next = this.curActiveTrainIndex + 1
            this.nextAdd(next, ldata)// 模拟触发第三个集装箱增加过程，处理如果下个车厢是蓬车则后延
          }
        }
      } else {
        // 第三个添加

        this.fnAddCarriage(this.curActiveTrainIndex + 1)
      }
    },
    // 模拟触发第三个增加集装箱事件
    nextAdd (next, ldata) {
      if (!this.trainListData[next] || this.trainListData[next].type !== 'P70') { //! this.trainListData[next]是在最后一个车厢有2个集装箱的时候点击中间添加集装箱按钮边界处理
        this.fnAddCarriage(next, ldata)
      } else {
        next++
        this.nextAdd(next, ldata)
      }
    },
    // 有空位场景
    fnCurLengthLT2 (startLocation, lastVal) {
      const lData = lastVal || Object.assign({}, this.newCarriageData)
      if (this.trainListData[startLocation].box.length === 0) {
        this.trainListData[startLocation].box = [lData]
      } else if (this.trainListData[startLocation].box.length === 1) {
        // if (this.trainListData[startLocation].box[0].location) {
        //   delete this.trainListData[startLocation].box[0].location
        // }
        const midVal = this.trainListData[startLocation].box[0]
        this.trainListData[startLocation].box = [lData, midVal]
      }
    },
    // 从每个车厢的第一个集装箱处开始添加集装箱
    fnAddCarriage (startLocation, addData) { // addData决定首位添加的是空数据还是前一个车厢的最后一个集装箱数据
      const recordTrainData = []
      const _this = this
      // let firstOpt = startLocation
      for (let i = startLocation; i <= this.trainListData.length; i++) {
        if (!this.trainListData[i]) {
          this.$confirm('此操作将产生无车厢的集装箱, 是否继续?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            onConfirm: () => {
              this.trainListData.push({
                status: 2,
                type: '', // 错误状态的车厢（无车厢type）
                name: '',
                isEdit: false,
                box: [recordTrainData[1] ? recordTrainData[1] : Object.assign({}, this.newCarriageData)]// 最后一个车厢直接在最后面添加集装箱边界值处理
              })
              if (this.trainDirection === 1) { // 反向导致车厢增加需要位置矫正
                this.$nextTick(() => {
                  _this.$refs.trainListBox.scrollLeft = _this.rowReverseScrollLeft
                })
              }
            },
            onCancel: () => {
              this.$message({
                type: 'success',
                message: '已取消删除!'
              })
            }
          })

          break
        }
        if (this.trainListData[i].type === 'P70') { // 碰到棚车直接跳过
          // firstOpt = i + 1
          continue
        }
        if (this.trainListData[i].box.length < 2) { // 碰到有空位置的场景
          if (i === startLocation) { // 首次操作的车厢
            if (addData) {
              this.fnCurLengthLT2(startLocation, addData)
            } else {
              this.fnCurLengthLT2(startLocation)
            }
          } else {
            this.fnCurLengthLT2(i, recordTrainData[1])
          }

          break
        }

        if (this.trainListData[i].box.length === 2) {
          // 思路
          // 1取出第一个集装箱保存
          // 2第一个集装箱存放；如果是第一个操作车厢则放空值,否则放上个车厢最后一个值
          // 3第二个集装箱放值之前先取出记录保存，再给第二个集装箱放之前保存的第一个集装箱
          if (this.trainListData[i].box[0].location) {
            delete this.trainListData[i].box[0].location
          }
          if (this.trainListData[i].box[1].location) {
            delete this.trainListData[i].box[1].location
          }
          recordTrainData[0] = this.trainListData[i].box[0]
          if (i === startLocation) {
            this.trainListData[i].box[0] = addData || Object.assign({}, this.newCarriageData)
          } else {
            this.trainListData[i].box[0] = recordTrainData[1]
          }
          recordTrainData[1] = this.trainListData[i].box[1]
          this.trainListData[i].box[1] = recordTrainData[0]
        }
      }
    },
    editCarriage (item, index, cItem, cIndex) {
      const _this = this
      if (this.isCanClick) {
        this.isCanClick = false
        setTimeout(function () {
          console.log('editCarriage', cItem)
          cItem.isEdit = true
          _this.isCanClick = true
        }, 500)
      }
    },
    // 删除集装箱
    deleteCarriage (index, cIndex) {
      this.$confirm('此操作将永久删除该集装箱, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.trainListData[index].box.splice(cIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('emitDeleteCarriage', this.trainListData)
        },
        onCancel: () => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@train-box-height:245px;
@train-box-width:348px;
@train-top-height:186px;
@train-box-add-width:80px;
@base-url-path:'./../assets/images/';
.imgStyle{
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.train-box{
  height: 365px;
  padding-top: 80px;
  width:1200px;
  border: 3px solid #000;
  // display: flex;
  // align-items: flex-end;
  .train-top{
    float: left;
    width: 300px;
    height:@train-top-height;
    margin-top: 100px;
    .imgStyle();
    background-image: url("@{base-url-path}/train-top.png");
    &.f-right{
      transform: scaleX(-1);
    }
  }
  .flex-row{
    flex-direction: row;
  }
  .flex-row-reverse{
    flex-direction: row-reverse;
  }
  .f-left{
    float: left;
  }
  .f-right{
    float: right;
  }
  .train-body{
    float: left;
    // background: #999;
    height: 100%;
    width: calc(~"100% - 300px");
    // overflow: auto;
    position: relative;

    .train-list-box{
      position: absolute;
      width: 100%;
      height: 100%;
      width: 100%;
      height: 100%;
      overflow: auto;
      .train-list{
        display: inline-flex;
        // align-items: center;
        // justify-content: flex-start;

      }
      .flex-row{
        flex-direction: row;
        .train-item-box{
          padding-right: @train-box-add-width;

          &:first-child{
            padding-left: @train-box-add-width;
          }

        }
      }
      .flex-row-reverse{
        flex-direction: row-reverse;
        .train-item-box{
          padding-left: @train-box-add-width;
          &:first-child{
            padding-right: @train-box-add-width;
          }

        }
      }
    }
    //操作区域
    .train-opt-box{
      width: @train-box-width+@train-box-add-width*2;
      height: calc(~"100% - 30px");
      // border: 1px solid red;
      position: relative;
      .add-flex-row{
        flex-direction: row;
      }
      .add-flex-row-reverse{
        flex-direction: row-reverse;
      }
      .add-carriage-box{
        width: 100%;
        height:80px;
        padding-top:12px;
        // border: 1px solid #000;
        display: flex;
        justify-content: space-between;
        position: relative;
        .add-carriage-item{
          &.middle{
             width:28px;
            height:55px !important;
          .add-carriage-wrapper{
            width: 100%;
            height: 100%;
            background-image: url("@{base-url-path}/add_carriage_small.png");

          }

          }
          height: 60px;
          width: 75px;
          position: relative;
          display: inline-block;
          z-index: 1999;
          cursor: pointer;
          .add-carriage-wrapper{
            background-image: url("@{base-url-path}/add_carriage_big.png");

            height: 100%;
            width: 100%;

            p{
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            &.show{
              display: block;
            }
            &.hide{
              display: none;
            }
          }

        }

      }
      .add-train-box{
        height: calc(~ "100% - 100px");
        width: 100%;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        .add-train-item{

          height:154px;
          width: @train-box-add-width;
          position: relative;
          z-index: 1999;
          .el-popover-wrap{
            .el-button{
              background-image: url("@{base-url-path}/add_train_box.png");
              height:154px;
              width:  @train-box-add-width;
              min-width: 20px;
              padding: 0;
            }
          }

        }
      }
    }

    .train-item-box{
      &.P70{
        .train-item-content{
          color:#fff ;
          background-image: url("@{base-url-path}/train_boxcar.png") !important;
        }
      }

       &.NX70{
        .train-item-content{
          color: rgba(0, 0, 0, .7);
          background-image: url("@{base-url-path}/train_flatcar.png") !important;
        }
      }
      &.C70{
        .train-item-content{
          color:#fff ;
          background-image: url("@{base-url-path}/train_wagon.png") !important;
        }
      }
       &.G70{
        .train-item-content{
           color: rgba(0, 0, 0, .7);
          background-image: url("@{base-url-path}/train_tanker_nor.png") !important;
        }
      }
      .train-item-wrapper{
        height:@train-box-height;
        width:@train-box-width;
        position: relative;
        &.curTop{
          position: relative;
          z-index: 1999;
          background: rgba(30,127,255,0.08);
          border-radius: 4px;
          border: 2px solid #006FFF;
        }
        // border: 2px solid red;
        .carriage-box{
          // border: 2px solid #000;
          // height: 70px;
          width: 100%;
          overflow: hidden;
          padding: 12px 16px 0 16px;
          position: absolute;
          top:0;
          left: 0;
          z-index: 200;
          &.float-row{
            .carriage-item{
              &:first-child{
                float: left;
              }
              &:nth-child(2){
                float: right;
              }
            }
          }
          &.float-row-reverse{
            .carriage-item{
              &:first-child{
                float: right;
              }
              &:nth-child(2){
                float: left;
              }
            }
          }
          .f-right{
            float: right !important;
          }
          .f-left{
            float: left !important;
          }
          .carriage-item{
            // border: 1px solid yellow;
            width: 136px;
            height: 72px;

            .carriage-item-wrapper{
              background-image: url("@{base-url-path}/bg_carriage.png");
              color: rgba(0, 0, 0, .4);
              width: 100%;
              height: 100%;
              display: flex;
              .empty-carriage-box{
                .el-popover-wrap{
                  .el-button{
                    width: 136px;
                    height: 72px;
                    background-image:  url("@{base-url-path}/bg_carriage.png") ;
                  }
                }
              }
              .carriage-item-wrapper-content{
                flex: 1;
              }
              .carriage-item-wrapper-opt{
                width: 30px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                i{
                  font-size: 24px;
                  cursor: pointer;
                }
              }
              input{
                width: 100%;
                min-width: 30px;
                height: 30px;
                display: inline-block;
              }

            }

          }
        }
        .train-item-content{
          height: 186px;
          width: 348px;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          padding: 16px;
          &.isEditStatus{
            z-index: 201;
          }
          .train-item-save{
            position: absolute;
            top:10px;
            left: 10px;
          }
          .train-item-info{
            width: 138px;
            ul{
              li{
                margin: 10px 0;
                input{
                  width: 50px;
                  min-width: 30px;
                  display: inline-block;
                  height: 30px;
                }
              }
            }
          }
          .train-item-opt{
            width: 30px;
            height: 90px;
            i{
              font-size: 24px;
            }
          }

          .train-item-name{
            flex: 1;
            span{
              min-width: 60px;
              display: inline-block;
              height: 30px;
            }
            input{
              min-width: 60px;
              display: inline-block;
              height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
