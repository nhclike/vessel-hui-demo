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
              <div class="train-item-wrapper" :class="{'curTop':index===curActiveTrainIndex}">
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
                  <span>{{item.name}}</span>
                  <template v-if="index===curActiveTrainIndex">
                    <i class="h-icon-edit"></i>
                    <i class="h-icon-delete" @click="deleteTrainBox(index)"></i>
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
      scrollLeft: 0

    }
  },
  computed: {
    curActiveTrainIndex () {
      let index = 0
      if (this.trainDirection === 0) {
        index = Math.floor(this.scrollLeft / 280)
      } else {
        index = Math.floor(Math.abs(this.scrollLeft + this.$refs.trainBody.clientWidth - this.$refs.trainListBox.scrollWidth) / 280)
      }
      return index
    }
  },
  watch: {
    curActiveTrainIndex (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.$emit('emitCurActiveTrainIndex', newVal)
    },
    needActiveTrainIndex (newVal, oldVal) {
      if (newVal !== this.curActiveTrainIndex) {
        if (this.trainDirection === 0) {
          this.$refs.trainListBox.scrollLeft = newVal * 280
        } else {
          this.$refs.trainListBox.scrollLeft = this.$refs.trainListBox.scrollWidth - this.$refs.trainBody.clientWidth - newVal * 280
        }
      }
    }
  },
  mounted () {
    // console.log(this.$refs.trainOptBox, this.$refs.trainOptBox.clientWidth)
    this.lastBlockBoxStyle = {
      paddingLeft: this.$refs.trainListBox.clientWidth - this.$refs.trainOptBox.clientWidth + 'px'
    }
  },
  methods: {
    handleScroll () {
      console.log(this.$refs.trainListBox.scrollLeft, this.$refs.trainListBox.scrollWidth)
      this.scrollLeft = this.$refs.trainListBox.scrollLeft
    },
    addTrainBox (isPrev) {
      this.$emit('emitAddTrainBox', isPrev)
    },
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
        height: 60px;
        border: 1px solid #000;
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
            height: 40px;
          }
        }
        .train-item-content{
          height: 100px;
          width: 100%;
          color: #000;
        }
      }
    }
  }
}
</style>
