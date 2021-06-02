// 实际项目中可以使用统一的axios拦截器实例
import axios from 'axios'
import './_mock'

export default {
  getName () {
    return axios.get('/api/demo/getName')
  }
}
