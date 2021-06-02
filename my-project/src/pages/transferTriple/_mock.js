import Mock from 'mockjs'

Mock.mock('/api/transferTriple/getTreeData', 'get', function () {
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

Mock.mock('/api/transferTriple/getLeftData', 'get', function () {
  const leftData = []
  for (let i = 0; i < 500; i++) {
    leftData.push({
      id: i,
      label: 'Text',
      belongArea: 'root',
      description: 'Text'
    })
  }
  return leftData
})

Mock.mock('/api/transferTriple/getRightData', 'get', function () {
  return [
    {
      id: '1-1',
      label: 'Text',
      belongArea: 'root',
      description: 'Text'
    },
    {
      id: '2-1',
      label: 'Text',
      belongArea: 'root',
      description: 'Text'
    }
  ]
})
