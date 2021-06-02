<template>
  <h-page-container>
    <h-layout>
      <h-page-sidebar>
        <div style="display: flex;flex-direction: column">
          <div class="operate-menu">可操作区域:</div>
          <div class="block">
            <el-button :plain="true" type="warning" @click="createPlayer">初始化</el-button>
          </div>
          <div class="block">
            <el-button :plain="true" type="warning" @click="startPreviewQuick">快捷预览</el-button>
            <el-button :plain="true" type="danger" @click="startPlaybackQuick">快捷回放</el-button>
          </div>
          <div class="block">
          <span class="buttonWrapper">
            <el-button :plain="true" type="info" @click="stopPlay">停止播放</el-button>
            <el-button :plain="true" type="danger" @click="destroyPlayer">视频销毁</el-button>
          </span>
          </div>
          <el-input
                  class="el-input--width"
                  v-model="cameraIndex"
                  placeholder="请输入监控点编号"
          ></el-input>
          <el-input
                  class="el-input--width"
                  v-model="startTime"
                  placeholder="请输入开始时间"
          ></el-input>
          <el-input
                  class="el-input--width"
                  v-model="endTime"
                  placeholder="请输入结束时间"
          ></el-input>
          <el-checkbox v-model="custom">使用自定义url与上下文</el-checkbox>
          <el-input
                  class="el-input--width"
                  v-model="ctx"
                  v-if="custom"
                  placeholder="请输入上下文"
          ></el-input>
          <el-input
                  class="el-input--width"
                  v-model="url"
                  v-if="custom"
                  placeholder="请输入url"
          ></el-input>
          <el-alert title="以下功能仅做代码示例" type="info" simple show-icon></el-alert>
          <div class="block">
            <el-button :plain="true" type="warning" @click="startPreview">开始预览</el-button>
            <el-button :plain="true" type="danger" @click="startPlayback">开始回放</el-button>
          </div>
          <div class="block">
          <span class="buttonWrapper">
            <el-button :plain="true" type="danger" @click="inintEzviz">萤石预览</el-button>
              <el-button :plain="true" type="danger" @click="capturePic">前端抓图</el-button>
          </span>
          </div>
          <div class="block">
          <span class="buttonWrapper">
            <el-button :plain="true" type="info" @click="disableSwitch">禁止预览回放切换</el-button>
          </span>
          </div>
        </div>
      </h-page-sidebar>
      <h-page-content flex align-center>
        <div class="fontP">
          <!--包含 初始化视频窗口按钮、设置预览或回放、开始预览或回放、结束预览或回放、销毁视频、抓图、裁剪和恢复视频控件窗口等主要功能
          (可参照<a href="http://10.10.64.25/feb/plugins/vc/detail1.html" target='_blank'>文档</a>配置参数)-->
        </div>
        <div id="wwplayWnd" class="playWnd"></div>
        <div id="dialog" class="dialogClass" v-show="dialogIsShow">
          <img class="capturePicId" :src="imgUrl" width="600px">
          <el-button type="primary" @click="closeImgDialog">关闭</el-button>
        </div>
        <div class="errorMsg">{{errorMsg}}</div>
      </h-page-content>
    </h-layout>
  </h-page-container>
</template>
<script>
import WebVideoPlayer from 'webVideoPlayer'

