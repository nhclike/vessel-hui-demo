export default [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    path: '/error/:type',
    name: 'Error',
    component: 'Error'
  },
  {
    name: 'hello1',
    path: '/hello1/',
    menuCode: '无权限的测试，请输入hello1',
    component: 'Hello'
  },
  {
    name: 'hello',
    path: '/hello/',
    menuCode: '001',
    component: 'Hello'
  },
  {
    name: 'TableWithHlfFilter',
    path: '/TableWithHlfFilter',
    menuCode: '001',
    breadcrumb: [],
    component: 'tableWithHlfFilter/TableWithHlfFilter'
  },
  {
    name: 'TransferTriple',
    path: '/TransferTriple',
    menuCode: '001',
    breadcrumb: [],
    component: 'transferTriple/TransferTriple'
  },
  {
    name: 'BasicForm',
    path: '/BasicForm',
    menuCode: '001',
    breadcrumb: [],
    component: 'basicForm/BasicForm'
  },
  {
    name: 'Album',
    path: '/Album',
    menuCode: '001',
    breadcrumb: [],
    component: 'huiPro/Album'
  },
  {
    name: 'makejs',
    path: '/makejs',
    menuCode: '001',
    breadcrumb: [],
    component: 'xiaoXiao/makejs'
  },
  {
    name: 'WebVideoPlayDemo',
    path: '/WebVideoPlayDemo',
    menuCode: '001',
    breadcrumb: [],
    component: 'WebVideoPlayDemo'
  },
  {
    name: 'HiMAP',
    path: '/HiMAP',
    menuCode: '001',
    breadcrumb: [],
    component: 'HiMAP'
  },
  {
    name: 'TimeLine',
    path: '/TimeLine',
    menuCode: '001',
    breadcrumb: [],
    component: 'TimeLine'
  },
  {
    name: 'Train',
    path: '/Train',
    menuCode: '001',
    breadcrumb: [],
    component: 'TrainBox'
  }
]
