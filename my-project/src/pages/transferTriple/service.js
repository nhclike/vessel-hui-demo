// 实际项目中可以使用统一的axios拦截器实例
import axios from 'axios'
import './_mock'

export default {
  getTreeData () {
    return axios.get('/api/transferTriple/getTreeData')
  },
  getLeftData () {
    return axios.get('/api/transferTriple/getLeftData')
  },
  getRightData () {
    return axios.get('/api/transferTriple/getRightData')
  }
}
