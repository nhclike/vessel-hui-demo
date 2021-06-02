import Mock from 'mockjs'

Mock.mock('/api/demo/getName', 'get', function () {
  return 'Lego'
})
