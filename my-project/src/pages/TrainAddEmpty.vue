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
             @click.stop="fnclickTrainBox(index)"
            v-for="(item,index) in trainListData" :key="index"
            :class="{
              'C70':item.trainType==='C70',
              'NX70':item.trainType==='NX70',
              'P70':item.trainType==='P70'

            }" >
              <div class="train-item-wrapper"
              :class="{'curTop':index===curActiveTrainIndex}"
              >
                <!-- 集装箱 -->
                <div class="carriage-box"  :class="{
                        'float-row':trainDirection===0,
                        'float-row-reverse':trainDirection===1
                      }" v-if="item&&item.containerInfo">
                  <div class="carriage-item"
                    :class="{

                      'isEditStatus':cItem.edit
                    }"
                    v-for="(cItem,cIndex) in item.containerInfo" :key="cIndex">
                    <div class="carriage-edit-save" v-if="cItem.edit">
                       <el-button  type="primary" >保存</el-button>
                     </div>
                    <div
                    class="carriage-item-wrapper"
                    :class="{
                      'error':cItem.containerStatus===0
                      }"
                     >

                     <template v-if="cItem.containerNum">

                      <div class="carriage-item-wrapper-content">
                        <p>集装箱编号</p>
                        <div>
                          <span v-if="index!=curActiveTrainIndex||!cItem.edit">{{cItem.containerNum}}</span>
                          <input type="text"
                          v-focus="true"
                          v-if="index===curActiveTrainIndex&&cItem.edit"
                          @blur="fnInputBlur(cItem)"
                          v-model="cItem.containerNum"
                          >
                        </div>
                      </div>
                      <div class="carriage-item-wrapper-opt" v-if="index===curActiveTrainIndex&&!cItem.edit">
                        <i class="h-icon-edit" @click.stop="editCarriage(item,index,cItem,cIndex)"></i>
                        <i class="h-icon-delete" @click.stop="deleteCarriage(index,cIndex)"></i>
                      </div>
                     </template>
                     <template v-else>
                       <template v-if="index===curActiveTrainIndex">
                        <div class="empty-carriage-box">
                          <div class="colse-empty-carriage-box">
                        <i class="h-icon-close" @click.stop="deleteEmptyCarriage(index,cIndex)"></i>

                          </div>
                          <el-popover
                            :ref="'carriagePopover'+cIndex+'&'+index"
                            placement="right"
                            width="360"
                            v-model="cItem.visible">
                            <div>
                              <div>
                                <h3>添加集装箱</h3>
                              </div>
                              <el-form :ref="'carriageForm'+cIndex+'&'+index" label-position="top" :rules="carriageRules" :model="carriageForm" label-width="120px">
                                <el-form-item label="集装箱编号" prop="carriageNum">
                                  <el-input v-model="carriageForm.carriageNum"></el-input>
                                </el-form-item>

                              </el-form>

                            </div>
                            <div style="text-align: right; margin: 0">
                              <el-button type="primary" @click="sureAddCarriageBox(cItem,'carriageForm'+cIndex+'&'+index)">确 定</el-button>
                              <el-button @click="fnCancelAddCarriage('carriageForm'+cIndex+'&'+index,cItem)">取 消</el-button>
                            </div>
                            <el-button slot="reference">+</el-button>
                          </el-popover>
                        </div>
                       </template>
                       <template v-else>
                        <div class="empty-carriage-box">
                          禁用的+空集装箱
                        </div>
                       </template>

                     </template>

                    </div>
                  </div>
                </div>
                <div class="train-item-content"

                :class="{
                  'isEditStatus':item.edit===true,
                  'error':item.trainStatus===0
                  }"
                 v-if="item.trainType">
                  <div class="train-item-save">
                    <el-button type="primary" v-if="item.edit" @click.stop="fnSaveEditTrainBoxData(item)">保存</el-button>
                  </div>
                  <div class="train-item-content-wrapper">
                    <div class="train-item-name" v-if="item.trainNo">
                      <div>火车编号</div>
                      <div>
                        <span v-if="index!=curActiveTrainIndex||!item.edit">{{item.trainNo}}</span>
                        <input v-focus="true"
                          v-if="index===curActiveTrainIndex&&item.edit"

                          type="text"
                          v-model="item.trainNo">
                      </div>

                    </div>
                    <div class="train-item-info">
                      <ul>
                        <li>
                          <span>类型</span>
                          <span v-if="index!=curActiveTrainIndex||!item.edit">{{item.trainType}}</span>
                          <input
                            v-if="index===curActiveTrainIndex&&item.edit"

                            type="text"
                            v-model="item.trainType">
                        </li>
                        <li>
                          <span>自重</span>
                          <span v-if="index!=curActiveTrainIndex||!item.edit">{{item.selfWeight}}</span>
                          <input
                            v-if="index===curActiveTrainIndex&&item.edit"

                            type="text"
                            v-model="item.selfWeight">
                        </li>
                        <li>
                          <span>载重</span>
                          <span v-if="index!=curActiveTrainIndex||!item.edit">{{item.loadWeight}}</span>
                          <input
                            v-if="index===curActiveTrainIndex&&item.edit"

                            type="text"
                            v-model="item.loadWeight">
                        </li>
                      </ul>
                    </div>

                    <div class="train-item-opt" v-if="index===curActiveTrainIndex&&!item.edit">
                      <i class="h-icon-edit" @click.stop="editTrainBox(item,index)"></i>
                      <i class="h-icon-delete" @click.stop="deleteTrainBox(index)"></i>
                    </div>
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
        <div class="add-carriage-box"
        v-if="isShowAddCarriage"
         :class="{
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
            :class="[isShowLastAddCarriage?'show':'hide']"
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
              width="320"
              v-model="item.visible">
              <div>
                <div>
                  <span class="popover-header-title">添加火车</span>
                </div>
                <el-form :ref="'trainForm'+index" :rules="trainRules" label-position="top" :model="trainForm" label-width="120px">
                  <el-form-item label="火车编号" prop="trainNum">
                    <el-input v-model="trainForm.trainNum"></el-input>
                  </el-form-item>
                  <el-form-item label="火车类型" prop="trainType">
                    <el-radio-group v-model="trainForm.trainType">
                      <el-radio label="NX70">平车</el-radio>
                      <el-radio label="P70">棚车</el-radio>
                      <el-radio label="C70">敞车</el-radio>
                      <el-radio label="G70">罐车</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="载重" prop="loadWeight">
                        <el-input v-model="trainForm.loadWeight"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="自重" prop="selfWeight">
                        <el-input v-model="trainForm.selfWeight"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

              </div>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" @click="submitAddTrainBoxForm(index,item,'trainForm'+index)">确 定</el-button>
                <el-button @click="resetForm('trainForm'+index,item)">取 消</el-button>
              </div>
              <el-button slot="reference">添加车</el-button>
            </el-popover>
          </div>
        </div>

        </div>
      </div>
      <div class="train-bottom">

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
const TRAINBOXWIDTH = 464
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
      initTrainListData: [], // 设备上报的车厢列表数据
      trainListData: [], // 融合了有集装箱无车厢的异常上报数据的车厢列表数据及页面渲染的数据
      errorCarriageListData: [], // 错误集装箱列表数据，储存有集装箱没有车厢的错误集装箱
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
      carriageRules: {
        carriageNum: { required: true, message: '集装箱编号必填', trigger: 'blur' }
      },
      trainForm: { // 增加车厢的表单
        trainType: 'NX70',
        trainNum: '',
        selfWeight: '',
        loadWeight: ''
      }, // 新增加的火车车厢类型
      trainRules: {
        trainNum: { required: true, message: '车厢编号必填', trigger: 'blur' },
        selfWeight: [{ required: true, message: '自重必填', trigger: 'blur' }],
        loadWeight: [{ required: true, message: '载重必填', trigger: 'blur' }]
      },
      newCarriageData: {
        containerStatus: 1, // 集装箱containerStatus字段；1上报的异常集装箱；2正常上报的集装箱
        containerNum: '',
        visible: false,
        edit: 0,
        containerISONum: null,
        containerModel: 0,
        containerNumConfidence: 0,
        happenedTime: null,
        id: null,
        trainContentId: null,
        trainId: null
      },
      newTrainItemData: {
        detectionType: null,
        edit: false,
        happenedTime: '',
        id: '',
        imageInfo: null,
        loadWeight: 0,
        railwayID: 1,
        selfweight: 2500,
        trainDirType: 'left',
        trainId: '',
        trainNo: '',
        trainNoConfidence: 100,
        trainStatus: '1',
        trainType: '',
        visible: false,
        containerInfo: []
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
      const _this = this
      return function (index) {
        const i = index || _this.curActiveTrainIndex
        return i * TRAINBOXWIDTH
      }
    },
    rowReverseScrollLeft () {
      const _this = this
      return function (index) {
        const i = index || _this.curActiveTrainIndex
        return this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - i * TRAINBOXWIDTH
      }
    },
    isShowPrevAddCarriage () {
      const lc = this.getRealTrainLastCarriage()
      if (lc.containerNum !== '') {
        return false
      }
      const la = this.getErrorTrainIndex()
      if (la > -1) {
        return false
      }
      return true
    },
    isShowLastAddCarriage () {
      if (this.curActiveTrainIndex === this.trainListData.length - 1) { // 最后一个是否向后添加集装箱按钮处理
        return false
      }
      if (this.trainListData[this.curActiveTrainIndex + 1] && this.trainListData[this.curActiveTrainIndex + 1].trainType === '') {
        return false
      }
      const lc = this.getRealTrainLastCarriage()// 最后一个正常的车厢上最后一个集装箱是否为空态
      if (lc.containerNum !== '') {
        return false
      }
      const la = this.getErrorTrainIndex()// 存在落空的集装箱
      if (la > -1) {
        return false
      }
      return true
    },
    isShowAddCarriage () {
      return this.trainListData[this.curActiveTrainIndex].trainType === 'NX70' || this.trainListData[this.curActiveTrainIndex].trainType === 'C70'
    }
  },
  watch: {
    scrollLeft (newVal, oldVal) {
      console.log('scrollLeft', newVal, oldVal)

      // 矫正scrollLeft位置
      if (this.trainDirection === 0) {
        if (this.scrollLeft !== this.rowScrollLeft()) {
          this.$refs.trainListBox.scrollLeft = this.rowScrollLeft()
        }
      } else {
        if (this.scrollLeft !== this.rowReverseScrollLeft()) {
          this.$refs.trainListBox.scrollLeft = this.rowReverseScrollLeft()
        }
      }
    },
    curActiveTrainIndex (newVal, oldVal) {
      this.$emit('emitCurActiveTrainIndex', newVal)
    },
    needActiveTrainIndex (newVal, oldVal) {
      this.fnclickTrainBox(newVal)
    }
  },
  mounted () {
    // console.log(this.$refs.trainOptBox, this.$refs.trainOptBox.clientWidth)
    this.errorCarriageListData = [
      {
        trainContentId: -1,
        id: '8888888888',
        containerStatus: 0, //   0异常1正常
        containerNum: '第8集装箱',
        visible: false,
        edit: 0
      },
      {
        trainContentId: -1,
        id: '9999999999',
        containerStatus: 0, //   0异常1正常
        containerNum: '第9集装箱',
        visible: false,
        edit: 0
      },
      {
        trainContentId: -1,
        id: 'aaaaaaaaaa',
        containerStatus: 0, //   0异常1正常
        containerNum: '第a集装箱',
        visible: false,
        edit: 0
      }
    ]
    const trainListData = [
      {
        id: 'd465d15a-dfdf-4929-bd67-9dc19a0d58f7',
        trainStatus: 1,
        trainType: 'NX70',
        trainNo: '第1节平车',
        edit: 0,
        selfWeight: '1t',
        loadWeight: '1t',
        containerInfo: [
          {
            trainContentId: 'd465d15a-dfdf-4929-bd67-9dc19a0d58f7',
            id: '1111111111',
            containerStatus: 0, //   0异常1正常
            containerNum: '第1集装箱',
            visible: false,
            edit: 0
          },
          {
            trainContentId: '',
            id: '',
            containerStatus: 1, //   0异常1正常
            containerNum: '',
            visible: false,
            edit: 0
          }
        ]
      },
      // {
      //   trainStatus: 1, //  0异常1正常
      //   trainType: 'P70', // type为''为有集装箱无车厢数据的异常数据
      //   trainNo: '第2节棚车',
      //   edit: 0,
      //   selfWeight: '1t',
      //   loadWeight: '1t',
      //   containerInfo: [

      //   ]// 如果一个数据没有上报为[]
      // },
      // {
      //   trainStatus: 0, // 0异常1正常
      //   trainType: 'P70', // type为''为有集装箱无车厢数据的异常数据
      //   trainNo: '第2节棚车',
      //   edit: 0,
      //   selfWeight: '1t',
      //   loadWeight: '1t',
      //   containerInfo: []// 如果一个数据没有上报为[]
      // },
      {
        id: '46ebb00f-2f27-4eaa-b3da-3782e543b9a3',
        trainStatus: 0,
        trainType: 'C70',
        trainNo: '第4节敞车',
        edit: 0,
        selfWeight: '1t',
        loadWeight: '1t',
        containerInfo: [
          {
            trainContentId: '46ebb00f-2f27-4eaa-b3da-3782e543b9a3',
            id: '2222222222',
            containerStatus: 1,
            containerNum: '第2集装箱',
            visible: false,
            edit: 0
          },
          {
            trainContentId: '46ebb00f-2f27-4eaa-b3da-3782e543b9a3',
            id: '3333333333',
            containerStatus: 1,
            containerNum: '第3集装箱',
            visible: false,
            edit: 0
          }
        ]
      },
      {
        id: 'fd5ab9cd-4901-4789-9d38-046be897f690',

        trainStatus: 1,
        trainType: 'C70',
        trainNo: '第5节敞车',
        edit: 0,
        selfWeight: '1t',
        loadWeight: '1t',
        containerInfo: [
          {
            trainContentId: 'fd5ab9cd-4901-4789-9d38-046be897f690',
            id: '4444444444',
            containerStatus: 1,
            containerNum: '第4集装箱',
            visible: false,
            edit: 0
          },
          {
            trainContentId: 'fd5ab9cd-4901-4789-9d38-046be897f690',
            id: '5555555555',
            containerStatus: 1,
            containerNum: '第5集装箱',
            edit: 0,
            visible: false
          }
        ]
      },
      {
        id: '344ab9cd-4901-4789-9d38-046be897f444',

        trainStatus: 0,
        trainType: 'NX70',
        trainNo: '第6节平车',
        edit: 0,
        selfWeight: '1t',
        loadWeight: '1t',
        containerInfo: [
          {
            trainContentId: '',
            id: '344ab9cd-4901-4789-9d38-046be897f444',
            containerStatus: 1, //   0异常1正常
            containerNum: '',
            visible: false,
            edit: 0
          },
          {
            trainContentId: '',
            id: '344ab9cd-4901-4789-9d38-046be897f444',
            containerStatus: 1, //   0异常1正常
            containerNum: '',
            visible: false,
            edit: 0
          }
        ]
      },
      {
        id: '75a7a546-b3ba-4800-97fc-819b2367743a',

        trainStatus: 1,
        trainType: 'NX70',
        trainNo: '第7节蓬车',
        edit: 0,
        selfWeight: '1t',
        loadWeight: '1t',
        containerInfo: [
          {
            trainContentId: '75a7a546-b3ba-4800-97fc-819b2367743a',
            id: '6666666666',
            containerStatus: 1,
            containerNum: '第6集装箱',
            visible: false,
            edit: 0
          },
          {
            trainContentId: '',
            id: '',
            containerStatus: 1, //   0异常1正常
            containerNum: '',
            visible: false,
            edit: 0
          }
        ]
      }]
    this.initTrainListData = JSON.parse(JSON.stringify(trainListData))
    // 重组异常数据
    for (let i = 0; i < Math.ceil(this.errorCarriageListData.length / 2); i++) {
      const gid = this.guid()
      const errdata = [...this.errorCarriageListData]
      const spliceData = errdata.splice(i * 2, 2)
      const newData = {
        id: gid,
        trainStatus: 0,
        trainType: '',
        trainNo: '',
        edit: 0,
        selfWeight: '',
        loadWeight: '',
        containerInfo: []

      }
      for (let j = 0; j < spliceData.length; j++) {
        newData.containerInfo.push(Object.assign(spliceData[j], {
          trainContentId: gid
        }))
        continue
      }
      console.log(spliceData, newData)

      trainListData.push(newData)
      continue
    }
    this.trainListData = trainListData
    const _this = this
    this.$nextTick(() => {
      _this.lastBlockBoxStyle = {
        paddingLeft: _this.$refs.trainListBox.clientWidth - _this.$refs.trainOptBox.clientWidth - 34 + 'px'
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
      console.log('handleScroll', this.$refs.trainListBox.scrollWidth)
      // 滚动过程中有carriagePopover未隐藏的场景
      this.changeCarriagePopover(this.trainListData)
      this.scrollLeft = this.$refs.trainListBox.scrollLeft
    }, 500),
    changeCarriagePopover  (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].containerInfo) {
          for (let j = 0; j < arr[i].containerInfo.length; j++) {
            if (arr[i].containerInfo[j].visible) {
              arr[i].containerInfo[j].visible = false
              break
            }
          }
        }
      }
      return -1
    },
    guid () {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    getRealTrainLastCarriage () {
      let lastCarriage
      for (let i = this.trainListData.length - 1; i >= 0; i--) {
        if (this.trainListData[i].trainType !== '') {
          lastCarriage = this.trainListData[i].containerInfo[1]
          break
        }
      }
      return lastCarriage
    },
    getErrorTrainIndex () {
      let lastErrorIndex = -1
      for (let i = this.trainListData.length - 1; i >= 0; i--) {
        if (this.trainListData[i].trainType === '') {
          lastErrorIndex = i
          break
        }
      }
      return lastErrorIndex
    },
    fnInputBlur (item) {
      // console.log(item)
      item.edit = 0
    },
    // 编辑车厢
    editTrainBox (item, index) {
      console.log('editTrainBox', item)
      item.edit = true
    },
    // 保存车厢编辑数据
    fnSaveEditTrainBoxData (item) {
      // 此处添加接口保存编辑数据
      item.edit = false
    },
    // 选中那个车厢激活那个车厢
    fnclickTrainBox (index) {
      if (this.trainDirection === 0) {
        this.$refs.trainListBox.scrollLeft = this.rowScrollLeft(index)
      } else {
        this.$refs.trainListBox.scrollLeft = this.rowReverseScrollLeft(index)
      }
    },
    // 保存车厢数据到后台
    fnSaveTrainListData () {
      const cloneTrainData = JSON.parse(JSON.stringify(this.trainListData))
      for (let i = 0; i < cloneTrainData.length; i++) {
        if (cloneTrainData[i] && cloneTrainData[i].containerInfo && cloneTrainData[i].containerInfo.length === 2) {
          cloneTrainData[i].containerInfo[0].trainContentId = cloneTrainData[i].id
          cloneTrainData[i].containerInfo[1].trainContentId = cloneTrainData[i].id
        }
      }
      console.log('保存数据到后台', cloneTrainData)
    },
    // 取消增加集装箱
    fnCancelAddCarriage (formName, citem) {
      this.carriageForm.carriageNum = ''
      this.resetForm(formName, citem)
    },
    // 确定新增集装名字
    async sureAddCarriageBox (cItem, formName) {
      try {
        const vFlag = await this.submitForm(formName)
        if (vFlag) {
          // 此处增加接口增加集装箱
          cItem.containerNum = this.carriageForm.carriageNum
          cItem.id = this.guid()
          this.carriageForm.carriageNum = ''
          cItem.visible = false
        }
      } catch (error) {

      }
    },
    // 新增车厢表单提交
    async submitAddTrainBoxForm (index, item, formName) {
      try {
        // 表单验证并且传给后台
        const vFlag = await this.submitForm(formName)
        console.log(vFlag)
        // 增加接口新增车厢
        if (vFlag) {
          this.sureAddTrainBox(index, item)
        }
      } catch (error) {

      }
    },
    submitForm (formName) {
      // eslint-disable-next-line promise/param-names
      const _this = this
      return new Promise((resolve, reject) => {
        this.$refs[formName][0].validate((valid, invalidFields) => {
          if (valid) {
            resolve(true)
          } else {
            console.log('error submit!!')
            console.log(invalidFields)
            _this.$refs[formName][0].focusFirstField()
            reject(new Error('valid failed'))
          }
        })
      })
    },
    resetForm (formName, item) {
      this.$refs[formName][0].resetFields()
      if (item && item.visible) {
        item.visible = false
      }
    },
    // 确定新增车厢
    sureAddTrainBox (index, item) {
      const _this = this
      const trainItemData = Object.assign(this.newTrainItemData, {
        id: this.guid(), // 新增接口返回的id
        trainType: this.trainForm.trainType,
        trainNo: this.trainForm.trainNum,
        selfWeight: this.trainForm.selfWeight,
        loadWeight: this.trainForm.loadWeight

      })
      const addIndex = this.curActiveTrainIndex + index
      if (this.trainListData[addIndex] && this.trainListData[addIndex].trainType === '') { // 如果当前车厢是有集装箱的空车厢,直接替换
        if (this.trainListData[addIndex].containerInfo.length === 1) {
          this.trainListData[addIndex].containerInfo.push(this.newCarriageData)
        }
        const ndata = Object.assign(trainItemData, {
          containerInfo: this.trainListData[addIndex].containerInfo
        })
        this.trainListData.splice(addIndex, 1, ndata)
      } else {
        if (this.trainForm.trainType === 'P70' || this.trainForm.trainType === 'G70') {
          this.trainListData.splice(addIndex, 0, trainItemData)
        } else {
          this.trainListData = this.fnFormatNewTrainData(addIndex)
        }
      }
      console.log('sureAddTrainBox', this.trainListData)

      this.fnSaveTrainListData()

      if (this.trainDirection === 1) { // 反向
        this.$nextTick(() => {
          _this.$refs.trainListBox.scrollLeft = _this.rowReverseScrollLeft()
        })
      }
      if (this.trainDirection === 0) {
        this.$nextTick(() => {
          _this.$refs.trainListBox.scrollLeft = this.rowScrollLeft(addIndex)
        })
      } else {
        this.$nextTick(() => {
          // 增加偏差触发handleScroll事件从而进一步触发curActiveTrainIndex计算属性，进而触发矫正计算
          _this.$refs.trainListBox.scrollLeft = _this.$refs.trainListBox.scrollLeft + 1
        })
      }
      // 表单数据重置
      this.trainForm = {
        trainType: 'NX70',
        trainNum: '',
        selfWeight: '',
        loadWeight: ''
      }
      // 添加popover隐藏
      item.visible = false
      this.$emit('emitAddTrainBox', this.trainListData)
    },
    // 增加车厢导致所以集装箱向前移动处理
    fnFormatNewTrainData (index) {
      const trainItemData = Object.assign(this.newTrainItemData, {
        id: this.guid(), // 新增接口返回的id
        trainType: this.trainForm.trainType,
        trainNo: this.trainForm.trainNum,
        selfWeight: this.trainForm.selfWeight,
        loadWeight: this.trainForm.loadWeight,
        containerInfo: [this.newCarriageData, this.newCarriageData]
      })
      const cloneTrainData = JSON.parse(JSON.stringify(this.trainListData))

      for (let i = index; i <= this.trainListData.length; i++) {
        // 如果新增加的车厢后面为篷车或者罐车

        if (i === index) {
          let addData = {}
          if (cloneTrainData[i] && cloneTrainData[i].containerInfo && cloneTrainData[i].containerInfo.length > 0) {
            if (cloneTrainData[i].containerInfo.length === 1) {
              cloneTrainData[i].containerInfo.push(this.newCarriageData)
            }
            addData = Object.assign(trainItemData, {
              containerInfo: cloneTrainData[i].containerInfo
            })
          } else {
            addData = trainItemData
          }

          cloneTrainData.splice(i, 0, addData)
          continue
        }
        // 正常无篷车和罐车场景
        if (cloneTrainData[i + 1] && cloneTrainData[i + 1].containerInfo && cloneTrainData[i + 1].containerInfo.length > 0) {
          if (cloneTrainData[i + 1].containerInfo.length === 1) {
            cloneTrainData[i + 1].containerInfo.push(this.newCarriageData)
          }
          const ldata = cloneTrainData[i + 1].containerInfo
          cloneTrainData[i].containerInfo = ldata
        } else {
          cloneTrainData[i].containerInfo = [this.newCarriageData, this.newCarriageData]// 最后面的边界置空
          if (cloneTrainData[i].trainType === '') { // 如果最后个车厢为空车厢且集装箱为空则删除
            cloneTrainData.splice(i, 1)
          }
        }
      }
      console.log('cloneTrainData', cloneTrainData)

      return cloneTrainData
    },
    // 删除车厢
    deleteTrainBox (index) {
      this.$confirm('删除车厢某某某？\n 车厢上的集装箱将同时被删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.trainListData.splice(index, 1)
          this.fnSaveTrainListData()

          const _this = this
          if (this.trainDirection === 0) {
            // 正向删除不需要处理
            // this.$nextTick(() => {
            //   _this.curActiveTrainIndex = index
            // })
          } else {
            this.$nextTick(() => {
              const sl = _this.rowReverseScrollLeft(index)
              console.log('deleteTrainBox---sl', sl)
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
          _this.fnSaveTrainListData()

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
        } else {
          const ldata = this.trainListData[this.curActiveTrainIndex].containerInfo[1]
          this.trainListData[this.curActiveTrainIndex].containerInfo[1] = this.newCarriageData
          this.fnAddCarriage(this.curActiveTrainIndex + 1, ldata)
        }
      } else {
        this.fnAddCarriage(this.curActiveTrainIndex + 1)
      }
    },
    // 模拟触发第三个增加集装箱事件
    nextAdd (next, ldata) {
      if (!this.trainListData[next] || this.trainListData[next].trainType !== 'P70') { //! this.trainListData[next]是在最后一个车厢有2个集装箱的时候点击中间添加集装箱按钮边界处理
        this.fnAddCarriage(next, ldata)
      } else {
        next++
        this.nextAdd(next, ldata)
      }
    },

    // 从每个车厢的第一个集装箱处开始添加集装箱
    fnAddCarriage (startLocation, addData) { // addData决定首位添加的是空数据还是前一个车厢的最后一个集装箱数据
      const recordTrainData = []
      const cloneTrainData = JSON.parse(JSON.stringify(this.trainListData))
      for (let i = startLocation; i < cloneTrainData.length; i++) {
        // 思路
        // 1取出第一个集装箱保存
        // 2第一个集装箱存放；如果是第一个操作车厢则放空值,否则放上个车厢最后一个值
        // 3第二个集装箱放值之前先取出记录保存，再给第二个集装箱放之前保存的第一个集装箱

        recordTrainData[0] = cloneTrainData[i].containerInfo[0]
        if (i === startLocation) {
          cloneTrainData[i].containerInfo[0] = addData || Object.assign({}, this.newCarriageData)
        } else {
          cloneTrainData[i].containerInfo[0] = recordTrainData[1]
        }
        recordTrainData[1] = cloneTrainData[i].containerInfo[1]
        cloneTrainData[i].containerInfo[1] = recordTrainData[0]
      }
      this.trainListData = cloneTrainData
    },
    // 编辑集装箱
    editCarriage (item, index, cItem, cIndex) {
      const _this = this
      if (this.isCanClick) {
        this.isCanClick = false
        setTimeout(function () {
          console.log('editCarriage', cItem)
          cItem.edit = true
          _this.isCanClick = true
        }, 500)
      }
    },
    // 删除集装箱
    deleteCarriage (index, cIndex) {
      this.$confirm('此操作将删除该集装箱数据, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.trainListData[index].containerInfo[cIndex].containerNum = ''

          // this.trainListData[index].containerInfo.splice(cIndex, 1)
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
    },
    // 删除空集装箱
    deleteEmptyCarriage (index, cIndex) {
      const _this = this
      this.$confirm('此操作将永久删除该集装箱, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          const cloneTrainData = JSON.parse(JSON.stringify(this.trainListData))
          // 此操作导致所有集装箱前移
          for (let i = index; i < cloneTrainData.length; i++) {
            if (cIndex === 0) {
              cloneTrainData[i].containerInfo[0] = cloneTrainData[i].containerInfo[1]
            }

            if (cloneTrainData[i + 1] && cloneTrainData[i + 1].containerInfo[0]) {
              cloneTrainData[i].containerInfo[1] = cloneTrainData[i + 1].containerInfo[0]
            } else {
              if (cloneTrainData[i].trainType === '') {
                cloneTrainData[i].containerInfo.splice(1, 1)
              } else {
                cloneTrainData[i].containerInfo[1] = _this.newCarriageData
              }

              break
            }

            if (cloneTrainData[i + 1] && cloneTrainData[i + 1].containerInfo[1]) {
              cloneTrainData[i + 1].containerInfo[0] = cloneTrainData[i + 1].containerInfo[1]
            } else {
              if (cloneTrainData[i + 1].trainType === '') {
                cloneTrainData.splice(i + 1, 1)
              }

              break
            }
          }
          _this.trainListData = cloneTrainData
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this.fnSaveTrainListData()
          _this.$emit('emitDeleteCarriage', this.trainListData)
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
.el-popover{
  .popover-header-title{
    width: 72px;
    height: 26px;
    font-family: MicrosoftYaHeiUI;
    font-size: 18px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;
    line-height: 26px;
    font-weight: 400;
    margin-bottom: 24px;
  }
}
.train-box{
  height: 310px;
  width:1600px;
  border: 3px solid #000;
  position: relative;
  // display: flex;
  // align-items: flex-end;
  .train-bottom{
    width: 100%;
    height: 12px;
    background: #5E5E5E;
    position: absolute;
    bottom: 23px;
    left: 0;
  }

  .train-top{
    float: left;
    width: 300px;
    height:@train-top-height;
    margin-top: 90px;
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
      overflow-x: auto;
      overflow-y: hidden;
      .train-list{
        display: inline-flex;
        margin-top: 40px;

      }
      .flex-row{
        flex-direction: row;
        .train-item-box{
          padding-right: calc(~ '@{train-box-add-width} + 2px');
          margin-right: 34px;

          &:first-child{
            padding-left: calc(~ '@{train-box-add-width} + 6px');
          }

        }
      }
      .flex-row-reverse{
        flex-direction: row-reverse;
        .train-item-box{
          padding-left: calc(~ '@{train-box-add-width} + 2px');
          margin-left: 34px;
          &:first-child{
            padding-right: calc(~ '@{train-box-add-width} + 6px');
          }
        }
      }
    }
    //操作区域
    .train-opt-box{
      width: 516px;
      height: @train-box-height;
      position: relative;
      top:35px;
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
            height:60px !important;
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
        position: absolute;
        bottom: 22px;
        .add-train-item{

          height:154px;
          width: @train-box-add-width;
          position: relative;
          z-index: 1999;
          .el-popover-wrap{
            .el-button{
              border: none;
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
          &.error{
            .train-item-content-wrapper{
              color:#FA3239 ;
              background-image: url("@{base-url-path}/train_boxcar_wrong.png") !important;
            }

          }
          .train-item-content-wrapper{
            color:#fff ;
           background-image: url("@{base-url-path}/train_boxcar.png") !important;
          }

        }
      }

       &.NX70{
        .train-item-content{
          &.error{
            .train-item-content-wrapper{
              color:#FA3239 ;
              background-image: url("@{base-url-path}/train_flatcar_wrong.png") !important;
            }

          }
          .train-item-content-wrapper{
            color: rgba(0, 0, 0, .7);
            background-image: url("@{base-url-path}/train_flatcar.png") !important;
          }

        }

      }
      &.C70{
        .train-item-content{
          &.error{
            .train-item-content-wrapper{
              color:#FA3239 ;
              background-image: url("@{base-url-path}/train_wagon_wrong.png") !important;
            }

          }
          .train-item-content-wrapper{
            color:#fff ;
            background-image: url("@{base-url-path}/train_wagon.png") !important;
          }

        }

      }
       &.G70{
        .train-item-content{
          &.error{
            .train-item-content-wrapper{
              color:#FA3239 ;
              background-image: url("@{base-url-path}/train_tanker_wrong.png") !important;
            }

          }
          .train-item-content-wrapper{
            color: rgba(0, 0, 0, .7);
            background-image: url("@{base-url-path}/train_tanker_nor.png") !important;
          }

        }

      }
      .train-item-wrapper{
        height:@train-box-height;
        width:@train-box-width;
        border: 2px solid transparent;
        position: relative;
        &.curTop{
          position: relative;
          background-image: url('@{base-url-path}/train_box_select_bg.png');
          background-size:100% 100%;
          border-radius: 4px;
          // border: 2px solid #006FFF;
        }
        // border: 2px solid red;
        .carriage-box{
          // border: 2px solid #000;
          // height: 70px;
          height: 83px;
          width:@train-box-width;
          // overflow: hidden;
          // padding: 12px 16px 0 16px;
          position: absolute;
          top:0;
          left: 0;
          z-index: 200;
          &.float-row{
            .carriage-item{

              &.isEditStatus{

                &:first-child{
                  left: 0;
                }
                &:nth-child(2){
                  right: 0;
                }
              }
              &:first-child{
                left: 16px;
              }
              &:nth-child(2){
                right: 16px;
              }
            }
          }
          &.float-row-reverse{
            .carriage-item{
              &.isEditStatus{

                &:first-child{
                  right: 0;
                }
                &:nth-child(2){
                  left: 0;
                }
              }
              &:first-child{
                right: 16px;
              }
              &:nth-child(2){
                left: 16px;
              }
            }
          }
          .f-right{
            left: 196px !important;
          }
          .f-left{
            right: 196px !important;
          }
          .carriage-item{
            position: absolute;
            bottom: 0;
            .carriage-edit-save{
              margin: 7px 7px 4px 57px;
            }
            &.isEditStatus{
              width: 160px;
              height: 130px;
              background-image: url("@{base-url-path}/carriage_select_bg.png");
              top:-20px;
              .carriage-item-wrapper{
                width: 146px;
                height: 78px;
                margin: 0 7px 9px 7px;
              }
            }
            .carriage-item-wrapper{
              background-image: url("@{base-url-path}/bg_carriage.png");
              .imgStyle();
              color: rgba(0, 0, 0, .4);
              width: 136px;
              height: 72px;
              display: flex;
              &.error{
                 background-image: url("@{base-url-path}/bg_carriage_error.png") !important;

              }
              .empty-carriage-box{
                position: relative;
                .colse-empty-carriage-box{
                  position: absolute;
                  top:0;
                  right: 0;
                  z-index: 2001;
                  font-size: 24px;
                  cursor: pointer;
                }
                .el-popover-wrap{
                  .el-button{
                    border: none;
                    width: 136px;
                    height: 72px;
                    background-image:  url("@{base-url-path}/bg_carriage.png") ;
                  }
                }
              }
              .carriage-item-wrapper-content{
                flex: 1;
                padding: 12px 0;
                p{
                  width: 100%;
                  text-align: center;
                  height: 20px;
                  font-size: 14px;
                  color: rgba(0,0,0,0.40);
                  letter-spacing: 0;
                  line-height: 20px;
                  font-weight: 400;
                  margin-bottom: 4px;
                }
                div{
                  span{
                    width:100%;
                    display: inline-block;
                    text-align: center;
                    height: 20px;
                    font-size: 14px;
                    color: rgba(0,0,0,0.70);
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 20px;
                    font-weight: 400;
                  }
                }
              }
              .carriage-item-wrapper-opt{
                width: 30px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 2000;
                i{
                  font-size: 24px;
                  cursor: pointer;
                }
              }
              input{
                width: 134px;
                height: 18px;
                background: #FFFFFF;
border: 1px solid #333333;
border-radius: 2px;
                display: inline-block;
                font-size: 14px;
                color: rgba(0,0,0,0.70);
                letter-spacing: 0;
                text-align: center;
                line-height: 20px;
                font-weight: 400;
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
          &.isEditStatus{
            z-index: 2001;
            height:223px ;
            background: rgba(30,127,255,0.08);
          }
          .train-item-save{
            position: absolute;
            top:17px;
            right: 15px;
          }
          .train-item-content-wrapper{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 186px;
            right: 0;
          }
          .train-item-opt{
            width: 36px;
            height:57px;
            position: absolute;
            right: 15px;
            bottom: 83px;
            z-index: 2000;
            i{
              font-size: 24px;
            }
          }
          .train-item-info{
            width: 128px;
            position: absolute;
            bottom: 69px;
            right: 0;
            ul{
              li{
                margin: 6px 0;
                span{
                  &:first-child{
                    width: 28px;
                    height: 20px;
                    font-size: 14px;
                    letter-spacing: 0;
                    line-height: 20px;
                    font-weight: 400;
                    margin-right: 8px;
                  }
                }
                input{
                  width: 72px;
                  min-width: 30px;
                  display: inline-block;
                  height: 24px;
                }
              }
            }
          }

          .train-item-name{
            position: absolute;
            bottom: 82px;
            left: 66px;
            flex: 1;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            div{
              &:first-child{
                height: 20px;
                opacity: 0.7;
                font-size: 14px;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 400;
                width: 134px;
                text-align: left;
              }
              &:nth-child(2){
                height: 32px;
                width: 134px;
                font-size: 22px;
                letter-spacing: 0;
                text-align: left;
                line-height: 20px;
                font-weight: 400;
              }
            }
            span{
              min-width: 60px;
              display: inline-block;
              height: 30px;
            }
            input{
              min-width: 60px;
              display: inline-block;
              height: 36px;
              width: 134px;
            }
          }
        }
      }
    }
  }
}
</style>
