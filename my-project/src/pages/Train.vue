<template>
  <div>

    <div class="train-box">
      <div class="train-top" :class="{
        'f-left':trainDirection===0,
        'f-right':trainDirection===1
      }">
        火车头
      </div>
      <div class="train-body" ref="trainBody">
        <div class="train-list-box" ref="trainListBox" @scroll="handleScroll" >
          <ul class="train-list" ref="trainList"

           :class="{
            'flex-row':trainDirection===0,
            'flex-row-reverse':trainDirection===1
            }">
            <li class="train-item-box" :class="{
              'C70':item.type==='C70',
              'NX70':item.type==='NX70',
              'P70':item.type==='P70'

            }" v-for="(item,index) in trainListData" :key="index">
              <div class="train-item-wrapper" :class="{'curTop':index===curActiveTrainIndex}" @click.stop="fnclickTrainBox(index)" >
                <div class="carriage-box">
                  <div class="carriage-item" v-for="(cItem,cIndex) in item.box" :key="cIndex">
                      <span v-if="item&&item.name">{{cItem.name}}</span>
                      <template v-if="index===curActiveTrainIndex">
                        <i class="h-icon-edit"></i>
                        <i class="h-icon-delete"></i>
                      </template>
                  </div>
                </div>
                <div class="train-item-content">
                  <div class="train-item-name">
                    <span v-if="index!=curActiveTrainIndex||!item.isEdit">{{item.name}}</span>
                    <input v-focus="true"
                      v-if="index===curActiveTrainIndex&&item.isEdit"
                      ref="inputList"
                      @blur="fnInputBlur(item)"
                      type="text"
                      v-model="item.name">
                  </div>

                  <template v-if="index===curActiveTrainIndex">
                    <i class="h-icon-edit" @click.stop="editTrainBox(item,index)"></i>
                    <i class="h-icon-delete" @click.stop="deleteTrainBox(index)"></i>
                  </template>

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
          <div class="add-carriage-item">
            向前添加集装箱
          </div>
          <div class="add-carriage-item">
            向后添加集装箱
          </div>
        </div>
        <div class="add-train-box" :class="{
          'add-flex-row':trainDirection===0,
          'add-flex-row-reverse':trainDirection===1
        }">
          <div class="add-train-item" @click="addTrainBox(true)">
            向前添加火车
          </div>
          <div class="add-train-item"  @click="addTrainBox(false)">
            向后添加火车
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
const TRAINBOXWIDTH = 280
export default {
  props: {
    trainDirection: {
      type: Number,
      default: 0// 0正向从右向左/1反向从左到右
    },
    trainListData: {
      type: Array,
      default: () => {
        return []
      }
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
      scrollLeft: 0,
      isEditTrainBox: false

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
    }
  },
  watch: {
    curActiveTrainIndex (newVal, oldVal) {
      console.log('curActiveTrainIndex', newVal, oldVal)
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
    this.lastBlockBoxStyle = {
      paddingLeft: this.$refs.trainListBox.clientWidth - this.$refs.trainOptBox.clientWidth + 'px'
    }
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
      item.isEdit = true
    },
    // 选中那个车厢激活那个车厢
    fnclickTrainBox (index) {
      if (this.trainDirection === 0) {
        this.$refs.trainListBox.scrollLeft = index * TRAINBOXWIDTH
      } else {
        this.$refs.trainListBox.scrollLeft = this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - index * TRAINBOXWIDTH
      }
    },
    // 增加车厢
    addTrainBox (isPrev) {
      this.$emit('emitAddTrainBox', isPrev)
    },
    // 删除车厢
    deleteTrainBox (index) {
      this.$confirm('此操作将永久删除该车厢, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          this.$emit('emitDeleteTrainBox', index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
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
@train-box-width:200px;
@train-box-add-width:80px;
.train-box{
  height: 310px;
  width:1200px;
  border: 3px solid #000;
  .train-top{
    float: left;
    width: 300px;
    height:100%;
    background: #ddd;
    color: #fff;
  }
  .f-left{
    float: left;
  }
  .f-right{
    float: right;
  }
  .train-body{
    float: left;
    background: #999;
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
    .train-opt-box{
      width: 360px;
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
        // border: 1px solid #000;
        display: flex;
        justify-content: space-between;
        position: relative;
        .add-carriage-item{
          height: 40px;
          width: @train-box-add-width;
          background: #ddd;
           position: relative;
          z-index: 1999;
        }

      }
      .add-train-box{
        height: calc(~ "100% - 100px");
        width: 100%;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        .add-train-item{
          background: #f5f5f5;
          height:80px;
          width: @train-box-add-width;
          position: relative;
          z-index: 1999;
        }
      }
    }

    .train-item-box{
      &.P70{
        .train-item-content{
          background: rgb(231, 106, 175) !important;
        }
      }

       &.NX70{
        .train-item-content{
          background: rgb(227, 241, 195) !important;
        }
      }
      &.C70{
        .train-item-content{
          background: rgb(136, 136, 228) !important;
        }
      }
      .train-item-wrapper{
        height: @train-box-width;
        width: @train-box-width;
        &.curTop{
          position: relative;
          z-index: 1999;
          border: 1px solid red;
        }
        // border: 2px solid red;
        .carriage-box{
          border: 2px solid #000;
          height: 70px;
          display: flex;
          align-items: center;
          .carriage-item{
            border: 1px solid #000;
            background: green;
            color: #000;
            width: 50%;
            height: 60px;
            i{
              font-size: 24px;
            }
          }
        }
        .train-item-content{
          height: 100px;
          width: 100%;
          color: #000;
          i{
            font-size: 30px;
          }
          .train-item-name{
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
