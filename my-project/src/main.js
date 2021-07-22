import Vue from 'vue'
import hui from 'hui'
import './huiPro' // equals to require('./huiPro')
import './xiaoxiao'
import initApp from './initApp'
import '@hui/svg-icon/lib/svg-icon.css'
import icons from '@hui/svg-icon'
import './svg-symbol-icon.js'
import himapvue from 'hi-map-vue/lib/index.umd.min'
import 'hi-map-vue/lib/index.css'
import vuetimeline from '@growthbunker/vuetimeline'
import animated from 'animate.css'

for (const icon of icons) {
  Vue.component(icon.name, icon)
}

Vue.use(hui)
Vue.use(animated)
Vue.use(vuetimeline)
Vue.use(himapvue)
// 全局混合，对面包屑的多语言进行处理
Vue.mixin({
  computed: {
    i18nBreadcrumb () {
      if (this.breadcrumbObj && Array.isArray(this.$store.state.userInfo.breadcrumb[this.breadcrumbObj.menuCode])) {
        const breadcrumbList = this.$store.state.userInfo.breadcrumb[this.breadcrumbObj.menuCode]
        return breadcrumbList.map(item => ({
          title: item
        })).concat(this.breadcrumbObj.content ? this.breadcrumbObj.content.map(bd => ({
          title: this.$t ? this.$t(bd) : bd
        })) : [])
      } else {
        return []
      }
    }
  }
})

initApp(Vue)
