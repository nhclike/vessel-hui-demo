<template>
  <div class="container">
    <div>
      <button @click="toLeft">正向</button>
      <button @click="toRight">反向</button>
    </div>
    <div class="train-box">
      <div class="train-top" :class="{
        'f-left':trainDirection===0,
        'f-right':trainDirection===1
      }">
        火车头
      </div>
      <div class="train-body">
        <div class="train-list-box" ref="trainListBox">
          <ul class="train-list" :class="{
            'flex-row':trainDirection===0,
            'flex-row-reverse':trainDirection===1
            }">
            <li class="train-item-box" v-for="(item,index) in trainListData" :key="index">
              <div class="train-item-wrapper">
                <div class="carriage-box">
                  <div class="carriage-item" v-for="(cItem,index) in item.box" :key="index">
                      {{cItem.name}}
                  </div>
                </div>
                <div class="train-item-content">
                  {{item.name}}
                </div>
              </div>
            </li>
            <li class="last-block-box" :style="lastBlockBoxStyle">

            </li>
          </ul>
        </div>

        <div class="train-opt-box" ref="trainOptBox" :class="{
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
          <div class="add-train-item">
            向前添加火车
          </div>
          <div class="add-train-item">
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
    }
  },
  data () {
    return {
      trainListData: [

      ],
      lastBlockBoxStyle: {
        paddingLeft: '200px'
      }
    }
  },
  computed: {

  },
  mounted () {
    // console.log(this.$refs.trainOptBox, this.$refs.trainOptBox.clientWidth)
    this.lastBlockBoxStyle = {
      paddingLeft: this.$refs.trainListBox.clientWidth - this.$refs.trainOptBox.clientWidth + 'px'
    }
    this.trainListData = [{
      type: '1',
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
      type: '2',
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
      type: '2',
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
      type: '3',
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
      type: '3',
      name: '第4节敞车',
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
      type: '2',
      name: '第5节棚车',
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
      type: '1',
      name: '第6节车厢',
      box: [
        {
          name: '第8集装箱'
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
    },
    toRight () {
      this.trainDirection = 1
    }
  }
}
</script>

<style scoped lang="less">
.train-box{
  height: 310px;
  width:1200px;
  border: 3px solid #000;
  .train-top{
    float: left;
    width: 300px;
    height:100%;
    background: red;
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
    background: yellow;
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
      z-index: 0;
      .train-list{
        display: inline-flex;
        // align-items: center;
        // justify-content: flex-start;

      }
      .flex-row{
        flex-direction: row;
        .train-item-box{
          padding-right: 80px;
          &:first-child{
            padding-left: 80px;
          }

        }
      }
      .flex-row-reverse{
        flex-direction: row-reverse;
        .train-item-box{
          padding-left: 80px;
          &:first-child{
            padding-right: 80px;
          }

        }
      }
    }
    .train-opt-box{
      // float: left;
      width: 360px;
      height: calc(~"100% - 30px");
      border: 1px solid red;
      position: relative;
      z-index: 999;
      .add-flex-row{
        flex-direction: row;
      }
      .add-flex-row-reverse{
        flex-direction: row-reverse;
      }
      .add-carriage-box{
        width: 100%;
        height: 100px;
        border: 1px solid #000;
        display: flex;
        justify-content: space-between;
        .add-carriage-item{
          height: 80px;
          width: 60px;
          background: #ddd;
        }

      }
      .add-train-box{
        height: calc(~ "100% - 100px");
        width: 100%;
        border: 1px solid red;
        display: flex;
        justify-content: space-between;
        .add-train-item{
          background: #fff;
          height: 80px;
          width: 60px;
        }
      }
    }
    .p-right{
      padding-right: 80px;
    }
    .p-left{
      padding-left: 80px;
    }
    .train-item-box{
      border: 2px solid #fff;
      // padding-right:80px;

      .train-item-wrapper{
        height: 200px;
        width: 200px;
        border: 2px solid red;
        // margin: 0 20px;
        .carriage-box{
          border: 2px solid #000;
          height: 80px;
          display: flex;
          align-items: center;
          .carriage-item{
            border: 1px solid #000;
            background: green;
            color: #fff;
            width: 50%;
            height: 40px;
          }
        }
        .train-item-content{
          height: 100px;
          width: 100%;
          background: blue;
          color: #ffff;
        }
      }
    }
  }
}
</style>