export default {
  name: 'vieo-demo',
  data () {
    return {
      oWebControl: null,
      num: null,
      module: null,
      imgUrl: '',
      dialogIsShow: false,
      errorMsg: '',
      endTime: '2019-11-08T15:00:00.000+08:00',
      startTime: '2019-11-08T14:00:00.000+08:00',
      cameraIndex: 'd42055c1dfac45bcaef22e8e28efef78',
      custom: false,
      url: '',
      ctx: ''
    }
  },
  mounted () {
     this.createPlayer(0)
  },
  beforeDestroy () {
    this.destroyPlayer()
  },
  methods: {
    // 隐藏窗口
    setVideoWndhide () {
      this.oWebControl && this.oWebControl.oWebControl && this.oWebControl.oWebControl.JS_HideWnd()
    },
    // 显示窗口
    setVideoWndShow () {
      this.oWebControl && this.oWebControl.oWebControl && this.oWebControl.oWebControl.JS_ShowWnd()
    },
    szIp () {
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      }
      return window.location.origin
    },
    // 创建视频窗口
    createPlayer () {
      if (this.oWebControl) {
        return
      }
      const dom = document.getElementById('wwplayWnd')
      this.oWebControl = new WebVideoPlayer().create({
        szType: 'window', // 增加Windows类型(默认window)
        szId: 'wwplayWnd', // 上面div的 id
        szContext: 'jdemo', // 组件上下文
        szInterfaceAdress: '/jdemo/extend/video/control/ptz', // 云台控制对应接口
        callback: this.callbackMes, // 回调函数
        menuId: null, // 门户网站当且嵌的pes页面的菜单code
        menuPid: null, // 门户网站当且嵌的pes组件code(用于监听门户页面tab也切换)
        iwidth: dom.offsetWidth, // 控件管理模块窗口的宽度(默认值600)
        iheight: dom.offsetHeight, // 控件管理模块窗口的高度(默认值400)
        userId: 'admin', // 当前登录用户Id(默认是admin)云台控制使用,无特殊要求建议传admin
        szIp: this.szIp(), // 云台控制服务部署的ip+port
        isInitModule: true,
        initModule: {
          funcName: 'LoadModule',
          arguments: {
            module: 'videoPlugin' // 启动应用的名称
          }
        }
      })
      this.oWebControl.createPlayer() // 启动视频控件
    },
    // 回调函数
    callbackMes (oData) {
      window.console.log(oData)
      if (Object.getOwnPropertyNames(oData.responseMsg).length !== 0) {
        const data = oData.responseMsg
        if (data.code === 0 && data.funcName === 'LoadModule') {
          // 初始化按钮，不需要可以不调用
          this.initMenuBtn()
        } else if (data.funcName === 'initEzviz') {
          // 萤石预览
          this.startEzvizPreview()
        } else if (data.funcName === 'WebSnapPic') {
          // 当有弹框需要盖在视频控件窗口上面时，需要调用这个方法；目的是为了裁剪视频控件窗口，
          // 视频控件窗口层级很高
          this.oWebControl.cuttingPartWindow(0, 0, 600, 400)
          // 抓图后的图片信息
          this.imgUrl = 'data:image/jpg;base64,' + data.picData
          this.dialogIsShow = true
        } else if (data.funcName === 'paramsError') {
          this.$message.error(data.msg)
          this.errorMsg = data.msg
        } else if (data.funcName === 'requestError') {
          this.$message.error(data.msg)
          this.errorMsg = data.msg
        } else if (data.funcName === 'startPlayback') {
        }
      }
    },
    // 快捷预览
    startPreviewQuick () {
      try {
        if (!this.custom) {
          this.oWebControl.startPreview(this.cameraIndex)
        } else {
          this.oWebControl.startPreview(this.cameraIndex, this.url, this.ctx)
        }
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 快捷回放
    startPlaybackQuick () {
      try {
        const obj = {
          endTime: this.endTime,
          indexCode: this.cameraIndex,
          startTime: this.startTime
        }
        if (!this.custom) {
          this.oWebControl.startPlayback(obj)
        } else {
          this.oWebControl.startPlayback(obj, this.url, this.ctx)
        }
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 预览
    startPreview () {
      try {
        const params = {
          funcName: 'startPreview',
          arguments: {
            streamData: [
              {
                cameraName: '',
                cameraIndex: 'cameraIndex0',
                url: 'rtsp://10.19.158.6:655/EUrl/neKBRcc',
                streamType: 0,
                token: '',
                connectType: 0,
                deviceType: 0,
                cameraType: 0,
                privateKey: ''
              }
            ]
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 回放
    startPlayback () {
      try {
        const params = {
          funcName: 'startPlayback',
          arguments: {
            streamData: [
              {
                beginTime: '2019-10-25T16:43:08.000+08:00',
                cameraIndex: 'ec8531bbaf374b50830ffcf566d9bd2b',
                cameraName: '101的crmera 01asasas',
                cameraType: 0,
                connectType: 0,
                deviceType: 1,
                endTime: '2019-10-25T16:43:15.000+08:00',
                privateKey: '',
                token: 'EQBgAGM1a84R9KDnBoJUjYtAT4nQF+8df+p54CWt7Kr/b+WHuZaTS4iGWx7WJY4xOqdyxxjBGRi3EZC4IwkKrXfdcpdyozwFPUtjawXkDZxGJmLXeGZvtX4at0g3/+wCLfNes1CHPPo9ipcae8LTRZH6xMrLX6J9v+TCIvNh2aZCzOQu',
                url: 'rtsp://10.67.180.106:6304/EUrl/8BRdSRa'
              }
            ]
          }
        }
        console.log(params)
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 视频销毁
    destroyPlayer () {
      if (this.oWebControl) {
        this.setVideoWndhide()
        this.oWebControl.destroyPlayer()
        this.oWebControl = null
      }
    },
    // 停止预览
    stopPreview () {
      try {
        const params = {
          funcName: 'stopPreview',
          arguments: {
            streamIndex: ['cameraIndex0']
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 停止回放
    stopPlayback () {
      try {
        const params = {
          funcName: 'stopPlayback',
          arguments: {
            streamIndex: 0 // 回放路，回放暂定一路
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 初始化萤石sdk
    inintEzviz () {
      try {
        const param = {
          funcName: 'InitEzviz',
          arguments: {
            authAddr: 'https://openauth.ys7.com',
            platFormAddr: 'https://open.ys7.com',
            appKey: ''
          }
        }
        this.oWebControl.requestInterface(param)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 萤石预览
    startEzvizPreview () {
      try {
        const params = {
          funcName: 'startPreview',
          arguments: {
            streamData: [
              {
                cameraName: '',
                cameraIndex: 'cameraIndex0',
                url: 'rtsp://10.19.158.6:655/EUrl/neKBRcc',
                streamType: 0,
                token: '',
                connectType: 0,
                deviceType: 0,
                cameraType: 0,
                privateKey: ''
              }
            ]
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 初始化播放器button
    initMenuBtn () {
      try {
        const params = {
          funcName: 'showButton',
          arguments: {
            toolMenu: true, // 总工具栏菜单栏
            frameToolMenu: false, // 单画面菜单栏
            contextMenu: false, // 右键菜单
            snapBtn: true, // 截图
            voiceSwitchBtn: true, // 音量开关
            clipVideoBtn: true, // 紧急录像
            ptzhBtn: true, // 云台控制
            streamTypeBtn: true, // 主子码流切换
            allMuteBtn: true, // 全部静音
            allCloseBtn: false, // 全部关闭
            allSnapBtn: true, // 全部截图
            screenChangeBtn: false, // 分屏切换
            userDefBtn: false // 自定义按钮
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 前端抓图
    capturePic () {
      try {
        const params = {
          funcName: 'capturePic',
          arguments: {
            cameraIndex: 'cameraIndex0' // 监控点编号
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    closeImgDialog () {
      try {
        // 视频控件窗口恢复窗口大小
        this.oWebControl.repairPartWindow(0, 0, 600, 400)
        this.dialogIsShow = false
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 停止播放
    stopPlay () {
      try {
        const params = {
          funcName: 'stopPlay',
          arguments: {
            StopAll: true, // 是否关闭所有播放
            cameraIndex: ''// 监控点编号数组
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    },
    // 禁止预览回放切换
    disableSwitch () {
      try {
        const params = {
          funcName: 'disableSwitch',
          arguments: {
            disable: true // 允许切换
          }
        }
        this.oWebControl.requestInterface(params)
      } catch (e) {
        if (!this.oWebControl) {
          this.$message.error('请先初始化控件')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
  .operate-menu {
    font-size: 20px;
    font-weight: bolder;
  }

  .block {
    margin: 15px 2px;
  }

  .playWnd {
    width: 100%;
    height: 97%;
  }

  .errorMsg {
    height: 3%;
  }

  .dialogClass {
    width: 604px;
    height: 404px;
    position: absolute;
    border: 2px solid red;
    top: 14px;
    left: 7px;
    .cutting {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }

  .fontP {
    font-size: 18px;
    font-weight: bolder;
  }
  .el-input--width {
    margin-bottom: 5px;
  }
</style>
