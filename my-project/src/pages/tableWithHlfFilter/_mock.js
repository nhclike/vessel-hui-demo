import Mock from 'mockjs'

Mock.mock('/api/tableWithHlfFilter/getTableData', 'get', function () {
  const tableData = []
  for (let i = 0; i < 10; i++) {
    tableData.push({
      title1: 'Title',
      title2: 'Title',
      title3: 'Title',
      title4: 'Title',
      title5: 'Title'
    })
  }
  return tableData
})

Mock.mock('/api/tableWithHlfFilter/getTreeData', 'get', function () {
  const treeData = []
  for (let i = 0; i < 10; i++) {
    treeData.push({
      id: `${i}`,
      label: 'Title',
      children: []
    })
    for (let j = 0; j < 5; j++) {
      treeData[i].children.push({
        id: `${i}${j}`,
        label: 'Title'
      })
    }
  }
  return treeData
})
