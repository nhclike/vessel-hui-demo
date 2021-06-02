export default [
  {
    title: 'hello.welcome',
    router: '/hello',
    menuCode: '001',
    icon: 'h-icon-menu'
  },
  {
    router: '/TableWithHlfFilter',
    menuCode: '001',
    title: '过滤高低频',
    icon: 'h-icon-menu_app',
    isApp: true
  },
  {
    router: '/WebVideoPlayDemo',
    menuCode: '001',
    title: 'EBG视频插件',
    icon: 'h-icon-menu_app',
    isApp: true
  },
  {
    router: '/HiMAP',
    menuCode: '001',
    title: 'HiMAP',
    icon: 'h-icon-menu_app',
    isApp: true
  },
  {
    router: '/TransferTriple',
    menuCode: '001',
    title: '穿梭框 - 带组织区域',
    icon: 'h-icon-menu_app',
    isApp: true
  },
  {
    router: '/BasicForm',
    menuCode: '001',
    title: '基础表单',
    icon: 'h-icon-menu_app',
    isApp: true
  },
  {
    menuCode: '001',
    title: 'HuiPro',
    icon: 'h-icon-menu_app',
    children: [
      {
        router: '/Album',
        menuCode: '001',
        title: 'Album',
        icon: 'h-icon-menu_app',
        isApp: true
      }
    ]
  },
  {
    menuCode: '001',
    title: '小小组件库',
    icon: 'h-icon-menu_app',
    children: [
      {
        router: '/makejs',
        menuCode: '001',
        title: 'makejs',
        icon: 'h-icon-menu_app',
        isApp: true
      }
    ]
  }

]
